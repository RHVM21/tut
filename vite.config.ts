import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import { VitePWA } from 'vite-plugin-pwa';
// https://vitejs.dev/config/

const BASE_URL = process.env.VITE_BASE_URL ?? '/';

export default defineConfig({
  base: BASE_URL,
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [
    react(),
    ViteImageOptimizer(),
    VitePWA({
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'icon.svg'],
      manifest: {
        name: 'TuTNEWS',
        short_name: 'TuTNEWS',
        description: 'News application in telegram!',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,jpg,svg}'],
        maximumFileSizeToCacheInBytes: 3 * 1024 * 1024,
      },
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          rr: ['react', 'react-dom', 'react-router-dom'],
          tcui: ['@tonconnect/ui-react'],
        },
      },
    },
  },
});
