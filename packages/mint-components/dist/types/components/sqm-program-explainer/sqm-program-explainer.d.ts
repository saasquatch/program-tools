/**
 * @uiName Program Explainer
 */
export declare class ProgramExplainer {
  ignored: boolean;
  /**
   * @uiName Header Text
   */
  header: string;
  /**
   * @uiName Header Text Color
   * @uiWidget color
   */
  textColor: string;
  /**
   * @uiName Header Background Color
   * @uiWidget color
   */
  backgroundColor: string;
  constructor();
  disconnectedCallback(): void;
  render(): any;
}
