'use strict';

const path = require('path');

module.exports = function assetHelper(assets) {
  const assetMap = {};

  // Add a file name mapping for each asset provided
  if (assets) {
    Object.keys(assets).forEach(key => {
      assetMap[path.basename(key)] = path.basename(assets[key]);
    });
  }

  return (req, res, next) => {
    Object.assign(res.locals, {
      asset(source) {
        const asset = assetMap[path.basename(source)];

        if (asset) {
          return `${ path.dirname(source) }/${ asset }`;
        }

        return source;
      },
    });

    next();
  };
};
