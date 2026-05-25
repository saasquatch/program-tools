import { getProps } from '../../helpers';
import { useComponent } from '../../hooks/useComponent';
import { DropdownFieldView } from './DropdownFieldView';
import { useDropdownField } from './useDropdownField';

export interface DropdownFieldOption {
  label: string;
  value: string;
}

export interface DropdownFieldProps {
  fieldLabel: string;
  fieldName: string;
  fieldRequired: boolean;
  fieldDisabled: boolean;
  fieldPlaceholder: string;
  fieldHelpText?: string;
  fieldSize: 'small' | 'medium' | 'large';
  fieldOptions?: string;
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
    'sql-dropdown-field': HTMLElement;
  }
}

export const DropdownField = useComponent<DropdownFieldProps>(
  (host) => {
    const rawProps = getProps(host);
    const props: DropdownFieldProps = {
      fieldLabel: rawProps.fieldLabel || 'Select',
      fieldName: rawProps.fieldName || '',
      fieldRequired: getBooleanAttribute(host, 'field-required', false),
      fieldDisabled: getBooleanAttribute(host, 'field-disabled', false),
      fieldPlaceholder: rawProps.fieldPlaceholder || 'Select an option',
      fieldHelpText: rawProps.fieldHelpText || undefined,
      fieldSize: (rawProps.fieldSize as DropdownFieldProps['fieldSize']) || 'medium',
      fieldOptions: rawProps.fieldOptions || undefined,
    };

    const hookProps = useDropdownField(props);

    return DropdownFieldView({ ...props, ...hookProps });
  },
  'sql-dropdown-field',
  [
    'field-label',
    'field-name',
    'field-required',
    'field-disabled',
    'field-placeholder',
    'field-help-text',
    'field-size',
    'field-options',
  ] as const
);
