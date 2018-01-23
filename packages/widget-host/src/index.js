import ApolloClient from 'apollo-client';

console.log(ApolloClient);

const API = {
    version: 'Welcome to widget-host',
    analytics: {
        shareEvent() {
            return Promise.resolve({ event: "shareEvent" });
        },
        loadEvent() {
            return Promise.resolve({ event: "loadEvent" });
        }
    },
    graphql: {
        getCurrentUser() {
            return Promise.resolve({ user: "321" });
        }
    },
    ui: {
        open() {
            window.frameElement.squatchJsApi.open();
        },
        close() {
            window.frameElement.squatchJsApi.close();
        }
    }
};

export default API;
