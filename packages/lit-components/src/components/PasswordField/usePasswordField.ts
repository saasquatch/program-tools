import { useState } from '@saasquatch/universal-hooks';
import { PasswordFieldProps } from './PasswordField';

function validatePassword(props: PasswordFieldProps, val: string) {
  if (props.fieldRequired && !val) return 'This field is required';
  if (val && props.fieldMinLength && val.length < Number(props.fieldMinLength)) {
    return `Password must be at least ${props.fieldMinLength} characters`;
  }
  if (val && props.fieldMaxLength && val.length > Number(props.fieldMaxLength)) {
    return `Password must be no more than ${props.fieldMaxLength} characters`;
  }
  return '';
}

export function usePasswordField(props: PasswordFieldProps) {
  const [value, setValue] = useState('');
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  function onInput(e: Event) {
    const target = e.target as HTMLInputElement;
    setValue(target.value);
    if (touched) setError(validatePassword(props, target.value));
  }

  function onBlur() {
    setTouched(true);
    setError(validatePassword(props, value));
  }

  function togglePassword() {
    setShowPassword(!showPassword);
  }

  return { value, error, touched, showPassword, onInput, onBlur, togglePassword };
}

export function useDemoPasswordField(props: PasswordFieldProps): ReturnType<typeof usePasswordField> {
  const [value, setValue] = useState('Password123!');
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  function onInput(e: Event) {
    const target = e.target as HTMLInputElement;
    setValue(target.value);
    if (touched) setError(validatePassword(props, target.value));
  }

  function onBlur() {
    setTouched(true);
    setError(validatePassword(props, value));
  }

  function togglePassword() {
    setShowPassword(!showPassword);
  }

  return { value, error, touched, showPassword, onInput, onBlur, togglePassword };
}
