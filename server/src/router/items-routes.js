const express = require('express');
const router = express.Router();
const itemsController = require('../controllers/items-controller');
const adminAuth = require('../middlewares/admin-auth');

router.get('/', itemsController.getItems);
router.post('/', adminAuth, itemsController.addItem);
router.put('/:id', adminAuth, itemsController.updateItem);
router.delete('/:id', adminAuth, itemsController.deleteItem);

module.exports = router;