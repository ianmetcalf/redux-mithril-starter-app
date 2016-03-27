'use strict';

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

const NODE_ENV = process.env.NODE_ENV || 'development';
const DEV = NODE_ENV === 'development';

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
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', [
          `css-loader?${ JSON.stringify({
            modules: true,
            camelCase: true,
            importLoaders: 1,
            localIdentName: DEV ? '[path][name]-[local]-[hash:base64:5]' : '[hash:base64]',
          }) }`,
          'postcss-loader',
        ]),
      },
    ],
  },

  postcss: [
    autoprefixer({
      browsers: ['last 2 versions'],
    }),
  ],

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(NODE_ENV),
      },
    }),
    new webpack.ProvidePlugin({
      fetch: 'imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch',
    }),
    new webpack.optimize.CommonsChunkPlugin('common.js'),
    new ExtractTextPlugin('[name].css', {
      allChunks: true,
      disable: NODE_ENV === 'development',
    }),
  ],

  devtool: 'source-map',
};
