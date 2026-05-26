import { isDemo } from '@saasquatch/component-boilerplate';
import { getProps } from '../../helpers';
import { useComponent } from '../../hooks/useComponent';
import { CouponCodeView } from './CouponCodeView';
import { useCouponCode, useDemoCouponCode } from './useCouponCode';

export interface CouponCodeProps {
  tooltipText: string;
  tooltipLifespan: number;
  textAlign: 'left' | 'center' | 'right';
  copyButtonLabel: string;
  buttonStyle: 'icon' | 'button-outside' | 'button-below';
  buttonType: 'primary' | 'secondary';
  backgroundColor?: string;
  borderColor?: string;
  textColor?: string;
  borderRadius?: number;
  programId?: string;
  rewardKey?: string;
  tooltipCopyText?: string;
  tooltipCopiedText?: string;
  errorTextGeneric: string;
  errorTextPending: string;
  errorTextFulfilled: string;
  errorTextCancelled: string;
  errorTextExpired: string;
  errorTextRedeemed: string;
}

declare global {
  interface HTMLElementTagNameMap {
    'sql-coupon-code': HTMLElement;
  }
}

export const CouponCode = useComponent<CouponCodeProps>(
  (host) => {
    const props: CouponCodeProps = {
      tooltipText: 'Copied to Clipboard',
      tooltipLifespan: 1000,
      textAlign: 'left',
      copyButtonLabel: 'Copy Code',
      buttonStyle: 'icon',
      buttonType: 'primary',
      errorTextGeneric: 'An error occurred. Please try again.',
      errorTextPending: 'Your reward is pending.',
      errorTextFulfilled: 'This reward has already been fulfilled.',
      errorTextCancelled: 'This reward has been cancelled.',
      errorTextExpired: 'This code has expired.',
      errorTextRedeemed: 'This code has been redeemed.',
      ...getProps(host),
    };

    const hookProps = isDemo() ? useDemoCouponCode(props) : useCouponCode(props);

    return CouponCodeView({ ...props, ...hookProps });
  },
  'sql-coupon-code',
  [
    'tooltip-text',
    'tooltip-lifespan',
    'text-align',
    'copy-button-label',
    'button-style',
    'button-type',
    'background-color',
    'border-color',
    'text-color',
    'border-radius',
    'program-id',
    'reward-key',
    'tooltip-copy-text',
    'tooltip-copied-text',
    'error-text-generic',
    'error-text-pending',
    'error-text-fulfilled',
    'error-text-cancelled',
    'error-text-expired',
    'error-text-redeemed',
  ] as const
);
