import { h } from "@stencil/core";
import { createStyleSheet } from "../../styling/JSS";

export interface PayoutButtonScrollViewProps {
  states: {
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
    marginLeft: "auto",
  },
  PayoutButtonDescription: {
    color: "var(--sqm-text-subdued)",
    fontSize: "var(--sl-font-size-small)",
    margin: "0",
  },
};

const sheet = createStyleSheet(style);
const styleString = sheet.toString();

export function PayoutButtonScrollView(props: PayoutButtonScrollViewProps) {
  const { text, states } = props;

  if (!states.payoutSettingsComplete) return <div></div>;
  return (
    <div class={sheet.classes.Wrapper}>
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
