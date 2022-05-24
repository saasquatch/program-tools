/**
 * @uiName Image Component
 */
export declare class Image {
  /**
   * @uiName Image Link
   */
  imageUrl: string;
  /**
   * @uiName Left Margin
   */
  left: string;
  /**
   * @uiName Right Margin
   */
  right: string;
  /**
   * @uiName Position Alignment
   * @uiType string
   * @uiEnum ["left", "center", "right"]
   */
  align: "left" | "center" | "right";
  /**
   * @uiName Background Color
   */
  backgroundColor: string;
  ignored: boolean;
  constructor();
  disconnectedCallback(): void;
  render(): any;
}
