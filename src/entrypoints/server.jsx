'use strict'

import React from 'react'
import ReactDOM from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { ServerStyleSheet } from 'styled-components'

import { id, title } from './data'

import App from '@'
import Login from '@/login'

const Page = ({ Component = App, context = {}, entry = 'app', ...props }) => {
  return (
    <html>
      <head>
        <title>{title}</title>
        <link type='text/css' rel='stylesheet' href='/resources/styles.css' />
        <link type='text/css' rel='stylesheet' href={`/dist/browser/common.css`} />
        <link type='text/css' rel='stylesheet' href={`/dist/browser/${entry}.css`} />
        <styled-components />
        <script type='application/javascript' src={`/dist/browser/common.js`} defer='defer' />
        <script type='application/javascript' src={`/dist/browser/${entry}.js`} defer='defer' />
      </head>
      <body>
        <div id={id}>
          <StaticRouter context={context} location={props.location}>
            <Component {...props} />
          </StaticRouter>
        </div>
        <script type='application/javascript' src='/auth/user?jsonp=setUser' defer='defer' />
      </body>
    </html>
  )
}

function render (props) {
  const sheet = new ServerStyleSheet()
  try {
    const context = {}
    const html = ReactDOM.renderToStaticMarkup(
      sheet.collectStyles(<Page {...props} context={context} />)
    )

    if (context.url) {
      const redirect = new Error(`redirect to: ${context.url}`)
      redirect.location = context.url
      throw redirect
    }

    return `<!DOCTYPE html>${
      html
        .replace(
          /<styled-components><\/styled-components>/g,
          sheet.getStyleTags()
        )
    }`
  } finally {
    sheet.seal()
  }
}

function login (props) {
  return render({
    ...props,
    Component: Login,
    entry: 'login'
  })
}

export {
  login,
  render
}
