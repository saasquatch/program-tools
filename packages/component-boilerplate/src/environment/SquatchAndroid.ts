/**
 * Type for the Javascript environment added by https://github.com/saasquatch/squatch-android
 *
 * Should exist as `window.SquatchAndroid`
 */
export interface SquatchAndroid {
  /**
   *
   * @param shareLink
   * @param messageLink fallback URL to redirect to if the app is not installed
   */
  shareOnFacebook(shareLink: string, messageLink: string): void;

  /**
   * Shows a native Android toast
   *
   * @param text
   */
  showToast(text: string): void;
}
