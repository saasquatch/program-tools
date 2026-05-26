import { getProps } from '../../helpers';
import { useComponent } from '../../hooks/useComponent';
import { HeaderLogoView } from './HeaderLogoView';

export interface HeaderLogoProps {
  imageUrl: string;
  height: string;
  href?: string;
  alignment: 'left' | 'center' | 'right';
}

declare global {
  interface HTMLElementTagNameMap {
    'sql-header-logo': HTMLElement;
  }
}

export const HeaderLogo = useComponent<HeaderLogoProps>(
  (host) => {
    const rawProps = getProps(host) as Partial<HeaderLogoProps>;
    const alignment = rawProps.alignment;
    const props: HeaderLogoProps = {
      imageUrl: rawProps.imageUrl || '',
      height: rawProps.height || '40px',
      href: rawProps.href,
      alignment: alignment === 'center' || alignment === 'right' ? alignment : 'left',
    };

    return HeaderLogoView(props);
  },
  'sql-header-logo',
  ['image-url', 'height', 'href', 'alignment'] as const
);
