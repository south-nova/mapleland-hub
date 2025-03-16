import { ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import { BrowserWindow } from 'electron/main';

// 로깅 설정
autoUpdater.logger = log;
log.transports.file.level = 'info';

// 자동 다운로드 비활성화 (사용자 확인 후 다운로드)
autoUpdater.autoDownload = false;
autoUpdater.autoInstallOnAppQuit = true;

export const setupAutoUpdater = (mainWindow: BrowserWindow) => {
  // 앱 시작 시 업데이트 확인
  autoUpdater.checkForUpdates();

  // 업데이트 이벤트 처리
  autoUpdater.on('checking-for-update', () => {
    log.info('업데이트 확인 중...');
  });

  autoUpdater.on('update-available', (info) => {
    log.info('업데이트 가능:', info);
    // 렌더러에 업데이트 가능 알림
    mainWindow.webContents.send('update-available', {
      version: info.version,
      releaseDate: info.releaseDate,
    });
  });

  autoUpdater.on('update-not-available', (info) => {
    log.info('업데이트 없음:', info);
    mainWindow.webContents.send('update-not-available');
  });

  autoUpdater.on('download-progress', (progressObj) => {
    let message = `다운로드 속도: ${progressObj.bytesPerSecond}`;
    message += ` - 다운로드: ${progressObj.percent}%`;
    message += ` (${progressObj.transferred}/${progressObj.total})`;
    log.info(message);
    // 렌더러에 진행 상황 전송
    mainWindow.webContents.send('download-progress', progressObj);
  });

  autoUpdater.on('update-downloaded', (info) => {
    log.info('업데이트 다운로드 완료:', info);
    // 렌더러에 업데이트 다운로드 완료 알림
    mainWindow.webContents.send('update-downloaded', info);
  });

  autoUpdater.on('error', (err) => {
    log.error('업데이트 오류:', err);
    // 렌더러에 오류 알림
    mainWindow.webContents.send('update-error', err.message);
  });

  // 렌더러에서 업데이트 다운로드 요청 처리
  ipcMain.on('download-update', () => {
    log.info('업데이트 다운로드 시작');
    autoUpdater.downloadUpdate();
  });

  // 렌더러에서 업데이트 설치 요청 처리
  ipcMain.on('install-update', () => {
    log.info('업데이트 설치 및 재시작');
    autoUpdater.quitAndInstall(false, true);
  });

  // 렌더러에서 업데이트 확인 요청 처리
  ipcMain.on('check-for-updates', () => {
    log.info('업데이트 확인 요청 수신');
    autoUpdater.checkForUpdates();
  });
};
