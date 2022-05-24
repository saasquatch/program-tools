import { ReferralTableColumn } from "./ReferralTableColumn";
/**
 * @uiName Referral Table Rewards Column
 */
export declare class ReferralTableRewardsColumn implements ReferralTableColumn {
  /**
   * @uiName Reward column title
   */
  columnTitle: string;
  /**
   * @uiName Reward Status Text
   */
  statusText: string;
  /**
   * @uiName Reward Status Long Text
   */
  statusLongText: string;
  /**
   * @uiName Fuel Tank Code Text
   */
  fuelTankText: string;
  /**
   * @uiName Reward Received Text
   */
  rewardReceivedText: string;
  /**
   * @uiName Reward Expiring Text
   */
  expiringText: string;
  /**
   * @uiName Reward Pending Text
   */
  pendingForText: string;
  /**
   * @uiName Hide dropdown details of reward
   */
  hideDetails: boolean;
  constructor();
  disconnectedCallback(): void;
  renderCell(data: Referral, locale: string): Promise<any>;
  renderLabel(): Promise<string>;
  render(): any;
}
