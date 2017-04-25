'use strict'

const ExtractTextPlugin = require('extract-text-webpack-plugin')
const merge = require('deep-assign')
const webpack = require('webpack')

const options = require('./options')
const base = require('./webpack.base.js')

const config = merge(base, {
  entry: options.paths.resolve('src/index.js'),

  output: {
    filename: options.isProduction ? 'REPOSITORY_NAME.min.js' : 'REPOSITORY_NAME.js',
    path: options.paths.output.main,
    library: 'REPOSITORY_NAME',
    libraryTarget: 'umd'
  },

  plugins: [
    new webpack.BannerPlugin({
      banner: options.banner,
      raw: true,
      entryOnly: true
    }),

    new ExtractTextPlugin({
      filename: options.isProduction ? 'REPOSITORY_NAME.min.css' : 'REPOSITORY_NAME.css'
    })
  ]
})

// First item in module.rules array is Vue
config.module.rules[0].options.loaders = {
  scss: ExtractTextPlugin.extract({
    loader: 'css-loader!sass-loader',
    fallbackLoader: 'vue-style-loader'
  })
}

if (options.isProduction) {
  config.plugins = config.plugins.concat([
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),

    // Set the production environment
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),

    // TODO: Figure out how to do singleton includes of Lodash functions
    new webpack.ProvidePlugin({
      _: 'lodash'
    }),

    // Minify with dead-code elimination
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ])
}

module.exports = config
