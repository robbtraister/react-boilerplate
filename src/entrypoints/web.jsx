'use strict'

import PropTypes from 'prop-types'
import React from 'react'
import ReactDOM from 'react-dom'
import * as ReactRouterDOM from 'react-router-dom'

import { id } from './data'

window.PropTypes = PropTypes
window.React = React
window.ReactDOM = ReactDOM
window.ReactRouterDOM = ReactRouterDOM

let user
window.setUser = function (u) {
  user = u
}

function renderComponent (Component) {
  return function render (props) {
    const targetElement = document.getElementById(id)

    if (targetElement) {
      const originalHTML = targetElement.innerHTML

      try {
        ReactDOM.render(
          <ReactRouterDOM.BrowserRouter>
            <Component user={user} {...props} />
          </ReactRouterDOM.BrowserRouter>,
          targetElement
        )
      } catch (e) {
        targetElement.innerHTML = originalHTML
      }
    }
  }
}

export default renderComponent
