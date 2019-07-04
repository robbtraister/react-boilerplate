'use strict'

class Redirect extends Error {
  constructor (location, status) {
    super(`redirect to: ${location}`)
    this.location = location
    this.status = status || 302
  }
}

module.exports = Redirect
