import { h } from "@stencil/core";
import { NoUndefinedVariablesRule } from "graphql";
import { createStyleSheet } from "../../styling/JSS";

export type currencyAmount = {
  amountText: string;
  currencyText: string;
};

export interface DetailsCardViewProps {
  loading?: boolean;
  mainCurrency: currencyAmount;
  status: "pending" | "upcoming" | "next payout";
  statusBadgeText: string;
  otherCurrencies?: currencyAmount[];
  w9Pending?: currencyAmount[];
  w9PendingText: string;
  detailedStatusText: string;
  otherCurrenciesText: string;
  empty?: boolean;
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
  },
  SubduedRegularText: {
    fontSize: "var(--sl-font-size-regular)",
    color: "var(--sl-color-gray-500)",
    margin: 0,
    width: "max-content",
  },
  CurrenciesContainer: {
    display: "grid",
    width: "min-content",
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

export function DetailsCardView(props: DetailsCardViewProps) {
  const sheet = createStyleSheet(style);
  const styleString = sheet.toString();
  const { classes } = sheet;

  const currencyList = (currencies) => {
    return (
      <div class={classes.CurrenciesContainer}>
        {" "}
        {currencies.map((currency) => {
          return (
            <div class={classes.CurrencyContainer}>
              <p class={classes.SubduedRegularText}>
                {currency.amountText} {currency.currencyText}
              </p>
            </div>
          );
        })}{" "}
      </div>
    );
  };

  const {
    loading,
    mainCurrency,
    status,
    statusBadgeText,
    otherCurrencies,
    detailedStatusText,
    otherCurrenciesText,
    w9Pending,
    w9PendingText,
    empty,
  } = props;

  return (
    <div>
      <style type="text/css">{styleString}</style>
      <div class={classes.Container}>
        {loading ? (
          <div class={classes.StatusContainer}>
            <sl-skeleton class={classes.SkeletonOne}></sl-skeleton>{" "}
            <sl-skeleton class={classes.SkeletonTwo}></sl-skeleton>
          </div>
        ) : (
          <div class={classes.StatusContainer}>
            <p class={classes.SubduedRegularText}>{detailedStatusText}</p>
            <sl-badge pill type={statusMap[status]}>
              {statusBadgeText}
            </sl-badge>
          </div>
        )}
        {loading ? (
          <sl-skeleton class={classes.SkeletonThree}></sl-skeleton>
        ) : empty ? (
          <h1 class={classes.MainCurrency}>No rewards</h1>
        ) : (
          <h1 class={classes.MainCurrency}>
            {mainCurrency.amountText}{" "}
            <span class={classes.MainCurrencyLabel}>
              {mainCurrency.currencyText}
            </span>
          </h1>
        )}
        {otherCurrencies !== undefined && !loading && (
          <div>
            <p class={classes.SubduedRegularText}>+ {otherCurrenciesText}</p>
            {currencyList(otherCurrencies)}
          </div>
        )}
        {w9Pending !== undefined && !loading && (
          <div class={classes.W9Container}>
            <p class={classes.SubduedRegularText}>
              + {w9Pending.length} {w9PendingText}
            </p>
            {currencyList(w9Pending)}
          </div>
        )}
      </div>
    </div>
  );
}
