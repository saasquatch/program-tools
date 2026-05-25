import { html } from 'lit';
import type { PortalChangeMarketingProps } from './PortalChangeMarketing';
import { usePortalChangeMarketing } from './usePortalChangeMarketing';

const styles = `
  :host {
    display: block;
  }

  .marketing-container {
    display: flex;
    flex-direction: column;
    gap: var(--sl-spacing-medium);
    padding: var(--sl-spacing-x-large);
  }

  h2,
  p {
    margin: 0;
  }
`;

export function PortalChangeMarketingView(
  props: PortalChangeMarketingProps & ReturnType<typeof usePortalChangeMarketing>
) {
  return html`
    <style>
      ${styles}
    </style>
    <div class="marketing-container" part="sqm-base">
      <h2>${props.headerText}</h2>
      <p>${props.description}</p>
      ${props.loading
        ? html`<sl-spinner style="font-size: 1.5rem;"></sl-spinner>`
        : html`<p>${props.subscribed ? props.subscribedText : props.unsubscribedText}</p>`}
      <sl-button ?disabled="${props.loading || props.saving}" @click="${() => props.onToggle()}">
        ${props.saving
          ? html`<sl-spinner slot="prefix" style="font-size: 1rem;"></sl-spinner>`
          : ''}
        ${props.subscribed ? props.unsubscribeLabel : props.subscribeLabel}
      </sl-button>
    </div>
  `;
}
