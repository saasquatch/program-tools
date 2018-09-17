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
  engagementMedium: "POPUP" | "EMBED" | string;
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
  fueltankCode: "12AS3F",
  referralcode: "RIDDIKULUS",
  messageLink: {
    EMAIL: "http://short.staging.referralsaasquatch.com/mJjFXu",
    FACEBOOK: "http://short.staging.referralsaasquatch.com/mwjFXu",
    TWITTER: "http://short.staging.referralsaasquatch.com/mwjFXu",
    SMS: "http://short.staging.referralsaasquatch.com/mwjFXu",
    WHATSAPP: "http://short.staging.referralsaasquatch.com/mwjFXu",
    LINKEDIN: "http://short.staging.referralsaasquatch.com/mwjFXu",
    PINTEREST: "http://short.staging.referralsaasquatch.com/mwjFXu",
    FBMESSENGER: "http://short.staging.referralsaasquatch.com/mwjFXu"
  },
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
  referredByReferral: { dateReferralStarted: today.setDate(today.getDate()-2), referrerUser: { firstName: "Rubeus", lastName: "Hagrid" }, rewards: [{ fuelTankCode: 'CODE1234', prettyValue: "$10.00" }] },
  referralsMonth: { totalCount: 6 },
  referralsWeek:  { totalCount: 3 },
  rewardsCount: { totalCount: 14 },
  rewardsMonth: { totalCount: 7 },
  rewardsWeek: { totalCount: 4 },
  rewardBalances: [
    { type: "CREDIT", unit: "CENTS", value: 17000, prettyValue: "$170.00", totalAssignedCredit: "17000", totalRedeemedCredit: "1500", prettyAssignedCredit: "$170.00", prettyRedeemedCredit: "$15.00" },
    { type: "PCT_DISCOUNT", unit: "%", value: 15, prettyValue: "15%" },
  ],
}

//@ts-ignore
const squatchJsApi = window.frameElement ? window.frameElement.squatchJsApi : {};

const API = {
  version: "Welcome to widget-host",
  analytics: {
    shareEvent(shareMedium: string) {
      const widgetId = widgetIdent();

      if (widgetId["env"] === "demo" || !widgetId) return Promise.resolve({});

      const { userId, accountId, programId = "classic", engagementMedium } = widgetId;

      const variables = {
        userId,
        accountId,
        programId,
        meta: {
          engagementMedium,
          shareMedium
        }
      }
      return this.client.mutate({
        mutation: gql`
          mutation ($eventMeta: UserAnalyticsEvent!) {
            createUserAnalyticsEvent(
              id: $userId,
              accountId: $accountId,
              programId: $programId,
              type: USER_REFERRAL_PROGRAM_ENGAGEMENT_EVENT,
              meta: $meta)
          }
        `,
        variables
      }).then((result) => {
        return result.data.createUserAnalyticsEvent;
      });
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

      const { userId, accountId, programId = null, engagementMedium } = widgetId;

      const variables = {
        userId,
        accountId,
        programId,
        engagementMedium
      };

      return this.getClient().query({
        query: gql`
          query($userId: String!, $accountId: String!, $programId: ID, $engagementMedium: UserEngagementMedium!) {
            user(id: $userId, accountId: $accountId) {
              shareLink(programId: $programId, engagementMedium: $engagementMedium, shareMedium: DIRECT)
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

    // getReferralCode() {
    //   const widgetId = widgetIdent();

    //   if (widgetId["env"] === "demo" || !widgetId) return demoUser.referralcode;

    //   const { userId, accountId, programId = null } = widgetId;

    //   const variables = {
    //     userId,
    //     accountId,
    //     programId
    //   };

    //   return this.getClient().query({
    //     query: gql`
    //       query($userId: String!, $accountId: String!, $programId: ID) {
    //         user(id: $userId, accountId: $accountId) {
    //           referralCode(programId: $programId)
    //         }
    //       }
    //     `,
    //     variables
    //   }).then(res => res.data.user.referralCode);
    // },

    async getReferralCode ():Promise<string> {
      const widgetId = widgetIdent();

      if(widgetId["env"] === "demo" || !widgetId) return demoUser.referralcode

      const { userId, accountId, programId } = widgetId;

      const variables = {
        userId,
        accountId,
        programId
      }

      return this.getClient().query({
        query: gql`
          query($userId: String!, $accountId: String!, $programId: ID!) {
            user(id: $userId, accountId: $accountId) {
              referralCode(programId: $programId)
            }
          }
        `,
        variables
      }).then(res => res.data.user.referralCode);
    },

    async getFueltankCode (rewardKey):Promise<SimpleObject[]> {
      const widgetId = widgetIdent();

      if(widgetId["env"] === "demo" || !widgetId) return demoUser.referredByReferral.rewards

      const { userId, accountId, programId } = widgetId;

      const variables = {
        userId,
        accountId,
        programId,
        rewardKey
      }

      return this.getClient().query({
        query: gql`
          query($userId: String!, $accountId: String!, $programId: ID!, $rewardKey: String!) {
            user(id: $userId, accountId: $accountId) {
              rewards (filter: {
                programId_eq: $programId
                programRewardKey_eq: $rewardKey
              }) {
                count
                totalCount
                data {
                  fuelTankCode
                }
              }
            }
          }
        `,
        variables
      }).then(res => res.data.user.rewards.data);
    },

    getMessageLinks(btn1, btn2, btn3, btn4, btn5, btn6, btn7, btn8){
      const widgetId = widgetIdent();

      if (widgetId["env"] === "demo" || !widgetId) return Promise.resolve(demoUser.messageLink);
       const { userId, accountId, programId = null, engagementMedium } = widgetId;
       const variables = {
        userId,
        accountId,
        programId,
        engagementMedium
      };
       return this.getClient().query({
        query: gql`
          query($userId: String!, $accountId: String!, $programId: ID, $engagementMedium: UserEngagementMedium!) {
            user(id: $userId, accountId: $accountId) {
              ${btn1}:messageLink(programId: $programId, engagementMedium: $engagementMedium, shareMedium: ${btn1})
              ${btn2}:messageLink(programId: $programId, engagementMedium: $engagementMedium, shareMedium: ${btn2})
              ${btn3}:messageLink(programId: $programId, engagementMedium: $engagementMedium, shareMedium: ${btn3})
              ${btn4}:messageLink(programId: $programId, engagementMedium: $engagementMedium, shareMedium: ${btn4})
              ${btn5}:messageLink(programId: $programId, engagementMedium: $engagementMedium, shareMedium: ${btn5})
              ${btn6}:messageLink(programId: $programId, engagementMedium: $engagementMedium, shareMedium: ${btn6})
              ${btn7}:messageLink(programId: $programId, engagementMedium: $engagementMedium, shareMedium: ${btn7})
              ${btn8}:messageLink(programId: $programId, engagementMedium: $engagementMedium, shareMedium: ${btn8})
            }
          }
        `,
        variables
      }).then(res => res.data.user);
    },
  },
  ui: squatchJsApi
};

export { API };

/**
 * Key-value simple object
 */
export interface SimpleObject {
  [key:string]: any
}
