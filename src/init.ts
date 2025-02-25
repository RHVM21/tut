import {
  backButton,
  init as initSDK,
  initData,
  miniApp,
  settingsButton,
  swipeBehavior,
  themeParams,
  viewport,
} from '@telegram-apps/sdk-react';

export default async function init(): Promise<void> {
  initSDK();

  if (!backButton.isSupported() || !miniApp.isSupported()) {
    throw new Error('ERR_NOT_SUPPORTED');
  }

  if (settingsButton.isSupported()) {
    settingsButton.mount();
    settingsButton.show();
  }

  backButton.mount();
  await miniApp.mount();
  await themeParams.mount();
  initData.restore();

  void viewport
    .mount()
    .catch((e: unknown) => {
      console.error('Something went wrong mounting the viewport', e);
    })
    .then(() => {
      viewport.bindCssVars();
      if (!viewport.isExpanded()) {
        viewport.expand();
      }
    });

  if (swipeBehavior.isSupported() && !swipeBehavior.isMounted()) {
    swipeBehavior.mount();
    if (swipeBehavior.isVerticalEnabled()) {
      swipeBehavior.disableVertical();
    }
  }

  miniApp.bindCssVars();
  themeParams.bindCssVars();
}
