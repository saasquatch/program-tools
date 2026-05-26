import { getProps } from '../../helpers';
import { useComponent } from '../../hooks/useComponent';
import { PortalContainerView } from './PortalContainerView';

export interface PortalContainerProps {
  direction: 'row' | 'column';
  padding: 'none' | 'small' | 'medium' | 'large' | 'x-large' | 'xx-large';
  gap: 'none' | 'small' | 'medium' | 'large' | 'x-large';
  maxWidth?: string;
  display: 'flex' | 'grid';
  gridColumns: string;
}

declare global {
  interface HTMLElementTagNameMap {
    'sql-portal-container': HTMLElement;
  }
}

export const PortalContainer = useComponent<PortalContainerProps>(
  (host) => {
    const rawProps = getProps(host) as Partial<Record<keyof PortalContainerProps, unknown>>;
    const props: PortalContainerProps = {
      direction: rawProps.direction === 'row' ? 'row' : 'column',
      padding:
        rawProps.padding === 'small' ||
        rawProps.padding === 'medium' ||
        rawProps.padding === 'large' ||
        rawProps.padding === 'x-large' ||
        rawProps.padding === 'xx-large'
          ? rawProps.padding
          : 'none',
      gap:
        rawProps.gap === 'small' ||
        rawProps.gap === 'medium' ||
        rawProps.gap === 'large' ||
        rawProps.gap === 'x-large'
          ? rawProps.gap
          : 'none',
      maxWidth: typeof rawProps.maxWidth === 'string' ? rawProps.maxWidth : undefined,
      display: rawProps.display === 'grid' ? 'grid' : 'flex',
      gridColumns: typeof rawProps.gridColumns === 'string' ? rawProps.gridColumns : '1fr',
    };

    return PortalContainerView(props);
  },
  'sql-portal-container',
  ['direction', 'padding', 'gap', 'max-width', 'display', 'grid-columns'] as const
);
