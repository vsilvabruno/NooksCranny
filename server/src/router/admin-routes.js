const express = require('express');
const router = express.Router();
const adminAuth = require('../middlewares/admin-auth');

router.get('/check', adminAuth, (req, res) => {
  res.status(200).json({ message: 'Access granted' });
});

module.exports = router;