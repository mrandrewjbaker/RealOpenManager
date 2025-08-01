// electron-app/preload.js
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  hello: () => 'RealOpenManager',
  selectFolder: () => ipcRenderer.invoke('select-folder'),
});
