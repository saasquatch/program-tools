import { Spacing } from "../../global/mixins";
/**
 * @uiName Stat Container
 */
export declare class StatContainer {
  ignored: boolean;
  /**
   * @uiName Space between stats
   * @uiType string
   * @uiEnum ["none", "xxx-small", "xx-small", "x-small", "small", "medium", "large", "x-large", "xx-large", "xxx-large", "xxxx-large"]
   */
  space: Spacing;
  constructor();
  disconnectedCallback(): void;
  render(): any;
}
