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
  programId: string;
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

if (!window["widgetIdent"]) {
  window["widgetIdent"] = {
    env: "demo"
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

    getShareLink() {
      const { userId, accountId, programId, mode } = widgetIdent();

      const variables = {
        userId,
        accountId,
        programId,
        mode
      };

      return this.getClient().query({
        query: gql`
          query($userId: String!, $accountId: String!, $programId: ID, $mode: UserEngagementMedium) {
            user(id: $userId, accountId: $accountId) {
              shareLink(programId: $programId, engagementMedium: $mode, shareMedium: DIRECT)
            }
          }
        `,
        variables
      }).then(res => res.data.user.shareLink);
    },

    getReferrals(offset = 0, limit = 3) {
      const { userId, accountId, programId = null } = widgetIdent();

      const variables = {
        limit,
        offset,
        userId,
        accountId,
        programId,
        programId_exists: programId ? true : false
      };

      return this.getClient().query({
        query: gql`
          query(
            $userId: String!,
            $accountId: String!,
            $offset: Int!,
            $limit: Int!,
            $programId: ID,
            $programId_exists: Boolean!
          ) {
            user(id: $userId, accountId: $accountId) {
              referrals(limit: $limit, offset: $offset, filter: {
                programId_eq: $programId
                programId_exists: $programId_exists
              }) {
                totalCount
                data {
                  dateReferralStarted
                  referredUser {
                    firstName
                    lastName
                  }
                  rewards (filter: {
                    userId_eq: $userId
                    accountId_eq: $accountId
                  }) {
                    prettyValue
                  }
                }
              }
              referredByReferral(programId: $programId) {
                referrerUser {
                  firstName
                  lastName
                }
                dateReferralStarted
                rewards(filter: {
                  userId_eq: $userId
                  accountId_eq: $accountId
                }) {
                  prettyValue
                }
              }
            }
          }
        `,
        variables
      });
    },

    getStats() {
      const { userId, accountId, programId = null } = widgetIdent();

      const variables = {
        userId,
        accountId,
        programId,
        programId_exists: programId ? true : false
      };

      return this.getClient().query({
        query: gql`
        query(
          $userId: String!,
          $accountId: String!,
          $programId: ID,
          $programId_exists: Boolean!
        ) {
          user(id: $userId, accountId: $accountId) {
            referralsCount: referrals(filter: {
              programId_eq: $programId
              programId_exists: $programId_exists
            }) {
              totalCount
            }
            referralsMonth: referrals(filter: {
              programId_eq: $programId
              programId_exists: $programId_exists
              dateReferralStarted_timeframe: "this_month"
            }) {
              totalCount
            }
            referralsWeek: referrals(filter: {
              programId_eq: $programId
              programId_exists: $programId_exists
              dateReferralStarted_timeframe: "this_week"
            }) {
              totalCount
            }
            rewardsCount: rewards(filter: {
              programId_eq: $programId
              programId_exists: $programId_exists
            }) {
              totalCount
            }
            rewardsMonth: rewards(filter: {
              programId_eq: $programId
              programId_exists: $programId_exists
              dateGiven_timeframe: "this_month"
            }) {
              totalCount
            }
            rewardsWeek: rewards(filter: {
              programId_eq: $programId
              programId_exists: $programId_exists
              dateGiven_timeframe: "this_week"
            }) {
              totalCount
            }
            rewardBalances(programId: $programId)
          }
        }
        `,
        variables
      })
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
