import { html } from 'lit';
import { UI } from '../../ui';
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
        ? html`${UI.Spinner({ style: 'font-size: 1.5rem;' })}`
        : html`<p>${props.subscribed ? props.subscribedText : props.unsubscribedText}</p>`}
      ${UI.Button({
        disabled: props.loading || props.saving,
        onClick: () => props.onToggle(),
        prefix: props.saving ? UI.Spinner({ style: 'font-size: 1rem;' }) : undefined,
        children: props.subscribed ? props.unsubscribeLabel : props.subscribeLabel,
      })}
    </div>
  `;
}
