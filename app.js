/* Autor: Cortez Ramirez Jose Kevyn
    Fecha: Noviembre 2020*/
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var InitiateMongoServer = require("./config/db");
var bodyParser = require('body-parser');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var clienteRouter = require('./routes/cliente');
var servicioRouter = require('./routes/servicio');
var paqueteRouter = require('./routes/paquete');

var app = express();
InitiateMongoServer();
app.use(bodyParser.json());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/pages/acercade', indexRouter);
app.use('/pages/streaming', indexRouter);
app.use('/pages/geolocalizacion', indexRouter);
app.use('/pages/redessociales', indexRouter);
app.use('/pages/ecommerce', indexRouter);
app.use('/pages/otra', indexRouter);
app.use('/pages/login', indexRouter);
app.use('/pages/singup', indexRouter);
app.use('/cliente', clienteRouter);
app.use('/servicio', servicioRouter);
app.use('/paquete', paqueteRouter);

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
