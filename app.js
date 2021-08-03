var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');



// Authentication middleware
require('./managers/passport');      //Require the custom jwt strategy


var app = express();

// Import environmental variables
require('dotenv').config();


// Connect to database
mongoose.connect(process.env.DB_URL, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, "mongo connection error"));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Middleware
app.options('*', cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Set up REST routes
app.use('/api', require('./routes/index'));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
