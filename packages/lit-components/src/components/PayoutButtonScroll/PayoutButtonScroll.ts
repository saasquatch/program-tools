import { getProps } from '../../helpers';
import { useComponent } from '../../hooks/useComponent';
import { PayoutButtonScrollView } from './PayoutButtonScrollView';
import { usePayoutButton } from './usePayoutButtonScroll';

export interface PayoutButtonScrollProps {
  buttonText: string;
  scrollTargetId?: string;
  disabled: boolean;
}

const parseBoolean = (value: unknown, fallback: boolean) => {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string') return value === '' || value === 'true';
  return fallback;
};

declare global {
  interface HTMLElementTagNameMap {
    'sql-payout-button-scroll': HTMLElement;
  }
}

export const PayoutButtonScroll = useComponent<PayoutButtonScrollProps>(
  (host) => {
    const rawProps = getProps(host) as Partial<Record<keyof PayoutButtonScrollProps, unknown>>;
    const props: PayoutButtonScrollProps = {
      buttonText: typeof rawProps.buttonText === 'string' ? rawProps.buttonText : 'Cash Out',
      scrollTargetId: typeof rawProps.scrollTargetId === 'string' ? rawProps.scrollTargetId : undefined,
      disabled: parseBoolean(rawProps.disabled, false),
    };

    const hookProps = usePayoutButton(props);

    return PayoutButtonScrollView({ ...props, ...hookProps });
  },
  'sql-payout-button-scroll',
  ['button-text', 'scroll-target-id', 'disabled'] as const
);
