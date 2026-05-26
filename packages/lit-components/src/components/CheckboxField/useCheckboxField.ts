import { useState } from '@saasquatch/universal-hooks';
import { CheckboxFieldProps } from './CheckboxField';

export function useCheckboxField(props: CheckboxFieldProps) {
  const [checked, setChecked] = useState(props.fieldChecked || false);
  const [error, setError] = useState('');

  function onChange(e: Event) {
    const target = e.target as HTMLInputElement;
    setChecked(target.checked);
    if (props.fieldRequired && !target.checked) {
      setError('This field is required');
    } else {
      setError('');
    }
  }

  return { checked, error, onChange };
}

export function useDemoCheckboxField(props: CheckboxFieldProps): ReturnType<typeof useCheckboxField> {
  const [checked, setChecked] = useState(props.fieldChecked);
  const [error, setError] = useState('');

  function onChange(e: Event) {
    const target = e.target as HTMLInputElement;
    setChecked(target.checked);
    if (props.fieldRequired && !target.checked) {
      setError('This field is required');
    } else {
      setError('');
    }
  }

  return { checked, error, onChange };
}
