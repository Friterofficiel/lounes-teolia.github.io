// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: 'https://friterofficiel.github.io/lounes-teolia.github.io/', // Assurez-vous que ce chemin est correct
});
