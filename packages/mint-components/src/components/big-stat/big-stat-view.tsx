import { h, VNode } from "@stencil/core";

export interface BigStatViewProps {
  statvalue: string;
}

export function BigStatView(props: BigStatViewProps, children: VNode) {
  return (
    <div part="stat-wrapper">
      <div
        part="stat-value"
        class="Stat"
      >
        {props.statvalue}
      </div>
      <div
        part="stat-description"
        class="Description"
      >
        {children}
      </div>
    </div>
  );
}
