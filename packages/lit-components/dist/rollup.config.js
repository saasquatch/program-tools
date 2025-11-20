import path from 'path';
import alias from '@rollup/plugin-alias';
export default {
    input: 'src/index.ts',
    output: [
        { file: 'dist/src/index.js', format: 'es', sourcemap: true },
        { file: 'dist/src/sql-referral-code.js', format: 'cjs', sourcemap: true },
    ],
    plugins: [
        alias({
            entries: [
                {
                    find: '@saasquatch/universal-hooks',
                    replacement: path.resolve(__dirname, 'node_modules', 'haunted'),
                },
            ],
        }),
        // clean dist before build
        // del({ targets: 'dist/*' }),
        // // resolve node modules and commonjs packages
        // nodeResolve({ browser: true, preferBuiltins: false }),
        // commonjs(),
        // // compile TypeScript
        // typescript({ tsconfig: './tsconfig.json', sourceMap: true }),
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
//# sourceMappingURL=rollup.config.js.map