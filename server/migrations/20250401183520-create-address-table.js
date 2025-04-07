'use strict';
const  { DataTypes } = require('sequelize') ;
const { v4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('addresses', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: v4(),
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'users', 
          key: 'id'    
        },
        onUpdate: 'CASCADE', 
        onDelete: 'CASCADE'
      },
      address: {
        type: Sequelize.STRING,
        allowNull: true
      },
      house_number: {
        type: Sequelize.STRING,
        allowNull: true
      },
      city: {
        type: Sequelize.STRING,
        allowNull: true
      },
      state: {
        type: Sequelize.STRING,
        allowNull: true
      },
      postcode: {
        type: Sequelize.STRING,
        allowNull: true
      },
      location: {
        type: Sequelize.GEOMETRY('POINT'),
        allowNull: false
      },
      notes:{
        type: Sequelize.STRING,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  

  async down (queryInterface, Sequelize) {
    
     await queryInterface.dropTable('addresses');
     
  }
};
