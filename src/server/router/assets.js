'use strict'

const path = require('path')

const express = require('express')

const { distDir, rootDir } = require('../../../environment')

function router () {
  const router = express.Router()

  router.use('/dist/server.js', (req, res, next) => res.sendStatus(404))
  router.use('/dist', express.static(distDir, { fallthrough: false }))
  router.use('/resources', express.static(path.join(rootDir, 'resources'), { fallthrough: false }))

  return router
}

module.exports = router
