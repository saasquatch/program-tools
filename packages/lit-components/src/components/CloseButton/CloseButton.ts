import { getProps } from '../../helpers';
import { useComponent } from '../../hooks/useComponent';
import { CloseButtonView } from './CloseButtonView';

export interface CloseButtonProps {
  size?: 'small' | 'medium' | 'large';
}

declare global {
  interface HTMLElementTagNameMap {
    'sql-close-button': HTMLElement;
  }
}

export const CloseButton = useComponent<CloseButtonProps>(
  (host) => {
    const rawProps = getProps(host) as Partial<Record<keyof CloseButtonProps, unknown>>;
    const props: CloseButtonProps = {
      size: rawProps.size === 'small' || rawProps.size === 'large' ? rawProps.size : 'medium',
    };

    return CloseButtonView(props);
  },
  'sql-close-button',
  ['size'] as const
);
