/* eslint-disable import/no-extraneous-dependencies */

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = config => ({
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    hotOnly: true,
    inline: true,
    publicPath: '/',
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
