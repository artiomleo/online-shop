var sequelize = require('../model.js').sequelize;
var Sequelize = require('sequelize');

var Product = module.exports = sequelize.define('product', {
    name: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    shortDescription:{
        type: Sequelize.STRING,
        unique: false,
        allowNull: false
    },
    description: {
        type: Sequelize.JSON,
        unique: false,
        allowNull: false
    },
    image: {
        type: Sequelize.STRING,
        unique: false,
        allowNull: false
    },
    pdf: {
        type: Sequelize.JSON,
        unique: false,
        allowNull: false,
    },
    category:{
        type: Sequelize.STRING,
        unique: false,
        allowNull: false,
    },
    subCategory:{
        type: Sequelize.STRING,
        unique: false,
        allowNull: false,
    },
    price:{
        type:Sequelize.DOUBLE,
        unique:false,
        allowNull:true
    },
});
