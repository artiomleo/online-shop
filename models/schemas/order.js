var bcrypt = require('bcrypt');
var sequelize = require('../model.js').sequelize;
var Sequelize = require('sequelize');

var Order = module.exports = sequelize.define('order', {
    orderId: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    userId: {
        type: Sequelize.STRING,
        allowNull: false
    }
});
