import { createContext } from 'react';

import { type MainApi } from '@/api';

export type ApiContextValue = {
  main: MainApi
}

export const ApiContext = createContext<ApiContextValue | undefined>(undefined);
