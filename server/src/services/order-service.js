const connectDB = require('../models/db');

const placeOrder = async (userId) => {
  const pool = await connectDB();
  const [cartItems] = await pool.query(
    'SELECT item_id, quantity FROM user_carts WHERE user_id = ?',
    [userId]
  );

  if (cartItems.length === 0) {
    throw new Error('Cart is empty');
  }

  const [orderResult] = await pool.query(
    'INSERT INTO orders (user_id, status) VALUES (?, ?)',
    [userId, 'pending']
  );

  const orderId = orderResult.insertId;
  const insertItems = cartItems.map(item => [
    orderId,
    item.item_id,
    item.quantity
  ]);

  await pool.query(
    'INSERT INTO order_items (order_id, item_id, quantity) VALUES ?',
    [insertItems]
  );

  await pool.query('DELETE FROM user_carts WHERE user_id = ?', [userId]);

  return orderId;
};

const getOrders = async () => {
  const pool = await connectDB();
  const [orders] = await pool.query(
    `SELECT o.id AS order_id, o.created_at, o.status, i.name, i.price, i.image_url, oi.quantity, o.user_id, u.email
     FROM orders o
     JOIN order_items oi ON o.id = oi.order_id
     JOIN items i ON oi.item_id = i.id
     JOIN users u ON o.user_id = u.id
     ORDER BY o.created_at DESC`
  );

  const grouped = {};
  orders.forEach(row => {
    const { order_id, created_at, status, name, price, image_url, quantity, user_id, email } = row;

    if (!grouped[order_id]) {
      grouped[order_id] = {
        order_id,
        created_at,
        status,
        user_id,
        email,
        items: []
      };
    }

    grouped[order_id].items.push({
      name,
      price,
      image_url,
      quantity
    });
  });

  return Object.values(grouped);
};

const deleteOrder = async (orderId) => {
  const pool = await connectDB();
  await pool.query('DELETE FROM order_items WHERE order_id = ?', [orderId]);
  await pool.query('DELETE FROM orders WHERE id = ?', [orderId]);
};

const updateOrder = async (orderId, status) => {
  const pool = await connectDB();
  const validStatuses = ['pending', 'shipped', 'completed'];
  
  if (!validStatuses.includes(status)) {
    throw new Error('Invalid order status');
  }

  await pool.query('UPDATE orders SET status = ? WHERE id = ?', [status, orderId]);
};

module.exports = {
  placeOrder,
  getOrders,
  deleteOrder,
  updateOrder
};