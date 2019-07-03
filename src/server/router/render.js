'use strict'

const { Router } = require('express')

const render = require('../../../dist/server').default

function router () {
  const router = Router()

  router.use((req, res, next) => {
    res.send(render())
  })

  return router
}

module.exports = router
