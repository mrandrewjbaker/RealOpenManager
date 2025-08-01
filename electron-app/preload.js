// electron-app/preload.js
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  hello: () => 'RealOpenManager',
  selectFolder: () => ipcRenderer.invoke('select-folder'),
  checkFileExists: (dirPath, fileName) => ipcRenderer.invoke('check-file-exists', dirPath, fileName),
  readDirectory: (dirPath) => ipcRenderer.invoke('read-directory', dirPath),
});
