'use strict'

const path = require('path')

require('dotenv').config()

const isProd = /^prod/i.test(process.env.NODE_ENV)
const isDev = !isProd

const rootDir = path.resolve(__dirname, '..')
const distDir = path.join(rootDir, 'dist')
const resourcesDir = path.join(rootDir, 'resources')
const srcDir = path.join(rootDir, 'src')
const appDir = path.join(srcDir, 'app')
const serverDir = path.join(srcDir, 'server')

const cookie = process.env.COOKIE || 'token'
const secret = process.env.SECRET

const google = (process.env.GOOGLE_CLIENT_ID)
  ? {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET
  }
  : null

module.exports = {
  appDir,
  cookie,
  distDir,
  google,
  isDev,
  isProd,
  resourcesDir,
  rootDir,
  secret,
  serverDir,
  srcDir
}
