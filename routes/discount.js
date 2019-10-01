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
        return Model.User.findOne({ where: { token: token } })
            .then(function (user) {
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

function adminChecker(request, response) {
    return new Promise(function (resolve, reject) {
        if (!request.headers.token) {
            response.status(401);
            response.end();
            resolve(0);
        }
        var token = request.headers.token;
        return Model.User.findOne({ where: { token: token, admin: 1 } }).then(function (user) {
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

router.route('/getDiscounts')
    .get((req, res, ) => {
        if (req.body) {
            Model.Discount.findAll({
            }).then(result => {
                res.status(200);
                res.send(result);
                console.log(JSON.stringify(result));
            });
        } else {
            res.status(400).end();
        }
    })

router.route('/getDiscount')
    .post((req, res, ) => {
        if (req.query) {
            var discount = req.body;

            Model.Discount.findAll({
                where: {
                    clientId: discount.userId
                }
            }
            ).then(result => {
                res.status(200);
                res.send(result);
                console.log(JSON.stringify(result));
            });
        } else {
            res.status(400).end();
        }
    })


router.route('/addDiscount')
    .post((req, res, next) => {

        if (req.query) {
            var discount = req.body;
            if (discount.productId == '' || discount.clientId == ''
                || discount.value == '') {
                res.status(400).end();
                return next();
            }
            Model.Discount.findOne({
                where: {
                    clientId: discount.clientId,
                    productId: discount.productId,
                }
            }
            ).then(result => {
                if (result) {
                    Model.Discount.update({
                        value: discount.value
                    },
                        {
                            where: {
                                clientId: discount.clientId,
                                productId: discount.productId
                            }
                        }).then(result => {
                            res.status(200);
                            res.send(result);
                            console.log("update", JSON.stringify(result));
                        })

                } else {
                    Model.Discount.create({
                        clientId: discount.clientId,
                        productId: discount.productId,
                        value: discount.value
                    }).then(result => {
                        res.status(200);
                        res.send(result);
                        console.log("create", JSON.stringify(result));
                    });
                }
            });
        }
    });


