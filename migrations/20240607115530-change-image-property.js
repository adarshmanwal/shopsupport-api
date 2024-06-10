module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Temporarily rename the existing column
    await queryInterface.renameColumn('Shops', 'images', 'images_temp');
    
    // Add the new column with the desired type
    await queryInterface.addColumn('Shops', 'images', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    
    // Copy data from the old column to the new column
    await queryInterface.sequelize.query(`
      UPDATE "Shops"
      SET "images" = "images_temp"[1] -- Assuming you want the first element of the array
    `);
    
    // Remove the temporary column
    await queryInterface.removeColumn('Shops', 'images_temp');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Shops', 'images_temp', {
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: true,
    });
    
    await queryInterface.sequelize.query(`
      UPDATE "Shops"
      SET "images_temp" = ARRAY["images"]
    `);

    await queryInterface.removeColumn('Shops', 'images');
    
    await queryInterface.renameColumn('Shops', 'images_temp', 'images');
  }
};