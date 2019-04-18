const sass = require('@stencil/sass');

exports.config = {
  namespace: 'widget-components',
  outputTargets: [
    {
      type: 'dist'
    },
    { 
      type: 'www',
      serviceWorker: false
    }
  ],
  plugins: [
    sass()
  ]
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**',
  httpPort: process.env.PORT || 3333
};
