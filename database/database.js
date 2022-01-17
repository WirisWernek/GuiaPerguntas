const Sequelize = require('sequelize');

const connection = new Sequelize('guia_perguntas', 'wiris', '1+1Wiris1+1', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;