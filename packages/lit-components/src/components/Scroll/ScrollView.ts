import { html } from 'lit';
import { ScrollProps } from './Scroll';
import { useScroll } from './useScroll';

export function ScrollView(props: ScrollProps & ReturnType<typeof useScroll>) {
  const hookProps = props;

  return html`
    <style>
      :host {
        display: block;
      }

      .scroll-container {
        max-height: ${props.maxHeight};
        overflow-y: ${props.scrollDirection === 'horizontal' ? 'hidden' : 'auto'};
        overflow-x: ${props.scrollDirection === 'vertical' ? 'hidden' : 'auto'};
      }
    </style>
    <div class="scroll-container" @scroll="${hookProps.onScroll}" part="sqm-base">
      <slot></slot>
    </div>
  `;
}
