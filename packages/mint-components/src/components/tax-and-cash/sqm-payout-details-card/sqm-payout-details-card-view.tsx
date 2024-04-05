import { h } from "@stencil/core";
import { createStyleSheet } from "../../../styling/JSS";
import { PayPalIcon } from "../SVGs";
import { intl } from "../../../global/global";

export interface PayoutDetailsCardViewProps {
  states: {
    loading?: boolean;
    balance: string;
    badgeStatus: "thresholdPayout" | "payoutToday" | "nextPayout";
    payoutType: "PAYPAL" | "BANK_TRANSFER";
    error?: boolean;
    hasW9Pending?: boolean;
    hasDatePending?: boolean;
    nextPayoutDate?: string;
    paypalEmailAddress?: string;
    cardNumberPreview?: string;
    bankName?: string;
    thresholdBalance?: string;
  };

  text: {
    thresholdPayoutText: string;
    statusBadgeText: string;
    accountText: string;
    payoutMissingInformationText: string;
    error: {
      errorTitleText: string;
      errorDescriptionText: string;
    };
  };
}

const style = {
  CardContainer: {
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

  PaypalEmail: {
    borderRight: "1px solid var(--sl-color-gray-200)",
    paddingRight: "var(--sl-spacing-small)",
    "@media (max-width: 499px)": {
      borderRight: "none",
      paddingRight: "none",
    },
  },
  PaypalDetailsContainer: {
    color: "var(--sl-color-gray-500)",
    display: "flex",
    gap: "var(--sl-spacing-small)",
    justifyContent: "flex-start",
    alignItems: "center",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    "@media (max-width: 499px)": {
      flexDirection: "column",
      alignItems: "flex-start",
      gap: "var(--sl-spacing-x-small)",

      "& span": {
        padding: "0px",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        overflow: "hidden",
      },
    },
  },
  AccountDetailsContainer: {
    color: "var(--sl-color-gray-500)",
    display: "flex",
    gap: "var(--sl-spacing-small)",
    justifyContent: "flex-start",
    alignItems: "center",
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
  Alert: {
    "&::part(base)": {
      backgroundColor: "var(--sl-color-warning-100)",
      border: "1px solid var(--sl-color-warning-200)",
      padding: "0 16px",
    },
    "& sl-icon": {
      margin: 0,
    },

    "& sl-icon::part(base)": {
      color: "var(--sl-color-warning-500)",
      margin: 0,
    },
  },
  AlertContent: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexDirection: "column",
  },
  Container: {
    display: "flex",
    flexDirection: "column",
    gap: "var(--sl-spacing-xx-large)",
  },
};

export function PayoutDetailsCardView(props: PayoutDetailsCardViewProps) {
  const sheet = createStyleSheet(style);
  const styleString = sheet.toString();
  const { classes } = sheet;

  const { states, text } = props;

  const renderLoadingSkeleton = () => {
    return (
      <div class={classes.CardContainer}>
        <div class={classes.StatusContainer}>
          <sl-skeleton class={classes.SkeletonOne}></sl-skeleton>
          <sl-skeleton class={classes.SkeletonTwo}></sl-skeleton>
        </div>
        <sl-skeleton class={classes.SkeletonThree}></sl-skeleton>
        <sl-skeleton class={classes.SkeletonOne}></sl-skeleton>
      </div>
    );
  };

  const renderStatusBadge = (status: string, statusBadgeText: string) => {
    const badgeType = status === "nextPayout" ? "success" : "primary";
    const statusText = intl.formatMessage(
      {
        id: "badgeText",
        defaultMessage: statusBadgeText,
      },
      {
        badgeText: status,
      }
    );

    return (
      <sl-badge pill type={badgeType}>
        {statusText}
      </sl-badge>
    );
  };

  const thresholdText = intl.formatMessage(
    {
      id: "thresholdText",
      defaultMessage: text.thresholdPayoutText,
    },
    {
      thresholdBalance: states.thresholdBalance,
    }
  );

  return (
    <div class={classes.Container}>
      <style type="text/css">{styleString}</style>
      {states.error && (
        <sl-alert
          exportparts="base: alert-base, icon:alert-icon"
          class={classes.Alert}
          type="warning"
          open
        >
          <sl-icon slot="icon" name="exclamation-triangle"></sl-icon>
          <div class={classes.AlertContent}>
            <b>{text.error.errorTitleText}</b>
            {text.error.errorDescriptionText}
          </div>
        </sl-alert>
      )}
      {states.loading ? (
        renderLoadingSkeleton()
      ) : (
        <div class={classes.CardContainer}>
          <div class={classes.StatusContainer}>
            <p class={classes.SubduedRegularText}>
              {states.badgeStatus === "thresholdPayout"
                ? states.thresholdBalance
                  ? thresholdText
                  : ""
                : states.nextPayoutDate}
            </p>
            {states.badgeStatus === "thresholdPayout"
              ? null
              : renderStatusBadge(states.badgeStatus, text.statusBadgeText)}
          </div>

          <h1 class={classes.MainCurrency}>{states.balance}</h1>

          {states.payoutType === "PAYPAL" ? (
            <div class={classes.PaypalDetailsContainer}>
              <span class={classes.PaypalEmail}>
                {states.paypalEmailAddress}
              </span>
              <PayPalIcon />
            </div>
          ) : (
            <div class={classes.AccountDetailsContainer}>
              <span>
                {states.cardNumberPreview
                  ? `${text.accountText} ${states.cardNumberPreview}`
                  : text.payoutMissingInformationText}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
