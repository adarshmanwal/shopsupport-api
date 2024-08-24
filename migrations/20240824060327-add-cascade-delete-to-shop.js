'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.removeConstraint('Shops', 'Shops_owner_fkey');

    // Add the new foreign key constraint with ON DELETE CASCADE
    await queryInterface.addConstraint('Shops', {
      fields: ['owner'],  // The foreign key column in Shops
      type: 'foreign key',
      name: 'Shops_owner_fkey',  // Name of the foreign key constraint
      references: {
        table: 'Users',  // The referenced table
        field: 'id',  // The referenced column
      },
      onDelete: 'CASCADE',  // Enable cascade delete
      onUpdate: 'CASCADE',
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeConstraint('Shops', 'Shops_owner_fkey');
    await queryInterface.addConstraint('Shops', {
      fields: ['owner'],
      type: 'foreign key',
      name: 'Shops_owner_fkey',
      references: {
        table: 'Users',
        field: 'id',
      },
      onDelete: 'RESTRICT',  // Or the original behavior before the change
      onUpdate: 'CASCADE',
    });
  }
};
