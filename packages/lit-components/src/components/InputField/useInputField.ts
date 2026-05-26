import { useState } from '@saasquatch/universal-hooks';
import { InputFieldProps } from './InputField';

function getDemoValue(props: InputFieldProps) {
  if (props.fieldValue) return props.fieldValue;

  switch (props.fieldType) {
    case 'email':
      return 'jane@example.com';
    case 'tel':
      return '+1 555 123 4567';
    case 'url':
      return 'https://example.com';
    case 'date':
      return '2025-01-01';
    case 'number':
      return '42';
    default:
      return 'Jane Doe';
  }
}

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

export function useDemoInputField(props: InputFieldProps): ReturnType<typeof useInputField> {
  const [value, setValue] = useState(getDemoValue(props));
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
