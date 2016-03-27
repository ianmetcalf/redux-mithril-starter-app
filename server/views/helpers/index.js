'use strict';

const path = require('path');
const hbs = require('hbs');

const assetMap = {};

exports.assets = assets => {
  if (assets) {
    Object.keys(assets).forEach(key => {
      assetMap[path.basename(key)] = path.basename(assets[key]);
    });
  }

  return assetMap;
};

hbs.registerHelper('asset', source => {
  const asset = assetMap[path.basename(source)];

  if (asset) {
    return `${ path.dirname(source) }/${ asset }`;
  }

  return source;
});

hbs.registerHelper('block', function blockHelper(name) {
  return this._blocks && this._blocks[name];
});

hbs.registerHelper('forBlock', function forBlockHelper(name, options) {
  this._blocks = this._blocks || {};

  if (options && typeof options.fn === 'function') {
    this._blocks[name] = `${ this._blocks[name] || '' }${ options.fn(this) }`;
  }
});
