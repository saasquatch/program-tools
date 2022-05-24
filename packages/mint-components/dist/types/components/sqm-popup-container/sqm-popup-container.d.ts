/**
 * @uiName Popup container for widgets
 */
export declare class PopupContainer {
  /** @uiName Show SaaSquatch Powered By messaging */
  poweredBy: boolean;
  /** @uiName Display a close button on the popup */
  closeButton: boolean;
  /** @uiName Text to be used as the close button */
  closeButtonText: string;
  /**
   * @uiName Specify padding on the popup contents when in embedded mode
   * @uiType string
   * @uiEnum ["none", "small", "medium", "large"]
   */
  embedPadding?: "none" | "small" | "medium" | "large";
  /**
   * @uiName  Specify padding on the popup contents when in popup mode
   * @uiType string
   * @uiEnum ["none", "small", "medium", "large"]
   */
  popupPadding?: "none" | "small" | "medium" | "large";
  constructor();
  disconnectedCallback(): void;
  render(): any;
}
