const { Shop } = require('../models'); // Import the Shop model

module.exports = {
  // Create a new shop
  async create(req, res) {
    try {
      const shop = await Shop.create(req.body);
      return res.status(201).json(shop);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  // Get a single shop by ID
  async getById(req, res) {
    try {
      const shop = await Shop.findByPk(req.params.id);
      if (!shop) {
        return res.status(404).json({ error: 'Shop not found' });
      }
      return res.status(200).json(shop);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  // Get all shops
  async getAll(req, res) {
    try {
      const shops = await Shop.findAll();
      return res.status(200).json(shops);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  // Update a shop by ID
  async update(req, res) {
    try {
      const shop = await Shop.findByPk(req.params.id);
      if (!shop) {
        return res.status(404).json({ error: 'Shop not found' });
      }
      await shop.update(req.body);
      return res.status(200).json(shop);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  // Delete a shop by ID
  async delete(req, res) {
    try {
      const shop = await Shop.findByPk(req.params.id);
      if (!shop) {
        return res.status(404).json({ error: 'Shop not found' });
      }
      await shop.destroy();
      return res.status(204).json();
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
};