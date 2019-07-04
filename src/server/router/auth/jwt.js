'use strict'

const { Strategy: JwtStrategy } = require('passport-jwt')

const { cookie, secret } = require('../../../../environment')

const algorithm = 'HS512'

module.exports = () => new JwtStrategy(
  {
    secretOrKey: secret,
    jwtFromRequest: (req) => req && req.cookies && req.cookies[cookie],
    algorithms: [algorithm]
  },
  function (payload, done) {
    done(null, payload.usr)
  }
)

module.exports.algorithm = algorithm
