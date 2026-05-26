import { html } from 'lit';
import { UI } from '../../ui';
import { QRCodeProps } from './QRCode';
import { useQRCode } from './useQRCode';

export function QRCodeView(props: QRCodeProps & ReturnType<typeof useQRCode>) {
  const size = Number(props.size) || 200;

  return html`
    <style>
      :host {
        display: block;
      }

      .qr-container {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: var(--sl-spacing-medium);
      }

      .qr-image {
        width: ${size}px;
        height: ${size}px;
      }
    </style>
    <div class="qr-container" part="sqm-base">
      ${props.loading
        ? html`${UI.Spinner({ style: 'font-size: 2rem;' })}`
        : props.qrUrl
          ? html`<img class="qr-image" src="${props.qrUrl}" alt="QR Code" />`
          : html`<div
              style="width: ${size}px; height: ${size}px; background: var(--sl-color-neutral-100); display: flex; align-items: center; justify-content: center; border-radius: var(--sl-border-radius-medium);"
            >
              ${UI.Icon({ name: 'qr-code', style: 'font-size: 3rem; color: var(--sl-color-neutral-400);' })}
            </div>`}
    </div>
  `;
}
