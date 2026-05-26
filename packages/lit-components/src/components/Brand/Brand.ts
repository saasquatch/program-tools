import { getProps } from '../../helpers';
import { useComponent } from '../../hooks/useComponent';
import { BrandView } from './BrandView';
import { useBrand } from './useBrand';

export interface BrandProps {
  /**
   * Primary brand color.
   *
   * @uiName Brand color
   * @uiWidget color
   * @format color
   */
  brandColor?: string;

  /**
   * Google font family used throughout slotted content.
   *
   * @uiName Brand font
   * @uiDefault "Nunito Sans"
   */
  brandFont: string;
}

declare global {
  interface HTMLElementTagNameMap {
    'sql-brand': HTMLElement;
  }
}

/**
 * @uiName Brand Container
 * @slots [{"name":"","title":"Branded Content"}]
 */
export const Brand = useComponent<BrandProps>(
  (host) => {
    const props: BrandProps = {
      brandFont: 'Nunito Sans',
      ...getProps(host),
    };

    const hookProps = useBrand(props);

    return BrandView({ ...props, ...hookProps });
  },
  'sql-brand',
  ['brand-color', 'brand-font'] as const
);
