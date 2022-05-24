import { ReferralTableColumn } from "./ReferralTableColumn";
/**
 * @uiName Referral Table User Column
 */
export declare class ReferralTableUserColumn implements ReferralTableColumn {
  /**
   * @uiName User Column Title
   */
  columnTitle: string;
  /**
   * @uiName Name displayed for anonymous users
   */
  anonymousUser: string;
  /**
   * @uiName Name displayed for deleted users
   */
  deletedUser: string;
  constructor();
  disconnectedCallback(): void;
  renderCell(data: Referral): Promise<any>;
  renderLabel(): Promise<string>;
  render(): any;
}
