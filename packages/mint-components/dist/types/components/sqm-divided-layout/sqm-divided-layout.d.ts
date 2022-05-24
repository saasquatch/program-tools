/**
 * Shows it's children as either a row or a column, with a division in between them.
 * Spacing is left up to the child
 *
 * @uiName Divided Layout
 */
export declare class DividedLayout {
  /**
   * @uiName Direction
   * @uiType string
   * @uiEnum ["row", "column"]
   */
  direction: "row" | "column";
  /**
   * Uses CSS border style syntax
   * @uiName Border style
   */
  dividerStyle: string;
  constructor();
  disconnectedCallback(): void;
  render(): any;
}
