import {
  useLocale,
  usePaginatedQuery,
  useProgramId,
  useQuery,
  useUserIdentity,
} from "@saasquatch/component-boilerplate";
import { useEffect, useReducer } from "@saasquatch/universal-hooks";
import { h, VNode } from "@stencil/core";
import debugFn from "debug";
import { gql } from "graphql-request";
import { ImpactConnection, Reward } from "../../saasquatch";
import { GenericTableViewProps } from "../../tables/GenericTableView";
import { useRerenderListener } from "../../tables/re-render";
import { useChildElements } from "../../tables/useChildElements";
import { generateUserError } from "../sqm-referral-table/useReferralTable";
import { RewardsTable } from "./sqm-rewards-table";
const debug = debugFn("sq:useRewardsTable");

export const CSS_NAMESPACE = "sqm-rewards-table";

const GET_REWARDS = gql`
  query getRewards(
    $limit: Int!
    $offset: Int!
    $rewardFilter: RewardFilterInput
    $locale: RSLocale
  ) {
    viewer {
      ... on User {
        id
        rewards(
          limit: $limit
          offset: $offset
          filter: $rewardFilter
          sortBy: { field: "dateCreated", order: DESC }
        ) {
          totalCount
          count
          data {
            meta {
              status
              integration {
                name
              }
              message
              customMeta
            }
            id
            type
            value
            unit
            name
            dateGiven
            dateCreated
            dateExpires
            dateCancelled
            dateRedeemed
            dateScheduledFor
            fuelTankCode
            fuelTankType
            currency
            prettyValue(locale: $locale)
            prettyValueNumber: prettyValue(
              formatType: NUMBER_FORMATTED
              locale: $locale
            )
            prettyAvailableNumber: prettyAvailableValue(
              formatType: NUMBER_FORMATTED
              locale: $locale
            )
            prettyRedeemedNumber: prettyRedeemedCredit(
              formatType: NUMBER_FORMATTED
              locale: $locale
            )
            programId
            program {
              name
            }
            partnerFundsTransfer {
              id
              status
            }
            statuses
            pendingReasons
            cancelledReason
            globalRewardKey
            programRewardKey
            rewardSource
            prettyRedeemedCredit(locale: $locale)
            prettyAssignedCredit(locale: $locale)
            prettyAvailableValue(locale: $locale)
            exchangedRewardRedemptionTransaction {
              id
              creditRedeemed
              prettyRedeemedCredit(locale: $locale)
              unit
              dateRedeemed
            }
            referral {
              id
              dateModerated
              referrerUser {
                id
                firstName
                lastName
              }
              referredUser {
                id
                firstName
                lastName
              }
              fraudData {
                moderationStatus
                autoModerationStatus
                manualModerationStatus
              }
            }

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

type GetImpactTax = {
  viewer: {
    id: string;
    impactConnection: ImpactConnection;
  };
};
const GET_IMPACT_TAX = gql`
  query getImpactTax {
    viewer {
      ... on User {
        id
        impactConnection {
          connected
          taxHandlingEnabled
          publisher {
            requiredTaxDocumentType
            currentTaxDocument {
              status
              type
              dateCreated
            }
            withdrawalSettings {
              paymentMethod
            }
            payoutsAccount {
              hold
              holdReasons
              balance
            }
          }
        }
      }
    }
  }
`;

export function useRewardsTable(
  props: RewardsTable,
  emptyElement: VNode,
  loadingElement: VNode
): GenericTableViewProps {
  const user = useUserIdentity();
  const programIdContext = useProgramId();
  const locale = useLocale();
  // Default to context, overriden by props
  const programId = props.programId ?? programIdContext;

  const rewardFilter = {
    userId_eq: user?.id,
    accountId_eq: user?.accountId,
    // If no program ID, shows all programs
    ...(programId
      ? programId === "classic"
        ? { programId_exists: false }
        : { programId_eq: programId }
      : {}),
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

  const { data: impactTaxData, loading: taxLoading } = useQuery<GetImpactTax>(
    GET_IMPACT_TAX,
    {},
    !user?.jwt
  );

  const {
    envelope: rewardsData,
    states,
    callbacks,
  } = usePaginatedQuery<Reward>(
    GET_REWARDS,
    (data) => data?.viewer?.rewards,
    {
      limit: props.perPage,
      offset: 0,
    },
    {
      rewardFilter,
      locale,
    },
    !user?.jwt
  );

  const tick = useRerenderListener();
  const components = useChildElements<Element>();

  const data = rewardsData?.data;
  const taxConnection = impactTaxData?.viewer?.impactConnection;

  async function getComponentData(components: Element[]) {
    // filter out loading and empty states from columns array
    const columnComponents = components.filter(
      (component) => component.slot !== "loading" && component.slot !== "empty"
    );
    // get the column titles (renderLabel is asynchronous)
    const columnsPromise = columnComponents?.map(async (c: any) =>
      tryMethod(c, () => c.renderLabel())
    );

    // get the column cells (renderCell is asynchronous)
    const cellsPromise = data?.map(async (r: Reward) => {
      const cellPromise = columnComponents?.map(async (c: any) =>
        tryMethod(c, () => c.renderCell(r, { locale, taxConnection }, h))
      );
      const cells = (await Promise.all(cellPromise)) as VNode[];
      return cells;
    });

    const rows =
      cellsPromise && (await Promise.all(cellsPromise)).filter((i) => i);

    setContent({ rows });
    const columns =
      columnsPromise && ((await Promise.all(columnsPromise)) as string[]);
    // Set the content to render and finish loading components
    setContent({ columns, loading: false, page: states.currentPage });
  }

  useEffect(() => {
    setContent({ loading: true });
    rewardsData && getComponentData(components);
  }, [rewardsData, components, tick]);

  const isEmpty = !content?.rows?.length && !data?.length;

  const show =
    // 1 - Loading if loading
    states.loading || content.loading || taxLoading
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
        showLabels: !props.hideLabels,
        prevLabel: props.prevLabel,
        moreLabel: props.moreLabel,
      },
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
        callbacks.setCurrentPage(states.currentPage + 1);
      },
      prevPage: () => {
        callbacks.setCurrentPage(states.currentPage - 1);
      },
    },
  };
}
export async function tryMethod(
  c: HTMLElement,
  callback: () => Promise<string>
): Promise<string | VNode> {
  const tag = c.tagName.toLowerCase();
  await customElements.whenDefined(tag);
  let labelPromise: Promise<string>;
  try {
    labelPromise = callback();
  } catch (e) {
    // renderLabel did not return a promise, so this method probably doesn't exist
    // therefore, we IGNORE the label
    debug("label promise failed", e);
    return <span />;
  }
  try {
    return await labelPromise;
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
