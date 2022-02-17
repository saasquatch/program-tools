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
import debugFn from "debug";
const debug = debugFn("sq:useReferralTable");

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
          dateConverted
          dateFraudChecksCompleted
          dateModerated
          dateModified
          dateReferralEnded
          dateReferralPaid
          dateReferralStarted
          dateUserModified
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

  const components = useChildElements<Element>();

  async function getComponentData(components: Element[]) {
    // filter out loading and empty states from columns array
    const columnComponents = components.filter(
      (component) => component.slot !== "loading" && component.slot !== "empty"
    );
    // get the column titles (renderLabel is asynchronous)
    const columnsPromise = columnComponents?.map(async (c: any) =>
      tryMethod(c, () => c.renderLabel())
    );

    // show the referrer row before any other rows
    let referrerRow;
    if (showReferrerRow && states.currentPage === 0) {
      const referrerPromise = columnComponents?.map(async (c: any) =>
        tryMethod(c, () => c.renderReferrerCell(referrerData, locale))
      );
      referrerRow = await Promise.all(referrerPromise);
    }

    // get the column cells (renderCell is asynchronous)
    const cellsPromise = data?.map(async (r) => {
      const cellPromise = columnComponents?.map(async (c: any) =>
        tryMethod(c, () => c.renderCell(r, locale))
      );
      const cells = (await Promise.all(cellPromise)) as VNode[][];
      return cells;
    });

    const rows =
      cellsPromise &&
      [referrerRow, ...(await Promise.all(cellsPromise))].filter(
        (value) => value
      );

    setContent({ rows });
    const columns =
      columnsPromise && ((await Promise.all(columnsPromise)) as string[]);
    // Set the content to render and finish loading components
    setContent({ columns, loading: false, page: states.currentPage });
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

export async function tryMethod(
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
      debug("column does not have a renderReferrerCell method.");
    } else {
      debug("label promise failed", e);
    }

    debug("label promise failed", e);
    return <span />;
  }
  try {
    return await renderPromise;
  } catch (e) {
    // The column returned a promise, and that promise failed.
    // This should not happen so we fail fast
    debug("Error rendering label", e);
    const userError = generateUserError(e);
    return (
      <details>
        <summary>Error</summary>
        {userError}
      </details>
    );
  }
}
