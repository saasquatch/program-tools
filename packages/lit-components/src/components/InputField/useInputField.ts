import { useState } from '@saasquatch/universal-hooks';
import { InputFieldProps } from './InputField';

export function useInputField(props: InputFieldProps) {
  const [value, setValue] = useState(props.fieldValue || '');
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState('');

  function validate(val: string) {
    if (props.fieldRequired && !val) {
      return 'This field is required';
    }
    if (props.fieldMinLength && val.length < props.fieldMinLength) {
      return `Must be at least ${props.fieldMinLength} characters`;
    }
    if (props.fieldMaxLength && val.length > props.fieldMaxLength) {
      return `Must be no more than ${props.fieldMaxLength} characters`;
    }
    if (props.fieldPattern) {
      const regex = new RegExp(props.fieldPattern);
      if (!regex.test(val)) {
        return props.fieldPatternMessage || 'Invalid format';
      }
    }
    return '';
  }

  function onInput(e: Event) {
    const target = e.target as HTMLInputElement;
    setValue(target.value);
    if (touched) {
      setError(validate(target.value));
    }
  }

  function onBlur() {
    setTouched(true);
    setError(validate(value));
  }

  return { value, error, touched, onInput, onBlur };
}
