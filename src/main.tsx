import '@/locales/i18n';
import '@/polyfills';
import '@/index.css';

import ReactDOM from 'react-dom/client';
import { useTranslation } from 'react-i18next';

import App from '@/App';
import init from '@/init.ts';
import RootProvider from '@/providers/RootProvider';

const rootEl = document.getElementById('root');

if (rootEl === null) {
  throw new Error('#root not found');
}

const root = ReactDOM.createRoot(rootEl);

function ErrorMessage({ error }: { error: unknown }) {
  const { t } = useTranslation();
  return (
    <p>
      {t('not_supported')}
      :
      {String(error)}
    </p>
  );
}

try {
  void init();
  root.render(
    <RootProvider>
      <App />
    </RootProvider>,
  );
} catch (error) {
  root.render(<ErrorMessage error={error} />);
}
