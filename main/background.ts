import path from 'path';
import { app, globalShortcut, ipcMain } from 'electron';
import serve from 'electron-serve';
import { BrowserWindow } from 'electron/main';

import { createWindow } from './helpers';
import { ItemDB } from './database/db';
import { setupAutoUpdater } from './updater';

const isProd = process.env.NODE_ENV === 'production';

let isVisible = true;
let mainWindow: BrowserWindow | null = null;

if (isProd) serve({ directory: 'app' });
else app.setPath('userData', `${app.getPath('userData')} (development)`);

(async () => {
  await app.whenReady();

  mainWindow = createWindow('main', {
    width: 390,
    height: 720,
    minWidth: 390,
    minHeight: 620,
    autoHideMenuBar: true,
    alwaysOnTop: true,
    transparent: true,
    frame: false,
    hasShadow: false,
    skipTaskbar: true,
    backgroundColor: '#00000000',
    webPreferences: {
      webSecurity: false,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  if (isProd) {
    await mainWindow.loadURL('app://./home');
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/home`);
    mainWindow.webContents.openDevTools();
  }

  const toggleShortcut = process.platform === 'darwin' ? 'Command+O' : 'Alt+O';
  globalShortcut.register(toggleShortcut, () => {
    if (isVisible) mainWindow.hide();
    else mainWindow.show();

    isVisible = !isVisible;
  });

  setupAutoUpdater(mainWindow);
})();

app.on('window-all-closed', () => {
  app.quit();
});

ipcMain.on('message', async (event, arg) => {
  event.reply('message', `${arg} World!`);
});

ipcMain.handle('search-items', async (_, query: string) => {
  const db = ItemDB.getInstance();
  return db.searchByName(query);
});

ipcMain.on('app-close', () => {
  app.quit();
});

ipcMain.on('app-hide', () => {
  if (mainWindow) {
    mainWindow.hide();
    isVisible = false;
  }
});
