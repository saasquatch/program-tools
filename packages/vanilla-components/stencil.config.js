exports.config = {
  namespace: 'widget-components',
  generateDistribution: true,
  bundles: [
    { components: ['rewards-list', 'stats-component', 'text-component', 'rewards-actions', 'facebook-share-button', 'twitter-share-button', 'email-share-button','copy-link-button'] }
  ]
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**',
  httpPort: process.env.PORT || 3333
};
