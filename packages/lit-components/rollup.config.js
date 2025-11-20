import path from 'path';
import { fileURLToPath } from 'url';
import alias from '@rollup/plugin-alias';
import del from 'rollup-plugin-delete';
import copy from 'rollup-plugin-copy';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export default {
  input: 'src/index.ts',
  output: [
    { file: 'dist/src/index.js', format: 'es', sourcemap: true },
    { file: 'dist/src/sql-referral-code.js', format: 'cjs', sourcemap: true },
  ],
  external: ['graphql-request', '@saasquatch/component-boilerplate',],
  plugins: [
    alias({
      entries: [
        {
          find: '@saasquatch/universal-hooks',
          replacement: path.resolve(__dirname, 'node_modules', 'haunted'),
        },
        {
          // prevent @saasquatch/stencil-hooks from being pulled in — point it at haunted (or a stub)
          find: '@saasquatch/stencil-hooks',
          replacement: path.resolve(__dirname, 'node_modules', 'haunted'),
        },
      ],
    }),
    // clean dist before build
    // del({ targets: 'dist/*' }),

    // // resolve node modules and commonjs packages
    nodeResolve({
      browser: true,
      preferBuiltins: false,
      extensions: ['.mjs', '.js', '.ts', '.json'],
    }),
    // commonjs({ transformMixedEsModules: true }),
    // // compile TypeScript
    typescript({
      tsconfig: './tsconfig.json',
      sourceMap: true,
      declaration: false, // disable .d.ts emission in rollup
      declarationDir: null,
    }),
    // copy({
    //   targets: [
    //     {
    //       src: 'node_modules/haunted/**',
    //       dest: 'dist/@saasquatch/universal-hooks',
    //     },
    //   ],
    //   hook: 'writeBundle',
    //   copyOnce: true,
    //   verbose: true,
    // }),
    // // after bundle is written, copy haunted into the dist path expected by consumers
    // copy({
    //   targets: [
    //     {
    //       src: 'node_modules/haunted/**',
    //       dest: 'dist/@saasquatch/universal-hooks',
    //     },
    //   ],
    //   hook: 'writeBundle',
    //   copyOnce: true,
    //   verbose: true,
    // }),
    // aliasPlugin,
    // // remove existing dist copy before building
    // del({
    //   targets: 'dist/@saasquatch/universal-hooks/*',
    //   runOnce: true,
    //   hook: 'buildStart',
    // }),
    // // ...other plugins (nodeResolve, commonjs, babel, etc.)...
    // // after bundle is written, copy the haunted package into dist/@saasquatch/universal-hooks
    // copy({
    //   targets: [
    //     {
    //       src: 'node_modules/haunted/**',
    //       dest: 'dist/@saasquatch/universal-hooks',
    //     },
    //   ],
    //   hook: 'writeBundle',
    //   copyOnce: true,
    //   verbose: true,
    // }),
  ],
};
