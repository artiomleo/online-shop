var express = require('express');
var Model = require('../models/model.js').Model;
var router = module.exports = express.Router();
var Sequelize = require('sequelize');
var config = require('../config.json');
var sequelize = new Sequelize(config.database, { query: { raw: true } });
const Op = Sequelize.Op;
var sessionUser;
var randomstring = require("randomstring");


String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};

function sessionChecker(request, response) {
    return new Promise(function (resolve, reject) {
        if (!request.headers.token) {
            response.status(401);
            response.end();
            resolve(0);
        }
        var token = request.headers.token;
        return Model.User.findOne({ where: { token: token } }).then(function (user) {
            if (user) {
                sessionUser = user;
                resolve(1);
            }
            else {
                response.status(401);
                response.end();
                resolve(0);
            }
        });
    });
}

    router.route('/getUser')
    .post((req, res, ) => {
        var username = req.body.username;
        if (req.body) {
            Model.User.findOne({ where: {username: username}
            }).then(result => {
                if(result !==null) {
                    console.log("Not Null");
                    
                res.status(200);
                res.send(result);
                console.log(JSON.stringify(result));
                }
                else res.status(400).end();
            });
        } else {
            res.status(400).end();
        }
    })

router.route('/getUsers')
    .get((req, res, ) => {
        if (req.body) {
            Model.User.findAll({
            }).then(result => {
                res.status(200);
                res.send(result);
                console.log(JSON.stringify(result));
            });
        } else {
            res.status(400).end();
        }
    })


router.route('/login')
    .post((req, res) => {
        var username = req.body.username,
            password = req.body.password;
        Model.User.findOne({ where: { username: username } }).then(function (user) {
            if (!user) {
                res.status(401);
                res.end(`{"message":"invalid user"}`);
            } else if (!user.validPassword(password)) {
                res.status(401);
                res.end(`{"message":"invalid password"}`);
            } else {
                var token = randomstring.generate(60);
                user.setToken(token);
                res.status(200);
                res.end(`{"message":"succes","token":"${token}"}`);
            }
        });

    });

router.route('/register')
    .post((req, res, next) => {
        var register = req.body;
        if (register.username == undefined || register.password == undefined) {
            res.status(400).end();
            return next();
        }
        Model.User.create({
            name: register.name,
            username: register.username,
            email: register.email,
            password: register.password,
            admin: register.admin

        },
            {
                where: { id: register.id }
            }
        );
        res.status(200).end();
    });


router.route('/update')
    .post((req, res, next) => {
        var register = req.body;
        if (register.username == undefined ) {
            res.status(400).end();
            return next();
        }
        Model.User.update({
            name: register.name,
            username: register.username,
            email: register.email,
            password: register.password,
            admin: register.admin

        },
            {
                where: { id: register.id }
            }
        );
        res.status(200).end();
    });

router.route('/checkPermision')
    .get((req,res)=>{
        var headers = req.headers
        console.log(headers.token)
        Model.User.findOne({
            where:{token:headers.token,admin:true}
        }).then(result=>{
            console.log(result)
            if(result)
                res.status(200).end()
            else    
                res.status(400).end()
        })
    })