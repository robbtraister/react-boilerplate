'use strict'

const path = require('path')

const isProd = /^prod/i.test(process.env.NODE_ENV)
const isDev = !isProd

const rootDir = path.resolve(__dirname, '..')
const distDir = path.join(rootDir, 'dist')
const srcDir = path.join(rootDir, 'src')
const appDir = path.join(srcDir, 'app')
const serverDir = path.join(srcDir, 'server')

module.exports = {
  appDir,
  distDir,
  isDev,
  isProd,
  rootDir,
  serverDir,
  srcDir
}
