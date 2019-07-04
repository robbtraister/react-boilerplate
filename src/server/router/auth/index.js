'use strict'

const { Router } = require('express')
const passport = require('passport')

const { Redirect, Unauthorized } = require('../../errors')

const { cookie } = require('../../../../environment')

passport.serializeUser(function (user, done) {
  done(null, JSON.stringify(user))
})

passport.deserializeUser(function (token, done) {
  done(null, JSON.parse(token))
})

function router () {
  const router = Router()

  router.use(/(\/auth)?\/(log|sign)out/, (req, res, next) => {
    res.clearCookie(cookie)
    next(new Redirect('/'))
  })

  router.use(passport.initialize())

  router.use('/auth/form', require('./local')())
  router.use('/auth/google', require('./google')())
  router.use(require('./jwt')())

  router.use((req, res, next) => {
    if (req.user) {
      next()
    } else {
      next(new Unauthorized())
    }
  })

  router.use(/(\/auth)?\/use?r/, (req, res, next) => {
    (req.query.jsonp && /^[$_a-z][$_a-z0-9]*$/i.test(req.query.jsonp))
      ? res.send(`/**/;${req.query.jsonp}(${JSON.stringify(req.user)})`)
      : res.send({ user: req.user })
  })

  return router
}

module.exports = router
