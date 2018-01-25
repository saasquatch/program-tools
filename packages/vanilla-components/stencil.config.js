exports.config = {
  namespace: 'widget-components',
  generateDistribution: true,
  bundles: [
    { components: ['my-app'] }
  ]
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
};
