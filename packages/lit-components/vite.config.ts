/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import alias from '@rollup/plugin-alias';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';
const dirname =
  typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  root: './',
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
  },
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
      // Don't externalize dependencies for browser usage
      // If you need a version for npm that externalizes deps, use a separate build
      external: [],
      output: {
        // Preserve module structure for tree-shaking
        preserveModules: false,
      },
    },
  },
  test: {
    projects: [
      {
        extends: true,
        plugins: [
          // The plugin will run tests for the stories defined in your Storybook config
          // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
          storybookTest({
            configDir: path.join(dirname, '.storybook'),
          }),
        ],
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            instances: [
              {
                browser: 'chromium',
              },
            ],
          },
          setupFiles: ['.storybook/vitest.setup.ts'],
        },
      },
    ],
  },
});
