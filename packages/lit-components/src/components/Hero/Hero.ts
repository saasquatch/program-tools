import { getProps } from '../../helpers';
import { useComponent } from '../../hooks/useComponent';
import { HeroView } from './HeroView';

export type HeroPaddingSize = 'none' | 'small' | 'medium' | 'large' | 'x-large' | 'xx-large';

export interface HeroProps {
  columns: number;
  minHeight?: string;
  background?: string;
  paddingSize: HeroPaddingSize;
  secondaryBackground?: string;
  wrapDirection: 'reverse' | '';
  columnToHideInMobile: number;
}

declare global {
  interface HTMLElementTagNameMap {
    'sql-hero': HTMLElement;
  }
}

export const Hero = useComponent<HeroProps>(
  (host) => {
    const rawProps = getProps(host);
    const parsedColumns = Number(rawProps.columns);
    const parsedColumnToHide = Number(rawProps.columnToHideInMobile);

    const props: HeroProps = {
      columns: parsedColumns === 1 ? 1 : 2,
      minHeight: rawProps.minHeight,
      background: rawProps.background,
      paddingSize: (rawProps.paddingSize as HeroPaddingSize) || 'large',
      secondaryBackground: rawProps.secondaryBackground,
      wrapDirection: rawProps.wrapDirection === 'reverse' ? 'reverse' : '',
      columnToHideInMobile: Number.isNaN(parsedColumnToHide) ? 0 : parsedColumnToHide,
    };

    return HeroView(props);
  },
  'sql-hero',
  [
    'columns',
    'min-height',
    'background',
    'padding-size',
    'secondary-background',
    'wrap-direction',
    'column-to-hide-in-mobile',
  ] as const
);
