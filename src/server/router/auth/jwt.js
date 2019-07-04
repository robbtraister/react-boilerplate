'use strict'

const passport = require('passport')
const { Strategy: JwtStrategy } = require('passport-jwt')

const { cookie, secret } = require('../../../../environment')

passport.use(
  new JwtStrategy(
    {
      secretOrKey: secret,
      jwtFromRequest: (req) => req && req.cookies && req.cookies[cookie],
      algorithms: ['HS512']
    },
    function (payload, done) {
      done(null, payload.usr)
    }
  )
)
