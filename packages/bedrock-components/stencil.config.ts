import { Config } from '@stencil/core';
import alias from '@rollup/plugin-alias';
import { grapesJsOutput } from '@saasquatch/stencil-grapes-plugin';
import { OutputTarget } from '@stencil/core/internal';
import { string } from 'rollup-plugin-string';
import path from 'path';

const useGrapesjs: OutputTarget = grapesJsOutput({
  outDir: 'grapesjs',
});

export const config: Config = {
  namespace: 'bedrock-components',
  buildEs5: true,
  globalScript: 'src/global/global.ts',
  outputTargets: [
    {
      type: 'dist',
    },
    {
      type: 'dist-custom-elements-bundle',
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },
    useGrapesjs,
  ],
  plugins: [string({ include: '**/*.feature' })],
  rollupPlugins: {
    before: [
      alias({
        entries: [
          {
            find: '@saasquatch/universal-hooks',
            replacement: path.resolve(__dirname, 'node_modules', '@saasquatch/stencil-hooks'),
          },
        ],
      }),
    ],
  },
  extras: {
    /** https://stenciljs.com/docs/config-extras#appendchildslotfix */
    appendChildSlotFix: true,
    /** https://stenciljs.com/docs/config-extras#clonenodefix */
    cloneNodeFix: true,
    /** https://stenciljs.com/docs/config-extras#slotchildnodesfix */
    slotChildNodesFix: true,
  },
};
