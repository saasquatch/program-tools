/**
 * @uiName Form Message
 */
export declare class FormMessage {
  ignored: boolean;
  /** @uiName Type of alert */
  type: string;
  /** @uiName Icon to use in alert */
  icon?: string;
  constructor();
  disconnectedCallback(): void;
  render(): any;
}
