import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    lib: {
      entry: 'src/widget.tsx',
      name: 'SoundInformer',
      fileName: 'sound-informer',
      formats: ['iife'],
    },
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
      },
    },
  },
})
