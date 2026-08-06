import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * Config do app de demonstracao (a mural).
 * Importa a lib direto do src via alias, entao qualquer edicao em
 * src/ reflete na hora, sem precisar buildar a lib antes.
 */
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@dilis/ui': resolve(__dirname, 'src/index.ts'),
    },
  },
  server: {
    port: 5173,
    open: true,
  },
  build: {
    outDir: 'dist-demo',
  },
});
