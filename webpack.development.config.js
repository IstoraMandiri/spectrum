/* eslint-disable import/no-extraneous-dependencies */

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const hostname = process.env.HOSTNAME || 'http://localhost:8080';

module.exports = config => ({
  devtool: '#module-inline-source-map',
  devServer: {
    hot: true,
    publicPath: '/',
    host: '0.0.0.0',
    watchOptions: {
      aggregateTimeout: 300,
      ignored: /node_modules/,
    },
  },
  output: {
    filename: 'bundle.js',
  },
  plugins: config.plugins.concat([
    new ExtractTextPlugin('style.css'),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // for HMR
  ]),
  entry: [
    `webpack-dev-server/client?${hostname}`,
  ].concat(config.entry),
});
