import { html, nothing } from 'lit';
import { UI } from '../../ui';
import { ShareButtonMedium, ShareButtonProps } from './ShareButton';
import { useShareButton } from './useShareButton';

const defaultColors: Record<ShareButtonMedium, string> = {
  facebook: '#1877f2',
  twitter: '#1da1f2',
  email: '#6c757d',
  sms: '#6c757d',
  linkedin: '#0077b5',
  pinterest: '#bd081c',
  whatsapp: '#25d366',
  linemessenger: '#06c755',
  reminder: '#6c757d',
  fbmessenger: '#0084ff',
};

const defaultText: Record<ShareButtonMedium, string> = {
  facebook: 'Share on Facebook',
  twitter: 'Tweet',
  email: 'Send Email',
  sms: 'Send SMS',
  linkedin: 'Share on LinkedIn',
  pinterest: 'Pin it',
  whatsapp: 'Share on WhatsApp',
  linemessenger: 'Share on LINE',
  reminder: 'Set Reminder',
  fbmessenger: 'Share on Messenger',
};

const iconNames: Record<ShareButtonMedium, string> = {
  facebook: 'facebook',
  twitter: 'twitter',
  email: 'envelope',
  sms: 'chat-dots',
  linkedin: 'linkedin',
  pinterest: 'pinterest',
  whatsapp: 'whatsapp',
  linemessenger: 'line',
  reminder: 'bell',
  fbmessenger: 'messenger',
};

const fallbackIconNames: Partial<Record<ShareButtonMedium, string>> = {
  linemessenger: 'chat',
  fbmessenger: 'chat-dots',
};

function getDefaultColor(medium: ShareButtonMedium) {
  return defaultColors[medium] || '#6c757d';
}

function getButtonText(props: ShareButtonProps) {
  return props.buttonText || defaultText[props.medium || 'facebook'];
}

function getIconName(medium: ShareButtonMedium) {
  return iconNames[medium] || fallbackIconNames[medium] || 'share';
}

export function ShareButtonView(props: ShareButtonProps & ReturnType<typeof useShareButton>) {
  const medium = props.medium || 'facebook';
  const buttonText = getButtonText(props);
  const iconName = getIconName(medium);
  const borderRadius = props.borderRadius
    ? `${props.borderRadius}px`
    : props.pillLayout
      ? '999px'
      : 'var(--sl-border-radius-medium)';

  const styles = `
    :host {
      display: inline-block;
    }

    sl-button::part(base) {
      background: ${props.backgroundColor || getDefaultColor(medium)};
      color: ${props.textColor || '#ffffff'};
      border-radius: ${borderRadius};
      border: none;
    }

    sl-button::part(label),
    sl-button::part(prefix),
    sl-button::part(suffix),
    sl-icon::part(base) {
      color: ${props.textColor || '#ffffff'};
    }
  `;

  const labelIconTemplate = props.hideIcon ? nothing : UI.Icon({ name: iconName });
  const slottedIconTemplate = props.hideIcon
    ? nothing
    : UI.Icon({ name: iconName, slot: props.iconSlot });

  return html`
    <style>
      ${styles}
    </style>
    ${UI.Button({
      onClick: () => props.onClick?.(),
      size: props.size || 'medium',
      disabled: props.disabled,
      children: html`
        ${props.iconSlot === 'label' ? labelIconTemplate : nothing}
        ${props.hideText ? nothing : buttonText}
        ${props.iconSlot !== 'label' ? slottedIconTemplate : nothing}
      `,
    })}
  `;
}
