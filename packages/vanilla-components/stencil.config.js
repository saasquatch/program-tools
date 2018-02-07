exports.config = {
  namespace: 'widget-components',
  generateDistribution: true,
  bundles: [
    { components: [ 'sqh-rewards-list', 
                    'sqh-stats-component', 
                    'sqh-text-component', 
                    'sqh-rewards-actions', 
                    'sqh-facebook-share-button', 
                    'sqh-twitter-share-button', 
                    'sqh-email-share-button',
                    'sqh-linkedin-share-button',
                    'sqh-sms-share-button',
                    'sqh-whatsapp-share-button',
                    'sqh-copy-link-button'
                  ]}
  ]
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**',
  httpPort: process.env.PORT || 3333
};
