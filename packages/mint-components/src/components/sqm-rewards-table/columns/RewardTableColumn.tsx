import { VNode } from "@stencil/core";

export interface RewardTableColumn {
  renderLabel(idx?: number): Promise<string>;
  renderCell(data: Reward, locale: string): Promise<VNode>;
}
