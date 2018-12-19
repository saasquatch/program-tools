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
  locale: string;
}

/**
 * Links up to Squatch.js running in the parent frame, and exposes an API for trigger things outside of the scope of a single widget.
 */
export interface SquatchJSApi {
  // Opens the current popup widget.
  open():void;

  // Closes the current popup widget.
  close():void;
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
  shareLink: "http://ssqt.co",
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
      { dateReferralStarted: today.setDate(today.getDate()-2), referredUser: { firstName: "Remus", lastName: "Lupin" }, rewards: [{ prettyValue: "$20.00", dateExpires: today.setDate(today.getDate()-2), statuses:["EXPIRED"] },{ prettyValue: "$10.00", statuses:["AVAILABLE"] },{ prettyValue: "$5.00", statuses:["AVAILABLE"] },] },
      { dateReferralStarted: today.setDate(today.getDate()-1), referredUser: { firstName: "Gellert", lastName: "Grindelwald" }, rewards: [] },
      // Blank string becomes an unknown user, which is editable
      { dateReferralStarted: today.setDate(today.getDate()-1), referredUser: { firstName: "", lastName: "" }, rewards: [{ prettyValue: "$20.00", dateExpires: today.setDate(today.getDate()-2), statuses:["EXPIRED"] }] },
      { dateReferralStarted: today.setDate(today.getDate()-5), referredUser: { firstName: "Lavender", lastName: "Brown" }, rewards: [{ prettyValue: "$20.00", statuses:["CANCELLED"] }] },
      { dateReferralStarted: today.setDate(today.getDate()-4), referredUser: { firstName: "Blaise", lastName: "Zabini" }, rewards: [{ prettyValue: "$20.00", statuses:["AVAILABLE"] },{ prettyValue: "$10.00", statuses:["AVAILABLE"] },] },
      { dateReferralStarted: today.setDate(today.getDate()-10), referredUser: { firstName: "Argus", lastName: "Filch" }, rewards: [] },
      { dateReferralStarted: today.setDate(today.getDate()-15), referredUser: { firstName: "Ron", lastName: "Weasley" }, rewards: [{ prettyValue: "$20.00", statuses:["AVAILABLE"] }] },
      { dateReferralStarted: today.setDate(today.getDate()-2), referredUser: { firstName: "Hermione", lastName: "Granger" }, rewards: [{ prettyValue: "$20.00", statuses:["AVAILABLE"] },{ prettyValue: "$10.00", statuses:["AVAILABLE"] },{ prettyValue: "$5.00", statuses:["AVAILABLE"] },{ prettyValue: "5%", statuses:["AVAILABLE"] },{ prettyValue: "5%", statuses:["AVAILABLE"] },{ prettyValue: "5%", statuses:["AVAILABLE"] },] },
    ]
  },
  referredByReferral: { dateReferralStarted: today.setDate(today.getDate()-2), referrerUser: { firstName: "Rubeus", lastName: "Hagrid" , referralCode: 'RUBEUSHAGRID12'}, rewards: [{ fuelTankCode: 'CODE1234', prettyValue: "$10.00", statuses: ["AVAILABLE"] }] },
  referralsMonth: { totalCount: 6 },
  referralsWeek:  { totalCount: 3 },
  rewardsCount: { totalCount: 14 },
  rewardsMonth: { totalCount: 7 },
  rewardsWeek: { totalCount: 4 },
  rewardBalanceDetails: [
    {   
      prettyAvailableValue: "200.00",
      prettyAssignedCredit: "300.00",
      prettyRedeemedCredit: "100.00",
      dateExpires: "1545196080",
      dateCreated: "1545084080",
      unit: "CASH/LONG",
      rewardUnit: {
        currency: {
          displayName: "Canadian Dollar",
          symbol: "$",
          currencyCode: "CAD"
        }
      }  
    },
    {   
      prettyAvailableValue: "200.00",
      prettyAssignedCredit: "300.00",
      prettyRedeemedCredit: "100.00",
      dateExpires: "1545194080",
      dateCreated: "1545074080",
      unit: "CASH/MEDIUM",
      rewardUnit: {
        currency: {
          displayName: "Canadian Dollar",
          symbol: "$",
          currencyCode: "CAD"
        }
      }  
    },
    {   
      prettyAvailableValue: "200.00",
      prettyAssignedCredit: "300.00",
      prettyRedeemedCredit: "100.00",
      dateExpires: "1545189080",
      dateCreated: "1545074080",
      unit: "CASH/SHORTEST",
      rewardUnit: {
        currency: {
          displayName: "Canadian Dollar",
          symbol: "$",
          currencyCode: "CAD"
        }
      }  
    }
  ],
  rewardBalances: [
    { type: "CREDIT", unit: "CENTS", value: 17000, prettyValue: "$170.00", totalAssignedCredit: "17000", totalRedeemedCredit: "1500", prettyAssignedCredit: "$170.00", prettyRedeemedCredit: "$15.00" },
    { type: "PCT_DISCOUNT", unit: "%", value: 15, prettyValue: "15%" },
    {
      type: "CREDIT",
      unit: "CASH/CAD",
      count: 3,
      totalPendingCredit: 20000,
      totalAssignedCredit: 30000,
      totalRedeemedCredit: 10000,
      totalExpiredCredit: 0,
      totalCancelledCredit: 0,
      prettyPendingCredit: "$200.00",
      prettyAssignedCredit: "$300.00",
      prettyRedeemedCredit: "$100.00",
      value: 30000,
      prettyValue: "$300.00"
    },
    {
      type: "CREDIT",
      unit: "CASH/USD",
      count: 6,
      totalPendingCredit: 25000,
      totalAssignedCredit: 40000,
      totalRedeemedCredit: 10000,
      totalExpiredCredit: 15000,
      totalCancelledCredit: 10000,
      prettyPendingCredit: "USD250.00",
      prettyAssignedCredit: "USD400.00",
      prettyRedeemedCredit: "USD150.00",
      value: 40000,
      prettyValue: "USD400.00"
    }
  ],
}


