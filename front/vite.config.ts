import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/lounes-teolia.github.io/', // Mettez ici le chemin correct vers votre sous-répertoire
});
