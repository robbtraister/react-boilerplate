'use strict'

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const { Router } = require('express')
const jsonwebtoken = require('jsonwebtoken')
const passport = require('passport')

const { Redirect, Unauthorized } = require('../../errors')

const { cookie, secret } = require('../../../../environment')

passport.serializeUser(function (user, done) {
  done(null, JSON.stringify(user))
})

passport.deserializeUser(function (token, done) {
  done(null, JSON.parse(token))
})

require('./local')
require('./jwt')

function authenticate (strategy, options = {}) {
  return (req, res, next) => {
    if (req.user) {
      next()
    } else {
      passport.authenticate(strategy, (err, user) => {
        if (err) {
          next(err)
        } else if (user) {
          req.user = user
          res.cookie(
            cookie,
            jsonwebtoken.sign({ usr: req.user }, secret, { algorithm: 'HS512' }),
            {
              httpOnly: true
            }
          )
          ;(options.successRedirect)
            ? next(new Redirect(options.successRedirect))
            : next()
        } else {
          next()
        }
      })(req, res, next)
    }
  }
}

function router () {
  const router = Router()

  router.use(bodyParser.urlencoded({ extended: true }))
  router.use(cookieParser())
  router.use(passport.initialize())

  router.use('/auth/local', authenticate('local', { successRedirect: '/' }))
  router.use(authenticate('jwt'))

  router.use((req, res, next) => {
    if (req.user) {
      next()
    } else {
      next(new Unauthorized())
    }
  })

  return router
}

module.exports = router
