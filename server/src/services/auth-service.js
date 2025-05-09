const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const connectDB = require('../models/db');

const JWT_SECRET = process.env.JWT_SECRET;

const signup = async (email, password) => {
  if (!validator.isEmail(email)) {
    throw new Error('Invalid email format.');
  }

  if (!validator.isStrongPassword(password, { minLength: 6, minUppercase: 0, minNumbers: 1, minSymbols: 0 })) {
    throw new Error('Password must be at least 6 characters and include letters and numbers.');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const pool = await connectDB();
  
  try {
    await pool.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword]);
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      throw new Error('Email already registered.');
    }
    throw new Error('Internal server error.');
  }
};

const login = async (email, password, localCart, localLiked) => {
  if (!validator.isEmail(email)) {
    throw new Error('Invalid email format.');
  }

  const pool = await connectDB();
  const [results] = await pool.query('SELECT * FROM users WHERE email = ? LIMIT 1', [email]);
  if (results.length === 0) {
    throw new Error('Invalid email or password.');
  }

  const user = results[0];
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid email or password.');
  }

  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1d' });

  for (const item of localCart) {
    const [rows] = await pool.query('SELECT quantity FROM user_carts WHERE user_id = ? AND item_id = ?', [user.id, item.id]);
    if (rows.length > 0) {
      await pool.query('UPDATE user_carts SET quantity = quantity + ? WHERE user_id = ? AND item_id = ?', [item.quantity, user.id, item.id]);
    } else {
      await pool.query('INSERT INTO user_carts (user_id, item_id, quantity) VALUES (?, ?, ?)', [user.id, item.id, item.quantity]);
    }
  }

  for (const itemId of localLiked) {
    await pool.query('INSERT IGNORE INTO user_likes (user_id, item_id) VALUES (?, ?)', [user.id, itemId]);
  }

  return token;
};

module.exports = {
  signup,
  login
};