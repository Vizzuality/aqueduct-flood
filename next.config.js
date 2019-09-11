const webpack = require('webpack');
const withCSS = require('@zeit/next-css');
const withSass = require('@zeit/next-sass');
const commonsChunkConfig = require('@zeit/next-css/commons-chunk-config');

module.exports = withSass(withCSS({
  webpack(config) {
    const polyfill = new Promise(resolve => {
      const originalEntry = config.entry;

      originalEntry().then(entries => {
        if (entries['main.js']) {
          entries['main.js'].unshift('babel-polyfill');
        }
        Object.assign(config, { entry: entries });
        resolve();
      });
    });

    config.plugins.push(new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.API_URL': JSON.stringify(process.env.API_URL),
      'process.env.WRI_API_URL': JSON.stringify(process.env.WRI_API_URL),
      'process.env.GOOGLE_ANALYTICS': JSON.stringify(process.env.GOOGLE_ANALYTICS)
    }));

    return polyfill.then(() => commonsChunkConfig(config, /\.(sass|scss|css)$/));
  },
}));
