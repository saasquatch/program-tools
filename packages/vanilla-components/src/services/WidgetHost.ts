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

const today = new Date();

const demoUser = {
  shareLink: "http://sharelink.squatch.com",
  messageLink: "http://short.staging.referralsaasquatch.com/mwjExk",
  referrals: {
    totalCount: 8,
    data: [
      { dateReferralStarted: today.setDate(today.getDate()-2), referredUser: { firstName: "Remus", lastName: "Lupin" }, rewards: [{ prettyValue: "$20.00" },{ prettyValue: "$10.00" },{ prettyValue: "$5.00" },] },
      { dateReferralStarted: today.setDate(today.getDate()-1), referredUser: { firstName: "Gellert", lastName: "Grindelwald" }, rewards: [] },
      { dateReferralStarted: today.setDate(today.getDate()-1), referredUser: { firstName: "Seamus", lastName: "Finnigan" }, rewards: [{ prettyValue: "$20.00" }] },
      { dateReferralStarted: today.setDate(today.getDate()-5), referredUser: { firstName: "Lavender", lastName: "Brown" }, rewards: [{ prettyValue: "$20.00" }] },
      { dateReferralStarted: today.setDate(today.getDate()-4), referredUser: { firstName: "Blaise", lastName: "Zabini" }, rewards: [{ prettyValue: "$20.00" },{ prettyValue: "$10.00" },] },
      { dateReferralStarted: today.setDate(today.getDate()-10), referredUser: { firstName: "Argus", lastName: "Filch" }, rewards: [] },
      { dateReferralStarted: today.setDate(today.getDate()-15), referredUser: { firstName: "Ron", lastName: "Weasley" }, rewards: [{ prettyValue: "$20.00" }] },
      { dateReferralStarted: today.setDate(today.getDate()-2), referredUser: { firstName: "Hermione", lastName: "Granger" }, rewards: [{ prettyValue: "$20.00" },{ prettyValue: "$10.00" },{ prettyValue: "$5.00" },{ prettyValue: "5%" },{ prettyValue: "5%" },{ prettyValue: "5%" },] },
    ]
  },
  referredByReferral: { dateReferralStarted: today.setDate(today.getDate()-2), referrerUser: { firstName: "Rubeus", lastName: "Hagrid" }, rewards: [{ prettyValue: "$10.00" }] },
  referralsMonth: { totalCount: 6 },
  referralsWeek:  { totalCount: 3 },
  rewardsCount: { totalCount: 14 },
  rewardsMonth: { totalCount: 7 },
  rewardsWeek: { totalCount: 4 },
  rewardBalances: [
    { type: "CREDIT", unit: "CENTS", value: 17000, prettyValue: "$170.00", totalAssignedCredit: "170000", totalRedeemedCredit: "0" },
    { type: "PCT_DISCOUNT", unit: "%", value: 15, prettyValue: "15%" },
  ],
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
      const widgetId = widgetIdent();

      if (widgetId["env"] === "demo" || !widgetId) return Promise.resolve(demoUser.shareLink);

      const { userId, accountId, programId = null, mode } = widgetId;

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
      const widgetId = widgetIdent();

      if (widgetId["env"] === "demo" || !widgetId) {
        const { referrals: refs, referredByReferral } = demoUser;
        const referrals = {
          totalCount: refs.totalCount,
          data: refs.data.slice(offset, offset + limit)
        }
        const user = { referrals, referredByReferral };
        return Promise.resolve(user);
      }

      const { userId, accountId, programId = null } = widgetId;

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
      }).then(res => res.data.user);
    },

    getStats() {
      const widgetId = widgetIdent();

      if (widgetId["env"] === "demo" || !widgetId) {
        const { 
          referrals: referralsCount,
          referralsMonth,
          referralsWeek,
          rewardsCount,
          rewardsMonth,
          rewardsWeek,
          rewardBalances 
        } = demoUser;
        const user = { 
          referralsCount,
          referralsMonth,
          referralsWeek,
          rewardsCount,
          rewardsMonth,
          rewardsWeek,
          rewardBalances 
        };
        return Promise.resolve(user);
      }

      const { userId, accountId, programId = null } = widgetId;

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
      }).then(res => res.data.user);
    },

    getMessageLinks(type){
      const widgetId = widgetIdent();

      if (widgetId["env"] === "demo" || !widgetId) return Promise.resolve(demoUser.messageLink);

      const { userId, accountId, programId = null, mode } = widgetId;

      const variables = {
        userId,
        accountId,
        programId,
        mode
      };

      return this.getClient(test).query({
        query: gql`
          query($userId: String!, $accountId: String!, $programId: ID, $mode: UserEngagementMedium) {
            user(id: $userId, accountId: $accountId) {
              messageLink(programId: $programId, engagementMedium: ${type}, shareMedium: $mode)
            }
          }
        `,
        variables
      }).then(res => res.data.user.messageLink);
    },

  },
  ui: squatchJsApi
};

export { API };
