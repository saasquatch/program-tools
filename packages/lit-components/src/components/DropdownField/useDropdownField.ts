import { useState } from '@saasquatch/universal-hooks';
import { DropdownFieldOption, DropdownFieldProps } from './DropdownField';

function parseOptions(fieldOptions?: string): DropdownFieldOption[] {
  if (!fieldOptions) return [];
  try {
    return JSON.parse(fieldOptions) as DropdownFieldOption[];
  } catch {
    return fieldOptions.split(',').map((opt: string) => ({
      label: opt.trim(),
      value: opt.trim(),
    }));
  }
}

export function useDropdownField(props: DropdownFieldProps) {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  function onChange(e: Event) {
    const target = e.target as HTMLSelectElement;
    setValue(target.value);
    if (props.fieldRequired && !target.value) {
      setError('This field is required');
    } else {
      setError('');
    }
  }

  return { value, error, options: parseOptions(props.fieldOptions), onChange };
}

export function useDemoDropdownField(props: DropdownFieldProps): ReturnType<typeof useDropdownField> {
  const demoOptions = parseOptions(props.fieldOptions);
  const options = demoOptions.length
    ? demoOptions
    : [
        { label: 'United States', value: 'united-states' },
        { label: 'Canada', value: 'canada' },
        { label: 'United Kingdom', value: 'united-kingdom' },
      ];
  const [value, setValue] = useState(options[0]?.value || '');
  const [error, setError] = useState('');

  function onChange(e: Event) {
    const target = e.target as HTMLSelectElement;
    setValue(target.value);
    if (props.fieldRequired && !target.value) {
      setError('This field is required');
    } else {
      setError('');
    }
  }

  return { value, error, options, onChange };
}
