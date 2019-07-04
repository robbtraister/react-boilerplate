'use strict'

const { login } = require('../../../dist/server')

const { isProd } = require('../../../environment')

const failHandler = (isProd)
  ? function failHandler (err, req, res, next) {
    console.error(err)
    res.sendStatus(err.status || 500)
  }
  : function failHandler (err, req, res, next) {
    console.error(err)
    res.status(err.status || 500).send(err.message || err.body || err)
  }

function loginHandler (err, req, res, next) {
  if (err.status === 401) {
    res.send(login())
  } else {
    next()
  }
}

function redirectHandler (err, req, res, next) {
  if (err.status >= 299 && err.status < 400 && err.location) {
    res.redirect(err.location)
  } else {
    next()
  }
}

module.exports = () => [
  redirectHandler,
  loginHandler,
  failHandler
]
