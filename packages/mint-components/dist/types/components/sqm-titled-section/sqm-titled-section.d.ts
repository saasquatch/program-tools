import { Spacing } from "../../global/mixins";
/**
 * @uiName Section (with title)
 */
export declare class TitledSection {
  label: string;
  /**
   * @uiName Text Align
   * @uiType string
   * @uiEnum ["left", "center", "right"]
   */
  align: "left" | "center" | "right";
  /**
   * @uiName Label margin style
   * @uiType string
   * @uiEnum ["none", "xxx-small", "xx-small", "x-small", "small", "medium", "large", "x-large", "xx-large", "xxx-large", "xxxx-large"]
   */
  labelMargin: Spacing;
  /**
   * @uiName Section padding
   * @uiType string
   * @uiEnum ["none", "xxx-small", "xx-small", "x-small", "small", "medium", "large", "x-large", "xx-large", "xxx-large", "xxxx-large"]
   */
  padding: Spacing;
  constructor();
  disconnectedCallback(): void;
  render(): any;
}
