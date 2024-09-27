const express = require('express');
const { register, login, getProfile, deleteProfile } = require('../controllers/userController');
const router = express.Router();
const authenticateToken = require('../middleware/authmiddleware')

// Register route
router.post('/register', register);

// Login route
router.post('/login', login);

//delete user
router.delete('/delete',authenticateToken, deleteProfile);

// Protected route example
router.get('/profile', authenticateToken, getProfile);

module.exports = router;
