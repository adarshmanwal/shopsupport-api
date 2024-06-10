'use strict';
module.exports = (sequelize, DataTypes) => {
  const Shop = sequelize.define('Shop', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    openingHours: {
      type: DataTypes.TIME,
      allowNull: false
    },
    closingHours: {
      type: DataTypes.TIME,
      allowNull: false
    },
    category: {
      type: DataTypes.ENUM(
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
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: 0
    },
    images: {
      type: DataTypes.STRING,
      allowNull: true
    },
    owner: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users', // Name of the users table
        key: 'id'
      }
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {});
  
  Shop.associate = function(models) {
    // associations can be defined here
    Shop.belongsTo(models.User, {
      foreignKey: 'owner',
      as: 'user'
    });
  };

  return Shop;
};
