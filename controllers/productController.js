const { Product } = require('../models'); // Import the Product model
const { Shop } = require('../models'); // Import the Shop model (if needed)
const productController = {
  // Create a new product for a shop
  createProductForShop: async (req, res) => {
    const { shopId } = req.params; // Get the shopId from the request parameters
    const { name, description, rating, price } = req.body; // Get product details from the request body
    try {
      // Check if the shop exists
      const shop = await Shop.findByPk(shopId);
      if (!shop) {
        return res.status(404).json({ error: 'Shop not found' });
      }
      // Create the product
      const product = await Product.create({
        name,
        description,
        rating,
        price,
        shopId: shopId, // Associate product with the shop
      });
      res.status(201).json(product); // Respond with the created product
    } catch (error) {
      res.status(500).json({ error: 'Failed to create product' });
    }
  },
  // Get all products for a shop
  getProductsForShop: async (req, res) => {
    const { shopId } = req.params;
    try {
      const products = await Product.findAll({
        where: { shopId: shopId }, // Fetch products associated with the shopId
      });
      res.status(200).json(products); // Respond with the list of products
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch products' });
    }
  },
  // Get a specific product by ID
  getProductById: async (req, res) => {
    const { shopId, productId } = req.params;
    try {
      const product = await Product.findOne({
        where: { id: productId, shopId: shopId }, // Ensure product belongs to the specified shop
      });
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.status(200).json(product); // Respond with the product
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch product' });
    }
  },
  // Update a product
  updateProduct: async (req, res) => {
    const { shopId, productId } = req.params;
    const { name, description, rating, images, price } = req.body;
    try {
      const product = await Product.findOne({
        where: { id: productId, shopId: shopId }, // Ensure product belongs to the specified shop
      });
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      // Update product details
      await product.update({
        name,
        description,
        rating,
        images,
        price,
      });
      res.status(200).json(product); // Respond with the updated product
    } catch (error) {
      res.status(500).json({ error: 'Failed to update product' });
    }
  },
  // Delete a product
  deleteProduct: async (req, res) => {
    const { shopId, productId } = req.params;
    try {
      const product = await Product.findOne({
        where: { id: productId, shopId: shopId }, // Ensure product belongs to the specified shop
      });
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      await product.destroy(); // Delete the product
      res.status(204).send(); // Respond with no content
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete product' });
    }
  },
};
module.exports = productController;