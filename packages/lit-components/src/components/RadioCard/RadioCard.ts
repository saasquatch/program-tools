import { getProps } from '../../helpers';
import { useComponent } from '../../hooks/useComponent';
import { RadioCardView } from './RadioCardView';
import { useRadioCard } from './useRadioCard';

export interface RadioCardProps {
  fieldName: string;
  fieldValue: string;
  fieldLabel?: string;
  fieldDescription?: string;
  fieldDisabled: boolean;
  fieldChecked: boolean;
  icon?: string;
  onClick?: () => void;
}

function getBooleanAttribute(host: HTMLElement, name: string, defaultValue = false) {
  if (!host.hasAttribute(name)) {
    return defaultValue;
  }

  const value = host.getAttribute(name);
  return value === '' || value === 'true';
}

declare global {
  interface HTMLElementTagNameMap {
    'sql-radio-card': HTMLElement;
  }
}

export const RadioCard = useComponent<RadioCardProps>(
  (host) => {
    const rawProps = getProps(host);
    const props: RadioCardProps = {
      fieldName: rawProps.fieldName || '',
      fieldValue: rawProps.fieldValue || '',
      fieldLabel: rawProps.fieldLabel || undefined,
      fieldDescription: rawProps.fieldDescription || undefined,
      fieldDisabled: getBooleanAttribute(host, 'field-disabled', false),
      fieldChecked: getBooleanAttribute(host, 'field-checked', false),
      icon: rawProps.icon || undefined,
      onClick: (host as HTMLElement & { onClick?: () => void }).onClick,
    };

    const hookProps = useRadioCard(props);

    return RadioCardView({ ...props, ...hookProps });
  },
  'sql-radio-card',
  [
    'field-name',
    'field-value',
    'field-label',
    'field-description',
    'field-disabled',
    'field-checked',
    'icon',
  ] as const
);
