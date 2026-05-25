import { getProps } from '../../helpers';
import { useComponent } from '../../hooks/useComponent';
import { DividedLayoutView } from './DividedLayoutView';

export interface DividedLayoutProps {
  direction?: 'row' | 'column';
  gap?: string;
  dividerColor?: string;
  dividerWidth?: string;
}

declare global {
  interface HTMLElementTagNameMap {
    'sql-divided-layout': HTMLElement;
  }
}

export const DividedLayout = useComponent<DividedLayoutProps>(
  (host) => {
    const rawProps = getProps(host) as Partial<Record<keyof DividedLayoutProps, unknown>>;
    const props: DividedLayoutProps = {
      direction: rawProps.direction === 'column' ? 'column' : 'row',
      gap: typeof rawProps.gap === 'string' ? rawProps.gap : 'var(--sl-spacing-medium)',
      dividerColor: typeof rawProps.dividerColor === 'string' ? rawProps.dividerColor : undefined,
      dividerWidth:
        typeof rawProps.dividerWidth === 'string' ? rawProps.dividerWidth : '1px',
    };

    return DividedLayoutView(props);
  },
  'sql-divided-layout',
  ['direction', 'gap', 'divider-color', 'divider-width'] as const
);
