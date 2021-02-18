/**
 * An interface provided by Squatch.js V2 for widgets.
 *
 * See: https://github.com/saasquatch/squatch-js/blob/8f2b218c9d55567e0cc12d27d635a5fb545e6842/src/widgets/Widget.ts#L47
 *
 */
export interface SquatchJS2 {
  /**
   * Opens the current popup widget (if loaded as a popup)
   */
  open?: () => void;

  /**
   * Closes the current popup widget (if loaded as a popup)
   */
  close?: () => void;

  /**
   * DEPRECATED used to update user details from inside the widget.
   *
   * Should no longer be used. Replace with natively using the GraphQL API and re-rendering locally. Will be removed in a future version of Squatch.js
   *
   * @deprecated
   */
  reload(
    userDetails: { email: string; firstName: string; lastName: string },
    jwt: string
  ): void;
}
