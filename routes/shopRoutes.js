const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const shopController = require('../controllers/shopController'); // Import shop controller
const { promisify } = require('util'); // Import promisify from util module
const multer = require('multer');
const path = require('path');
const productRoutes = require('./shopProductRoutes');
const authenticateToken = require('../middleware/authmiddleware')

// Set up Multer storage and file handling
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '/home/adarsh/workspace/anguler/ShopSupport/src/assets/'); // Directory to save the uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Use a unique filename
  },
});

const upload = multer({ storage: storage }).array('images', 10);
const uploadAsync = promisify(upload); // Promisify multer's async function

// Define shop routes
router.post('/', authenticateToken, shopController.create);
router.get('/:id', authenticateToken, shopController.getById);
router.get('/', authenticateToken, shopController.getAll);
router.put('/:id', authenticateToken, shopController.update);
router.delete('/:id', authenticateToken, shopController.delete);
router.use('/:shopId/product', authenticateToken, productRoutes);
router.post('/upload', authenticateToken, async (req, res) => {
  try {
    await uploadAsync(req, res); // Handle file upload

    // Extract filenames from req.files
    const fileNames = req.files.map(file => file.filename);
    res.status(200).json(fileNames);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
