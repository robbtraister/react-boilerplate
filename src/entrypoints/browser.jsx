'use strict'

import renderComponent from './web'

import App from '@'

function render () {
  return renderComponent(App)
}

window.document.addEventListener('DOMContentLoaded', render)

export default render
