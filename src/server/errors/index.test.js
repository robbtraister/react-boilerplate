'use strict'

/* global expect, test */

const { Redirect, Unauthorized } = require('.')

test('verify redirect error', () => {
  const redirect = new Redirect('/home')

  expect(redirect.status).toBe(302)
  expect(redirect.location).toBe('/home')
})

test('verify unauthorized error', () => {
  const unauthorized = new Unauthorized()

  expect(unauthorized.status).toBe(401)
})
