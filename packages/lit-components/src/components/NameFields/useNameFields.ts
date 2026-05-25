import { useState } from '@saasquatch/universal-hooks';
import { NameFieldsProps } from './NameFields';

export function useNameFields(props: NameFieldsProps) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');

  function onFirstNameInput(e: Event) {
    const target = e.target as HTMLInputElement;
    setFirstName(target.value);
    if (props.fieldRequired && !target.value) setFirstNameError('First name is required');
    else setFirstNameError('');
  }

  function onLastNameInput(e: Event) {
    const target = e.target as HTMLInputElement;
    setLastName(target.value);
    if (props.fieldRequired && !target.value) setLastNameError('Last name is required');
    else setLastNameError('');
  }

  return { firstName, lastName, firstNameError, lastNameError, onFirstNameInput, onLastNameInput };
}
