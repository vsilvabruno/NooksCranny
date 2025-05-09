const cartService = require('../services/cart-service');

exports.getCart = async (req, res) => {
  const userId = req.user.id;

  try {
    const cartItems = await cartService.getCartItems(userId);
    res.json(cartItems);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching cart items.' });
  }
};

exports.addToCart = async (req, res) => {
  const userId = req.user.id;
  const { itemId, delta } = req.body;

  try {
    await cartService.addToCart(userId, itemId, delta);
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateCartItem = async (req, res) => {
  const userId = req.user.id;
  const itemId = req.params.itemId;
  const { delta } = req.body;

  try {
    await cartService.updateCartItem(userId, itemId, delta);
    res.json({ success: true });
  } catch (err) {
    res.status(err.message === 'Item not found in cart.' ? 404 : 500).json({ error: err.message });
  }
};

exports.removeCartItem = async (req, res) => {
  const userId = req.user.id;
  const itemId = req.params.itemId;

  try {
    await cartService.removeCartItem(userId, itemId);
    res.json({ success: true });
  } catch (err) {
    res.status(err.message === 'Item not found in cart.' ? 404 : 500).json({ error: err.message });
  }
};

exports.clearCart = async (req, res) => {
  const userId = req.user.id;

  try {
    await cartService.clearCart(userId);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Error clearing cart.' });
  }
};