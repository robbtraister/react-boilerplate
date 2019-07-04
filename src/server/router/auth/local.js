'use strict'

const passport = require('passport')
const { Strategy: LocalStrategy } = require('passport-local')

passport.use(
  new LocalStrategy(
    function (username, password, done) {
      done(null, username)
    }
  )
)
