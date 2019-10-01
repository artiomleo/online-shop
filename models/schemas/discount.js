var sequelize = require('../model.js').sequelize;
var Sequelize = require('sequelize');

var Discount = module.exports = sequelize.define('discount', {
    productId: {
        type: Sequelize.INTEGER,
        unique: false,
        allowNull: false
    },
    clientId: {
        type: Sequelize.INTEGER,
        unique: false,
        allowNull: false
    },
    value: {
        type: Sequelize.DOUBLE,
        unique: false,
        allowNull: false
    }
});
