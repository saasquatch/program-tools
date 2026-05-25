import { html } from 'lit';
import { HeroProps } from './Hero';

function getPaddingValue(paddingSize: HeroProps['paddingSize']) {
  return paddingSize === 'none' ? '0' : `var(--sl-spacing-${paddingSize})`;
}

export function HeroView(props: HeroProps) {
  const columnTemplate = (slotName: '1' | '2', extraClass = '', background = 'transparent') => html`
    <div class="hero-column ${extraClass}" style="background: ${background};" part="sqm-column-${slotName}">
      <slot name="${slotName}"></slot>
    </div>
  `;

  return html`
    <style>
      :host {
        display: block;
      }

      .hero-container {
        display: flex;
        flex-wrap: ${props.wrapDirection === 'reverse' ? 'wrap-reverse' : 'wrap'};
        min-height: ${props.minHeight || 'auto'};
      }

      .hero-column {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: ${getPaddingValue(props.paddingSize)};
        min-width: 300px;
        box-sizing: border-box;
      }

      @media (max-width: 599px) {
        .hero-column {
          min-width: 100%;
        }

        .hero-column.hide-mobile {
          display: none;
        }
      }
    </style>
    <div class="hero-container" part="sqm-base">
      ${props.columns === 1
        ? columnTemplate('1', '', props.background || 'transparent')
        : html`
            ${columnTemplate(
              '1',
              props.columnToHideInMobile === 1 ? 'hide-mobile' : '',
              props.background || 'transparent'
            )}
            ${columnTemplate(
              '2',
              props.columnToHideInMobile === 2 ? 'hide-mobile' : '',
              props.secondaryBackground || 'transparent'
            )}
          `}
    </div>
  `;
}
