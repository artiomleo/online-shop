var express = require("express");
var Model = require("../models/model.js").Model;
var router = (module.exports = express.Router());
var Sequelize = require("sequelize");
var config = require("../config.json");
var sequelize = new Sequelize(config.database, { query: { raw: false } });
const Op = Sequelize.Op;
var sessionUser;
var multiparty = require("multiparty");
var fs = require("fs");
var multer = require("multer");

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

router.route("/getProducts").get((req, res) => {
  if (req.body) {
    Model.Product.findAll({}).then(result => {
      res.status(200);
      res.send(result);
    });
  } else {
    res.status(400).end();
  }
});

router.route("/getProduct").post((req, res) => {
  if (req.body) {
    Model.Product.findOne({ where: { name: req.body.productName } }).then(
      result => {
        if (result) {
          res.status(200);
          res.send(result);
        } else {
          res.status(400).end();
        }
      }
    );
  } else {
    res.status(400).end();
  }
});

router.route("/addProduct").post((req, res) => {
  var product = req.body;
  Model.Product.create(
    {
      name: product.name,
      shortDescription: product.shortDescription,
      description: product.description,
      image: product.image,
      pdf: product.pdf,
      category: product.category,
      subCategory: product.subcategory,
      price: product.price
    }
  ).then(result => {
    if (result) {
      res.status(200);
    } else {
      res.status(400).end();
    }
  });

});

router.route('/updateProduct')
    .post((req, res, next) => {
        var product = req.body;
        if (product.id == undefined ) {
            res.status(400).end();
            return next();
        }
        Model.Product.update({
          price: product.price
        },
            {
                where: { id: product.id }
            }
        );
        res.status(200).end();
    });

    router.route('/deleteProduct')
    .delete((req, res, next) => {
        var product = req.body;
        if (product.id === "" ) {
            res.status(400).end();
            return next();
        }
        Model.Product.destroy({
          where: { id: product.id }
        });      
        res.status(200).end();
    });

const storage = multer.diskStorage({
  destination: "./public/upload",
  filename(req, file, cb) {
    cb(null, `${file.originalname}`);
  }
});
const pdfStorage = multer.diskStorage({
  destination: "./public/upload/pdf",
  filename(req, file, cb) {
    cb(null, `${file.originalname}`);
  }
});

const upload = multer({ storage });
const uploadPdf = multer({ storage: pdfStorage });

router.route("/uploadPdf").post(uploadPdf.array("files"), (req, res) => {
  if (res) {
    res.status(200).end();
  } else {
    res.status(400).end();
  }
});

router.route("/uploadImage").post(upload.single("file"), (req, res) => {
  if (res) {
    res.status(200).end();
  } else {
    res.status(400).end();
  }
});

router.route("/download").get(function(req, res) {
  var filename = req.query.filename;
  var filePath = `./public/upload/pdf/${filename}`;

  fs.readFile(filePath, function(err, data) {
    res.contentType("application/pdf");
    res.send(data);
  });
});

