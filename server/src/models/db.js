require('dotenv').config();
const mysql = require('mysql2/promise');

let pool;

async function connectDB() {
  try {
    if (!pool) {
      pool = mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: 'nooks_cranny',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
      });
      console.log('Database connection pool created');
    }

    return pool;
  } catch (err) {
    console.error('Database connection error:', err);
    process.exit(1);
  }
}

module.exports = connectDB;