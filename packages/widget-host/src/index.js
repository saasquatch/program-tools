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
    getClient(){
      const tenantAlias = window.widgetIdent.tenantAlias;
      const domain = window.widgetIdent.appDomain;
      const uri = domain + "/api/v1/" + tenantAlias + "/graphql";
      const headers = {
        'Authorization' : `Bearer ${window.widgetIdent.token}`
      }
      const client = new ApolloClient({
        link: new HttpLink({ uri, headers }),
        cache: new InMemoryCache()
      });
      return client;
    },

    getUserFragment(userFragment, fragmentVariables) {
      const fragment = gql`
          fragment UserFragment on User {
            ${userFragment}
          }`

      const variables = {
        ... fragmentVariables,
        userId : window.widgetIdent.userId,
        accountId : window.widgetIdent.accountId
      }

      return this.getClient().query({
        query: gql`
            query ($userId:String!, $accountId:String!, $offset: Int!) {
              user(id: $userId, accountId: $accountId) {
                ... UserFragment
              }
            }
            ${fragment}
          `
          ,
          variables
      })
    },

    getReferrals(offset = 0) {
      return this.getUserFragment(`
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
      `, { offset });
    },

    getRewardBalances() {
      return getUserFragment(gql`
        rewardBalances
      `);
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
