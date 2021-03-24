const { contextBridge, ipcRenderer, remote } = require('electron')

contextBridge.exposeInMainWorld(
  'api', {
    showWindow: () => ipcRenderer.send('show-window'),
    closeWindow: () => ipcRenderer.send('close-window'),
    enable: () => ipcRenderer.send('enable'),
    disable: () => ipcRenderer.send('disable')
  }
)