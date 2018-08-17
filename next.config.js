const webpack = require('webpack');
// const path = require('path');
// const glob = require('glob');
const withSass = require('@zeit/next-sass');

module.exports = withSass({
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

    // config.module.rules.push({
    //   test: /\.css$/,
    //   loader: 'style-loader',
    //   options: {
    //     includePaths: ['./node_modules']
    //       .map(d => path.join(__dirname, d))
    //       .map(g => glob.sync(g))
    //       .reduce((a, c) => a.concat(c), [])
    //   }
    // });

    config.plugins.push(new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(
        process.env.NODE_ENV || 'development',
      ),
      'process.env.API_URL': JSON.stringify(process.env.API_URL),
      'process.env.GOOGLE_ANALYTICS': JSON.stringify(
        process.env.GOOGLE_ANALYTICS,
      ),
    }));

    return polyfill.then(() => config);
  },
});
