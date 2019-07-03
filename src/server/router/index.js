'use strict'

const { Router } = require('express')

function router () {
  const router = Router()

  router.use(require('./assets')())
  router.use(require('./render')())

  return router
}

module.exports = router
