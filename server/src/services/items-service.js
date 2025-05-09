const connectDB = require('../models/db');

const getItems = async (category, search) => {
  let query = 'SELECT * FROM items';
  let params = [];

  if (category && search) {
    query += ' WHERE category = ? AND name LIKE ?';
    params.push(category, `%${search}%`);
  } else if (category) {
    query += ' WHERE category = ?';
    params.push(category);
  } else if (search) {
    query += ' WHERE name LIKE ?';
    params.push(`%${search}%`);
  }

  const pool = await connectDB();
  const [rows] = await pool.query(query, params);
  return rows;
};

const addItem = async (name, price, category, image_url) => {
  const pool = await connectDB();
  await pool.query('INSERT INTO items (name, price, category, image_url) VALUES (?, ?, ?, ?)', [name, price, category, image_url]);
};

const updateItem = async (id, name, price, category, image_url) => {
  const pool = await connectDB();
  await pool.query('UPDATE items SET name = ?, price = ?, category = ?, image_url = ? WHERE id = ?', [name, price, category, image_url, id]);
};

const deleteItem = async (id) => {
  const pool = await connectDB();
  await pool.query('DELETE FROM items WHERE id = ?', [id]);
};

module.exports = {
  getItems,
  addItem,
  updateItem,
  deleteItem
};