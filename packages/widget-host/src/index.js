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
          });
        },
        getRewardBalances() {
          const host = window.HOST ? window.HOST : 'https://staging.referralsaasquatch.com';
          const tenant = window.TENANT ? window.TENANT : "TODO";
          const uri = `${host}/api/v1/${tenant}/graphql`;
          
          const userId = "TODO";
          const accountId = "TODO";
          const token = "TODO";
          
          const client = new ApolloClient({
            link: new HttpLink({ uri }),
            cache: new InMemoryCache()
          });

          return client.query({
            query: gql`
              query($userId: String!, $accountId) {
                user()
              }
            `,
            variables:{
              userId,
              accountId
            },
            context: {
              // example of setting the headers with context per operation
              headers: {
                'x-saasquatch-token': token
              }
            }
          });
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
