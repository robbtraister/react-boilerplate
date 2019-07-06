'use strict'

import React from 'react'

import sharedStyles from './styles.scss'
import loginStyles from './login.scss'

import Header from './header'

const Login = ({ location }) =>
  <div className={sharedStyles.body}>
    <Header />
    <div className={sharedStyles.main}>
      <form method='POST' action='/auth/form'>
        <input name='username' />
        <input type='password' name='password' />
        <input type='hidden' name='redirect' value={location || '/'} />
        <input type='submit' value='login' />
      </form>
      <a className={loginStyles.google} href={`/auth/google?redirect=${encodeURIComponent(location || '/')}`}>Google</a>
    </div>
  </div>

export default Login
