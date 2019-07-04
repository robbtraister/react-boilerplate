'use strict'

import React from 'react'
// import styled from 'styled-components'

import styles from './styles.scss'

import Header from './header'

const location: string = (typeof window === 'undefined') ? 'server' : 'client'

// const Div = styled.div`
//   color: #ff0;
// `

const App = ({ user }) =>
  <div className={styles.body}>
    <Header user={user || location} />
    <div className={styles.main}>
      React Boilerplate Application
    </div>
  </div>

export default App
