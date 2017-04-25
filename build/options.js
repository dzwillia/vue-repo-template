'use strict'

const path = require('path')
const version = require('../package.json').version

const banner =
  '/*!\n' +
  ' * REPOSITORY_NAME v' + version + ' (https://github.com/dzwillia/REPOSITORY_NAME)\n' +
  ' * (c) ' + new Date().getFullYear() + ' David Z. Williams\n' +
  ' * Released under the MIT License.\n' +
  ' */'

module.exports = {
  banner,

  isProduction: process.env.NODE_ENV === 'production',

  paths: {
    root: path.join(__dirname, '..'),

    src: {
      main: path.join(__dirname, '..', 'src'),
      docs: path.join(__dirname, '..', 'docs-src'),
      examples: path.join(__dirname, '..', 'examples-src')
    },

    output: {
      main: path.join(__dirname, '..', 'dist'),
      docs: path.join(__dirname, '..', 'docs'),
      examples: path.join(__dirname, '..', 'examples')
    },

    resolve(location) {
      return path.join(__dirname, '..', location)
    }
  }
}
