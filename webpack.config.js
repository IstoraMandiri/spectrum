/* eslint-disable import/no-extraneous-dependencies, no-console */
const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const { version } = require('./package.json');
// plugins
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// if process.env.ENVIRONMENT is set, always use `production` flag, but pass the ENVIRONMENT, too.
const environment = process.env.ENVIRONMENT;
const production = !!environment; // if this is truthy (i.e. set, then we're good)
const envConfig = production ? require('./webpack.production.config.js') : require('./webpack.development.config');

const date = new Date();
const ymd = [date.getUTCFullYear(), date.getUTCMonth() + 1, date.getUTCDate()].join('-');
const hms = [date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds()].join(':');

const buildName = `v${version} ${ymd} ${hms}`;
const title = process.env.APP_TITLE || `${(!production && '[DEV] ') || ''}Spectrum`;

console.log('Building Spectrum', buildName);

const baseConfig = {
  entry: [
    './src/index.jsx',
  ],
  module: {
    loaders: [{
      test: /\.html$/,
      loader: 'underscore-template-loader',
    }, {
      test: /manifest.json$/,
      loader: 'file-loader?name=manifest.json!web-app-manifest-loader',
    }, {
      test: /\.json$/,
      exclude: /manifest.json$/,
      loader: 'json-loader',
    }, {
      test: /\.jpe?g$|\.gif$|\.png$|\.ttf$|\.eot$|\.svg$/,
      loader: 'file-loader?name=[name].[ext]?[hash]',
    }, {
      test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'url-loader?limit=10000&mimetype=application/fontwoff',
    }, {
      test: /\.(css|less)$/,
      loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: ['cache-loader', 'css-loader', 'less-loader'] }),
    }, {
      test: /\.(js|jsx)$/,
      include: [
        // TODO auto detect es6 modules?
        // TODO replace with dapplet system
        path.resolve('./src'),
        fs.realpathSync(`${__dirname}/node_modules/web3-redux`),
        fs.realpathSync(`${__dirname}/node_modules/@digix/etc-redemption`),
        fs.realpathSync(`${__dirname}/node_modules/@digix/redux-crypto-prices`),
        fs.realpathSync(`${__dirname}/node_modules/@digix/truffle-gnosis-multisig`),
        fs.realpathSync(`${__dirname}/node_modules/@digix/kyc-system`),
        fs.realpathSync(`${__dirname}/node_modules/ethereumjs-tx`),
        fs.realpathSync(`${__dirname}/node_modules/web3-provider-engine`),
        fs.realpathSync(`${__dirname}/node_modules/sui-react-ezmodal`),
      ],
      use: [
        'cache-loader',
        'babel-loader',
      ],
    }],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title,
      template: './src/index.html',
      chunksSortMode: 'dependency',
    }),
    new CopyWebpackPlugin([{ from: './src/assets/icon.png', to: 'favicon.ico' }]),
    new webpack.DefinePlugin({
      'process.env': {
        ENVIRONMENT: JSON.stringify(environment || 'development'), // staging / production / development
        NODE_ENV: JSON.stringify(production ? 'production' : 'development'), // for react
      },
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      path.join(__dirname, 'node_modules'),
      'node_modules', // temporary for linked modules
    ],
    alias: {
      '@digix/spectrum': path.resolve(__dirname),
      'spectrum-lightsuite': path.resolve(__dirname),
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
