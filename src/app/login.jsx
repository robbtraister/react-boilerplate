'use strict'

import React from 'react'

import styles from './styles.scss'
import logo from './logo.svg'

const Login = () =>
  <div className={styles.body}>
    <nav className={styles.banner}>
      <img className={styles.logo} src={logo} />
      <div className={styles.title}>Boilerplate</div>
    </nav>
    <div className={styles.main}>
      <form method='POST' action='/auth/local'>
        <input name='username' />
        <input type='password' name='password' />
        <input type='submit' value='login' />
      </form>
    </div>
  </div>

export default Login
