require.extensions['.css'] = function stubStyles(m, filename) {
  m._compile('module.exports = {}', filename);
};
