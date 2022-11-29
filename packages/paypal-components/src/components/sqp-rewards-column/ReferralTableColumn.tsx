import { VNode } from "@stencil/core";

export interface ReferralTableColumn {
  renderLabel(): Promise<string>;
  renderCell(
    data: Referral,
    locale: string,
    h: (sel: any) => VNode
  ): Promise<VNode>;
  renderReferrerCell?(data: Referrer, h: (sel: any) => VNode): Promise<VNode>;
}
