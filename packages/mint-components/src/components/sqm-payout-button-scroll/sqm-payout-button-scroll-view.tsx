import { h, VNode } from "@stencil/core";
import { createStyleSheet } from "../../styling/JSS";
import { TextSpanView } from "../sqm-text-span/sqm-text-span-view";

export interface PayoutButtonScrollViewProps {
  states: {
    //AL: TODO
    payoutSettingsComplete: boolean;
  };
  text: {
    payoutButtonText: string;
    payoutButtonDescription: string;
  };
}

const style = {
  Wrapper: {
    maxWidth: "200px",
  },
  PayoutButtonDescription: {
    color: "var(--sl-color-neutral-500)",
    fontSize: "var(--sl-font-size-small)",
  },
};

const sheet = createStyleSheet(style);
const styleString = sheet.toString();

export function PayoutButtonScrollView(props: PayoutButtonScrollViewProps) {
  const { text, states } = props;

  if (!states.payoutSettingsComplete) return <div></div>;
  return (
    <div part="sqm-base" class={sheet.classes.Wrapper}>
      <style type="text/css">{styleString}</style>
      <sqm-scroll
        scroll-tag-name="sqm-tabs"
        button-text={text.payoutButtonText}
        scroll-animation="smooth"
      ></sqm-scroll>
      <p class={sheet.classes.PayoutButtonDescription}>
        {text.payoutButtonDescription}
      </p>
    </div>
  );
}
