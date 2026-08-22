import path from 'node:path';
import { fileURLToPath } from 'node:url';
import tailwindcss from '@tailwindcss/postcss';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  base: '/dandiya-microsite/',
  root: path.join(projectRoot, 'pages-preview'),
  publicDir: path.join(projectRoot, 'public'),
  css: { postcss: { plugins: [tailwindcss()] } },
  plugins: [react()],
  resolve: {
    alias: {
      'next/image': path.join(projectRoot, 'pages-preview/next-image.tsx'),
    },
  },
  build: {
    outDir: path.join(projectRoot, 'dist-pages'),
    emptyOutDir: true,
  },
});
