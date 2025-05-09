const express = require('express');
const router = express.Router();
const userController = require('../controllers/user-controller');
const tokenAuth = require('../middlewares/token-auth');
const adminAuth = require('../middlewares/admin-auth');

router.post('/merge-data', tokenAuth, userController.mergeGuestData);
router.get('/', tokenAuth, userController.getUserDetails);
router.put('/:id', adminAuth, userController.updateUserDetails);
router.delete('/:id', adminAuth, userController.deleteUserAccount);

module.exports = router;