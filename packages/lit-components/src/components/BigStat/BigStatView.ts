import { html } from 'lit';
import { BigStatProps } from './BigStat';
import { BigStatHookResult } from './useBigStat';

export function BigStatView(props: BigStatProps & BigStatHookResult) {
  const alignment = props.alignment || 'center';
  const alignItems =
    alignment === 'left' ? 'flex-start' : alignment === 'right' ? 'flex-end' : 'center';

  return html`
    <style>
      :host {
        display: block;
      }

      .container {
        display: flex;
        flex-direction: ${props.flexReverse ? 'column-reverse' : 'column'};
        align-items: ${alignItems};
      }

      .stat {
        font-size: ${props.statFontSize ? `${props.statFontSize}px` : 'var(--sl-font-size-xx-large)'};
        text-align: ${alignment};
        color: ${props.statTextColor || 'var(--sqm-text)'};
        line-height: 35px;
        font-weight: ${props.statFontWeight || 'var(--sl-font-weight-normal)'};
      }

      .description {
        font-size: ${props.descriptionFontSize
          ? `${props.descriptionFontSize}px`
          : 'var(--sl-font-size-small)'};
        font-weight: var(--sl-font-weight-normal);
        color: ${props.descriptionTextColor || 'var(--sqm-text)'};
        text-align: ${alignment};
        line-height: 20px;
      }
    </style>
    <div part="stat-wrapper" class="container">
      <div part="stat-value" class="stat">${props.loading ? '...' : props.statvalue}</div>
      <div part="stat-description" class="description"><slot>${props.label}</slot></div>
    </div>
  `;
}
