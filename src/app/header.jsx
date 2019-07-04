'use strict'

import React from 'react'

import styles from './styles.scss'
import logo from '&/logo.svg'

const Header = ({ user }) =>
  <nav className={styles.banner}>
    <img className={styles.logo} src={logo} />
    <div className={styles.title}>Boilerplate</div>
    { user &&
      <div className={styles.welcome}>hello, {user.name}
        <a href='/logout'>Sign Out</a>
      </div>
    }
  </nav>

export default Header
