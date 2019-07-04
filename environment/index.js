'use strict'

const path = require('path')

require('dotenv').config()

const isProd = /^prod/i.test(process.env.NODE_ENV)
const isDev = !isProd

const rootDir = path.resolve(__dirname, '..')
const distDir = path.join(rootDir, 'dist')
const srcDir = path.join(rootDir, 'src')
const appDir = path.join(srcDir, 'app')
const serverDir = path.join(srcDir, 'server')

const cookie = process.env.COOKIE
const secret = process.env.SECRET

module.exports = {
  appDir,
  cookie,
  distDir,
  isDev,
  isProd,
  rootDir,
  secret,
  serverDir,
  srcDir
}
