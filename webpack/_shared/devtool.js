'use strict'

const { isProd } = require('../../environment')

module.exports = {
  devtool: (isProd)
    ? false
    : 'eval-source-map'
}
