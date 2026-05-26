import { getProps } from '../../helpers';
import { useComponent } from '../../hooks/useComponent';
import { StatContainerView } from './StatContainerView';

export interface StatContainerProps {
  columns?: number;
  gap?: string;
  padding?: string;
}

const parseNumber = (value: unknown, fallback: number) => {
  if (typeof value === 'number') return value;
  if (typeof value === 'string' && value.trim() !== '') return Number(value);
  return fallback;
};

declare global {
  interface HTMLElementTagNameMap {
    'sql-stat-container': HTMLElement;
  }
}

export const StatContainer = useComponent<StatContainerProps>(
  (host) => {
    const rawProps = getProps(host) as Partial<Record<keyof StatContainerProps, unknown>>;
    const props: StatContainerProps = {
      columns: parseNumber(rawProps.columns, 3),
      gap: typeof rawProps.gap === 'string' ? rawProps.gap : 'var(--sl-spacing-medium)',
      padding: typeof rawProps.padding === 'string' ? rawProps.padding : 'var(--sl-spacing-large)',
    };

    return StatContainerView(props);
  },
  'sql-stat-container',
  ['columns', 'gap', 'padding'] as const
);
