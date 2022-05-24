/**
 * @uiName Text Span
 */
export declare class Text {
  ignored: boolean;
  /**
   * @uiName Text
   */
  text: string;
  /**
   * @uiName Text
   * @uiType string
   * @uiEnum ["p", "subtext", "h1", "h2", "h3", "h4"]
   */
  type: "p" | "subtext" | "h1" | "h2" | "h3" | "h4";
  constructor();
  disconnectedCallback(): void;
  componentWillLoad(): void;
  render(): any;
}
