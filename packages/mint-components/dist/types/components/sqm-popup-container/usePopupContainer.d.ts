declare type UsePopupContainerProps = {
  poweredBy: boolean;
  closeButtonText: string;
  closeButton: boolean;
  embedPadding?: "none" | "small" | "medium" | "large";
  popupPadding?: "none" | "small" | "medium" | "large";
};
declare global {
  interface Window {
    squatchJsApi: API;
  }
}
declare type API = {
  close: () => void;
};
export declare function usePopupContainer(props: UsePopupContainerProps): {
  states: {
    showCloseButton: boolean;
    styles: {
      padding: string;
      closeButtonText: string;
      poweredBy: boolean;
      closeButton: boolean;
      embedPadding?: "none" | "medium" | "large" | "small";
      popupPadding?: "none" | "medium" | "large" | "small";
    };
  };
  data: {};
  callbacks: {
    closePopup: () => void;
  };
};
export {};
