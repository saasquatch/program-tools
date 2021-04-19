import { Config } from '@stencil/core';
import alias from '@rollup/plugin-alias';
import { grapesJsOutput } from '@saasquatch/stencil-grapes-plugin';
import { OutputTarget } from '@stencil/core/internal';
import path from 'path';

const useGrapesjs: OutputTarget = grapesJsOutput({});

export const config: Config = {
  namespace: 'bedrock-components',
  buildEs5: true,
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
};
