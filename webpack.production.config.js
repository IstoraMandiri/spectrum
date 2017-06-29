/* eslint-disable import/no-extraneous-dependencies */
const crypto = require('crypto');
const path = require('path');
const webpack = require('webpack');
const OfflinePlugin = require('offline-plugin');
// plugins
const NameAllModulesPlugin = require('name-all-modules-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// const SriPlugin = require('webpack-subresource-integrity');
// TODO enable when https://bugs.chromium.org/p/chromium/issues/detail?id=573269 is fixed
const WebpackPwaManifest = require('webpack-pwa-manifest');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const StatsPlugin = require('stats-webpack-plugin');

module.exports = config => ({
  devtool: false,
  output: {
    path: path.join(__dirname, './docs'),
    filename: '[name].[chunkhash].js',
  },
  plugins: config.plugins.concat([
    new webpack.NamedModulesPlugin(),
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
    new webpack.optimize.CommonsChunkPlugin({
      name: 'runtime',
    }),
    new NameAllModulesPlugin(),
    new ExtractTextPlugin('style.[contenthash].css'),
    new UglifyJsPlugin({ mangle: true, sourceMap: false, comments: false }),
    new OptimizeCssAssetsPlugin(),
    // TODO fix compatability with SRI?
    // new SriPlugin({ hashFuncNames: ['sha256'] }),
    new WebpackPwaManifest({
      name: 'Spectrum',
      short_name: 'Spectrum',
      display: 'fullscreen',
      start_url: '.',
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
      autoUpdate: 1000 * 60 * 10.1,
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
  ]).concat(process.env.STATS ? (
    new StatsPlugin('../stats.json', { chunkModules: true })
  ) : []),
});
