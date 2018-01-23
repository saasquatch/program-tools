exports.config = {
  namespace: 'widget-components',
  generateDistribution: true,
  generateWWW: false,
  bundles: [
    { components: ['my-app'] }
  ]
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
};
