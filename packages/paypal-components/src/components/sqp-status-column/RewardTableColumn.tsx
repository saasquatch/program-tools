import { VNode, h } from "@stencil/core";

export interface RewardTableColumn {
  renderLabel(idx?: number): Promise<string>;
  renderCell(
    data: Reward,
    locale: string,
    h: (sel: any) => VNode
  ): Promise<VNode>;
}
