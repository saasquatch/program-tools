import {
  useLocale,
  usePaginatedQuery,
  useProgramId,
  useQuery,
  useUserIdentity,
} from "@saasquatch/component-boilerplate";
import { useEffect, useReducer } from "@saasquatch/universal-hooks";
import { h, VNode } from "@stencil/core";
import { gql } from "graphql-request";
import { useRerenderListener } from "../../tables/re-render";
import { ReferralTable } from "./sqm-referral-table";
import { GenericTableViewProps } from "../../tables/GenericTableView";
import { useChildElements } from "../../tables/useChildElements";

export const CSS_NAMESPACE = "sqm-referral-table";

const GET_REFERRER_DATA = gql`
  query getReferrals(
    $programId: ID
    $rewardFilter: RewardFilterInput
    $locale: RSLocale
  ) {
    viewer {
      ... on User {
        referredByReferral(programId: $programId) {
          dateReferralStarted
          dateConverted
          referrerUser {
            firstName
            lastName
          }
          rewards(filter: $rewardFilter) {
            id
            type
            value
            unit
            name
            dateGiven
            dateExpires
            dateCancelled
            dateRedeemed
            dateScheduledFor
            fuelTankCode
            fuelTankType
            currency
            prettyValue(locale: $locale)
            statuses
            globalRewardKey
            programRewardKey
            rewardRedemptionTransactions {
              data {
                exchangedRewards {
                  data {
                    prettyValue(locale: $locale)
                    type
                    fuelTankCode
                    globalRewardKey
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

const GET_REFERRAL_DATA = gql`
  query getReferrals(
    $limit: Int!
    $offset: Int!
    $referralFilter: ReferralFilterInput
    $rewardFilter: RewardFilterInput
    $locale: RSLocale
  ) {
    viewer {
      ... on User {
        id
        paidReferrals: referrals(
          filter: { dateReferralPaid_timeframe: "this_10_years" }
          limit: 1
        ) {
          totalCount
        }
        referrals(limit: $limit, offset: $offset, filter: $referralFilter) {
          totalCount
          count
          data {
            id
            referredUser {
              id
              accountId
              firstName
              lastName
              email
              programGoals {
                goalId
                programId
                count
                firstDate
                lastDate
                conversionCount
              }
            }
            shareLinkUsed
            referralCodeUsed
            moderationStatus
            dateConverted
            dateFraudChecksCompleted
            dateModerated
            dateModified
            dateReferralEnded
            dateReferralPaid
            dateReferralStarted
            dateUserModified
            programId
            program {
              id
              name
            }
            rewards(filter: $rewardFilter) {
              id
              type
              value
              unit
              name
              dateGiven
              dateExpires
              dateCancelled
              dateRedeemed
              dateScheduledFor
              fuelTankCode
              fuelTankType
              currency
              prettyValue(locale: $locale)
              statuses
              globalRewardKey
              programRewardKey
              rewardRedemptionTransactions {
                data {
                  exchangedRewards {
                    data {
                      prettyValue(locale: $locale)
                      type
                      fuelTankCode
                      globalRewardKey
                    }
                  }
                }
              }
            }
            childNodes(limit: 10, offset: 0) {
              data {
                data {
                  id
                  ... on FlatReward {
                    id
                    statuses
                    type
                    value
                  }
                  ... on ProgramEmailTransaction {
                    id
                    rewardId
                    dateCreated
                    dateSent
                    dateQueued
                  }
                }
                depth
              }
            }
          }
        }
      }
    }
  }
