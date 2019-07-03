'use strict'

import React from 'react'
import ReactDOM from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { ServerStyleSheet } from 'styled-components'

import { id, title } from './data'

import App from '@'

const Page = ({ context = {}, location, ...props }) => {
  return (
    <html>
      <head>
        <title>{title}</title>
        <link type='text/css' rel='stylesheet' href='/resources/styles.css' />
        <link type='text/css' rel='stylesheet' href='/dist/browser/styles.css' />
        <styled-components />
        <script src='/dist/browser/main.js' defer='defer' />
      </head>
      <body>
        <div id={id}>
          <StaticRouter context={context} location={location}>
            <App />
          </StaticRouter>
        </div>
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

export default render
