/**
 * The hero container
 *
 * @uiName Hero Layout
 */
export declare class Hero {
  /** @uiName Number of columns in the layout */
  columns: 1 | 2;
  /** @uiName Background image or color */
  background?: string;
  /** @uiName Padding size */
  paddingSize: "none" | "small" | "medium" | "large";
  /** @uiName Secondary background image or color (for use in right column)*/
  secondaryBackground?: string;
  /** @uiName Wrap direction */
  wrapDirection: "wrap" | "wrap-reverse";
  constructor();
  disconnectedCallback(): void;
  render(): any;
}
