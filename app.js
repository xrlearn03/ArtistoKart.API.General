var createError = require("http-errors");
var path = require("path");
const multer = require('multer');
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var logger = require("morgan");
var express = require("express");
var mongoose = require("mongoose");
var cors = require("cors");
var dotenv = require("dotenv");
var expressValidator = require("express-validator"); //req.checkbody()
const routes = require('./routes/index')

dotenv.config();

mongoose.connect(
 process.env.DATABASE_CONNECTION,
  function (error) {
    if (error) throw error;
    console.log(`connect mongodb success`);
  }
);

var app = express();
app.use(cors());


app.use(logger("dev"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.use(cookieParser());

app.use(express.static(__dirname + '/public'));


app.use("/api/v1",routes);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // console.log(err);
  res.status(err.status || 500).json(err);
});

module.exports = app;
