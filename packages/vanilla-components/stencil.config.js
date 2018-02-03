exports.config = {
  namespace: 'widget-components',
  generateDistribution: true,
  bundles: [
    { components: ['rewards-list', 'stats-component', 'text-component', 'rewards-actions'] }
  ]
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**',
  httpPort: process.env.PORT || 3333
};
