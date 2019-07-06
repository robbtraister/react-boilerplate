'use strict'

import renderComponent from './web'

import Login from '@/login'

const App = props => <Login location={window.location.href} {...props} />

function render () {
  return renderComponent(App)
}

window.document.addEventListener('DOMContentLoaded', render)

export default render
