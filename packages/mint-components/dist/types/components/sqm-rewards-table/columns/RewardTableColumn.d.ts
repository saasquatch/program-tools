import { VNode } from "../../../stencil-public-runtime";
export interface RewardTableColumn {
  renderLabel(): Promise<string>;
  renderCell(data: Reward[], locale: string): Promise<VNode>;
}
