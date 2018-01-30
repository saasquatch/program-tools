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
    getReferrals(offset = 0) {
      const tenantAlias = window.frameElement.squatchJsApi.widgetApi.tenantAlias;
      const domain = window.frameElement.squatchJsApi.widgetApi.domain;
      const uri = domain + "/api/v1/" + tenantAlias + "/graphql";

      const demo = window.parent.demo; // TODO currently only test app, but this should be made accessible via squatch-js
      const token = demo.token;

      const client = new ApolloClient({
        link: new HttpLink({ uri }),
        cache: new InMemoryCache()
      });

      const variables = {
        offset,
        userId : demo.userId,
        accountId : demo.accountId
      }

      return client.query({
        query: gql`
              query ($userId: String!, $accountId: String!, $offset: Int!) {
                user(id: $userId, accountId: $accountId) {
                  referrals(limit: 10, offset: $offset) {
                    count
                    totalCount
                    data {
                      id
                      dateReferralStarted
                      dateReferralPaid
                      dateReferralEnded
                      referrerReward {
                        type
                        value
                        unit
                        name
                      }
                      moderationStatus
                      referredUser {
                        firstName
                        lastName
                        imageUrl
                      }
                    }
                  }
                  rewardBalances
                }
              }`
        ,
        variables,
        context: {
          headers: {
            'X-SaaSquatch-User-Token' : token
          }
        }
      })

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
        variables: {
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
