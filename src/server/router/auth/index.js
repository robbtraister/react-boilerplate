'use strict'

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const { Router } = require('express')
const jsonwebtoken = require('jsonwebtoken')
const passport = require('passport')

const { algorithm } = require('./jwt')
const { Redirect, Unauthorized } = require('../../errors')

const { cookie, secret } = require('../../../../environment')

passport.serializeUser(function (user, done) {
  done(null, JSON.stringify(user))
})

passport.deserializeUser(function (token, done) {
  done(null, JSON.parse(token))
})

passport.use(require('./local')())
passport.use(require('./jwt')())

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
          const token = jsonwebtoken.sign(
            { usr: req.user },
            secret,
            { algorithm }
          )
          res.cookie(
            cookie,
            token,
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

  router.use(/(\/auth)?\/(log|sign)out/, (req, res, next) => {
    res.clearCookie(cookie)
    next(new Redirect('/'))
  })

  router.use(cookieParser())
  router.use(passport.initialize())

  router.use('/auth/form',
    bodyParser.urlencoded({ extended: true }),
    authenticate('local', { successRedirect: '/' })
  )
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
