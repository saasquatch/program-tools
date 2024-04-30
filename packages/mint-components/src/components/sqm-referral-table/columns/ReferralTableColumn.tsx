import { VNode } from "@stencil/core";

export interface ReferralTableColumn {
  renderLabel(): Promise<string>;
  renderCell(
    data: Referral,
    options: { locale: string; taxConnection?: ImpactConnection }
  ): Promise<VNode>;
  renderReferrerCell?(data: Referrer): Promise<VNode>;
}
