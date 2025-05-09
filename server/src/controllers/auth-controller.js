const authService = require('../services/auth-service');

exports.signup = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  try {
    await authService.signup(email, password);
    res.status(201).json({ message: 'Signup successful. You can now log in.' });
  } catch (err) {
    res.status(err.message === 'Email already registered.' ? 409 : 500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password, localCart = [], localLiked = [] } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  try {
    const token = await authService.login(email, password, localCart, localLiked);
    res.status(200).json({ message: 'Login successful.', token });
  } catch (err) {
    res.status(err.message === 'Invalid email or password.' ? 401 : 500).json({ error: err.message });
  }
};