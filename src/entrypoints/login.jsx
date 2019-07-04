'use strict'

import PropTypes from 'prop-types'
import React from 'react'
import ReactDOM from 'react-dom'
import * as ReactRouterDOM from 'react-router-dom'

import { id } from './data'

import Login from '@/login'

window.PropTypes = PropTypes
window.React = React
window.ReactDOM = ReactDOM
window.ReactRouterDOM = ReactRouterDOM

function render () {
  const targetElement = document.getElementById(id)

  if (targetElement) {
    const originalHTML = targetElement.innerHTML

    try {
      ReactDOM.render(
        <ReactRouterDOM.BrowserRouter>
          <Login location={window.location.href} />
        </ReactRouterDOM.BrowserRouter>,
        targetElement
      )
    } catch (e) {
      targetElement.innerHTML = originalHTML
    }
  }
}

window.document.addEventListener('DOMContentLoaded', render)

export default render
