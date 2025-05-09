const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order-controller');
const tokenAuth = require('../middlewares/token-auth');
const adminAuth = require('../middlewares/admin-auth');

router.post('/', tokenAuth, orderController.placeOrder);
router.get('/', tokenAuth, orderController.getOrders);
router.put('/:id/status', adminAuth, orderController.updateOrder);
router.delete('/:id', adminAuth, orderController.deleteOrder);

module.exports = router;