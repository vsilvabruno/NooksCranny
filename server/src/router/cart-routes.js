const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart-controller');
const tokenAuth = require('../middlewares/token-auth');

router.get('/', tokenAuth, cartController.getCart);
router.post('/', tokenAuth, cartController.addToCart);
router.post('/clear', tokenAuth, cartController.clearCart);
router.put('/:itemId', tokenAuth, cartController.updateCartItem);
router.delete('/:itemId', tokenAuth, cartController.removeCartItem);

module.exports = router;