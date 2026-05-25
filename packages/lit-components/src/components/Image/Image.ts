import { getProps } from '../../helpers';
import { useComponent } from '../../hooks/useComponent';
import { ImageView } from './ImageView';

export interface ImageProps {
  imageUrl: string;
  alignment?: 'left' | 'center' | 'right';
  backgroundColor?: string;
  minHeight?: string;
  width?: string;
}

declare global {
  interface HTMLElementTagNameMap {
    'sql-image': HTMLElement;
  }
}

export const Image = useComponent<ImageProps>(
  (host) => {
    const rawProps = getProps(host) as Partial<ImageProps>;
    const props: ImageProps = {
      imageUrl: rawProps.imageUrl || '',
      alignment:
        rawProps.alignment === 'left' || rawProps.alignment === 'right' || rawProps.alignment === 'center'
          ? rawProps.alignment
          : 'center',
      backgroundColor: rawProps.backgroundColor,
      minHeight: rawProps.minHeight,
      width: rawProps.width,
    };

    return ImageView(props);
  },
  'sql-image',
  ['image-url', 'alignment', 'background-color', 'min-height', 'width'] as const
);
