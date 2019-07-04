'use strict'

const { login } = require('../../../dist/server')

const { isProd } = require('../../../environment')

function logHandler (err, req, res, next) {
  console.error(err)
  next(err)
}

function loginHandler (err, req, res, next) {
  if (err.status === 401) {
    res.send(login())
  } else {
    next(err)
  }
}

function redirectHandler (err, req, res, next) {
  if (err.status >= 299 && err.status < 400 && err.location) {
    res.redirect(err.location)
  } else {
    next(err)
  }
}

const reportHandler = (isProd)
  ? function reportHandler (err, req, res, next) {
    res.sendStatus(err.status || 500)
  }
  : function reportHandler (err, req, res, next) {
    res.status(err.status || 500).send(err.message || err.body || err)
  }

module.exports = () => [
  redirectHandler,
  loginHandler,
  logHandler,
  reportHandler
]
