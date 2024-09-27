const express = require('express');
const authenticateToken = require('../middleware/authmiddleware');
const router = express.Router({ mergeParams: true });
const productController = require('../controllers/productController')
router.post('/create', authenticateToken, productController.createProductForShop);
router.get('/:shopId/products', authenticateToken, productController.getProductsForShop);
router.get('/:shopId/products/:productId', authenticateToken, productController.getProductById);
router.put('/:shopId/products/:productId', authenticateToken, productController.updateProduct);
router.delete('/:shopId/products/:productId', authenticateToken, productController.deleteProduct);
module.exports = router;