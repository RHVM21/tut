import { Buffer } from 'buffer';

declare global {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Window {
    Buffer: typeof Buffer;
  }
}

// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
if (window && !window.Buffer) {
  window.Buffer = Buffer;
}
