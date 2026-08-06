import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

/**
 * Build da biblioteca (library mode).
 *
 * Gera:
 *   dist/dilis-ui.js    (ESM)
 *   dist/dilis-ui.cjs   (CommonJS)
 *   dist/dilis-ui.css   (todos os estilos num arquivo so)
 *   dist/index.d.ts     (tipos)
 *
 * react e react-dom ficam como external (peer dependency), entao
 * nao sao empacotados junto.
 */
export default defineConfig({
  plugins: [
    react(),
    dts({
      include: ['src'],
      exclude: ['src/**/*.test.*', 'demo'],
      rollupTypes: true,
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'DilisUI',
      formats: ['es', 'cjs'],
      fileName: (format) => (format === 'es' ? 'dilis-ui.js' : 'dilis-ui.cjs'),
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        assetFileNames: 'dilis-ui.[ext]',
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
    sourcemap: true,
  },
});
