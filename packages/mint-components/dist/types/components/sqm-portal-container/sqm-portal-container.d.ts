import { Spacing } from "../../global/mixins";
/**
 * @uiName Portal Container
 */
export declare class PortalContainer {
  ignored: boolean;
  /**
   * @uiName Direction
   * @uiType string
   * @uiEnum ["row", "column"]
   */
  direction: "row" | "column";
  /**
   * @uiName Padding
   * @uiType string
   * @uiEnum ["none", "xxx-small", "xx-small", "x-small", "small", "medium", "large", "x-large", "xx-large", "xxx-large", "xxxx-large"]
   */
  padding: Spacing;
  /**
   * @uiName Gap
   * @uiType string
   * @uiEnum ["none", "xxx-small", "xx-small", "x-small", "small", "medium", "large", "x-large", "xx-large", "xxx-large", "xxxx-large"]
   */
  gap: Spacing;
  /** @uiName Minimum width */
  minWidth?: string;
  /**
   * @uiName Display
   * @uiType string
   * @uiEnum ["grid", "flex"]
   */
  display: "grid" | "flex";
  /**
   * @uiName Maximum width
   */
  maxWidth?: string;
  constructor();
  disconnectedCallback(): void;
  render(): any;
}
