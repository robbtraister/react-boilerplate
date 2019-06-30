'use strict'

const path = require('path')

const express = require('express')

const render = require('../../../dist/server').default

const { distDir, rootDir } = require('../../../environment')

function router () {
  const router = express.Router()

  router.use('/dist/server.js', (req, res, next) => res.sendStatus(404))
  router.use('/dist', express.static(distDir))
  router.use('/resources', express.static(path.join(rootDir, 'resources')))

  router.use((req, res, next) => {
    res.send(render())
  })

  return router
}

module.exports = router
