import log from 'electron-log';
import { ipcMain } from 'electron';
import { BrowserWindow } from 'electron/main';
import { autoUpdater, UpdateDownloadedEvent, UpdateInfo } from 'electron-updater';

// 로깅 설정
autoUpdater.logger = log;

autoUpdater.autoDownload = true;
autoUpdater.autoInstallOnAppQuit = true;

export const setupUpdater = (mainWindow: BrowserWindow) => {
  // 업데이트 체크
  ipcMain.on('check-for-updates', () => autoUpdater.checkForUpdates());

  // 업데이트 설치 요청
  ipcMain.on('install-update', () => autoUpdater.quitAndInstall(false, true));

  // 업데이트 가능
  autoUpdater.on('update-available', (info: UpdateInfo) => {
    log.info('업데이트 가능', info);
    mainWindow.webContents.send('update-available', info);
  });

  // 업데이트 다운로드 완료
  autoUpdater.on('update-downloaded', (info: UpdateDownloadedEvent) => {
    log.info('업데이트 다운로드 완료', info);
    mainWindow.webContents.send('update-downloaded', info);
  });

  // 업데이트 오류 발생
  autoUpdater.on('error', (err: Error) => {
    log.error('업데이트 오류 발생', err);
    mainWindow.webContents.send('update-error', err.message);
  });
};
