'use strict'

import React from 'react'
import styled from 'styled-components'

import styles from './styles.scss'

const location = (typeof window === 'undefined') ? 'server' : 'client'

const Div = styled.div`
  color: #ff0;
`

const App = () => <Div className={styles.main}>hello, {location}</Div>

export default App
