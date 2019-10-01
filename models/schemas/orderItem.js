var bcrypt = require("bcrypt");
var sequelize = require("../model.js").sequelize;
var Sequelize = require("sequelize");

var OrderItem = (module.exports = sequelize.define("orderitem", {
  orderId: {
    type: Sequelize.STRING,
    unique: false,
    allowNull: false
  },
  productId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    unique: false
  },
  productName:{
    type :Sequelize.STRING,
    allowNull:false,
    unique:false
  },
  price: {
    type: Sequelize.DOUBLE,
    unique: false,
    allowNull: true
  },
  discount: {
    type: Sequelize.DOUBLE,
    allowNull: false,
    unique: false
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    unique: false
  },
  quantity:{
    type: Sequelize.INTEGER,
    allowNull: false,
    unique: false
  }
}));
