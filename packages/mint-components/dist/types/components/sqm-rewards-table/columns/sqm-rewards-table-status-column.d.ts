import { RewardTableColumn } from "./RewardTableColumn";
/**
 * @uiName Reward Table Status Column
 */
export declare class RewardTableStatusColumn implements RewardTableColumn {
  /**
   * @uiName Column Title
   */
  columnTitle: string;
  /**
   * @uiName Reward Status Text
   */
  statusText: string;
  /**
   * @uiName Expired Status Text
   */
  expiryText: string;
  constructor();
  disconnectedCallback(): void;
  renderCell(data: Reward[], locale: string): Promise<any>;
  renderLabel(): Promise<string>;
  render(): any;
}
