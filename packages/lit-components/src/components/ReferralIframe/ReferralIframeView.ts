import { html } from 'lit';
import { UI } from '../../ui';
import { ReferralIframeProps } from './ReferralIframe';
import { useReferralIframe } from './useReferralIframe';

export function ReferralIframeView(
  props: ReferralIframeProps & ReturnType<typeof useReferralIframe>
) {
  return html`
    <style>
      :host {
        display: block;
      }

      .iframe-container {
        width: 100%;
      }

      iframe {
        border: none;
        width: ${props.iframeWidth || '100%'};
        height: ${props.iframeHeight || '400px'};
      }
    </style>
    <div class="iframe-container" part="sqm-base">
      ${props.loading
        ? html`${UI.Spinner({})}`
        : props.url
          ? html`<iframe
              src="${props.url}"
              width="${props.iframeWidth || '100%'}"
              height="${props.iframeHeight || '400px'}"
            ></iframe>`
          : html`<div
              style="padding: var(--sl-spacing-large); text-align: center; color: var(--sl-color-neutral-500);"
            >
              No URL configured
            </div>`}
    </div>
  `;
}
