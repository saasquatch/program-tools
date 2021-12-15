import { VNode } from "@stencil/core";

export interface RewardTableColumn {
  renderLabel(): Promise<string>;
  renderCell(data:Reward): Promise<VNode>;
}
