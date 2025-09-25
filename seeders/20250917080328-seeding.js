'use strict';

const path = require('path');
const fs = require('fs')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   const animes= path.resolve(__dirname, '../data.json');
   const parse = JSON.parse(fs.readFileSync(animes), 'utf8');
   const now = new Date();
   const anime = parse.map(el => ({
    ...el,
    createdAt: now,
    updatedAt: now
   }));
   await queryInterface.bulkInsert('Anime', anime)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Anime', null, {});
  }
};
