import { getProps } from '../../helpers';
import { useComponent } from '../../hooks/useComponent';
import { LinkButtonView } from './LinkButtonView';

export interface LinkButtonProps {
  href: string;
  target?: '_self' | '_blank';
  buttonText?: string;
  buttonType?: 'primary' | 'secondary' | 'success' | 'neutral' | 'warning' | 'danger';
  size?: 'small' | 'medium' | 'large';
  pill?: boolean;
  outline?: boolean;
  disabled?: boolean;
  icon?: string;
}

const parseBoolean = (value: unknown, fallback = false) => {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string') return value === '' || value === 'true';
  return fallback;
};

declare global {
  interface HTMLElementTagNameMap {
    'sql-link-button': HTMLElement;
  }
}

export const LinkButton = useComponent<LinkButtonProps>(
  (host) => {
    const rawProps = getProps(host) as Partial<Record<keyof LinkButtonProps, unknown>>;
    const props: LinkButtonProps = {
      href: typeof rawProps.href === 'string' ? rawProps.href : '',
      target: rawProps.target === '_blank' ? '_blank' : '_self',
      buttonText: typeof rawProps.buttonText === 'string' ? rawProps.buttonText : 'Click Here',
      buttonType:
        rawProps.buttonType === 'secondary' ||
        rawProps.buttonType === 'success' ||
        rawProps.buttonType === 'neutral' ||
        rawProps.buttonType === 'warning' ||
        rawProps.buttonType === 'danger'
          ? rawProps.buttonType
          : 'primary',
      size:
        rawProps.size === 'small' || rawProps.size === 'large' ? rawProps.size : 'medium',
      pill: parseBoolean(rawProps.pill, false),
      outline: parseBoolean(rawProps.outline, false),
      disabled: parseBoolean(rawProps.disabled, false),
      icon: typeof rawProps.icon === 'string' ? rawProps.icon : undefined,
    };

    return LinkButtonView(props);
  },
  'sql-link-button',
  ['href', 'target', 'button-text', 'button-type', 'size', 'pill', 'outline', 'disabled', 'icon'] as const
);
