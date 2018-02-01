exports.config = {
  namespace: 'widget-components',
  generateDistribution: true,
  bundles: [
    { components: ['my-app', 'referral-list', 'rewards-list', 'stats-component', 'text-component'] }
  ]
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**',
  httpPort: process.env.PORT || 3333
};
