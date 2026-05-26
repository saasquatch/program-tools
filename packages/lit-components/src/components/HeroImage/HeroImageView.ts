import { html } from 'lit';
import { UI } from '../../ui';
import { HeroImageProps } from './HeroImage';

function renderButton(props: HeroImageProps) {
  if (!props.buttonText) {
    return '';
  }

  return UI.Button({
    variant: 'primary',
    href: props.buttonLink || '',
    disabled: !props.buttonLink,
    pill: props.layout === 'overlay',
    children: props.buttonText,
  });
}

export function HeroImageView(props: HeroImageProps) {
  return html`
    <style>
      :host {
        display: block;
      }

      .hero-image-container {
        position: relative;
        padding: ${props.imagePadding || '0'};
        box-sizing: border-box;
      }

      .hero-image {
        display: block;
        width: 100%;
        min-height: ${props.imageMinHeight || 'auto'};
        object-fit: cover;
      }

      .overlay {
        position: absolute;
        top: ${props.imagePadding || '0'};
        left: ${props.imagePadding || '0'};
        right: ${props.imagePadding || '0'};
        bottom: ${props.imagePadding || '0'};
        background: ${props.overlayColor};
        opacity: ${props.overlayOpacity};
      }

      .content {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        color: ${props.textColor};
        width: min(90%, 40rem);
        z-index: 1;
        display: grid;
        gap: var(--sl-spacing-medium);
      }

      .hero-columns {
        display: flex;
        flex-direction: ${props.imagePos === 'right' ? 'row-reverse' : 'row'};
        flex-wrap: wrap;
      }

      .hero-image-col {
        flex: 1;
        min-width: 300px;
        padding: ${props.imagePadding || '0'};
        box-sizing: border-box;
      }

      .hero-content-col {
        flex: 1;
        min-width: 300px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: var(--sl-spacing-large);
        box-sizing: border-box;
        color: ${props.textColor};
        gap: var(--sl-spacing-medium);
      }

      .hero-content-col h1,
      .content h1,
      .hero-content-col p,
      .content p {
        margin: 0;
      }

      @media (max-width: 599px) {
        .hero-image-col,
        .hero-content-col {
          min-width: 100%;
        }
      }
    </style>
    ${props.layout === 'overlay'
      ? html`
          <div class="hero-image-container" part="sqm-base">
            <img class="hero-image" src="${props.imageUrl}" alt="${props.header || 'Hero image'}" />
            <div class="overlay" aria-hidden="true"></div>
            <div class="content" part="sqm-overlay-content">
              ${props.header ? html`<h1>${props.header}</h1>` : ''}
              ${props.description ? html`<p>${props.description}</p>` : ''}
              ${renderButton(props)}
            </div>
          </div>
        `
      : html`
          <div class="hero-columns" part="sqm-base">
            <div class="hero-image-col" part="sqm-image-column">
              <img class="hero-image" src="${props.imageUrl}" alt="${props.header || 'Hero image'}" />
            </div>
            <div class="hero-content-col" part="sqm-content-column">
              ${props.header ? html`<h1>${props.header}</h1>` : ''}
              ${props.description ? html`<p>${props.description}</p>` : ''}
              ${renderButton(props)}
            </div>
          </div>
        `}
  `;
}
