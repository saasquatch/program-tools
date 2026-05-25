import { getProps } from '../../helpers';
import { useComponent } from '../../hooks/useComponent';
import { UserInfoFormView } from './UserInfoFormView';
import { useUserInfoForm } from './useUserInfoForm';

export interface UserInfoFormProps {
  headerText: string;
  submitLabel: string;
  firstNameLabel: string;
  lastNameLabel: string;
  emailLabel: string;
  phoneLabel: string;
  countryLabel: string;
  programId?: string;
}

declare global {
  interface HTMLElementTagNameMap {
    'sql-user-info-form': HTMLElement;
  }
}

export const UserInfoForm = useComponent<UserInfoFormProps>(
  (host) => {
    const rawProps = getProps(host) as Partial<Record<keyof UserInfoFormProps, unknown>>;
    const props: UserInfoFormProps = {
      headerText: typeof rawProps.headerText === 'string' ? rawProps.headerText : 'Personal Information',
      submitLabel: typeof rawProps.submitLabel === 'string' ? rawProps.submitLabel : 'Continue',
      firstNameLabel: typeof rawProps.firstNameLabel === 'string' ? rawProps.firstNameLabel : 'First Name',
      lastNameLabel: typeof rawProps.lastNameLabel === 'string' ? rawProps.lastNameLabel : 'Last Name',
      emailLabel: typeof rawProps.emailLabel === 'string' ? rawProps.emailLabel : 'Email',
      phoneLabel: typeof rawProps.phoneLabel === 'string' ? rawProps.phoneLabel : 'Phone Number',
      countryLabel: typeof rawProps.countryLabel === 'string' ? rawProps.countryLabel : 'Country',
      programId: typeof rawProps.programId === 'string' ? rawProps.programId : undefined,
    };

    const hookProps = useUserInfoForm(props);

    return UserInfoFormView({ ...props, ...hookProps });
  },
  'sql-user-info-form',
  [
    'header-text',
    'submit-label',
    'first-name-label',
    'last-name-label',
    'email-label',
    'phone-label',
    'country-label',
    'program-id',
  ] as const
);
