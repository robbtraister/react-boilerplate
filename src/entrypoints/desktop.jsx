'use strict'

import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter } from 'react-router-dom'

import { id } from './data'

import App from '@'

ReactDOM.render(
  <HashRouter>
    <App />
  </HashRouter>,
  window.document.getElementById(id)
)
