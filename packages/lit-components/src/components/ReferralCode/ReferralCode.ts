import { getProps } from '../../helpers';
import { useComponent } from '../../hooks/useComponent';
import { useReferralCode } from './useReferralCode';
import { ReferralCodeView } from './ReferralCodeView';

export interface ReferralCodeProps {
  tooltipText: string;
  showNotificationText: boolean;
  notificationText: string;
  tooltipLifespan: number;
  textAlign: string;
  copyButtonLabel: string;
  buttonStyle: 'icon' | 'button-outside' | 'button-below';
  buttonType: 'primary' | 'secondary';
  backgroundColor?: string;
  borderColor?: string;
  textColor?: string;
  borderRadius?: number;
  programId?: string;
  inputPlaceholderText?: string;
  errorText?: string;
}

declare global {
  interface HTMLElementTagNameMap {
    'sql-referral-code': HTMLElement;
  }
}

export const ReferralCode = useComponent<ReferralCodeProps>(
  (host) => {
    const props: ReferralCodeProps = {
      tooltipText: 'Copied to Clipboard',
      showNotificationText: false,
      notificationText: "You've copied this code before",
      tooltipLifespan: 1000,
      textAlign: 'left',
      copyButtonLabel: 'Copy Code',
      buttonStyle: 'icon',
      buttonType: 'primary',
      ...getProps(host),
    };

    const hookProps = useReferralCode(props);

    console.log({ props, hookProps });

    return ReferralCodeView({ ...props, ...hookProps });
  },
  'sql-referral-code',
  [
    'tooltip-text',
    'show-notification-text',
    'notification-text',
    'tooltip-lifespan',
    'text-align',
    'copy-button-label',
    'copy-button-style',
    'background-color',
    'border-color',
    'text-color',
    'border-radius',
    'button-type',
    'program-id',
  ] as const
);
