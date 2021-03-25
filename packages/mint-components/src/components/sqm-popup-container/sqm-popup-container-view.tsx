import { h, Host } from "@stencil/core";
import { usePopupContainer } from "./usePopupContainer";

type PopupContainerViewProps = ReturnType<typeof usePopupContainer>;
const PopupContainerView = (props: PopupContainerViewProps) => {
  const { states, callbacks } = props;
  const { styles } = states;

  return (
    <Host class="squatch-container" style={{ padding: props.states.styles.padding }}>
      {styles.closeButton && (
        <span
          class="close squatch-header-close"
          data-close-panel="#squatch-panel"
          onClick={() => callbacks.closePopup()}
        >
          {styles.closeButtonText}
        </span>
      )}
      <slot />
      {styles.poweredBy ? (
        <a
          class="sqh-attribution"
          href="https://www.saasquatch.com/?utm_source=app&utm_medium=user-widget&utm_campaign=referral-widget"
          target="_blank"
        >
          Powered By
        </a>
      ) : (
        ""
      )}
    </Host>
  );
};

export default PopupContainerView;
