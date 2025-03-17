import { useEffect, useState } from 'react';

export const useAppVersion = () => {
  const [appVersion, setAppVersion] = useState('');

  useEffect(() => {
    setAppVersion(window.ipc.getAppVersion());
  }, []);

  return appVersion;
};
