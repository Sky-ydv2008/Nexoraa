const jwt = require('jsonwebtoken');
const storage = require('../services/storage');

const JWT_SECRET = process.env.JWT_SECRET || 'nexoraa_quantum_secure_jwt_secret_key_2026_prod';

const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, error: 'Access denied. No token provided.' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);

    const admin = await storage.findAdminById(decoded.id);
    if (!admin) {
      return res.status(401).json({ success: false, error: 'Invalid or expired session. User not found.' });
    }

    req.admin = {
      id: admin._id || admin.id,
      email: admin.email,
      username: admin.username,
      role: admin.role
    };

    next();
  } catch (err) {
    return res.status(401).json({ success: false, error: 'Authentication failed. Invalid token.' });
  }
};

const requireRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.admin || !allowedRoles.includes(req.admin.role)) {
      return res.status(403).json({ success: false, error: 'Forbidden: Insufficient permissions.' });
    }
    next();
  };
};

module.exports = { verifyToken, requireRole };
