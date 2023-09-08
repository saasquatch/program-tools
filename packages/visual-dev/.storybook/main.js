module.exports = {
  stories: ["../src/components/**/*.stories.@(js|jsx|ts|tsx|mdx)"],
  addons: [
    {
      name: "@storybook/addon-docs",
      options: {
        configureJSX: true,
        babelOptions: {},
        sourceLoaderOptions: null,
        transcludeMarkdown: true,
      },
    },
  ],
  babel: async (options) => ({
    ...options,
  }),
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.(stories|story)\.[tj]sx?$/,
      loader: require.resolve("@storybook/source-loader"),
      exclude: [/node_modules/],
      enforce: "pre",
    });
    config.resolve.extensions.push(".ts", ".tsx", ".mdx");
    return config;
  },
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  docs: {
    autodocs: true,
  },
};
