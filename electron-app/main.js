import { app, BrowserWindow } from 'electron';
import path from 'path';
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let apiProcess;

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  win.loadURL('http://localhost:5173'); // Vite dev server
}

app.whenReady().then(() => {
  apiProcess = spawn('node', ['api/index.js'], {
    stdio: 'inherit',
    shell: true
  });
  createWindow();
});

app.on('will-quit', () => {
  if (apiProcess) apiProcess.kill();
});
