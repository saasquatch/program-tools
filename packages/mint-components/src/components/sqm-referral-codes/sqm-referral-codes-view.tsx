import { h, VNode } from "@stencil/core";
import { createStyleSheet } from "../../styling/JSS";

export interface ReferralCodesViewProps {
  slots: {
    shareButtons: VNode;
    shareCodes: VNode;
    pagination: VNode;
  };
  titleText?: string;
  noCodes: boolean;
  loading: boolean;
}

const style = {
  Wrapper: {
    width: "100%",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    flexDirection: "column",
    gap: "var(--sl-spacing-large)",
  },

  HeaderContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  ShareCodeContainer: {
    width: "100%",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    flexDirection: "column",
  },
  ShareButtonContainer: {
    width: "100%",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    flexDirection: "column",
  },

  TitleText: {
    color: "var(--sl-color-neutral-700)",
    fontSize: "var(--sl-font-size-large)",
    margin: "0",
  },
};

const vanillaStyle = `
:host {
  display: block;
}
:host([hidden]): {
  display: none;
}
`;

const sheet = createStyleSheet(style);
const styleString = sheet.toString();

export function ReferralCodesView(props: ReferralCodesViewProps) {
  const { slots, titleText, loading, noCodes } = props;

  // TODO: loading state, empty state

  return (
    <div class={sheet.classes.Wrapper} part="sqm-base">
      <style type="text/css">
        {vanillaStyle}
        {styleString}
      </style>
      <div class={sheet.classes.HeaderContainer}>
        <h2 class={sheet.classes.TitleText}>{titleText}</h2>
        {slots.pagination}
      </div>
      <div class={sheet.classes.ShareCodeContainer}>{slots.shareCodes}</div>
      <div class={sheet.classes.ShareButtonContainer}>{slots.shareButtons}</div>
    </div>
  );
}
