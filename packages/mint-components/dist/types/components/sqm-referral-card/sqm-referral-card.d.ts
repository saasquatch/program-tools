import { Spacing } from "../../global/mixins";
/**
 * @uiName Referral Card
 */
export declare class ReferralCard {
  ignored: boolean;
  /**
   * @uiName Header Text
   */
  header: string;
  /**
   * @uiName Description Text
   */
  description: string;
  /**
   * @uiName Padding
   * @uiType string
   * @uiEnum ["none", "xxx-small", "xx-small", "x-small", "small", "medium", "large", "x-large", "xx-large", "xxx-large", "xxxx-large"]
   */
  padding: Spacing;
  /**
   * @uiName Padding
   * @uiType string
   * @uiEnum ["start", "center", "end"]
   */
  verticalAlignment: "start" | "center" | "end";
  constructor();
  disconnectedCallback(): void;
  render(): any;
}
