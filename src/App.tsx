import { retrieveLaunchParams } from '@telegram-apps/sdk-react';
import { useEffect, useState } from 'react';
import {
  HashRouter as Router, Route, Routes,
  useNavigate,
} from 'react-router-dom';

import { createApi } from '@/api';

import type { ProfileResponse } from './api/types';
import i18n from './locales/i18n';
import FirstPage from './pages/First/FirstPage';
import PreloaderPage from './pages/Preloader/PreloaderPage';
import SecondPage from './pages/Second/SecondPage';
import ThirdPage from './pages/Third/ThirdPage';

function App(): JSX.Element {
  const { tgWebAppData } = retrieveLaunchParams();
  const debug = tgWebAppData?.start_param === 'debug';
  const api = createApi();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const userLanguage = tgWebAppData?.user?.language_code ?? 'en';
    void i18n.changeLanguage(userLanguage);
    const initApp = async () => {
      if (isInitialized) return;

      try {
        const profileData: ProfileResponse = await api.main.init();
        console.log('Profile Data:', profileData);
        console.log('Categories length:', profileData.user_categories.length);
        await new Promise((resolve) => { setTimeout(resolve, 2500); });

        const route = profileData.user_categories.length > 0 ? '/second' : '/main';
        console.log('Setting route to:', route);
        void navigate(route, { replace: true });
        setIsInitialized(true);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to initialize app:', error);
        void navigate('/main', { replace: true });
        setIsLoading(false);
      }
    };
    void initApp();
  }, [debug, api, navigate, isInitialized, tgWebAppData]);

  if (isLoading) {
    return <PreloaderPage />;
  }

  return (
    <Routes>
      <Route path="/main" element={<FirstPage />} />
      <Route path="/second" element={<SecondPage />} />
      <Route path="/third" element={<ThirdPage />} />
    </Routes>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
