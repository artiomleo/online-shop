
const nodemailer = require("nodemailer");
var express = require('express');
const app = express()
var router = module.exports = express.Router();
var config = require('../config.json');

console.log("THIS!!");


router.route('/email')
  .post((req, res, next) => {
    console.log("HERE!!!!!!!!!");
    nodemailer.createTestAccount();
    let transporter = nodemailer.createTransport({
      // host: "smtp.ethereal.email",
      // port: 587,
      // secure: false, // true for 465, false for other ports
      // auth: {
      //   user: 'ytns5xixnuwrryyf@ethereal.email', // generated ethereal user
      //   pass: 'p425hU5mZ4PayygZGF' // generated ethereal password
      // }

      service: "Gmail",
      auth: {
        user: "intercoop.shulke@gmail.com",
        pass: "parolaparola"
      }
      // });
    });

    let mailOptions = {
      from: req.body.from, // sender address
      to: req.body.email, // list of receivers
      subject: req.body.subject, // Subject line
      // text: req.body.name, // plain text body
      html: req.body.message // html body
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Message sent: " + info);
      }
    });
    res.status(200).end();
  });


