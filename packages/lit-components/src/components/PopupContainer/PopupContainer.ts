import { getProps } from '../../helpers';
import { useComponent } from '../../hooks/useComponent';
import { PopupContainerView } from './PopupContainerView';
import { usePopupContainer } from './usePopupContainer';

export interface PopupContainerProps {
  popupTitle?: string;
  showCloseButton?: boolean;
  overlayColor?: string;
  maxWidth?: string;
  padding?: string;
}

const parseBoolean = (value: unknown, fallback = false) => {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string') return value === '' || value === 'true';
  return fallback;
};

declare global {
  interface HTMLElementTagNameMap {
    'sql-popup-container': HTMLElement;
  }
}

export const PopupContainer = useComponent<PopupContainerProps>(
  (host) => {
    const rawProps = getProps(host) as Partial<Record<keyof PopupContainerProps, unknown>>;
    const props: PopupContainerProps = {
      popupTitle: typeof rawProps.popupTitle === 'string' ? rawProps.popupTitle : undefined,
      showCloseButton: parseBoolean(rawProps.showCloseButton, true),
      overlayColor:
        typeof rawProps.overlayColor === 'string' ? rawProps.overlayColor : 'rgba(0, 0, 0, 0.5)',
      maxWidth: typeof rawProps.maxWidth === 'string' ? rawProps.maxWidth : '600px',
      padding: typeof rawProps.padding === 'string' ? rawProps.padding : 'var(--sl-spacing-large)',
    };

    const hookProps = usePopupContainer(props);

    return PopupContainerView({ ...props, ...hookProps });
  },
  'sql-popup-container',
  ['popup-title', 'show-close-button', 'overlay-color', 'max-width', 'padding'] as const
);
