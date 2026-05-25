import { html } from 'lit';
import { getProps } from '../../helpers';
import { useComponent } from '../../hooks/useComponent';

export interface TextProps {
  /**
   * Font size in pixels
   *
   * @uiName Font Size
   * @uiType number
   */
  fontSize?: number;

  /**
   * @uiName Text Color
   * @uiWidget color
   * @format color
   */
  textColor?: string;
}

declare global {
  interface HTMLElementTagNameMap {
    'sql-text': HTMLElement;
  }
}

/**
 * @uiName Text
 * @validParents ["sqm-portal-container","div","sqm-divided-layout","sqm-brand","template","sqm-hero","sqm-big-stat","span","sqm-text-span","sqb-program-section","sqb-conditional-section", "sqm-titled-section"]
 * @slots [{"name":"", "title":"Text"}]
 * @slotEditor richText
 * @canvasRenderer always-replace
 */
export const Text = useComponent<TextProps>(
  (host) => {
    const props: TextProps = {
      ...getProps(host),
    };

    const fontSize = props.fontSize ? Number(props.fontSize) : undefined;
    const textColor = props.textColor || 'var(--sqm-text)';

    // NOTE: This component uses light DOM (no shadow DOM) in mint-components.
    // In lit-components we use shadow DOM but replicate the styling behavior
    // by targeting slotted elements.
    const styles = `
      :host {
        display: block;
        color: ${textColor};
      }

      ::slotted(h1) {
        font-size: ${fontSize ? `${fontSize}px` : 'var(--sl-font-size-xxx-large)'};
        font-weight: var(--sl-font-weight-semibold);
        color: ${textColor};
        margin: 0;
      }

      ::slotted(h2) {
        font-size: ${fontSize ? `${fontSize}px` : 'var(--sl-font-size-xx-large)'};
        font-weight: var(--sl-font-weight-semibold);
        color: ${textColor};
        margin: 0;
      }

      ::slotted(h3) {
        font-size: ${fontSize ? `${fontSize}px` : 'var(--sl-font-size-x-large)'};
        font-weight: var(--sl-font-weight-semibold);
        color: ${textColor};
        margin: 0;
      }

      ::slotted(h4) {
        font-size: ${fontSize ? `${fontSize}px` : 'var(--sl-font-size-large)'};
        font-weight: var(--sl-font-weight-bold);
        color: ${textColor};
        margin: 0;
      }

      ::slotted(p) {
        font-size: ${fontSize ? `${fontSize}px` : 'var(--sl-font-size-medium)'};
        font-weight: var(--sl-font-weight-normal);
        color: ${textColor};
        margin: 0;
      }

      ::slotted(sub) {
        font-size: ${fontSize ? `${fontSize}px` : 'var(--sl-font-size-small)'};
        font-weight: var(--sl-font-weight-normal);
        color: ${textColor};
        margin: 0;
      }
    `;

    return html`
      <style>
        ${styles}
      </style>
      <div>
        <slot></slot>
      </div>
    `;
  },
  'sql-text',
  ['font-size', 'text-color'] as const
);
