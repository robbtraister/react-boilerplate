'use strict'

const path = require('path')

const express = require('express')

const { distDir, rootDir } = require('../../../environment')

function router () {
  const router = express.Router()

  router.use('/favicon.ico', (req, res, next) => { res.sendStatus(404) })
  router.use(/\/dist\/(desktop|server)/, (req, res, next) => res.sendStatus(404))
  router.use('/dist', express.static(distDir))
  router.use('/resources', express.static(path.join(rootDir, 'resources')))
  // fallthrough logs an error; manual 404 avoids polluting logs
  router.use(/\/(dist|resources)/, (req, res, next) => { res.sendStatus(404) })

  return router
}

module.exports = router
