import { getProps } from '../../helpers';
import { useComponent } from '../../hooks/useComponent';
import { FormMessageView } from './FormMessageView';

export interface FormMessageProps {
  type?: 'success' | 'error' | 'warning' | 'info';
  message?: string;
  icon?: string;
  closable?: boolean;
}

const parseBoolean = (value: unknown, fallback = false) => {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string') return value === '' || value === 'true';
  return fallback;
};

declare global {
  interface HTMLElementTagNameMap {
    'sql-form-message': HTMLElement;
  }
}

export const FormMessage = useComponent<FormMessageProps>(
  (host) => {
    const rawProps = getProps(host) as Partial<Record<keyof FormMessageProps, unknown>>;
    const props: FormMessageProps = {
      type:
        rawProps.type === 'success' ||
        rawProps.type === 'error' ||
        rawProps.type === 'warning'
          ? rawProps.type
          : 'info',
      message: typeof rawProps.message === 'string' ? rawProps.message : '',
      icon: typeof rawProps.icon === 'string' ? rawProps.icon : undefined,
      closable: parseBoolean(rawProps.closable, false),
    };

    return FormMessageView(props);
  },
  'sql-form-message',
  ['type', 'message', 'icon', 'closable'] as const
);
