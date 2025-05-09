require('dotenv').config();
const connectDB = require('../models/db');
const bcrypt = require('bcryptjs');

async function setupTables() {
  const db = await connectDB();

  try {
    const createUsersTable = `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL
      );
    `;

    const createItemsTable = `
      CREATE TABLE IF NOT EXISTS items (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        price INT NOT NULL,
        image_url VARCHAR(255),
        category VARCHAR(255) NOT NULL
      );
    `;

    const createUserCartsTable = `
      CREATE TABLE IF NOT EXISTS user_carts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        item_id INT NOT NULL,
        quantity INT DEFAULT 1,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (item_id) REFERENCES items(id)
      );
    `;

    const createUserLikesTable = `
      CREATE TABLE IF NOT EXISTS user_likes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        item_id INT NOT NULL,
        UNIQUE KEY unique_like (user_id, item_id),
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (item_id) REFERENCES items(id)
      );
    `;

    const createOrdersTable = `
      CREATE TABLE IF NOT EXISTS orders (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        status ENUM('pending', 'shipped', 'completed') DEFAULT 'pending',
        FOREIGN KEY (user_id) REFERENCES users(id)
      );
    `;

    const createOrderItemsTable = `
      CREATE TABLE IF NOT EXISTS order_items (
        id INT AUTO_INCREMENT PRIMARY KEY,
        order_id INT NOT NULL,
        item_id INT NOT NULL,
        quantity INT NOT NULL,
        FOREIGN KEY (order_id) REFERENCES orders(id),
        FOREIGN KEY (item_id) REFERENCES items(id)
      );
    `;

    await db.query(createUsersTable);
    await db.query(createItemsTable);
    await db.query(createUserCartsTable);
    await db.query(createUserLikesTable);
    await db.query(createOrdersTable);
    await db.query(createOrderItemsTable);

    const hashedPassword = await bcrypt.hash('admin', 10);

    const insertTomNookUser = `
      INSERT INTO users (id, email, password) 
      VALUES (1, 'tomnook@bell.ac', ?)
      ON DUPLICATE KEY UPDATE email = 'tomnook@bell.ac', password = ?;
    `;
    
    await db.query(insertTomNookUser, [hashedPassword, hashedPassword]);

    console.log('All tables created successfully and Tom Nook user added!');
  } catch (err) {
    console.error('Error creating tables:', err);
    process.exit(1);
  } finally {
    db.end();
  }
}

setupTables();