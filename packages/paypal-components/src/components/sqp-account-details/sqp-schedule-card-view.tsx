import { h } from "@stencil/core";
import { createStyleSheet } from "../../styling/JSS";
import { currencyAmount } from "./sqp-details-card-view";

export interface ScheduleCardViewProps {
  active: boolean;
  setActivePayout: () => void;
  loading: boolean;
  empty?: boolean;
  otherCurrencies: boolean;
  statusText: string;
  otherCurrenciesText: string;
  mainCurrency: currencyAmount;
  hasW9Pending?: boolean;
  hasDatePending?: boolean;
  w9Pending?: currencyAmount[];
  status: "pending" | "upcoming" | "next payout";
  additionalW9Text: string;
}

const SubduedText = {
  color: "var(--sl-color-gray-500)",
  margin: 0,
  width: "max-content",
  lineHeight: "16px",
};

const style = {
  SubduedRegularText: {
    ...SubduedText,
    fontSize: "var(--sl-font-size-small)",
  },
  SubduedSmallText: {
    ...SubduedText,
    fontSize: "var(--sl-font-size-x-small)",
  },
  MainCurrencyLabel: {
    fontWeight: "var(--sl-font-weight-normal)",
    color: "var(--sl-color-gray-500)",
    margin: 0,
    fontSize: "var(--sl-font-size-small)",
    lineHeight: "22px",
  },
  MainCurrency: {
    fontSize: "18px",
    margin: "0px",
  },
  Container: {
    display: "flex",
    flexDirection: "column",
    background: "var(--sl-color-neutral-0)",
    borderRadius: "4px",
    padding: "var(--sl-spacing-small)",
    height: "94px",
    boxSizing: "border-box",
    cursor: "pointer",
    border: "1px solid var(--sl-color-gray-200)",
  },
  AmountsContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    paddingTop: "var(--sq-spacing-x-small)",
    height: "100%",
    boxSizing: "border-box",
  },
  UpperSkeleton: {
    maxWidth: "90%",
    height: "16px",
  },
  LowerSkeleton: {
    maxWidth: "80%",
    height: "18px",
  },
};

export function ScheduleCardView(props: ScheduleCardViewProps) {
  const {
    active,
    setActivePayout,
    statusText,
    otherCurrencies,
    otherCurrenciesText,
    mainCurrency,
    loading,
    empty,
    hasDatePending,
    hasW9Pending,
    w9Pending,
    status,
    additionalW9Text,
  } = props;

  const sheet = createStyleSheet(style);
  const styleString = sheet.toString();
  const { classes } = sheet;

  return (
    <div
      class={classes.Container}
      onClick={setActivePayout}
      style={{
        boxShadow: `${
          active
            ? "0px 0px 0px 2px #402DC1, 0px 2px 4px rgba(28, 28, 33, 0.12)"
            : "0px 2px 4px rgba(28, 28, 33, 0.12)"
        }`,
      }}
    >
      <style type="text/css">{styleString}</style>
      {loading ? (
        <sl-skeleton class={classes.UpperSkeleton}></sl-skeleton>
      ) : (
        <p class={classes.SubduedRegularText}>{statusText}</p>
      )}
      <div class={classes.AmountsContainer}>
        {loading ? (
          <sl-skeleton class={classes.LowerSkeleton}></sl-skeleton>
        ) : empty ? (
          <h2 class={classes.MainCurrency}>No rewards</h2>
        ) : (
          <h2 class={classes.MainCurrency}>
            {hasDatePending || status !== "pending"
              ? mainCurrency?.amountText
              : w9Pending?.[0]?.amountText}
          </h2>
        )}
        {otherCurrencies && !loading && (
          <p class={classes.SubduedSmallText}>+ {otherCurrenciesText}</p>
        )}
        {hasW9Pending && status === "pending" && (
          <p class={classes.SubduedSmallText}>+ {additionalW9Text}</p>
        )}
      </div>
    </div>
  );
}
