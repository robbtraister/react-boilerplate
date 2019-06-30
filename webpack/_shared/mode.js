'use strict'

const { isProd } = require('../../environment')

module.exports = {
  mode: (isProd)
    ? 'production'
    : 'development'
}
