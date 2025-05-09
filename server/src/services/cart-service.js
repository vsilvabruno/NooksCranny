const connectDB = require('../models/db');

const getCartItems = async (userId) => {
  const query = `
    SELECT uc.item_id AS id, i.name, i.price, i.image_url, uc.quantity
    FROM user_carts uc
    JOIN items i ON uc.item_id = i.id
    WHERE uc.user_id = ?
  `;
  const pool = await connectDB();
  const [results] = await pool.query(query, [userId]);
  return results;
};

const addToCart = async (userId, itemId, delta) => {
  if (isNaN(delta) || delta <= 0) {
    throw new Error('Invalid delta value');
  }

  const pool = await connectDB();
  const [results] = await pool.query('SELECT quantity FROM user_carts WHERE user_id = ? AND item_id = ?', [userId, itemId]);

  if (results.length > 0) {
    await pool.query('UPDATE user_carts SET quantity = quantity + ? WHERE user_id = ? AND item_id = ?', [delta, userId, itemId]);
  } else {
    await pool.query('INSERT INTO user_carts (user_id, item_id, quantity) VALUES (?, ?, ?)', [userId, itemId, delta]);
  }
};

const updateCartItem = async (userId, itemId, delta) => {
  const pool = await connectDB();
  const [results] = await pool.query('SELECT quantity FROM user_carts WHERE user_id = ? AND item_id = ?', [userId, itemId]);

  if (results.length > 0) {
    let newQuantity = results[0].quantity + delta;
    if (newQuantity <= 0) {
      await pool.query('DELETE FROM user_carts WHERE user_id = ? AND item_id = ?', [userId, itemId]);
    } else {
      await pool.query('UPDATE user_carts SET quantity = ? WHERE user_id = ? AND item_id = ?', [newQuantity, userId, itemId]);
    }
  } else {
    throw new Error('Item not found in cart.');
  }
};

const removeCartItem = async (userId, itemId) => {
  const pool = await connectDB();
  const [results] = await pool.query('SELECT quantity FROM user_carts WHERE user_id = ? AND item_id = ?', [userId, itemId]);

  if (results.length > 0) {
    await pool.query('DELETE FROM user_carts WHERE user_id = ? AND item_id = ?', [userId, itemId]);
  } else {
    throw new Error('Item not found in cart.');
  }
};

const clearCart = async (userId) => {
  const pool = await connectDB();
  await pool.query('DELETE FROM user_carts WHERE user_id = ?', [userId]);
};

module.exports = {
  getCartItems,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart
};