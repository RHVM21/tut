import type { ComponentType, JSX } from 'react';

import FirstPage from '@/pages/First/FirstPage';
import PreloaderPage from '@/pages/Preloader/PreloaderPage';
import SecondPage from '@/pages/Second/SecondPage';
import ThirdPage from '@/pages/Third/ThirdPage';

type Route = {
  path: string;
  Component: ComponentType;
  title?: string;
  icon?: JSX.Element;
};

const routes: Route[] = [
  {
    path: '/',
    Component: PreloaderPage,
    title: 'Preloader',
  },
  {
    path: '/main',
    Component: FirstPage,
    title: 'First Page',
  },
  {
    path: '/second',
    Component: SecondPage,
    title: 'Second Page',
  },
  {
    path: '/third',
    Component: ThirdPage,
    title: 'Third Page',
  },
];

export default routes;
