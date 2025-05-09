const checkoutService = require('../services/checkout-service');

exports.createOrder = async (req, res) => {
  const userId = req.user.id;

  try {
    const orderId = await checkoutService.createOrder(userId);
    res.json({ success: true, orderId });
  } catch (err) {
    res.status(err.message === 'Cart is empty.' ? 400 : 500).json({ error: err.message });
  }
};

exports.getOrders = async (req, res) => {
  const userId = req.user.id;

  try {
    const orders = await checkoutService.getOrders(userId);
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching order history.' });
  }
};