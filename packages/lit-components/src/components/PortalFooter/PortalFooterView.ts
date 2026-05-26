import { html } from 'lit';
import { PortalFooterProps } from './PortalFooter';

export function PortalFooterView(props: PortalFooterProps) {
  return html`
    <style>
      :host {
        display: block;
      }

      .footer {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        gap: var(--sl-spacing-medium);
        padding: ${props.padding === 'none' ? '0' : `var(--sl-spacing-${props.padding})`};
        font-size: var(--sl-font-size-small);
        color: ${props.textColor || 'var(--sl-color-neutral-500)'};
      }

      .footer a {
        color: inherit;
        text-decoration: none;
      }

      .footer a:hover {
        text-decoration: underline;
      }

      .powered-by {
        font-size: var(--sl-font-size-x-small);
        opacity: 0.7;
      }
    </style>
    <footer class="footer" part="sqm-base">
      ${props.supportEmail ? html`<a href="mailto:${props.supportEmail}">Support</a>` : ''}
      ${props.supportLink ? html`<a href="${props.supportLink}" target="_blank">Support</a>` : ''}
      ${props.faqLink ? html`<a href="${props.faqLink}" target="_blank">${props.faqText}</a>` : ''}
      ${props.termsLink ? html`<a href="${props.termsLink}" target="_blank">${props.termsText}</a>` : ''}
      ${props.showPoweredBy ? html`<span class="powered-by">Powered by SaaSquatch</span>` : ''}
    </footer>
  `;
}
