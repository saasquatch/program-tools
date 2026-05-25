import { useState } from '@saasquatch/universal-hooks';
import { DropdownFieldOption, DropdownFieldProps } from './DropdownField';

export function useDropdownField(props: DropdownFieldProps) {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  function parseOptions(): DropdownFieldOption[] {
    if (!props.fieldOptions) return [];
    try {
      return JSON.parse(props.fieldOptions) as DropdownFieldOption[];
    } catch {
      return props.fieldOptions.split(',').map((opt: string) => ({
        label: opt.trim(),
        value: opt.trim(),
      }));
    }
  }

  function onChange(e: Event) {
    const target = e.target as HTMLSelectElement;
    setValue(target.value);
    if (props.fieldRequired && !target.value) {
      setError('This field is required');
    } else {
      setError('');
    }
  }

  return { value, error, options: parseOptions(), onChange };
}
