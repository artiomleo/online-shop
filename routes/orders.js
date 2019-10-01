var express = require("express");
var Model = require("../models/model.js").Model;
var router = (module.exports = express.Router());
var Sequelize = require("sequelize");
var config = require("../config.json");
var sequelize = new Sequelize(config.database, { query: { raw: true } });
const Op = Sequelize.Op;
var sessionUser;
var randomstring = require("randomstring");



function sessionChecker(request, response) {
  return new Promise(function(resolve, reject) {
    if (!request.headers.token) {
      response.status(401);
      response.end();
      resolve(0);
    }
    var token = request.headers.token;
    return Model.User.findOne({ where: { token: token } }).then(function(user) {
      if (user) {
        sessionUser = user;
        resolve(1);
      } else {
        response.status(401);
        response.end();
        resolve(0);
      }
    });
  });
}

function adminChecker(request, response) {
  return new Promise(function(resolve, reject) {
    if (!request.headers.token) {
      response.status(401);
      response.end();
      resolve(0);
    }
    var token = request.headers.token;
    return Model.User.findOne({ where: { token: token, admin: 1 } }).then(
      function(user) {
        if (user) {
          sessionUser = user;
          resolve(1);
        } else {
          response.status(401);
          response.end();
          resolve(0);
        }
      }
    );
  });
}

router.route("/getOrders").get((req, result, next) => {
  sessionChecker(req, result).then(res => {
    if (result === 0) return next();
    if (req.body) {
      const token = req.headers.token;
      Model.User.findOne({ where: { token: token } }).then(res => {
        const id = res.id;
        if (res) {
          Model.Order.findAll({ where: { userId: `${id}` } }).then(res => {
            result.status(200);
            result.send(res).end();
          });
        }
      });
    }
  });
});


router.route('/getOrderItems').post((req,result,next)=>{
    sessionChecker(req, result).then(res => {
        if (res === 0) return next();
        if(req.body){
            const order  = req.body;
            Model.OrderItem.findAll({
                where:{
                    userId:order.userId,
                    orderId:order.orderId
                }
            }).then(res=>{
                result.status(200);    
                result.send(res).end();
            })
        }
    })
})



router.route("/addOrder").post((req, result, next) => {
  sessionChecker(req, result).then(res => {
    if (result === 0) return next();
    if (req.body) {
      const orderItems = req.body;
      const token = req.headers.token;
      Model.User.findOne({ where: { token: token } }).then(res => {
        if (res) {
          let user = res.id;
          let orderId = randomstring.generate(10);
          Model.Order.create({
            orderId: orderId,
            userId: user
          }).then(res => {
            if (res) {
              for (let i in orderItems) {
                ((i)=>{
                  Model.Product.findOne({
                    attributes:['price'],
                    where:{
                      id:orderItems[i].prodId,
                    }
                  }).then(price=>{

                    Model.Discount.findOne({
                      attributes:['value'],
                      where:{
                        clientId:user,
                        productId:orderItems[i].prodId
                      }
                    }).then(discount=>{
                      var disc  = 1;
                      if(discount)
                      disc = discount.value
                      console.log(disc)
                Model.OrderItem.create({
                  orderId: orderId,
                  productName: orderItems[i].name,
                  productId: orderItems[i].prodId,
                  quantity:orderItems[i].quantity,
                  price:price.price,
                  discount: parseFloat(disc),
                  userId: user
                }).then(res => {
                  if (res) {
                    console.log("res",res)
                    result.status(200).end();
                  } else {
                    result.status(400).end();
                  }
                }) 
              })
              })
            })(i);
              }
            }
          });
        }
      });
     
    }  res.status(401).end();;
  });
});
