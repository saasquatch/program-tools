import { html } from 'lit';
import { ImageProps } from './Image';

export function ImageView(props: ImageProps) {
  const alignment = props.alignment || 'center';
  const justifyContent =
    alignment === 'left' ? 'flex-start' : alignment === 'right' ? 'flex-end' : 'center';

  return html`
    <style>
      :host {
        display: block;
      }

      .container {
        display: flex;
        width: 100%;
        justify-content: ${justifyContent};
        background: ${props.backgroundColor || 'transparent'};
      }

      .image {
        min-height: ${props.minHeight || '100%'};
        width: ${props.width || '100%'};
        max-width: max-content;
        object-fit: cover;
      }
    </style>
    <div part="sqm-base" class="container">
      <img part="sqm-image" class="image" src="${props.imageUrl}" />
    </div>
  `;
}
