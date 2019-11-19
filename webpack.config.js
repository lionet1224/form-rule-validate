const path = require('path');

const config = {
  entry: path.resolve(__dirname, './dist/rule.js'),
  output: {
    filename: 'rule.min.js',
    path: path.resolve(__dirname, 'dist'),
    // 库名
    library: 'Rule',
    libraryTarget: 'umd'
  },
};

module.exports = config;