import { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { ApiContext } from '@/contexts/ApiContext';

export default function useApi() {
  const api = useContext(ApiContext);
  const { t } = useTranslation();
  if (!api) {
    throw new Error(t('u forgot to use ApiProvider :'));
  }

  return api;
}
