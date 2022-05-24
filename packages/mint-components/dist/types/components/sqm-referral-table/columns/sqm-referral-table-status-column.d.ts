import { ReferralTableColumn } from "./ReferralTableColumn";
/**
 * @uiName Referral Table Status Column
 */
export declare class ReferralTableStatusColumn implements ReferralTableColumn {
  /**
   * @uiName Column Title
   */
  columnTitle: string;
  /**
   * @uiName Converted Status Text
   */
  convertedStatusText: string;
  /**
   * @uiName In Progress Status Text
   */
  inProgressStatusText: string;
  constructor();
  disconnectedCallback(): void;
  renderCell(data: Referral): Promise<any>;
  renderLabel(): Promise<string>;
  render(): any;
}
