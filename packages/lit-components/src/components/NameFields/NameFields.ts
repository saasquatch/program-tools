import { getProps } from '../../helpers';
import { useComponent } from '../../hooks/useComponent';
import { NameFieldsView } from './NameFieldsView';
import { useNameFields } from './useNameFields';

export interface NameFieldsProps {
  firstNameLabel: string;
  lastNameLabel: string;
  firstNamePlaceholder?: string;
  lastNamePlaceholder?: string;
  fieldRequired: boolean;
  fieldDisabled: boolean;
  fieldSize: 'small' | 'medium' | 'large';
  layout: 'horizontal' | 'vertical';
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
    'sql-name-fields': HTMLElement;
  }
}

export const NameFields = useComponent<NameFieldsProps>(
  (host) => {
    const rawProps = getProps(host);
    const props: NameFieldsProps = {
      firstNameLabel: rawProps.firstNameLabel || 'First Name',
      lastNameLabel: rawProps.lastNameLabel || 'Last Name',
      firstNamePlaceholder: rawProps.firstNamePlaceholder || undefined,
      lastNamePlaceholder: rawProps.lastNamePlaceholder || undefined,
      fieldRequired: getBooleanAttribute(host, 'field-required', false),
      fieldDisabled: getBooleanAttribute(host, 'field-disabled', false),
      fieldSize: (rawProps.fieldSize as NameFieldsProps['fieldSize']) || 'medium',
      layout: (rawProps.layout as NameFieldsProps['layout']) || 'horizontal',
    };

    const hookProps = useNameFields(props);

    return NameFieldsView({ ...props, ...hookProps });
  },
  'sql-name-fields',
  [
    'first-name-label',
    'last-name-label',
    'first-name-placeholder',
    'last-name-placeholder',
    'field-required',
    'field-disabled',
    'field-size',
    'layout',
  ] as const
);
