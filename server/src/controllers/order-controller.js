const orderService = require('../services/order-service');

exports.placeOrder = async (req, res) => {
  const userId = req.user.id;

  try {
    const orderId = await orderService.placeOrder(userId);
    res.json({ success: true, orderId });
  } catch (err) {
    res.status(400).json({ error: err.message || 'Error placing order' });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await orderService.getOrders();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching orders' });
  }
};

exports.deleteOrder = async (req, res) => {
  const { id } = req.params;

  try {
    await orderService.deleteOrder(id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting order' });
  }
};

exports.updateOrder = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    await orderService.updateOrder(id, status);
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message || 'Error updating order status' });
  }
};