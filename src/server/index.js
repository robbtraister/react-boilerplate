#!/usr/bin/env node

'use strict'

const compression = require('compression')
const express = require('express')

const { isProd } = require('../../environment')

function server (port) {
  port = port || process.env.PORT || 8080

  const app = express()

  app.disable('x-powered-by')

  app.use(compression())

  if (isProd) {
    app.use(require('./router')())
    app.use(require('./errors/middleware')())
  } else {
    app.use((req, res, next) => {
      Object.keys(require.cache)
        .filter((mod) => !/[\\/]node_modules[\\/]/.test(mod))
        .forEach((mod) => {
          delete require.cache[mod]
        })
      next()
    })
    app.use((req, res, next) => {
      require('./router')()(req, res, next)
    })
    app.use((err, req, res, next) => {
      [].concat(require('./errors/middleware')())
        .reverse()
        .reduce(
          (next, handler) => () => handler(err, req, res, next),
          next
        )()
    })
  }

  return app.listen(port, (err) => {
    (err)
      ? console.error(err)
      : console.log(`Listening on port: ${port}`)
  })
}

if (module === require.main) {
  server()
}
