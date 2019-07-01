'use strict'

const express = require('express')

function router () {
  const router = express.Router()

  router.use(require('./assets')())
  router.use(require('./render')())

  return router
}

module.exports = router
