const connectDB = require('../models/db');

const mergeGuestData = async (userId, cart, likes) => {
  const pool = await connectDB();
  for (const item of cart) {
    const [existing] = await pool.query('SELECT quantity FROM user_carts WHERE user_id = ? AND item_id = ?', [userId, item.id]);
    if (existing.length > 0) {
      await pool.query('UPDATE user_carts SET quantity = quantity + ? WHERE user_id = ? AND item_id = ?', [item.quantity, userId, item.id]);
    } else {
      await pool.query('INSERT INTO user_carts (user_id, item_id, quantity) VALUES (?, ?, ?)', [userId, item.id, item.quantity]);
    }
  }
  for (const item of likes) {
    const [existing] = await pool.query('SELECT * FROM user_likes WHERE user_id = ? AND item_id = ?', [userId, item.id]);
    if (existing.length === 0) {
      await pool.query('INSERT INTO user_likes (user_id, item_id) VALUES (?, ?)', [userId, item.id]);
    }
  }
};

const getUserDetails = async () => {
  const pool = await connectDB();
  const [users] = await pool.query('SELECT * FROM users');
  return users;
};

const updateUserDetails = async (userId, username, password) => {
  const pool = await connectDB();
  await pool.query('UPDATE users SET username = ?, password = ? WHERE id = ?', [username, password, userId]);
};

const deleteUserAccount = async (userId) => {
  const pool = await connectDB();
  try {
    await pool.query('DELETE FROM order_items WHERE order_id IN (SELECT id FROM orders WHERE user_id = ?)', [userId]);
    await pool.query('DELETE FROM orders WHERE user_id = ?', [userId]);
    await pool.query('DELETE FROM user_carts WHERE user_id = ?', [userId]);
    await pool.query('DELETE FROM user_likes WHERE user_id = ?', [userId]);
    await pool.query('DELETE FROM users WHERE id = ?', [userId]);
  } catch (err) {
    throw new Error('Error deleting user account');
  }
};

module.exports = {
  mergeGuestData,
  getUserDetails,
  updateUserDetails,
  deleteUserAccount
};