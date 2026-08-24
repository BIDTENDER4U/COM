import path from 'path';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

// IMPORTANT for GitHub Pages:
// If you deploy to https://<username>.github.io/<repo-name>/ set base to '/<repo-name>/'
// If you deploy to https://<username>.github.io/ (a "username.github.io" repo) OR to a custom domain, set base to '/'
export default defineConfig({
  base: '/COM/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, 'src'),
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});
