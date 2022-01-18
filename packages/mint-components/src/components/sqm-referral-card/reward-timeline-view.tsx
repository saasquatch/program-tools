import { h, VNode } from "@stencil/core";
import { createStyleSheet } from "../../styling/JSS";

export interface RewardTimelineViewProps {
	gift?: boolean
}

export function RewardTimelineView(
  props: RewardTimelineViewProps,
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
      75 Points
    </div>
  );
}
