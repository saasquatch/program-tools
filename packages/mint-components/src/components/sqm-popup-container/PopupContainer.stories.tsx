import { h } from "@stencil/core";
import PopupContainerView from "./sqm-popup-container-view";

export default {
  title: "Components/Portal Popup Container",
};

export const Default = () => {
  return (
    <PopupContainerView
      states={{
        showCloseButton: true,
        styles: {
          closeButtonText: "X",
          padding: "var(--sl-spacing-medium)",
          poweredBy: true,
          closeButton: true,
        },
      }}
      data={{}}
      callbacks={{ closePopup: () => console.log("Close popup") }}
    >
      <div>Slot content</div>
    </PopupContainerView>
  );
};
