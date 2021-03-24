const { app, BrowserWindow, ipcMain, remote } = require("electron");

const path = require('path')

// read ts file
require('ts-node').register()
require('../index.ts')

app.on("ready", function () {
  const main = new BrowserWindow({
    width: 550,
    height: 600,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      preload: path.resolve(__dirname, 'preload.js')
    }
  });
  main.on("closed", app.quit);
  // main.webContents.openDevTools();
  main.loadURL(`http://localhost:3000/admin`);
})

let win

ipcMain.on('show-window', (e) => {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      preload: path.resolve(__dirname, 'preload.js')
    }
  })
  win.maximize()
  // disable mouse event
  win.setIgnoreMouseEvents(true, { forward: true })
  // win.webContents.openDevTools();
  win.loadURL('http://localhost:3000/admin/screen')
})


ipcMain.on('close-window', (e) => {
  win.close()
})

ipcMain.on('enable', (e) => {
  win.setIgnoreMouseEvents(false)
})

ipcMain.on('disable', (e) => {
  win.setIgnoreMouseEvents(true, { forward: true })
})
