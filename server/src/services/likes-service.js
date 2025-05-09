const connectDB = require('../models/db');

const getLikedItems = async (userId) => {
  const pool = await connectDB();
  const query = `
    SELECT ul.item_id AS id, i.name, i.price, i.image_url, i.category
    FROM user_likes ul
    JOIN items i ON ul.item_id = i.id
    WHERE ul.user_id = ?
  `;
  const [results] = await pool.query(query, [userId]);
  return results;
};

const addLike = async (userId, itemId) => {
  const pool = await connectDB();
  await pool.query('INSERT IGNORE INTO user_likes (user_id, item_id) VALUES (?, ?)', [userId, itemId]);
};

const removeLike = async (userId, itemId) => {
  const pool = await connectDB();
  await pool.query('DELETE FROM user_likes WHERE user_id = ? AND item_id = ?', [userId, itemId]);
};

module.exports = {
  getLikedItems,
  addLike,
  removeLike
};