//@ts-ignore
const squatchJsApi = window.frameElement ? window.frameElement.squatchJsApi : {};

export const apolloClient = () => {
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
}

const API = {
  version: "Welcome to widget-host",
  analytics: {
    shareEvent(shareMedium: string) {
      const widgetId = widgetIdent();

      if (widgetId["env"] === "demo" || !widgetId) return Promise.resolve({});

      const { userId, accountId, programId = "classic", engagementMedium } = widgetId;

      const variables = {
        eventMeta: {
          id: userId,
          accountId,
          programId,
          type: 'USER_REFERRAL_PROGRAM_ENGAGEMENT_EVENT',
          meta: {
            engagementMedium,
            shareMedium
          }
        }
      }

      return apolloClient().mutate({
        mutation: gql`
          mutation ($eventMeta: UserAnalyticsEvent!) {
            createUserAnalyticsEvent(eventMeta: $eventMeta)
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
    getClient():ApolloClient<any> {
      return apolloClient();
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

      return apolloClient().query<any>({
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

      return apolloClient().query<any>({
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

      return apolloClient().query<any>({
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
                    statuses
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
                  statuses
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

      return apolloClient().query<any>({
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

    getBalanceDetails() {
      const widgetId = widgetIdent();

      if (widgetId["env"] === "demo" || !widgetId) {
        const {
          rewardBalanceDetails
        } = demoUser;
        const user = {
          rewardBalanceDetails
        };
        return Promise.resolve(user);
      }

      const { userId, accountId, programId = null, locale } = widgetId;

      const variables = {
        userId,
        accountId,
        programId,
        locale
      };

      return apolloClient().query<any>({
        query: gql`
        query(
          $userId: String!,
          $accountId: String!,
          $programId: ID,
          $locale: String!
        ) {
          user(id: $userId, accountId: $accountId) {
            rewardBalanceDetails(programId: $programId) {
              prettyAvailableValue
              unit
              ... on CreditRewardBalance {
                prettyAssignedCredit
                prettyRedeemedCredit
                rewardUnit {
                  currency {
                    displayName(locale: $locale)
                    symbol(locale: $locale)
                    currencyCode
                  }
                }
              }
            }
          }
        }
        `,
        variables
      }).then(res => res.data.user);
    },

    getRewardExpiries() {
      const widgetId = widgetIdent();

      if (widgetId["env"] === "demo" || !widgetId) {
        const {
          rewardBalanceDetails
        } = demoUser;
        const user = {
          rewardBalanceDetails
        };
        return Promise.resolve(user);
      }

      const { userId, accountId, programId = null, locale } = widgetId;

      const variables = {
        userId,
        accountId,
        programId,
        locale
      };

      return apolloClient().query<any>({
        query: gql`
        query(
          $userId: String!,
          $accountId: String!,
          $programId: ID,
          $locale: String!
        ) {
          user(id: $userId, accountId: $accountId) {
            rewards(programId_eq: $programId) {
              data {
                dateCreated
                dateExpires
                prettyValue
                unit
              }
            }
          }
        }
        `,
        variables
      }).then(res => res.data.user);
    },

    async getReferralCode ():Promise<string> {
      const widgetId = widgetIdent();

      if(widgetId["env"] === "demo" || !widgetId) return demoUser.referralcode

      const { userId, accountId, programId } = widgetId;

      const variables = {
        userId,
        accountId,
        programId
      }

      return apolloClient().query<any>({
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

    async getFueltankCode (rewardKey):Promise<SimpleObject> {
      const widgetId = widgetIdent();

      if (widgetId["env"] === "demo" || !widgetId) {
        return {referredByReferral: demoUser.referredByReferral, rewards: {data: demoUser.referredByReferral.rewards} };
      }

      const { userId, accountId, programId } = widgetId;

      const variables = {
        userId,
        accountId,
        programId,
        rewardKey
      }

      return apolloClient().query<any>({
        query: gql`
          query($userId: String!, $accountId: String!, $programId: ID!, $rewardKey: String!) {
            user(id: $userId, accountId: $accountId) {
              referredByReferral (programId: $programId) {
                referrerUser {
                  referralCode (programId: $programId)
                }
              }
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
      }).then(res => res.data.user);
    },

    getMessageLinks(mediums:Array<string>){
      const widgetId = widgetIdent();

      if (widgetId["env"] === "demo" || !widgetId) return Promise.resolve(demoUser.messageLink);
       const { userId, accountId, programId = null, engagementMedium } = widgetId;
       const variables = {
        userId,
        accountId,
        programId,
        engagementMedium
      };
       return apolloClient().query<any>({
        query: gql`
          query($userId: String!, $accountId: String!, $programId: ID, $engagementMedium: UserEngagementMedium!) {
            user(id: $userId, accountId: $accountId) {
              ${mediums[0]}:messageLink(programId: $programId, engagementMedium: $engagementMedium, shareMedium: ${mediums[0]})
              ${mediums[1]}:messageLink(programId: $programId, engagementMedium: $engagementMedium, shareMedium: ${mediums[1]})
              ${mediums[2]}:messageLink(programId: $programId, engagementMedium: $engagementMedium, shareMedium: ${mediums[2]})
              ${mediums[3]}:messageLink(programId: $programId, engagementMedium: $engagementMedium, shareMedium: ${mediums[3]})
              ${mediums[4]}:messageLink(programId: $programId, engagementMedium: $engagementMedium, shareMedium: ${mediums[4]})
              ${mediums[5]}:messageLink(programId: $programId, engagementMedium: $engagementMedium, shareMedium: ${mediums[5]})
              ${mediums[6]}:messageLink(programId: $programId, engagementMedium: $engagementMedium, shareMedium: ${mediums[6]})
              ${mediums[7]}:messageLink(programId: $programId, engagementMedium: $engagementMedium, shareMedium: ${mediums[7]})
              ${mediums[8]}:messageLink(programId: $programId, engagementMedium: $engagementMedium, shareMedium: ${mediums[8]})
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
