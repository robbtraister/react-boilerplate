'use strict'

import React from 'react'
// import styled from 'styled-components'

import styles from './styles.scss'

const location = (typeof window === 'undefined') ? 'server' : 'client'

// const Div = styled.div`
//   color: #ff0;
// `

const App = () =>
  <div className={styles.body}>
    <nav className={styles.banner}>
      <div className={styles.title}>Boilerplate</div>
      <div className={styles.welcome}>hello, {location}</div>
    </nav>
    <div className={styles.main}>
      React Boilerplate Application
    </div>
  </div>

export default App
