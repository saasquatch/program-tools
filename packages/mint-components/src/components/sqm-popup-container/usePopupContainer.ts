import { useEngagementMedium } from "@saasquatch/component-boilerplate";

type UsePopupContainerProps = {
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

type API = {
  close: () => void;
};

export function usePopupContainer(props: UsePopupContainerProps) {
  const engagementMedium = useEngagementMedium();
  function closePopup() {
    if (useEngagementMedium() === "POPUP") {
      window.frameElement["squatchJsApi"]?.close();
    }
  }

  const popupPadding = props.popupPadding
    ? props.popupPadding === "none"
      ? "0"
      : `var(--sl-spacing-${props.popupPadding})`
    : "var(--sl-spacing-medium)";

  const embedPadding = props.embedPadding
    ? props.embedPadding === "none"
      ? "0"
      : `var(--sl-spacing-${props.embedPadding})`
    : "0";

  const padding =
    useEngagementMedium() === "POPUP" ? popupPadding : embedPadding;

  return {
    states: {
      showCloseButton: props.closeButton && engagementMedium === "POPUP",
      styles: {
        ...props,
        padding,
        closeButtonText: props.closeButtonText ? props.closeButtonText : "X",
      },
    },
    data: {},
    callbacks: { closePopup },
  };
}
