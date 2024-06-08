// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/lounes-teolia.github.io/front/', // Assurez-vous que ce chemin est correct
});
