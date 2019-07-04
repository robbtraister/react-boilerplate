'use strict'

const bodyParser = require('body-parser')
const passport = require('passport')
const { Strategy: LocalStrategy } = require('passport-local')

const { authenticate } = require('./jwt')

module.exports = () => {
  passport.use(
    new LocalStrategy(
      function (username, password, done) {
        done(null, username)
      }
    )
  )

  return [
    bodyParser.urlencoded({ extended: true }),
    authenticate('local', { successRedirect: (req) => (req && req.body && req.body.redirect) || '/' })
  ]
}
