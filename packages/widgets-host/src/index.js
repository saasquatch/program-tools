const API = {
    version: 'Welcome to widget-host',
    analytics: {
        shareEvent(){
            return Promise.resolve({event:"shareEvent"});
        }
    },
    graphql: {
        getCurrentUser(){
            return Promise.resolve({user:"123"});
        }
    },
    ui: {
        open(){
            window.frameElement.squatchJsApi.open();
        },
        close(){
            window.frameElement.squatchJsApi.open();
        }
    }
};

export default API;