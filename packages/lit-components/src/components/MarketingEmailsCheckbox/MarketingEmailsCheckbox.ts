import { getProps } from '../../helpers';
import { useComponent } from '../../hooks/useComponent';
import { MarketingEmailsCheckboxView } from './MarketingEmailsCheckboxView';

export interface MarketingEmailsCheckboxProps {
  label: string;
  fieldName: string;
  defaultChecked: boolean;
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
    'sql-marketing-emails-checkbox': HTMLElement;
  }
}

export const MarketingEmailsCheckbox = useComponent<MarketingEmailsCheckboxProps>(
  (host) => {
    const rawProps = getProps(host);
    const props: MarketingEmailsCheckboxProps = {
      label: rawProps.label || 'I agree to receive marketing emails',
      fieldName: rawProps.fieldName || 'marketingOptIn',
      defaultChecked: getBooleanAttribute(host, 'default-checked', false),
    };

    return MarketingEmailsCheckboxView(props);
  },
  'sql-marketing-emails-checkbox',
  ['label', 'field-name', 'default-checked'] as const
);
