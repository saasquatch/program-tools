import { getProps } from '../../helpers';
import { useComponent } from '../../hooks/useComponent';
import { ScrollView } from './ScrollView';
import { useScroll } from './useScroll';

export interface ScrollProps {
  maxHeight?: string;
  scrollDirection?: 'vertical' | 'horizontal' | 'both';
}

declare global {
  interface HTMLElementTagNameMap {
    'sql-scroll': HTMLElement;
  }
}

export const Scroll = useComponent<ScrollProps>(
  (host) => {
    const rawProps = getProps(host) as Partial<Record<keyof ScrollProps, unknown>>;
    const props: ScrollProps = {
      maxHeight: typeof rawProps.maxHeight === 'string' ? rawProps.maxHeight : '400px',
      scrollDirection:
        rawProps.scrollDirection === 'horizontal' || rawProps.scrollDirection === 'both'
          ? rawProps.scrollDirection
          : 'vertical',
    };

    const hookProps = useScroll(props);

    return ScrollView({ ...props, ...hookProps });
  },
  'sql-scroll',
  ['max-height', 'scroll-direction'] as const
);
