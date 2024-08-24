const express = require('express');
const { register, login, getProfile, deleteProfile } = require('../controllers/userController');
const router = express.Router();
const jwt = require('jsonwebtoken');

// Middleware to authenticate token
const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Access denied' });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid token' });
  }
};

// Register route
router.post('/register', register);

// Login route
router.post('/login', login);

//delete user
router.delete('/delete',authenticateToken, deleteProfile);

// Protected route example
router.get('/profile', authenticateToken, getProfile);

module.exports = router;
