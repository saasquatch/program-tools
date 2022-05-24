export interface PasswordFieldViewDemoProps {
  initValue: string;
  states: {
    enableValidation: boolean;
    validationErrors: Record<string, string>;
    content: {
      fieldLabel: string;
    };
  };
}
/**
 * @uiName Portal Password Field
 */
export declare class PortalPasswordField {
  ignored: boolean;
  /**
   * @uiName Label for password field
   */
  fieldLabel: string;
  /**
   * @uiName Enable live password validation
   */
  enableValidation: boolean;
  /**
   * @undocumented
   * @uiType object
   */
  demoData?: PasswordFieldViewDemoProps;
  constructor();
  disconnectedCallback(): void;
  render(): any;
}
