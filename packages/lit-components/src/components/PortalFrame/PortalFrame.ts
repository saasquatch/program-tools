import { getProps } from '../../helpers';
import { useComponent } from '../../hooks/useComponent';
import { PortalFrameView } from './PortalFrameView';

export interface PortalFrameProps {
  maxWidth: string;
  backgroundColor?: string;
  showBorder: boolean;
  borderColor?: string;
}

const parseBoolean = (value: unknown, fallback = false) => {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string') return value === '' || value === 'true';
  return fallback;
};

declare global {
  interface HTMLElementTagNameMap {
    'sql-portal-frame': HTMLElement;
  }
}

export const PortalFrame = useComponent<PortalFrameProps>(
  (host) => {
    const rawProps = getProps(host) as Partial<Record<keyof PortalFrameProps, unknown>>;
    const props: PortalFrameProps = {
      maxWidth: typeof rawProps.maxWidth === 'string' ? rawProps.maxWidth : '800px',
      backgroundColor: typeof rawProps.backgroundColor === 'string' ? rawProps.backgroundColor : undefined,
      showBorder: parseBoolean(rawProps.showBorder, true),
      borderColor: typeof rawProps.borderColor === 'string' ? rawProps.borderColor : undefined,
    };

    return PortalFrameView(props);
  },
  'sql-portal-frame',
  ['max-width', 'background-color', 'show-border', 'border-color'] as const
);
