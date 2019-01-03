var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var tradeIt = require('./routes/tradeIt');
var hbs = require('hbs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('json', function(context) {
  return JSON.stringify(context);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', tradeIt);

module.exports = app;

app.listen(9000);
