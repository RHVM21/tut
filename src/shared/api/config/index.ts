import { retrieveRawInitData } from '@telegram-apps/sdk-react';
import axios from 'axios';

const initData = retrieveRawInitData();
console.log('initData:', initData);

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL as string,
  headers: {
    authorization: `tma ${String(initData ?? '')}`,
    'Content-Type': 'application/json',
  },
});

export default api;
