import { html } from 'lit';
import { PortalFrameProps } from './PortalFrame';

export function PortalFrameView(props: PortalFrameProps) {
  const borderColor = props.borderColor || 'var(--sl-color-neutral-200)';

  return html`
    <style>
      :host {
        display: block;
        min-height: 100vh;
      }

      .frame {
        max-width: ${props.maxWidth};
        margin: 0 auto;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        background: ${props.backgroundColor || 'var(--sl-color-neutral-0)'};
        ${props.showBorder ? `border-left: 1px solid ${borderColor}; border-right: 1px solid ${borderColor};` : ''}
      }

      .frame-header {
        border-bottom: 1px solid ${borderColor};
      }

      .frame-body {
        flex: 1;
        padding: var(--sl-spacing-large);
      }

      .frame-footer {
        border-top: 1px solid ${borderColor};
      }
    </style>
    <div class="frame" part="sqm-base">
      <header class="frame-header"><slot name="header"></slot></header>
      <main class="frame-body"><slot></slot></main>
      <footer class="frame-footer"><slot name="footer"></slot></footer>
    </div>
  `;
}
