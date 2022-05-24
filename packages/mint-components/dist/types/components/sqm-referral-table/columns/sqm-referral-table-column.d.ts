import { ReferralTableColumn } from "./ReferralTableColumn";
/**
 * @uiName Referral Table Generic Column
 */
export declare class ReferralTableGenericColumn implements ReferralTableColumn {
  /**
   * @uiName Column Title
   */
  columnTitle: string;
  constructor();
  disconnectedCallback(): void;
  renderCell(_: Referral): Promise<any>;
  renderLabel(): Promise<string>;
  render(): any;
}
