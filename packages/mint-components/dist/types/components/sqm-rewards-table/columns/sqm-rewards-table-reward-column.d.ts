import { RewardTableColumn } from "./RewardTableColumn";
/**
 * @uiName Rewards Table Reward Column
 */
export declare class RewardsTableColumn implements RewardTableColumn {
  /**
   * @uiName Reward column title
   */
  columnTitle: string;
  /**
   * @uiName Redeemed Amount Text
   */
  redeemedText: string;
  /**
   * @uiName Available Amount Text
   */
  availableText: string;
  constructor();
  disconnectedCallback(): void;
  renderCell(data: Reward[], locale: string): Promise<any>;
  renderLabel(): Promise<string>;
  render(): any;
}
