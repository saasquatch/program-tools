import { VNode } from "@stencil/core";

export interface ReferralTableColumn {
  renderLabel(): Promise<string>;
  renderCell(data: Referral, locale: string): Promise<VNode>;
  renderReferrerCell?(data: Referrer): Promise<VNode>;
}
