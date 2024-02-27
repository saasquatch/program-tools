import { h } from "@stencil/core";
import { createStyleSheet } from "../../../styling/JSS";
import { PayPalIcon } from "../SVGs";

export type currencyAmount = {
  amountText: string;
  currencyText: string;
};

export interface PayoutDetailsCardViewProps {
  states: {
    loading?: boolean;
    mainCurrency: currencyAmount;
    status: "pending" | "upcoming" | "next payout";
    payoutType: "bank" | "paypal";
    otherCurrencies: currencyAmount[] | boolean;
    w9Pending?: currencyAmount[];
    empty?: boolean;
    hasW9Pending?: boolean;
    hasDatePending?: boolean;
  };

  text: {
    pendingStatusBadgeText: string;
    upcomingStatusBadgeText: string;
    nextPayoutStatusBadgeText: string;
    pendingDetailedStatusText: string;
    upcomingDetailedStatusText: string;
    nextPayoutDetailedStatusText: string;
    w9PendingText: string;
    additionalW9Text?: string;
    otherCurrenciesText: string;
  };
}

const statusMap = {
  pending: "warning",
  upcoming: "success",
  "next payout": "success",
};

const style = {
  Container: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gridGap: "var(--sl-spacing-large)",
    background: "var(--sl-color-neutral-0)",
    boxShadow: "0px 2px 4px rgba(28, 28, 33, 0.12)",
    borderRadius: "4px",
    padding: "var(--sl-spacing-large)",
    minHeight: "150px",
    border: "1px solid var(--sl-color-gray-200)",
    maxWidth: "450px",
  },
  StatusContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  MainCurrencyLabel: {
    fontWeight: "var(--sl-font-weight-normal)",
    color: "var(--sl-color-gray-500)",
  },
  MainCurrency: {
    margin: 0,
    fontSize: "32px",
    width: "auto",
  },
  SubduedRegularText: {
    fontSize: "var(--sl-font-size-small)",
    color: "var(--sl-color-gray-500)",
    margin: 0,
    width: "auto",
  },
  CurrenciesContainer: {
    display: "grid",
    width: "auto",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: "var(--sl-spacing-xx-small) var(--sl-spacing-small)",
    paddingTop: "var(--sq-spacing-xx-small)",
    "& > :not(:last-child)": {
      borderRight: "1px solid var(--sl-color-gray-200)",
    },
    "& > :nth-child(3)": {
      border: "none",
    },
  },
  CurrencyContainer: {
    paddingRight: "var(--sl-spacing-small)",
    gap: "var(--sl-spacing-small)",
  },
  SubCurrencyText: {
    fontWeight: "var(--sl-font-weight-bold)",
    fontSize: "var(--sl-font-size-large)",
    margin: "0",
  },
  W9Container: {
    paddingTop: "var(--sl-spacing-large)",
    borderTop: "1px solid var(--sl-color-gray-200)",
  },
  SkeletonOne: {
    width: "25%",
    height: "16px",
  },
  SkeletonTwo: {
    width: "25%",
    height: "24px",
  },
  SkeletonThree: {
    width: "50%",
    height: "34px",
  },
};

type Currency = {
  amountText: string;
  currencyText: string;
};

export function PayoutDetailsCardView(props: PayoutDetailsCardViewProps) {
  const sheet = createStyleSheet(style);
  const styleString = sheet.toString();
  const { classes } = sheet;

  const currencyList = (currencies: Currency[]) => {
    return (
      <div class={classes.CurrenciesContainer}>
        {currencies?.map((currency) => {
          return (
            <div class={classes.CurrencyContainer}>
              <p class={classes.SubCurrencyText}>
                {currency?.amountText}
                {currency?.currencyText}
              </p>
            </div>
          );
        })}
      </div>
    );
  };

  const { states, text } = props;

  const badgeText = {
    pending: text.pendingStatusBadgeText,
    upcoming: text.upcomingStatusBadgeText,
    "next payout": text.nextPayoutStatusBadgeText,
  };

  const statusText = {
    pending: text.pendingDetailedStatusText,
    upcoming: text.upcomingDetailedStatusText,
    "next payout": text.nextPayoutDetailedStatusText,
  };

  return (
    <div>
      <style type="text/css">{styleString}</style>
      <div class={classes.Container}>
        {states.loading ? (
          <div class={classes.StatusContainer}>
            <sl-skeleton class={classes.SkeletonOne}></sl-skeleton>{" "}
            <sl-skeleton class={classes.SkeletonTwo}></sl-skeleton>
          </div>
        ) : (
          <div class={classes.StatusContainer}>
            <p class={classes.SubduedRegularText}>
              {/* Should be seperated to a helper function */}
              {states.empty && states.status === "pending"
                ? ""
                : states.status !== "pending"
                ? statusText[states.status]
                : states.hasDatePending
                ? statusText["pending"]
                : text.w9PendingText}
            </p>
            <sl-badge pill type={statusMap[states.status]}>
              {badgeText[states.status]}
            </sl-badge>
          </div>
        )}
        {states.loading ? (
          <sl-skeleton class={classes.SkeletonThree}></sl-skeleton>
        ) : states.empty ? (
          <h1 class={classes.MainCurrency}>No rewards</h1>
        ) : (
          <h1 class={classes.MainCurrency}>
            {states.hasDatePending || states.status !== "pending"
              ? states.mainCurrency?.amountText
              : states.w9Pending?.[0]?.amountText}{" "}
            {states.mainCurrency.currencyText}
          </h1>
        )}
        {states.otherCurrencies && !states.loading && (
          <div>
            <p
              class={classes.SubduedRegularText}
              style={{ fontSize: "var(--sl-font-size-x-small)" }}
            >
              + {text.otherCurrenciesText}
            </p>
            {currencyList(states.otherCurrencies as Currency[])}
          </div>
        )}
        {states.hasW9Pending &&
          states.status === "pending" &&
          states.hasDatePending &&
          !states.loading && (
            <div class={classes.W9Container}>
              <p class={classes.SubduedRegularText}>{text.w9PendingText}</p>
              {currencyList(states.w9Pending!)}
            </div>
          )}
        {states.loading ? (
          <sl-skeleton class={classes.SkeletonOne}></sl-skeleton>
        ) : states.payoutType === "paypal" ? (
          <div style={{ display: "flex", gap: "var(--sl-spacing-small)" }}>
            <span>email@example.com</span>
            <PayPalIcon />
          </div>
        ) : (
          <div style={{ display: "flex", gap: "var(--sl-spacing-small)" }}>
            <span>Card ***2381</span>
            <span>Toronto Dominion Bank</span>
          </div>
        )}
      </div>
    </div>
  );
}
