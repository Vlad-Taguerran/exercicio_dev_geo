'use strict';
const { v4: uuidv4 } = require('uuid');

const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  
      const existing = await queryInterface.rawSelect('users', {
        where: {
          email: 'teste1@tester.com'
        }
      }, ['id']);
  
      if (existing) {
        console.log('Usuário já existe. Seed não executado.');
        return;
      }
      
      await queryInterface.bulkInsert('users', [{
        id: uuidv4(),
        name: 'Usuário Teste 1',
        email: 'teste1@tester.com',
        password: bcrypt.hashSync('senha123', 10),
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
    
  },

  async down (queryInterface, Sequelize) {
  
    await queryInterface.bulkDelete('users', {
      email: { [Sequelize.Op.in]: ['teste1@tester.com'] }
    }, {});
   
  }
};
