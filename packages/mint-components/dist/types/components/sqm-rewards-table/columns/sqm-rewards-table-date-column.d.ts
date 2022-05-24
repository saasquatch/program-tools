import { RewardTableColumn } from "./RewardTableColumn";
/**
 * @uiName Reward Table Date Column
 */
export declare class RewardTableDateColumn implements RewardTableColumn {
  /**
   * @uiName Date Column Title
   */
  columnTitle: string;
  /**
   * @uiName Date Displayed
   * @uiType string
   * @uiEnum ["dateGiven",
   * "dateExpires",
   * "dateCancelled",
   * "dateRedeemed",
   * "dateScheduledFor"]
   */
  dateShown: string;
  constructor();
  disconnectedCallback(): void;
  renderCell(data: Reward[], locale: string): Promise<any>;
  renderLabel(): Promise<string>;
  render(): any;
}
