import type axios from 'axios';
import memoizeOne from 'memoize-one';

import { MainApiImpl } from '@/api/main';
import { type ApiContextValue } from '@/contexts/ApiContext';
import $api from '@/shared/api/config';

const apiInstance = (): ApiContextValue => ({ main: new MainApiImpl($api as typeof axios) });
export const createApi = memoizeOne(apiInstance);
export { type MainApi, MainApiImpl } from '@/api/main';
