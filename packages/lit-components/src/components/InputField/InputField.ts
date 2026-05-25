import { getProps } from '../../helpers';
import { useComponent } from '../../hooks/useComponent';
import { InputFieldView } from './InputFieldView';
import { useInputField } from './useInputField';

export interface InputFieldProps {
  fieldLabel: string;
  fieldName: string;
  fieldRequired: boolean;
  fieldDisabled: boolean;
  fieldPlaceholder?: string;
  fieldType: 'text' | 'number' | 'email' | 'tel' | 'url' | 'date';
  fieldMinLength?: number;
  fieldMaxLength?: number;
  fieldPattern?: string;
  fieldPatternMessage?: string;
  fieldValue?: string;
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

function getNumberAttribute(host: HTMLElement, name: string) {
  const value = host.getAttribute(name);
  return value !== null && value !== '' ? Number(value) : undefined;
}

declare global {
  interface HTMLElementTagNameMap {
    'sql-input-field': HTMLElement;
  }
}

export const InputField = useComponent<InputFieldProps>(
  (host) => {
    const rawProps = getProps(host);
    const props: InputFieldProps = {
      fieldLabel: rawProps.fieldLabel || 'Input',
      fieldName: rawProps.fieldName || '',
      fieldRequired: getBooleanAttribute(host, 'field-required', false),
      fieldDisabled: getBooleanAttribute(host, 'field-disabled', false),
      fieldPlaceholder: rawProps.fieldPlaceholder || undefined,
      fieldType: (rawProps.fieldType as InputFieldProps['fieldType']) || 'text',
      fieldMinLength: getNumberAttribute(host, 'field-min-length'),
      fieldMaxLength: getNumberAttribute(host, 'field-max-length'),
      fieldPattern: rawProps.fieldPattern || undefined,
      fieldPatternMessage: rawProps.fieldPatternMessage || undefined,
      fieldValue: rawProps.fieldValue || undefined,
      fieldHelpText: rawProps.fieldHelpText || undefined,
      fieldSize: (rawProps.fieldSize as InputFieldProps['fieldSize']) || 'medium',
    };

    const hookProps = useInputField(props);

    return InputFieldView({ ...props, ...hookProps });
  },
  'sql-input-field',
  [
    'field-label',
    'field-name',
    'field-required',
    'field-disabled',
    'field-placeholder',
    'field-type',
    'field-min-length',
    'field-max-length',
    'field-pattern',
    'field-pattern-message',
    'field-value',
    'field-help-text',
    'field-size',
  ] as const
);
