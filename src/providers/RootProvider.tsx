import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { type PropsWithChildren, useMemo } from 'react';

import { createApi } from '@/api';
import { ApiContext } from '@/contexts/ApiContext';

function RootProvider({ children }: PropsWithChildren) {
  const manifestUrl = useMemo(
    () => new URL('tonconnect-manifest.json', window.location.href).toString(),
    [],
  );

  return (

    <TonConnectUIProvider manifestUrl={manifestUrl}>
      <ApiContext.Provider value={createApi()}>
        {children}
      </ApiContext.Provider>
    </TonConnectUIProvider>

  );
}

export default RootProvider;
