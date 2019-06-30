'use strict'

const { isProd } = require('../../../environment')

function redirectHandler (err, req, res, next) {
  if (err.status >= 300 && err.status < 400 && err.location) {
    res.redirect(err.location)
  } else {
    next()
  }
}

const failHandler = (isProd)
  ? function failHandler (err, req, res, next) {
    console.error(err)
    res.sendStatus(500)
  }
  : function failHandler (err, req, res, next) {
    console.error(err)
    res.status(500).send(err.message || err.body || err)
  }

module.exports = () => [
  redirectHandler,
  failHandler
]