`;

export type ReferralDates =
  | "dateConverted"
  | "dateReferralStarted"
  | "dateFraudChecksCompleted"
  | "dateModerated"
  | "dateModified"
  | "dateReferralEnded"
  | "dateReferralPaid"
  | "dateUserModified";

export function useReferralTable(
  props: ReferralTable,
  emptyElement: VNode,
  loadingElement: VNode
): GenericTableViewProps {
  const user = useUserIdentity();
  const programIdContext = useProgramId();
  // Default to context, overriden by props
  const programId = props.programId ?? programIdContext;
  // If no program ID, shows all programs
  const referralFilter = programId
    ? programId === "classic"
      ? { programId_exists: false }
      : { programId_eq: programId }
    : {};

  const rewardFilter = {
    userId_eq: user?.id,
    accountId_eq: user?.accountId,
  };

  const [content, setContent] = useReducer<
    GenericTableViewProps["elements"],
    Partial<GenericTableViewProps["elements"]>
  >(
    (state, next) => ({
      ...state,
      ...next,
    }),
    {
      columns: [],
      rows: [],
      loading: false,
      page: 0,
    }
  );

  const locale = useLocale();

  const {
    data: referrerResponse,
    loading: referrerLoading,
    refetch,
  } = useQuery(
    GET_REFERRER_DATA,
    {
      programId: programId === "classic" ? null : programId,
      rewardFilter,
      locale,
    },
    !props.showReferrer || !user?.jwt
  );

  const referrerData = referrerResponse?.viewer?.referredByReferral;
  const showReferrerRow =
    props.showReferrer && !!referrerData?.dateReferralStarted;

  const {
    envelope: referralData,
    states,
    callbacks,
  } = usePaginatedQuery<Referral>(
    GET_REFERRAL_DATA,
    (data) => data?.viewer?.referrals,
    {
      limit: props.perPage,
      offset: 0,
    },
    {
      referralFilter,
      rewardFilter,
      locale,
    },
    (props.showReferrer && referrerLoading && !referrerResponse) || !user?.jwt
  );

  useEffect(() => {
    if (states.currentPage === 0 && showReferrerRow)
      callbacks.setLimit(props.perPage - 1);
  }, [showReferrerRow]);

  useEffect(() => {
    if (props.showReferrer && showReferrerRow) {
      callbacks.setLimit(props.perPage - 1);
      callbacks.setCurrentPage(0);
    } else {
      callbacks.setLimit(props.perPage);
      callbacks.setCurrentPage(0);
    }
  }, [props.showReferrer]);

  const tick = useRerenderListener();

  const data = referralData?.data;

  const components = useChildElements();

  async function getComponentData(components: Element[]) {
    // filter out loading and empty states from columns array
    const columnComponents = components.filter(
      (component) => component.slot !== "loading" && component.slot !== "empty"
    );
    // get the column titles (renderLabel is asynchronous)
    const columnsPromise = columnComponents?.map(async (c: any) =>
      tryMethod(c, () => c.renderLabel())
    );

    // show the referrer row before any other rows (renderReferrerCell is asynchronous)
    let referrerRow;
    if (showReferrerRow && states.currentPage === 0) {
      const referrerPromise = columnComponents?.map(async (c: any) =>
        tryMethod(c, function renderReferrerCell() {
          return c.renderReferrerCell(referrerData, c);
        })
      );
      referrerRow = await Promise.all(referrerPromise);
    }

    // get the column cells (renderCell is asynchronous)
    const cellsPromise = data?.map(async (r) => {
      const cellPromise = columnComponents?.map(async (c: any) =>
        tryMethod(c, () => c.renderCell(r, locale))
      );
      const cells = await Promise.all(cellPromise) as VNode[][];
      return cells;
    });

    const rows =
      cellsPromise &&
      [referrerRow, ...(await Promise.all(cellsPromise))].filter(
        (value) => value
      );

    setContent({ rows });
    const columns = columnsPromise && (await Promise.all(columnsPromise) as string[]);
    // Set the content to render and finish loading components
    setContent({ columns, loading: false, page: states.currentPage });
  }

  const x = {
    "columns": [
        "Customer",
        "Status",
        "Date converted",
        "Rewards"
    ],
    "rows": [
        [
            {
                "$flags$": 0,
                "$tag$": "sqm-referral-table-user-cell",
                "$text$": null,
                "$elm$": {
                    "s-p": [],
                    "s-hn": "SQM-REFERRAL-TABLE"
                },
                "$children$": null,
                "$attrs$": {
                    "name": "Aaron Hernandez"
                },
                "$key$": null,
                "$name$": "Aaron Hernandez"
            },
            {
                "$flags$": 0,
                "$tag$": "sqm-referral-table-status-cell",
                "$text$": null,
                "$elm$": {
                    "s-p": [],
                    "s-hn": "SQM-REFERRAL-TABLE"
                },
                "$children$": null,
                "$attrs$": {
                    "status-text": "Converted",
                    "converted": true
                },
                "$key$": null,
                "$name$": null
            },
            {
                "$flags$": 0,
                "$tag$": "sqm-referral-table-date-cell",
                "$text$": null,
                "$elm$": {
                    "s-p": [],
                    "s-hn": "SQM-REFERRAL-TABLE"
                },
                "$children$": null,
                "$attrs$": {
                    "date": 1554934550726,
                    "locale": "en_US"
                },
                "$key$": null,
                "$name$": null
            },
            {
                "$flags$": 0,
                "$tag$": "sqm-referral-table-rewards-cell",
                "$text$": null,
                "$elm$": {
                    "s-p": [],
                    "s-hn": "SQM-REFERRAL-TABLE"
                },
                "$children$": null,
                "$attrs$": {
                    "rewards": [
                        {
                            "id": "5cae6b16cc540e209db45cfa",
                            "type": "CREDIT",
                            "value": 1,
                            "unit": "POINT",
                            "name": "Partner Reward",
                            "dateGiven": 1554934550726,
                            "dateExpires": null,
                            "dateCancelled": null,
                            "dateRedeemed": 1637004373582,
                            "dateScheduledFor": null,
                            "fuelTankCode": null,
                            "fuelTankType": null,
                            "currency": null,
                            "prettyValue": "1 Point",
                            "statuses": [
                                "REDEEMED"
                            ],
                            "globalRewardKey": null,
                            "programRewardKey": "partnerReward",
                            "rewardRedemptionTransactions": {
                                "data": [
                                    {
                                        "exchangedRewards": {
                                            "data": [
                                                {
                                                    "prettyValue": "CAD10.00 Visa* Prepaid Card CAD",
                                                    "type": "INTEGRATION",
                                                    "fuelTankCode": null,
                                                    "globalRewardKey": "gc1"
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        }
                    ],
                    "statusText": "{status, select, AVAILABLE {Available} CANCELLED {Cancelled} PENDING {Pending} EXPIRED {Expired} REDEEMED {Redeemed} other {Not available} }",
                    "statusLongText": "{status, select, AVAILABLE {Reward expiring on} CANCELLED {Reward cancelled on} PENDING {Available on} EXPIRED {Reward expired on} other {Not available} }",
                    "fuelTankText": "Your code is",
                    "rewardReceivedText": "Reward received on",
                    "expiringText": "Expiring in",
                    "pendingForText": "{status} for {date}",
                    "hideDetails": false,
                    "locale": "en_US"
                },
                "$key$": null,
                "$name$": null
            }
        ],
        [
            {
                "$flags$": 0,
                "$tag$": "sqm-referral-table-user-cell",
                "$text$": null,
                "$elm$": {
                    "s-p": [],
                    "s-hn": "SQM-REFERRAL-TABLE"
                },
                "$children$": null,
                "$attrs$": {
                    "name": "Brian Mendez"
                },
                "$key$": null,
                "$name$": "Brian Mendez"
            },
            {
                "$flags$": 0,
                "$tag$": "sqm-referral-table-status-cell",
                "$text$": null,
                "$elm$": {
                    "s-p": [],
                    "s-hn": "SQM-REFERRAL-TABLE"
                },
                "$children$": null,
                "$attrs$": {
                    "status-text": "Converted",
                    "converted": true
                },
                "$key$": null,
                "$name$": null
            },
            {
                "$flags$": 0,
                "$tag$": "sqm-referral-table-date-cell",
                "$text$": null,
                "$elm$": {
                    "s-p": [],
                    "s-hn": "SQM-REFERRAL-TABLE"
                },
                "$children$": null,
                "$attrs$": {
                    "date": 1554934455495,
                    "locale": "en_US"
                },
                "$key$": null,
                "$name$": null
            },
            {
                "$flags$": 0,
                "$tag$": "sqm-referral-table-rewards-cell",
                "$text$": null,
                "$elm$": {
                    "s-p": [],
                    "s-hn": "SQM-REFERRAL-TABLE"
                },
                "$children$": null,
                "$attrs$": {
                    "rewards": [
                        {
                            "id": "5cae6ab7cc540e209db456cc",
                            "type": "CREDIT",
                            "value": 1,
                            "unit": "POINT",
                            "name": "Partner Reward",
                            "dateGiven": 1554934455495,
                            "dateExpires": null,
                            "dateCancelled": null,
                            "dateRedeemed": 1637004373582,
                            "dateScheduledFor": null,
                            "fuelTankCode": null,
                            "fuelTankType": null,
                            "currency": null,
                            "prettyValue": "1 Point",
                            "statuses": [
                                "REDEEMED"
                            ],
                            "globalRewardKey": null,
                            "programRewardKey": "partnerReward",
                            "rewardRedemptionTransactions": {
                                "data": [
                                    {
                                        "exchangedRewards": {
                                            "data": [
                                                {
                                                    "prettyValue": "CAD10.00 Visa* Prepaid Card CAD",
                                                    "type": "INTEGRATION",
                                                    "fuelTankCode": null,
                                                    "globalRewardKey": "gc1"
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        }
                    ],
                    "statusText": "{status, select, AVAILABLE {Available} CANCELLED {Cancelled} PENDING {Pending} EXPIRED {Expired} REDEEMED {Redeemed} other {Not available} }",
                    "statusLongText": "{status, select, AVAILABLE {Reward expiring on} CANCELLED {Reward cancelled on} PENDING {Available on} EXPIRED {Reward expired on} other {Not available} }",
                    "fuelTankText": "Your code is",
                    "rewardReceivedText": "Reward received on",
                    "expiringText": "Expiring in",
                    "pendingForText": "{status} for {date}",
                    "hideDetails": false,
                    "locale": "en_US"
                },
                "$key$": null,
                "$name$": null
            }
        ],
        [
            {
                "$flags$": 0,
                "$tag$": "sqm-referral-table-user-cell",
                "$text$": null,
                "$elm$": {
                    "s-p": [],
                    "s-hn": "SQM-REFERRAL-TABLE"
                },
                "$children$": null,
                "$attrs$": {
                    "name": "Loretta Harper"
                },
                "$key$": null,
                "$name$": "Loretta Harper"
            },
            {
                "$flags$": 0,
                "$tag$": "sqm-referral-table-status-cell",
                "$text$": null,
                "$elm$": {
                    "s-p": [],
                    "s-hn": "SQM-REFERRAL-TABLE"
                },
                "$children$": null,
                "$attrs$": {
                    "status-text": "Converted",
                    "converted": true
                },
                "$key$": null,
                "$name$": null
            },
            {
                "$flags$": 0,
                "$tag$": "sqm-referral-table-date-cell",
                "$text$": null,
                "$elm$": {
                    "s-p": [],
                    "s-hn": "SQM-REFERRAL-TABLE"
                },
                "$children$": null,
                "$attrs$": {
                    "date": 1554934342984,
                    "locale": "en_US"
                },
                "$key$": null,
                "$name$": null
            },
            {
                "$flags$": 0,
                "$tag$": "sqm-referral-table-rewards-cell",
                "$text$": null,
                "$elm$": {
                    "s-p": [],
                    "s-hn": "SQM-REFERRAL-TABLE"
                },
                "$children$": null,
                "$attrs$": {
                    "rewards": [
                        {
                            "id": "5cae6a46cc540e209db44cf2",
                            "type": "CREDIT",
                            "value": 1,
                            "unit": "POINT",
                            "name": "Partner Reward",
                            "dateGiven": 1554934342984,
                            "dateExpires": null,
                            "dateCancelled": null,
                            "dateRedeemed": 1637004373582,
                            "dateScheduledFor": null,
                            "fuelTankCode": null,
                            "fuelTankType": null,
                            "currency": null,
                            "prettyValue": "1 Point",
                            "statuses": [
                                "REDEEMED"
                            ],
                            "globalRewardKey": null,
                            "programRewardKey": "partnerReward",
                            "rewardRedemptionTransactions": {
                                "data": [
                                    {
                                        "exchangedRewards": {
                                            "data": [
                                                {
                                                    "prettyValue": "CAD10.00 Visa* Prepaid Card CAD",
                                                    "type": "INTEGRATION",
                                                    "fuelTankCode": null,
                                                    "globalRewardKey": "gc1"
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        }
                    ],
                    "statusText": "{status, select, AVAILABLE {Available} CANCELLED {Cancelled} PENDING {Pending} EXPIRED {Expired} REDEEMED {Redeemed} other {Not available} }",
                    "statusLongText": "{status, select, AVAILABLE {Reward expiring on} CANCELLED {Reward cancelled on} PENDING {Available on} EXPIRED {Reward expired on} other {Not available} }",
                    "fuelTankText": "Your code is",
                    "rewardReceivedText": "Reward received on",
                    "expiringText": "Expiring in",
                    "pendingForText": "{status} for {date}",
                    "hideDetails": false,
                    "locale": "en_US"
                },
                "$key$": null,
                "$name$": null
            }
        ]
    ],

}


  useEffect(() => {
    setContent({ loading: true });
    referralData && getComponentData(components);
  }, [referralData, components, tick]);

  const isEmpty = !content?.rows?.length && !data?.length;

  const show =
    // 1 - Loading if loading
    states.loading || content.loading
      ? "loading"
      : // 2 - Empty if empty
      isEmpty
      ? "empty"
      : // 3 - Then show rows
        "rows";

  return {
    states: {
      hasNext: states.currentPage < states.pageCount - 1,
      hasPrev: states.currentPage > 0,
      show,
      namespace: CSS_NAMESPACE,
    },
    data: {
      textOverrides: {
        showLabels: props.showLabels,
        prevLabel: props.prevLabel,
        moreLabel: props.moreLabel,
      },
      //   referralData: data,
      hiddenColumns: props.hiddenColumns,
      smBreakpoint: props.smBreakpoint,
      mdBreakpoint: props.mdBreakpoint,
    },
    elements: {
      columns: content.columns,
      rows: content.rows,
      emptyElement,
      loadingElement,
    },
    callbacks: {
      nextPage: () => {
        if (states.currentPage === 0 && showReferrerRow)
          callbacks.setLimit(props.perPage);
        callbacks.setCurrentPage(states.currentPage + 1);
      },
      prevPage: () => {
        if (states.currentPage === 1 && showReferrerRow)
          callbacks.setLimit(props.perPage - 1);
        callbacks.setCurrentPage(states.currentPage - 1);
      },
    },
  };
}

export function generateUserError(e: any) {
  try {
    return JSON.stringify(e);
  } catch (e) {
    return "An unknown error";
  }
}

async function tryMethod(
  c: HTMLElement,
  callback: () => Promise<string | VNode[]>
): Promise<string | VNode[]> {
  const tag = c.tagName.toLowerCase();
  await customElements.whenDefined(tag);
  let renderPromise: Promise<string | VNode[]>;
  try {
    renderPromise = callback();
  } catch (e) {
    // renderLabel did not return a promise, so this method probably doesn't exist
    // therefore, we IGNORE the label

    if (callback.name === "renderReferrerCell") {
      console.error("column does not have a renderReferrerCell method.");
    } else {
      console.error("label promise failed", e);
    }

    return <span />;
  }
  try {
    return await renderPromise;
  } catch (e) {
    // The column returned a promise, and that promise failed.
    // This should not happen so we fail fast
    console.error("Error rendering label", e);
    const userError = generateUserError(e);
    return (
      <details>
        <summary>Error</summary>
        {userError}
      </details>
    );
  }
}
