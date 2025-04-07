'use strict';
const  { DataTypes } = require('sequelize') ;
const { v4 } = require('uuid');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.createTable('files', {
        id: {
               allowNull: false,
               primaryKey: true,
               type: DataTypes.UUID,
               defaultValue:  v4(),
             },
             filename: {
               type: Sequelize.STRING,
               allowNull: false
             },
             path: {
               type: Sequelize.STRING,
               allowNull: false,
               unique: true
             },
             createdAt: {
              allowNull: false,
              type: Sequelize.DATE
            },
            updatedAt: {
              allowNull: false,
              type: Sequelize.DATE
            }
            })
  },

  async down (queryInterface, Sequelize) {
    
     await queryInterface.dropTable('files');
     
  }
};
