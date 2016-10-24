var resolve = require('path').resolve;
var webpackConfig = require('./webpack.config');

const fileGlob = 'src/test.js';

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['mocha','chai'],
    files: [
      fileGlob
    ],
    exclude: [
    ],
    preprocessors: {
      [fileGlob]: ['webpack']
    },
    webpack: webpackConfig,
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['Chrome'],
    singleRun: true,
    concurrency: Infinity,
  });
};
