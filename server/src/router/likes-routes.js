const express = require('express');
const router = express.Router();
const likesController = require('../controllers/likes-controller');
const tokenAuth = require('../middlewares/token-auth');

router.get('/', tokenAuth, likesController.getLikedItems);
router.post('/', tokenAuth, likesController.addLike);
router.delete('/:itemId', tokenAuth, likesController.removeLike);

module.exports = router;