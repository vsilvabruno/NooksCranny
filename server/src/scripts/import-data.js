require('dotenv').config();
const connectDB = require('../models/db');

const apiKey = process.env.NOOKIPEDIA_API_KEY;

async function fetchWithRetry(url, options = {}, retries = 3, delay = 1000) {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`API error ${response.status} for ${url}`);
    }
    return await response.json();
  } catch (err) {
    if (retries === 0) {
      throw new Error(`Fetch failed after multiple retries: ${err.message}`);
    }
    console.log(`Retrying request for ${url}... Attempts left: ${retries}`);
    await new Promise(resolve => setTimeout(resolve, delay));
    return fetchWithRetry(url, options, retries - 1, delay * 2);
  }
}

async function importData() {
  if (!apiKey) {
    console.error('Nookipedia API key is missing!');
    process.exit(1);
  }

  const db = await connectDB();

  try {
    console.log("Fetching furniture and clothing data...");

    const urls = [
      { url: 'https://api.nookipedia.com/nh/furniture', category: 'furniture' },
      { url: 'https://api.nookipedia.com/nh/clothing', category: 'clothing' }
    ];

    const fetchResults = await Promise.allSettled(urls.map(({ url, category }) =>
      fetchWithRetry(url, { headers: { 'X-API-KEY': apiKey } }, 3, 1000)
        .then(data => ({ data, category }))
    ));

    let insertPromises = [];

    for (const result of fetchResults) {
      if (result.status !== 'fulfilled') {
        console.error(`Failed to fetch data for ${result.reason.message}`);
        continue;
      }

      const { data, category: baseCategory } = result.value;

      const filteredItems = data.filter(item => item.buy?.[0]?.price > 0);

      const grouped = filteredItems.reduce((acc, item) => {
        const category = item.category || baseCategory;
        if (!acc[category]) acc[category] = [];
        acc[category].push(item);
        return acc;
      }, {});

      for (const category in grouped) {
        const items = grouped[category];
        if (items.length < 20) {
          console.log(`Skipping category "${category}" (less than 20 items)`);
          continue;
        }

        const selected = getRandomItems(items, 20);
        selected.forEach(item => {
          const name = item.name;
          const price = item.buy?.[0]?.price || 0;
          const image_url = item.variations?.[0]?.image_url || '';

          const query = `INSERT INTO items (name, price, image_url, category) VALUES (?, ?, ?, ?)`;

          const insertPromise = new Promise(resolve => {
            const timeout = setTimeout(() => {
              console.error(`Insert timed out for item: ${name}`);
              resolve();
            }, 5000);

            db.query(query, [name, price, image_url, category], (err) => {
              clearTimeout(timeout);
              if (err) {
                console.error(`Error inserting "${name}":`, err.code || err.message);
              }
              resolve();
            });
          });

          insertPromises.push(insertPromise);
        });
      }
    }

    console.log(`Inserting ${insertPromises.length} items into MySQL...`);
    await Promise.all(insertPromises);
    console.log("Items successfully imported into the database!");

  } catch (err) {
    console.error('Import error:', err.message);
    process.exit(1);
  } finally {
    db.end();
  }
}

function getRandomItems(items, count) {
  return items.sort(() => 0.5 - Math.random()).slice(0, count);
}

importData();