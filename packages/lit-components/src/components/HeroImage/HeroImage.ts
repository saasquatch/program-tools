import { getProps } from '../../helpers';
import { useComponent } from '../../hooks/useComponent';
import { HeroImageView } from './HeroImageView';

export interface HeroImageProps {
  imageUrl: string;
  layout: 'overlay' | 'columns';
  header?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
  imagePos: 'left' | 'right';
  overlayOpacity: number;
  overlayColor: string;
  textColor: string;
  imageMinHeight?: string;
  imagePadding?: string;
}

declare global {
  interface HTMLElementTagNameMap {
    'sql-hero-image': HTMLElement;
  }
}

export const HeroImage = useComponent<HeroImageProps>(
  (host) => {
    const rawProps = getProps(host);
    const props: HeroImageProps = {
      imageUrl: rawProps.imageUrl || '',
      layout: rawProps.layout === 'overlay' ? 'overlay' : 'columns',
      header: rawProps.header,
      description: rawProps.description,
      buttonText: rawProps.buttonText,
      buttonLink: rawProps.buttonLink,
      imagePos: rawProps.imagePos === 'right' ? 'right' : 'left',
      overlayOpacity: rawProps.overlayOpacity ? Number(rawProps.overlayOpacity) : 0.75,
      overlayColor: rawProps.overlayColor || '#000000',
      textColor: rawProps.textColor || '#ffffff',
      imageMinHeight: rawProps.imageMinHeight,
      imagePadding: rawProps.imagePadding,
    };

    return HeroImageView(props);
  },
  'sql-hero-image',
  [
    'image-url',
    'layout',
    'header',
    'description',
    'button-text',
    'button-link',
    'image-pos',
    'overlay-opacity',
    'overlay-color',
    'text-color',
    'image-min-height',
    'image-padding',
  ] as const
);
