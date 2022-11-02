import { h } from "@stencil/core";
import { createStyleSheet } from "../../styling/JSS";

export interface AccountDetailsViewProps {
  loading: boolean;
  setOpen: (open: boolean) => void;
  hasAccount: boolean;
  integrationDisabled: boolean;
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

  TitleContainer: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
  },

  Label: {
    fontWeight: "bold",
    "@media screen and (max-width: 499px)": {
      wordWrap: "wrap-word",
    },
  },

  Skeleton: {
    width: "150px",
  },
};

export function AccountDetailsView(props: AccountDetailsViewProps) {
  const {
    detailsContent,
    accountDetails,
    hasAccount,
    loading,
    integrationDisabled,
  } = props;

  if (!hasAccount || integrationDisabled) return "";

  const sheet = createStyleSheet(style);
  const styleString = sheet.toString();
  const { classes } = sheet;

  return (
    <div class={classes.Container}>
      <style type="text/css">{styleString}</style>{" "}
      <div class={classes.TitleContainer}>
        <img src="https://res.cloudinary.com/saasquatch-staging/image/upload/v1665703368/tenant_test_a8b41jotf8a1v/tjfxf0qxu2lwqzgtcghw.svg" />
        <h2>{detailsContent.headerText}</h2>
      </div>
      <sl-button
        disabled={loading}
        onClick={(e) => {
          e.preventDefault();
          props.setOpen(true);
        }}
      >
        {detailsContent.editText}
      </sl-button>
      <div class={classes.LabelContainer}>
        <p class={classes.Label}>{detailsContent.recentPaymentLabel}:</p>{" "}
        {/* {detailedContent} */}
      </div>
      <div class={classes.LabelContainer}>
        <p class={classes.Label}>{detailsContent.nextPaymentLabel}:</p>{" "}
        {/* {scheduledContent} */}
      </div>
    </div>
  );
}
