'use strict';

const webpack = require('webpack');
const config = require('./webpack.config');

const entry = Object.assign({common: []}, config.entry);

Object.keys(entry).forEach(key => {
  const files = entry[key];

  entry[key] = [].concat(files, 'webpack-hot-middleware/client');
});

const plugins = (config.plugins || []).concat([
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NamedModulesPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
]);

module.exports = Object.assign({}, config, {
  entry,
  plugins,
});
