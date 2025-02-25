/* eslint-disable consistent-return */
import { hapticFeedback } from '@telegram-apps/sdk-react';
import { useEffect } from 'react';

import Logo from '../../images/Logo';

function PreloaderPage(): JSX.Element {
  useEffect(() => {
    if (hapticFeedback.isSupported()) {
      hapticFeedback.notificationOccurred('warning');

      const interval = setInterval(() => {
        hapticFeedback.impactOccurred('light');
      }, 600);

      return () => { clearInterval(interval); };
    }
  }, []);

  return (
    <div className="px-2 h-screen w-full max-w-[382px] mx-auto flex flex-col">
      <div className="flex-1 flex items-center justify-center">
        <Logo width={100} height={100} className="w-[150px]" />

      </div>
      <div className="flex gap-2 justify-center mb-10">
        <div className="w-2 h-2 rounded-full bg-[#FF7A28] animate-bounce" style={{ animationDelay: '0s' }} />
        <div className="w-2 h-2 rounded-full bg-[#FF7A28] animate-bounce" style={{ animationDelay: '0.2s' }} />
        <div className="w-2 h-2 rounded-full bg-[#FF7A28] animate-bounce" style={{ animationDelay: '0.4s' }} />
      </div>
    </div>
  );
}

export default PreloaderPage;
