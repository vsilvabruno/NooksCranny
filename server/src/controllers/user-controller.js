const userService = require('../services/user-service');

exports.mergeGuestData = async (req, res) => {
  const userId = req.user.id;
  const { cart, likes } = req.body;

  try {
    await userService.mergeGuestData(userId, cart, likes);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Error merging guest data.' });
  }
};

exports.getUserDetails = async (req, res) => {
  try {
    const users = await userService.getUserDetails();
    if (users.length === 0) {
      return res.status(404).json({ error: 'No users found.' });
    }
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Error retrieving users.' });
  }
};

exports.updateUserDetails = async (req, res) => {
  const userId = req.params.id;
  const { username, password } = req.body;

  try {
    await userService.updateUserDetails(userId, username, password);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Error updating user details.' });
  }
};

exports.deleteUserAccount = async (req, res) => {
  const userId = req.params.id;

  try {
    await userService.deleteUserAccount(userId);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting user account.' });
  }
};