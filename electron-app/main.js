const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const { spawn } = require('child_process');

let apiProcess;

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });
  win.loadURL('http://localhost:5173'); // Vite dev server
}

app.whenReady().then(() => {
  // Register IPC handlers here to ensure main process is ready
  ipcMain.handle('select-folder', async () => {
    const result = await dialog.showOpenDialog({ properties: ['openDirectory'] });
    if (result.canceled || result.filePaths.length === 0) return '';
    return result.filePaths[0];
  });

  apiProcess = spawn('node', ['api/index.js'], {
    stdio: 'inherit',
    shell: true,
  });
  createWindow();
});

app.on('will-quit', () => {
  if (apiProcess) apiProcess.kill();
});
