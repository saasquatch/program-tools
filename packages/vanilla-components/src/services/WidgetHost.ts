import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import gql from "graphql-tag";

export interface WidgetIdent {
  tenantAlias: string;
  appDomain: string;
  token: string;
  userId: string;
  accountId: string;
  mode: "POPUP" | "EMBED" | string;
}

/**
 * Links up to Squatch.js running in the parent frame, and exposes an API for trigger things outside of the scope of a single widget.
 */
export interface SquatchJSApi {
  // Opens the current popup widget.
  open();

  // Closes the current popup widget.
  close();
}

// TODO: This might not want to be hard-coded.
if (!window["widgetIdent"]) {
  window["widgetIdent"] = {
    mode: "POPUP",
    locale: "en_US",
    tenantAlias: "test_ahq6tdmfclzwx",
    appDomain: "https://staging.referralsaasquatch.com",
    userId: "5b3ead41e4b0d9a2cf439e86",
    accountId: "DVVJFP7R7GPT0J75",
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWIzZWFkNDFlNGIwZDlhMmNmNDM5ZTg2IiwiYWNjb3VudElkIjoiRFZWSkZQN1I3R1BUMEo3NSJ9fQ.lrNCyo-RKFnF6ruEQEpBi75gsVqB3JxjHgrYIGzKpgI"
  };
}

export function widgetIdent(): WidgetIdent {
  //@ts-ignore
  return window.widgetIdent;
}

//@ts-ignore
const squatchJsApi = window.frameElement ? window.frameElement.squatchJsApi : {};

const API = {
  version: "Welcome to widget-host",
  analytics: {
    shareEvent(type: string) {
      return Promise.resolve({ event: "shareEvent", type });
    },
    loadEvent() {
      return Promise.resolve({ event: "loadEvent" });
    }
  },
  graphql: {
    getClient() {
      const { tenantAlias, appDomain, token } = widgetIdent();
      const uri = appDomain + "/api/v1/" + tenantAlias + "/graphql";
      const headers = {
        Authorization: `Bearer ${token}`
      };
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
          }`;

      const { userId, accountId } = widgetIdent();

      const variables = {
        ...fragmentVariables,
        userId,
        accountId
      };

      return this.getClient().query({
        query: gql`
          query($userId: String!, $accountId: String!, $offset: Int) {
            user(id: $userId, accountId: $accountId) {
              ...UserFragment
            }
          }
          ${fragment}
        `,
        variables
      });
    },

    getReferrals(offset = 0) {
      return this.getUserFragment(
        `
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
      `,
        { offset }
      );
    },

    getRewardBalances() {
      return this.getUserFragment(gql`
        rewardBalances
      `);
    }
  },
  ui: squatchJsApi
};

export { API };
