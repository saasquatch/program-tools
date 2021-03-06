const HtmlWebpackPlugin = require('html-webpack-plugin');
const pkg = require('./package.json');
const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const name = pkg.name;
let plugins = [];

module.exports = (env = {}) => {
  const isProd = env.production;

  if (isProd) {
    plugins = [
      new webpack.BannerPlugin(`${name} - ${pkg.version}`),
    ]
  } else {
    const index = 'index.html';
    const indexDev = '_' + index;
    plugins.push(new HtmlWebpackPlugin({
      template: fs.existsSync(indexDev) ? indexDev : index,
      inject: false,
    }));
  }

  return {
    entry: './src',
    mode: isProd ? 'production' : 'development',
    devtool: isProd ? 'source-map' : 'cheap-module-eval-source-map',
    output: {
        path: path.resolve(__dirname),
        filename: `dist/index.min.js`,
        library: 'vanillaComponentsGrapesjs',
        libraryTarget: 'umd',
    },
    module: {
      rules: [{
          test: /\.js$/,
          loader: 'babel-loader',
          include: /src/,
          query: {
            presets: ['react', 'es2015']
          }
      }],
    },
    externals: {'grapesjs': 'grapesjs', 'react': 'React', 'react-dom': 'ReactDOM', 'styled-components': 'styled', 'react-color': 'ReactColor'},
    plugins: plugins,
  };
}
