interface AndroidInterface {
  platform: 'android';
  shareOnFacebook(shareUrl: string, fallbackUrl: string): void;
  showToast(toast: string): void;
}

export type PlatformNativeActions = AndroidInterface | undefined;
