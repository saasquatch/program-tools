import { VNode } from "@stencil/core";

export interface ReferralTableColumn {
  renderLabel(): Promise<string>;
  renderCell(data:Referral): Promise<VNode>;
  renderReferrerCell?(data:Referrer): Promise<VNode>;
}
