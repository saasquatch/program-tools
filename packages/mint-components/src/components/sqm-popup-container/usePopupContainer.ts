import { useEngagementMedium } from "@saasquatch/component-boilerplate";

type UsePopupContainerProps = {
  poweredBy: boolean;
  closeButtonText: string;
  closeButton: boolean;
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
  return {
    states: {
      showCloseButton: props.closeButton && engagementMedium === "POPUP",
      styles: props,
    },
    data: {},
    callbacks: { closePopup },
  };
}
