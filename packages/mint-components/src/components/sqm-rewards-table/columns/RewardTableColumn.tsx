import { VNode } from "@stencil/core";

export interface RewardTableColumn {
  renderLabel(idx?: number): Promise<string>;
  renderCell(
    data: Reward,
    options: { locale: string; taxConnection?: ImpactConnection }
  ): Promise<VNode>;
}
