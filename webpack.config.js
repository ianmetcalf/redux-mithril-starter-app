'use strict';

const path = require('path');
const webpack = require('webpack');

module.exports = {
  context: path.resolve('app/'),

  entry: {
    index: './index',
  },

  output: {
    path: path.resolve('public/build/'),
    publicPath: '/build/',
    filename: '[name].js',
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
      },
    }),
    new webpack.ProvidePlugin({
      fetch: 'imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch',
    }),
    new webpack.optimize.CommonsChunkPlugin('common.js'),
  ],

  devtool: 'source-map',
};
