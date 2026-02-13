import type { StorybookConfig } from "@storybook/web-components-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-essentials"],
  framework: {
    name: "@storybook/web-components-vite",
    options: {},
  },
  staticDirs: [
    // Serve Stencil's compiled output so lazy-loaded chunks resolve
    { from: "../dist/mint-components", to: "/build/mint-components" },
    // Shoelace assets
    { from: "../shoelace", to: "/shoelace" },
  ],
};

export default config;
