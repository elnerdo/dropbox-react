var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: {
    './dropbox': './maindropbox.js',
  },
  output: { path: __dirname, filename: '[name].js' },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
};
