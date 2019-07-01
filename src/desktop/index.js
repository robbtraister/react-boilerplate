'use strict'

const path = require('path')
const url = require('url')

const { app, BrowserWindow } = require('electron')

const { distDir } = require('../../environment')

// let win

function createWindow () {
  const win = new BrowserWindow({
    width: 1080,
    height: 800,
    backgroundColor: '#fff',
    webPreferences: {
      nodeIntegration: false
    }
  })

  win.loadURL(
    url.format({
      pathname: path.join(distDir, 'desktop.html'),
      protocol: 'file',
      slashes: true
    })
  )

  // win.webContents.openDevTools()

  win.on('closed', () => {
    win = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
