//Biblioteca de 3ros para manejar errores http
var createError = require('http-errors');
//El framework Express
var express = require('express');
//Biblioteca del nucleo de node que sirve para
//Administrar rutas
var path = require('path');
//Biblioteca externa que sirve para
//Administrar cokies
var cookieParser = require('cookie-parser');
//Biblioteca que registra en consola
//Solicitudes del cliente
var logger = require('morgan');

//Definiciones de la ruta
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
//Creando una instancia en Express
var app = express();

// view engine setup
//Configura el motor de plantillas
// Establecer donde estaran las plantillas
// (vistas --> Views)
//
app.set('views', path.join(__dirname, 'views'));
//Establezco que motor precargado usare
app.set('view engine', 'hbs');

//Establezco el middleware
app.use(logger('dev'));
//Middleware para parsear a json la peticion
app.use(express.json());
//Decodifica la url
app.use(express.urlencoded({ extended: false }));
// Parsear cookies
app.use(cookieParser());
//Servicor de archivos estaticos
app.use(express.static(path.join(__dirname, '..', 'public')));

//Registro Rutas
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;