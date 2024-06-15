const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const shopController = require('../controllers/shopController'); // Import shop controller

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

// Define shop routes
router.post('/', authenticateToken, shopController.create);
router.get('/:id', authenticateToken, shopController.getById);
router.get('/', authenticateToken, shopController.getAll);
router.put('/:id', authenticateToken, shopController.update);
router.delete('/:id', authenticateToken, shopController.delete);

module.exports = router;
