var bodyParser = require('body-parser');
var cors = require('cors');
var cookieParser = require('cookie-parser');
var express = require('express');
var app = express();
var http = require("http").Server(app).listen(80);
var morgan = require('morgan');

app.set('port', 9000);
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(require('./routes/user.js'));
app.use(require('./routes/product.js'));
app.use(require('./routes/discount.js'));
app.use(require('./routes/orders.js'));
app.use(require('./routes/email.js'));

app.listen(app.get('port'), () => console.log(`App started on port ${app.get('port')}`));
