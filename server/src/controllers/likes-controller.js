const likesService = require('../services/likes-service');

exports.getLikedItems = async (req, res) => {
  const userId = req.user.id;

  try {
    const likedItems = await likesService.getLikedItems(userId);
    res.json(likedItems);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching liked items' });
  }
};

exports.addLike = async (req, res) => {
  const userId = req.user.id;
  const { itemId } = req.body;

  try {
    await likesService.addLike(userId, itemId);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Error adding like.' });
  }
};

exports.removeLike = async (req, res) => {
  const userId = req.user.id;
  const itemId = req.params.itemId;

  try {
    await likesService.removeLike(userId, itemId);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Error removing like.' });
  }
};