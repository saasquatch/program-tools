/**
 * An interface for interacting with the SaaSquatch Admin Portal.
 *
 * Used for rendering widgets in a preview/demo mode.
 */
export interface SquatchAdmin {
  /**
   * Provides a way of providing user feedback when a widget is rendered in the SaaSquatch admin portal
   *
   * @param text
   */
  showMessage(text: string): void;
}
