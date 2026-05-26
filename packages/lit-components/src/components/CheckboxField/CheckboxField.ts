import { isDemo } from '@saasquatch/component-boilerplate';
import { getProps } from '../../helpers';
import { useComponent } from '../../hooks/useComponent';
import { CheckboxFieldView } from './CheckboxFieldView';
import { useCheckboxField, useDemoCheckboxField } from './useCheckboxField';

export interface CheckboxFieldProps {
  fieldLabel: string;
  fieldName: string;
  fieldRequired: boolean;
  fieldDisabled: boolean;
  fieldChecked: boolean;
  fieldHelpText?: string;
  fieldSize: 'small' | 'medium' | 'large';
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
    'sql-checkbox-field': HTMLElement;
  }
}

export const CheckboxField = useComponent<CheckboxFieldProps>(
  (host) => {
    const rawProps = getProps(host);
    const props: CheckboxFieldProps = {
      fieldLabel: rawProps.fieldLabel || 'Checkbox',
      fieldName: rawProps.fieldName || '',
      fieldRequired: getBooleanAttribute(host, 'field-required', false),
      fieldDisabled: getBooleanAttribute(host, 'field-disabled', false),
      fieldChecked: getBooleanAttribute(host, 'field-checked', false),
      fieldHelpText: rawProps.fieldHelpText || undefined,
      fieldSize: (rawProps.fieldSize as CheckboxFieldProps['fieldSize']) || 'medium',
    };

    const hookProps = isDemo() ? useDemoCheckboxField(props) : useCheckboxField(props);

    return CheckboxFieldView({ ...props, ...hookProps });
  },
  'sql-checkbox-field',
  [
    'field-label',
    'field-name',
    'field-required',
    'field-disabled',
    'field-checked',
    'field-help-text',
    'field-size',
  ] as const
);
