/* eslint-disable import/no-extraneous-dependencies, no-console */
const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const { version } = require('./package.json');
// plugins
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const nodeEnv = process.env.NODE_ENV;
const production = nodeEnv === 'production';
const envConfig = production ? require('./webpack.production.config.js') : require('./webpack.development.config');

const date = new Date();
const ymd = [date.getUTCFullYear(), date.getUTCMonth() + 1, date.getUTCDate()].join('-');
const hms = [date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds()].join(':');

const buildName = `v${version} ${ymd} ${hms}`;

console.log('Building Spectrum', buildName);

const baseConfig = {
  entry: [
    'babel-polyfill',
    './src/index.jsx',
  ],
  module: {
    loaders: [{
      test: /\.html$/,
      loader: 'html-loader',
    }, {
      test: /manifest.json$/,
      loader: 'file-loader?name=manifest.json!web-app-manifest-loader',
    }, {
      test: /\.json$/,
      exclude: /manifest.json$/,
      loader: 'json-loader',
    }, {
      test: /\.jpe?g$|\.gif$|\.png$|\.ttf$|\.eot$|\.svg$/,
      use: 'file-loader?name=[name].[ext]?[hash]',
    }, {
      test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'url-loader?limit=10000&mimetype=application/fontwoff',
    }, {
      test: /\.(css|less)$/,
      loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: ['css-loader', 'less-loader'] }),
    }, {
      test: /\.(js|jsx)$/,
      include: [
        // TODO auto detect es6 modules?
        path.resolve('./src'),
        fs.realpathSync(`${__dirname}/node_modules/web3-redux`),
        fs.realpathSync(`${__dirname}/node_modules/@digix/etc-redemption`),
        fs.realpathSync(`${__dirname}/node_modules/@digix/redux-crypto-prices`),
        fs.realpathSync(`${__dirname}/node_modules/@digix/truffle-gnosis-multisig`),
        fs.realpathSync(`${__dirname}/node_modules/ethereumjs-tx`),
        fs.realpathSync(`${__dirname}/node_modules/web3-provider-engine`),
      ],
      loader: 'babel-loader',
    }],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './src/index.html', chunksSortMode: 'dependency' }),
    new CopyWebpackPlugin([{ from: './src/assets/icon.png', to: 'favicon.ico' }]),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(nodeEnv),
      },
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      path.join(__dirname, 'node_modules'),
    ],
    alias: {
      '@digix/spectrum': path.resolve(__dirname),
      '../../theme.config$': path.join(__dirname, './src/semantic-ui/theme.config'),
    },
  },
  resolveLoader: {
    modules: [
      'node_modules', fs.realpathSync(`${__dirname}/node_modules/`),
    ],
  },
};

const config = Object.assign(baseConfig, envConfig(baseConfig));

module.exports = config;
