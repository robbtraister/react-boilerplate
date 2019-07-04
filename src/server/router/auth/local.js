'use strict'

const { Strategy: LocalStrategy } = require('passport-local')

module.exports = () => new LocalStrategy(
  function (username, password, done) {
    done(null, username)
  }
)
