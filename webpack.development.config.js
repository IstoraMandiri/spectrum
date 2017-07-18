/* eslint-disable import/no-extraneous-dependencies */

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const hostname = process.env.HOSTNAME || 'http://localhost:8080';

module.exports = config => ({
  devtool: 'eval',
  devServer: {
    hot: true,
    publicPath: '/',
    host: '0.0.0.0',
    port: 3000,
    watchOptions: {
      aggregateTimeout: 300,
      ignored: /node_modules/,
    },
  },
  output: {
    filename: 'bundle.js',
  },
  plugins: config.plugins.concat([
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('style.css'),
  ]),
  entry: [
    'react-hot-loader/patch',
  ].concat(config.entry),
});
