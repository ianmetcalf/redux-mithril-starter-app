'use strict';

const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const compression = require('compression');
const viewHelpers = require('./views/helpers');
const routes = require('./routes/index');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Only use the hashed assets when not running in development
if (app.get('env') !== 'development') {
  // eslint-disable-next-line global-require, import/no-unresolved
  viewHelpers.assets(require('../assets.json'));
}

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(compression());

app.use('/', routes);

/* eslint-disable global-require */
if (app.get('env') === 'development') {
  const webpack = require('webpack');
  const webpackConfig = require('../webpack.config');

  const compiler = webpack(Object.assign(webpackConfig, {
    entry: Object.keys(webpackConfig.entry).reduce((memo, key) => Object.assign(memo, {
      [key]: ['webpack-hot-middleware/client'].concat(webpackConfig.entry[key]),
    }), {}),
    plugins: webpackConfig.plugins.concat([
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
    ]),
  }));

  app.use(require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: {colors: true},
  }));
  app.use(require('webpack-hot-middleware')(compiler));
}
/* eslint-enable global-require */

app.use(express.static(path.join(__dirname, '..', 'public')));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err,
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {},
  });
});

module.exports = app;
