import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import gql from 'graphql-tag';

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
          const client = new ApolloClient({
            link: new HttpLink({ uri: 'https://api.githunt.com/graphql' }),
            cache: new InMemoryCache()
          });

          return client.query({
            query: gql`
              query {
                feed(type: TOP, limit: 5) {
                  repository {
                    full_name
                    owner {
                      login
                    }
                  }
                }
              }
            `
          })
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
