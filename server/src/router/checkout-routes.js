const express = require('express');
const router = express.Router();
const checkoutController = require('../controllers/checkout-controller');
const tokenAuth = require('../middlewares/token-auth');

router.post('/checkout', tokenAuth, checkoutController.createOrder);
router.get('/history', tokenAuth, checkoutController.getOrders);

module.exports = router;