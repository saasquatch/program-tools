import { h } from "@stencil/core";
import { createStyleSheet } from "../../styling/JSS";

export interface AccountDetailsViewProps {
  loading: boolean;
  setOpen: (open: boolean) => void;
  hasAccount: boolean;
  accountDetails: {
    email: string;
    recentPayment: { amount: number; date: number };
    nextPayment: { date: number };
  };
  detailsContent: {
    headerText: string;
    accountLabel: string;
    recentPaymentLabel: string;
    nextPaymentLabel: string;
    editText: string;
  };
}

export function AccountDetailsView(props: AccountDetailsViewProps) {
  const { detailsContent, accountDetails, hasAccount, loading } = props;

  if (!hasAccount) return "";
  const FlexContainer = {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    gap: "10px",
  };
  const style = {
    Container: {
      extend: FlexContainer,
      flexDirection: "column",
    },
    HeaderContainer: {
      extend: FlexContainer,
      // "& img": {
      //   width: "39px",
      //   height: "39px",
      // },
      "& h2": {
        fontWeight: "bold",
        marginRight: "12px",
      },
    },

    AccountDetailsContainer: {
      extend: FlexContainer,
      "@media screen and (max-width: 499px)": {
        flexDirection: "column",
      },
    },

    LabelContainer: {
      extend: FlexContainer,
      alignItems: "center",
      "& p": {
        margin: "0",
      },
    },

    Label: {
      fontWeight: "bold",
      "@media screen and (max-width: 499px)": {
        wordWrap: "wrap-word",
      },
    },

    DesktopEditButton: {
      "@media screen and (max-width: 499px)": {
        display: "none",
      },
    },

    MobileEditButton: {
      display: "none",
      "@media screen and (max-width: 499px)": {
        display: "block",
        width: "100%",
      },
    },

    Skeleton: {
      width: "150px",
    },
  };

  const sheet = createStyleSheet(style);
  const styleString = sheet.toString();
  const { classes } = sheet;

  return (
    <div class={classes.Container}>
      <style type="text/css">{styleString}</style>
      <div class={classes.HeaderContainer}>
        <img src="https://res.cloudinary.com/saasquatch-staging/image/upload/v1665094610/tenant_test_ahsf8e6g2r1dh/brjh1v3anhzwvef6ntbj.svg" />
        <h2>{detailsContent.headerText}</h2>
        <sl-button
          class={classes.DesktopEditButton}
          disabled={loading}
          onClick={(e) => {
            e.preventDefault();
            props.setOpen(true);
          }}
        >
          {detailsContent.editText}
        </sl-button>
      </div>
      <div class={classes.AccountDetailsContainer}>
        <div class={classes.LabelContainer}>
          <p class={classes.Label}>{detailsContent.recentPaymentLabel}:</p>{" "}
          {loading ? (
            <sl-skeleton class={classes.Skeleton}></sl-skeleton>
          ) : (
            <p>
              {accountDetails.recentPayment.amount} on{" "}
              {accountDetails.recentPayment.date}
            </p>
          )}
        </div>
        <div class={classes.LabelContainer}>
          <p class={classes.Label}>{detailsContent.nextPaymentLabel}:</p>{" "}
          {loading ? (
            <sl-skeleton class={classes.Skeleton}></sl-skeleton>
          ) : (
            <p>
              <p>{accountDetails.nextPayment.date}</p>
            </p>
          )}
        </div>
      </div>
      <sl-button
        class={classes.MobileEditButton}
        disabled={loading}
        onClick={(e) => {
          e.preventDefault();
          props.setOpen(true);
        }}
      >
        {detailsContent.editText}
      </sl-button>
    </div>
  );
}
