'use strict'

import React from 'react'

import styles from './styles.scss'

const location = (typeof window === 'undefined') ? 'server' : 'client'

const App = () => <div className={styles.main}>hello, {location}</div>

export default App
