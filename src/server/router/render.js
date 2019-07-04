'use strict'

const { Router } = require('express')

const { render } = require('../../../dist/server')

function router () {
  const router = Router()

  router.use((req, res, next) => {
    res.send(render({ user: req.user }))
  })

  return router
}

module.exports = router
