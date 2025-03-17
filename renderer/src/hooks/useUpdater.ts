import { useEffect, useState } from 'react';
import { UpdateInfo } from 'electron-updater';

interface UpdaterOptions {
  onError?: (error: Error) => void;
}

export const useUpdater = (options: UpdaterOptions = {}) => {
  const [isAvailable, setIsAvailable] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isDownloaded, setIsDownloaded] = useState(false);

  const [updateInfo, setUpdateInfo] = useState<UpdateInfo | null>(null);

  const installUpdate = () => window.ipc.send('install-update');

  const clear = () => {
    setIsDownloading(false);
    setIsAvailable(false);
    setUpdateInfo(null);
  };

  useEffect(() => {
    /** 업데이트 가능 핸들러 */
    const handleUpdateAvailable = (_, info: UpdateInfo) => {
      setIsAvailable(true);
      setUpdateInfo(info);
    };

    /** 업데이트 다운로드 완료 핸들러 */
    const handleUpdateDownloaded = () => {
      setIsDownloaded(true);
      clear();
    };

    /** 업데이트 오류 핸들러 */
    const handleUpdateError = (_, error: Error) => {
      options.onError?.(error);
      clear();
    };

    window.ipc.on('update-available', handleUpdateAvailable);
    window.ipc.on('update-downloaded', handleUpdateDownloaded);
    window.ipc.on('update-error', handleUpdateError);

    // 앱 시작 시 업데이트 확인
    window.ipc.send('check-for-updates');

    return () => {
      window.ipc.off('update-available', handleUpdateAvailable);
      window.ipc.off('update-downloaded', handleUpdateDownloaded);
      window.ipc.off('update-error', handleUpdateError);
    };
  }, []);

  return {
    isAvailable,
    isDownloaded,
    isDownloading,
    updateInfo,
    installUpdate,
  };
};
