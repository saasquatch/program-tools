import { isDemo } from '@saasquatch/component-boilerplate';
import { getProps } from '../../helpers';
import { useComponent } from '../../hooks/useComponent';
import { PasswordFieldView } from './PasswordFieldView';
import { usePasswordField, useDemoPasswordField } from './usePasswordField';

export interface PasswordFieldProps {
  fieldLabel: string;
  fieldName: string;
  fieldRequired: boolean;
  fieldDisabled: boolean;
  fieldPlaceholder?: string;
  fieldMinLength: number;
  fieldMaxLength?: number;
  fieldHelpText?: string;
  fieldSize: 'small' | 'medium' | 'large';
  showToggle: boolean;
}

function getBooleanAttribute(host: HTMLElement, name: string, defaultValue = false) {
  if (!host.hasAttribute(name)) {
    return defaultValue;
  }

  const value = host.getAttribute(name);
  return value === '' || value === 'true';
}

function getNumberAttribute(host: HTMLElement, name: string, defaultValue?: number) {
  const value = host.getAttribute(name);
  return value !== null && value !== '' ? Number(value) : defaultValue;
}

declare global {
  interface HTMLElementTagNameMap {
    'sql-password-field': HTMLElement;
  }
}

export const PasswordField = useComponent<PasswordFieldProps>(
  (host) => {
    const rawProps = getProps(host);
    const props: PasswordFieldProps = {
      fieldLabel: rawProps.fieldLabel || 'Password',
      fieldName: rawProps.fieldName || 'password',
      fieldRequired: getBooleanAttribute(host, 'field-required', false),
      fieldDisabled: getBooleanAttribute(host, 'field-disabled', false),
      fieldPlaceholder: rawProps.fieldPlaceholder || undefined,
      fieldMinLength: getNumberAttribute(host, 'field-min-length', 8) || 8,
      fieldMaxLength: getNumberAttribute(host, 'field-max-length'),
      fieldHelpText: rawProps.fieldHelpText || undefined,
      fieldSize: (rawProps.fieldSize as PasswordFieldProps['fieldSize']) || 'medium',
      showToggle: getBooleanAttribute(host, 'show-toggle', true),
    };

    const hookProps = isDemo() ? useDemoPasswordField(props) : usePasswordField(props);

    return PasswordFieldView({ ...props, ...hookProps });
  },
  'sql-password-field',
  [
    'field-label',
    'field-name',
    'field-required',
    'field-disabled',
    'field-placeholder',
    'field-min-length',
    'field-max-length',
    'field-help-text',
    'field-size',
    'show-toggle',
  ] as const
);
