module.exports = {
  stories: ["../src/components/**/*.stories.@(js|jsx|ts|tsx|mdx)"],
  addons: [
    {
      name: "@storybook/addon-docs",
      options: {
        configureJSX: true,
        babelOptions: {},
        sourceLoaderOptions: null,
        transcludeMarkdown: true
      }
    }
  ],
  babel: async (options) => ({
    ...options,

    "plugins": [
      "@babel/plugin-proposal-optional-chaining",
      "@babel/plugin-transform-runtime",
    ]
  }),
  webpackFinal: async (config) => {
    config.module.rules[0].use[0].options.plugins[1] = [
      '@babel/plugin-proposal-class-properties',
      { loose: true }
    ]

    config.module.rules.push({
      test: /\.(stories|story)\.[tj]sx?$/,
      loader: require.resolve("@storybook/source-loader"),
      exclude: [/node_modules/],
      enforce: "pre"
    });

    config.resolve.extensions.push(".ts", ".tsx", ".mdx")

    return config
  }
}
