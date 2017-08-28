/* eslint-disable import/no-extraneous-dependencies */
const crypto = require('crypto');
const path = require('path');
const webpack = require('webpack');
const OfflinePlugin = require('offline-plugin');
// plugins
// TODO enable when https://github.com/timse/name-all-modules-plugin/issues/1 is fixed
// const NameAllModulesPlugin = require('name-all-modules-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// const SriPlugin = require('webpack-subresource-integrity');
// TODO enable when https://bugs.chromium.org/p/chromium/issues/detail?id=573269 is fixed
const WebpackPwaManifest = require('webpack-pwa-manifest');
const StatsPlugin = require('stats-webpack-plugin');

const spectrumConfig = require('./spectrum.config.js');

module.exports = config => ({
  entry: ['babel-polyfill'].concat(config.entry),
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, `./dist/${process.env.ENVIRONMENT}`),
    filename: '[name].[chunkhash].js',
    sourceMapFilename: '[name].[chunkhash].js.map',
    publicPath: process.env.PUBLIC_PATH || './',
  },
  plugins: config.plugins.concat([
    // new NameAllModulesPlugin(),
    new webpack.NamedChunksPlugin((chunk) => {
      if (chunk.name) {
        return chunk.name;
      }
      const files = chunk.modules.map(m => path.relative(m.context, m.request)).join('_');
      // hash the filenames (TODO, this will eventually be a dapplet)
      return `import.${crypto.createHash('md5').update(files).digest('hex').substr(0, 20)}`;
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: module => module.context && module.context.indexOf('node_modules') !== -1,
    }),
    new webpack.optimize.CommonsChunkPlugin({ name: 'runtime' }),
    new ExtractTextPlugin('style.[contenthash].css'),
    new UglifyJsPlugin({ mangle: true, sourceMap: true, comments: false }),
    // TODO fix compatability with SRI?
    // new SriPlugin({ hashFuncNames: ['sha256'] }),
    new WebpackPwaManifest({
      name: spectrumConfig.appTitle || 'Spectrum',
      short_name: spectrumConfig.appTitle || 'Spectrum',
      display: 'standalone',
      start_url: spectrumConfig.publicPath || '.',
      description: 'Full Gamut Ethereum Lightsuite',
      background_color: '#111111',
      theme_color: '#111111',
      icons: [{
        src: path.join(__dirname, './src/assets/icon.png'),
        sizes: [96, 128, 144, 192, 256, 512],
      }],
    }),
    new OfflinePlugin({
      relativePaths: true,
      AppCache: false,
      ServiceWorker: { events: true },
      updateStrategy: 'changed',
      autoUpdate: 1000 * 60 * 2,
    }),
  ]).concat(process.env.STATS ? (
    new StatsPlugin('../stats.json', { chunkModules: true })
  ) : []),
});
