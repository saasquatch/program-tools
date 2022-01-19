import { h, VNode } from "@stencil/core";
import { createStyleSheet } from "../../styling/JSS";

export interface ReferralCardViewProps {
  width: number;
  gap: number;
}

export function ReferralCardView(
  props: ReferralCardViewProps,
  children: VNode
) {
  const style = {
    Container: {},
  };

  const sheet = createStyleSheet(style);
  const styleString = sheet.toString();

  console.log(props);

  const vanillaStyle = `
    :host{
      display: block;   
    }
  `;

  return (
    <div>
      <style type="text/css">
        {styleString}
        {vanillaStyle}
      </style>
      <div class={sheet.classes.Container}>{children}</div>
    </div>
  );
}
