import { defineConfig } from 'vite';
import alias from '@rollup/plugin-alias';

export default defineConfig({
  root: './',
  server: {
    host: 'localhost',
    port: 5173,
    open: '/demo.html',
    hmr: {
      host: 'localhost',
      port: 5173,
    },
  },
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'LitComponents',
      formats: ['es'],
      fileName: () => 'index.js',
    },
    rollupOptions: {
      plugins: [
        alias({
          entries: [
            {
              find: '@saasquatch/universal-hooks',
              replacement: 'haunted',
            },
          ],
        }),
      ],
      external: ['lit', 'haunted'],
      output: {
        globals: {
          lit: 'lit',
          haunted: 'haunted',
        },
      },
    },
  },
});
