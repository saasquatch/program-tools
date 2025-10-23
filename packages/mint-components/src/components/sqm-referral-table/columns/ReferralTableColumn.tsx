import { VNode } from "@stencil/core";
import { ImpactConnection, Referral, Referrer } from "../../../saasquatch";

export interface ReferralTableColumn {
  renderLabel(): Promise<string>;
  renderCell(
    data: Referral,
    options: { locale: string; taxConnection?: ImpactConnection }
  ): Promise<VNode>;
  renderReferrerCell?(data: Referrer): Promise<VNode>;
}
