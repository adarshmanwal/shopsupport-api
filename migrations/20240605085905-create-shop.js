'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Shops', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false
      },
      city: {
        type: Sequelize.STRING,
        allowNull: false
      },
      state: {
        type: Sequelize.STRING,
        allowNull: false
      },
      country: {
        type: Sequelize.STRING,
        allowNull: false
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      openingHours: {
        type: Sequelize.TIME,
        allowNull: false
      },
      closingHours: {
        type: Sequelize.TIME,
        allowNull: false
      },
      category: {
        type: Sequelize.ENUM(
          'Grocery Store',
          'Clothing Boutique',
          'Electronics Store',
          'Bookstore',
          'Furniture Store',
          'Toy Store',
          'Jewelry Store',
          'Pharmacy',
          'Hardware Store',
          'Pet Store',
          'Sporting Goods Store',
          'Beauty Supply Store',
          'Home Decor Store',
          'Garden Center',
          'Automotive Parts Store',
          'Health and Wellness Store',
          'Footwear Store',
          'Stationery Store',
          'Gift Shop',
          'Music Store',
          'Art Supplies Store',
          'Bicycle Shop',
          'Convenience Store',
          'Vintage/Thrift Store',
          'Specialty Food Store',
          'Tech Accessories Store',
          'Outdoor Equipment Store',
          'Craft Store',
          'Wine and Spirits Store',
          'Children\'s Clothing Store',
          'Comic Book Store',
          'Hobby Shop',
          'Party Supplies Store',
          'Ethnic Grocery Store',
          'Mobile Phone Store',
          'Cosmetics Store',
          'Boutique Store',
          'Department Store',
          'Supermarket',
          'Discount Store'
        ),
        allowNull: false
      },
      rating: {
        type: Sequelize.FLOAT,
        allowNull: true,
        defaultValue: 0
      },
      images: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true
      },
      owner: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users', // Name of the users table
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Shops');
    await queryInterface.sequelize.query('DROP TYPE "enum_Shops_category";');
  }
};
