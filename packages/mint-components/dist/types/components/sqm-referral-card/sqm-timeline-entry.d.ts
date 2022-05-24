/**
 * @uiName Timeline Entry
 */
export declare class TimelineReward {
  ignored: boolean;
  /**
   * @uiName Reward Amount
   */
  reward: string;
  /**
   * @uiName Reward Unit
   */
  unit: string;
  /**
   * @uiName Description
   */
  desc: string;
  /**
   * @undocumented
   */
  line?: boolean;
  /**
   * @uiName Icon
   * @uiType string
   * @uiEnum ["gift", "circle"]
   */
  icon: string;
  constructor();
  disconnectedCallback(): void;
  render(): any;
}
