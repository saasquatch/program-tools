import { RewardTableColumn } from "./RewardTableColumn";
/**
 * @uiName Reward Table Source Column
 */
export declare class RewardTableUserColumn implements RewardTableColumn {
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
  /**
   * @uiName Reward Exchange label
   */
  rewardExchangeText: string;
  /**
   * Shown when a reward has been created by a referral
   *
   * @uiName Referral Text
   */
  referralText: string;
  /**
   * @uiName Reward Source Text
   */
  rewardSourceText: string;
  constructor();
  disconnectedCallback(): void;
  renderCell(data: Reward[], locale: any): Promise<any>;
  renderLabel(): Promise<string>;
  render(): any;
}
