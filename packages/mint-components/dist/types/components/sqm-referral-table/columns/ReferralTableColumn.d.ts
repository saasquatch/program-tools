import { VNode } from "../../../stencil-public-runtime";
export interface ReferralTableColumn {
  renderLabel(): Promise<string>;
  renderCell(data: Referral, locale: string): Promise<VNode>;
  renderReferrerCell?(data: Referrer): Promise<VNode>;
}
