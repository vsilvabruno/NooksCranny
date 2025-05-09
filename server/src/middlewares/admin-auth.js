const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

function adminAuth(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid or expired token.' });
    }

    if (user.email !== 'tomnook@bell.ac') {
      return res.status(403).json({ error: 'Access denied. Admins only.' });
    }

    req.user = user;
    next();
  });
}

module.exports = adminAuth;