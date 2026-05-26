import { html } from 'lit';
import { UI } from '../../ui';
import { PopupContainerProps } from './PopupContainer';
import { usePopupContainer } from './usePopupContainer';

export function PopupContainerView(props: PopupContainerProps & ReturnType<typeof usePopupContainer>) {
  const hookProps = props;

  return html`
    <style>
      :host {
        display: block;
      }

      .overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: ${props.overlayColor};
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
      }

      .popup {
        background: var(--sl-color-neutral-0);
        border-radius: var(--sl-border-radius-large);
        max-width: ${props.maxWidth};
        width: 90%;
        max-height: 90vh;
        overflow-y: auto;
        padding: ${props.padding};
        box-shadow: var(--sl-shadow-x-large);
        position: relative;
      }

      .popup-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: var(--sl-spacing-medium);
      }

      .popup-title {
        font-size: var(--sl-font-size-large);
        font-weight: var(--sl-font-weight-semibold);
      }

      .hidden {
        display: none;
      }
    </style>
    <div class="overlay ${!hookProps.isOpen ? 'hidden' : ''}" part="sqm-base">
      <div class="popup">
        ${props.popupTitle || props.showCloseButton
          ? html`
              <div class="popup-header">
                <span class="popup-title">${props.popupTitle || ''}</span>
                ${props.showCloseButton
                  ? html`${UI.IconButton({ name: 'x-lg', onClick: hookProps.close })}`
                  : ''}
              </div>
            `
          : ''}
        <slot></slot>
      </div>
    </div>
  `;
}
