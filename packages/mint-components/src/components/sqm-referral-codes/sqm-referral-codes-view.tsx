import { h, VNode } from "@stencil/core";
import { AuthColumn, AuthWrapper } from "../../global/mixins";
import { createStyleSheet } from "../../styling/JSS";
import { TextSpanView } from "../sqm-text-span/sqm-text-span-view";

export interface ReferralCodesViewProps {
  slots: {
    shareButtons: VNode;
    shareCodes: VNode;
    pagination: VNode;
  };
  titleText?: string;
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
  const { slots, titleText } = props;

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
