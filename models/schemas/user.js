var bcrypt = require('bcrypt');
var sequelize = require('../model.js').sequelize;
var Sequelize = require('sequelize');

var User = module.exports = sequelize.define('users', {
    username: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        unique: false,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        unique: false,
        allowNull: false,
    },
    token: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    admin:{
        type:Sequelize.BOOLEAN,
        unique:false,
        allowNull:true
    }
}, {
    hooks: {
      beforeCreate: (user) => {
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(user.password, salt);
      }
    }
});

User.prototype.validPassword = function (password) {
return bcrypt.compareSync(password, this.password);
};

User.prototype.updatePassword = function (currpass, newpass) {
    if( bcrypt.compareSync(currpass, this.password) )
    {
        const salt = bcrypt.genSaltSync();
        this.password = bcrypt.hashSync(newpass, salt);
        this.save();
        return 1;
    }
    else return 0;
};

User.prototype.setToken = function (token) {
    this.set('token', token);
    this.save();
};
