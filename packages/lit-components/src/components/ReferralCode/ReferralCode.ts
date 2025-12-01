import { getProps } from '../../helpers';
import { useComponent } from '../../hooks/useComponent';
import { useReferralCode } from './useReferralCode';
import { ReferralCodeView } from './ReferralCodeView';

export interface ReferralCodeProps {
  /**
   * Text displayed in the tooltip when the code is copied
   *
   * @uiName Tooltip text
   * @uiGroup Content
   */
  tooltipText: string;

  /**
   * Whether to show notification text when code is copied
   *
   * @uiName Show notification
   * @uiGroup Content
   */
  showNotificationText: boolean;

  /**
   * Text displayed below the input after copying
   *
   * @uiName Notification text
   * @uiGroup Content
   */
  notificationText: string;

  /**
   * Duration in milliseconds that the tooltip is displayed
   *
   * @uiName Tooltip duration
   * @uiGroup Behavior
   */
  tooltipLifespan: number;

  /**
   * Change the text alignment
   *
   * @uiName Referral code alignment
   * @uiEnum ["left", "center", "right"]
   * @uiEnumNames ["Left", "Center", "Right"]
   * @uiGroup Style
   */
  textAlign: string;

  /**
   * Label text for the copy button
   *
   * @uiName Copy button label
   * @uiGroup Content
   */
  copyButtonLabel: string;

  /**
   * Visual style of the copy button
   *
   * @uiName Button style
   * @uiEnum ["icon", "button-outside", "button-below"]
   * @uiEnumNames ["Icon", "Button Outside", "Button Below"]
   * @uiGroup Style
   */
  buttonStyle: 'icon' | 'button-outside' | 'button-below';

  /**
   * Color variant of the button
   *
   * @uiName Button type
   * @uiEnum ["primary", "secondary"]
   * @uiEnumNames ["Primary", "Secondary"]
   * @uiGroup Style
   */
  buttonType: 'primary' | 'secondary';

  /**
   * Background color of the input field
   *
   * @uiName Background color
   * @uiWidget color
   * @uiGroup Colors
   */
  backgroundColor?: string;

  /**
   * Border color of the input field
   *
   * @uiName Border color
   * @uiWidget color
   * @uiGroup Colors
   */
  borderColor?: string;

  /**
   * Text color within the input field
   *
   * @uiName Text color
   * @uiWidget color
   * @uiGroup Colors
   */
  textColor?: string;

  /**
   * Border radius in pixels
   *
   * @uiName Border radius
   * @uiGroup Style
   */
  borderRadius?: number;

  /**
   * Program identifier for referral code lookup
   *
   * @uiName Program ID
   * @uiGroup Configuration
   */
  programId?: string;

  /**
   * Placeholder text shown when there's an error
   *
   * @uiName Error placeholder
   * @uiGroup Content
   */
  inputPlaceholderText?: string;

  /**
   * Error message text
   *
   * @uiName Error message
   * @uiGroup Content
   */
  errorText?: string;
}

declare global {
  interface HTMLElementTagNameMap {
    'sql-referral-code': HTMLElement;
  }
}

/**
 * @uiName Referral Code
 * @validParents ["sqm-portal-container","div","sqm-divided-layout","sqm-brand","template","sqm-referral-card","span", "sqm-referral-codes"]
 * @exampleGroup Sharing
 * @example Referral Code - <sql-referral-code tooltip-text="Copied to Clipboard" tooltip-lifespan="1000" show-notification-text="true"></sql-referral-code>
 */
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
