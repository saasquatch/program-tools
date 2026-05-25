import { getProps } from '../../helpers';
import { useComponent } from '../../hooks/useComponent';
import { ShareButtonView } from './ShareButtonView';
import { useShareButton } from './useShareButton';

export type ShareButtonMedium =
  | 'facebook'
  | 'twitter'
  | 'email'
  | 'sms'
  | 'linkedin'
  | 'pinterest'
  | 'whatsapp'
  | 'linemessenger'
  | 'reminder'
  | 'fbmessenger';

export interface ShareButtonProps {
  medium: ShareButtonMedium;
  iconSlot: 'prefix' | 'suffix' | 'label';
  buttonText?: string;
  hideText: boolean;
  hideIcon: boolean;
  programId?: string;
  emailSubject?: string;
  emailBody?: string;
  messageText?: string;
  backgroundColor?: string;
  textColor?: string;
  borderRadius?: number;
  pillLayout: boolean;
  size: 'small' | 'medium' | 'large';
}

declare global {
  interface HTMLElementTagNameMap {
    'sql-share-button': HTMLElement;
  }
}

export const ShareButton = useComponent<ShareButtonProps>(
  (host) => {
    const props: ShareButtonProps = {
      medium: 'facebook',
      iconSlot: 'prefix',
      hideText: false,
      hideIcon: false,
      pillLayout: false,
      size: 'medium',
      ...getProps(host),
    };

    const hookProps = useShareButton(props);

    return ShareButtonView({ ...props, ...hookProps });
  },
  'sql-share-button',
  [
    'medium',
    'icon-slot',
    'button-text',
    'hide-text',
    'hide-icon',
    'program-id',
    'email-subject',
    'email-body',
    'message-text',
    'background-color',
    'text-color',
    'border-radius',
    'pill-layout',
    'size',
  ] as const
);
