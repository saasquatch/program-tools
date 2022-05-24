/**
 * @uiName Program Explainer Step
 */
export declare class ProgramExplainerStep {
  /**
   * @uiName Title
   */
  header: string;
  /**
   * @uiName Description
   */
  description: string;
  /**
   * @uiName Color
   * @uiWidget color
   */
  textColor: string;
  /**
   * @uiName Background
   */
  backgroundColor: string;
  /**
   * @uiName Icon
   */
  imageUrl?: string;
  /**
   * @uiName Icon
   */
  icon?: string;
  constructor();
  disconnectedCallback(): void;
  render(): any;
}
