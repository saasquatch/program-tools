import { html } from 'lit';
import { HeaderLogoProps } from './HeaderLogo';

const justifyMap = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end',
} as const;

export function HeaderLogoView(props: HeaderLogoProps) {
  return html`
    <style>
      :host {
        display: block;
      }

      .header-logo {
        display: flex;
        justify-content: ${justifyMap[props.alignment || 'left']};
        align-items: center;
        padding: var(--sl-spacing-small) var(--sl-spacing-medium);
      }

      .header-logo img {
        height: ${props.height || '40px'};
        object-fit: contain;
      }

      .header-logo a {
        display: inline-flex;
      }
    </style>
    <div class="header-logo" part="sqm-base">
      ${props.href
        ? html`<a href="${props.href}"><img src="${props.imageUrl}" alt="Logo" /></a>`
        : html`<img src="${props.imageUrl}" alt="Logo" />`}
    </div>
  `;
}
