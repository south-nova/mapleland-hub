import path from 'path';
import { app, BrowserWindow, globalShortcut, ipcMain } from 'electron';
import serve from 'electron-serve';
import log from 'electron-log';

import { createWindow } from './helpers';
import { db } from './database/db';
import { setupUpdater } from './updater';

log.transports.console.level = 'debug';
log.transports.file.level = 'debug';

const isProd = process.env.NODE_ENV === 'production' || app.isPackaged;

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
    roundedCorners: false,
    backgroundColor: '#00000000',
    webPreferences: {
      webSecurity: false,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  try {
    if (isProd) {
      await mainWindow.loadURL('app://./home');
    } else {
      const port = process.argv[2];
      await mainWindow.loadURL(`http://localhost:${port}/home`);
      mainWindow.webContents.openDevTools();
    }
  } catch (error) {
    log.error('메인 윈도우 로드 실패:', error);
  }

  const toggleShortcut = process.platform === 'darwin' ? 'Command+O' : 'Alt+O';
  globalShortcut.register(toggleShortcut, () => {
    if (isVisible) mainWindow.hide();
    else mainWindow.show();

    isVisible = !isVisible;
  });

  setupUpdater(mainWindow);
})();

app.on('window-all-closed', () => {
  app.quit();
});

ipcMain.on('message', async (event, arg) => {
  event.reply('message', `${arg} World!`);
});

ipcMain.handle('search-items', async (_, query: string) => {
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
