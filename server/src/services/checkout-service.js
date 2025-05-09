const connectDB = require('../models/db');

const createOrder = async (userId) => {
  const pool = await connectDB();

  const [cartItems] = await pool.query('SELECT item_id, quantity FROM user_carts WHERE user_id = ?', [userId]);

  if (cartItems.length === 0) {
    throw new Error('Cart is empty.');
  }

  const [orderResult] = await pool.query('INSERT INTO orders (user_id, status) VALUES (?, ?)', [userId, 'pending']);
  const orderId = orderResult.insertId;

  const values = cartItems.map(item => [orderId, item.item_id, item.quantity]);
  await pool.query('INSERT INTO order_items (order_id, item_id, quantity) VALUES ?', [values]);

  await pool.query('DELETE FROM user_carts WHERE user_id = ?', [userId]);

  return orderId;
};

const getOrders = async (userId) => {
  const pool = await connectDB();

  const [orders] = await pool.query(`
    SELECT o.id AS order_id, o.created_at, o.status, i.name, i.price, i.image_url, oi.quantity
    FROM orders o
    JOIN order_items oi ON o.id = oi.order_id
    JOIN items i ON oi.item_id = i.id
    WHERE o.user_id = ?
    ORDER BY o.created_at DESC
  `, [userId]);

  return orders;
};

module.exports = {
  createOrder,
  getOrders
};