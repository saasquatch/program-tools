import { VNode } from "@stencil/core";
import { ImpactConnection, Reward } from "../../../saasquatch";

export interface RewardTableColumn {
  renderLabel(idx?: number): Promise<string>;
  renderCell(
    data: Reward,
    options: { locale: string; taxConnection?: ImpactConnection }
  ): Promise<VNode>;
}
