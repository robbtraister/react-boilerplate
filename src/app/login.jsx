'use strict'

import React from 'react'

import styles from './styles.scss'

import Header from './header'

const Login = ({ location }) =>
  <div className={styles.body}>
    <Header />
    <div className={styles.main}>
      <form method='POST' action='/auth/form'>
        <input name='username' />
        <input type='password' name='password' />
        <input type='hidden' name='redirect' value={location || '/'} />
        <input type='submit' value='login' />
      </form>
    </div>
  </div>

export default Login
