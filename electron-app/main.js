const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');
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

  ipcMain.handle('check-file-exists', async (event, dirPath, fileName) => {
    if (!dirPath || !fileName) return false;
    try {
      const filePath = path.join(dirPath, fileName);
      return fs.existsSync(filePath);
    } catch (error) {
      console.error('Error checking file existence:', error);
      return false;
    }
  });

  ipcMain.handle('read-directory', async (event, dirPath) => {
    if (!dirPath) return [];
    try {
      const items = fs.readdirSync(dirPath, { withFileTypes: true });
      return items.map(item => ({
        name: item.name,
        isDirectory: item.isDirectory(),
        path: path.join(dirPath, item.name)
      })).sort((a, b) => {
        // Sort directories first, then files
        if (a.isDirectory && !b.isDirectory) return -1;
        if (!a.isDirectory && b.isDirectory) return 1;
        return a.name.localeCompare(b.name);
      });
    } catch (error) {
      console.error('Error reading directory:', error);
      return [];
    }
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
