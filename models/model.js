var Sequelize = require('sequelize');
var bcrypt = require('bcrypt');
var config = require('../config.json');
var sequelize = module.exports.sequelize = new Sequelize(config.database, {logging: false});
var Model = module.exports.Model = {};

Model.User = require('./schemas/user.js');
Model.Product = require('./schemas/product.js');
Model.Discount = require('./schemas/discount.js');
Model.Order = require('./schemas/order.js');
Model.OrderItem = require('./schemas/orderItem.js');
//Model.Service = require('./schemas/service.js');
//Model.Patients = require('./schemas/patients.js');

//Model.Appointment.belongsTo(Model.Employee, {foreignKey: 'employeename', targetKey: 'name'});
//Model.Appointment.belongsTo(Model.Service, {foreignKey: 'servicename', targetKey: 'name'});

sequelize.sync().catch(error => console.log('This error occured', error));
