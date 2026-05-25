import { getProps } from '../../helpers';
import { useComponent } from '../../hooks/useComponent';
import { EditProfileView } from './EditProfileView';
import { useEditProfile } from './useEditProfile';

export interface EditProfileProps {
  headerText: string;
  submitLabel: string;
  firstNameLabel: string;
  lastNameLabel: string;
  successMessage: string;
}

declare global {
  interface HTMLElementTagNameMap {
    'sql-edit-profile': HTMLElement;
  }
}

export const EditProfile = useComponent<EditProfileProps>(
  (host) => {
    const rawProps = getProps(host);
    const props: EditProfileProps = {
      headerText: rawProps.headerText || 'Edit Profile',
      submitLabel: rawProps.submitLabel || 'Save Changes',
      firstNameLabel: rawProps.firstNameLabel || 'First Name',
      lastNameLabel: rawProps.lastNameLabel || 'Last Name',
      successMessage: rawProps.successMessage || 'Profile updated successfully!',
    };

    const hookProps = useEditProfile(props);

    return EditProfileView({ ...props, ...hookProps });
  },
  'sql-edit-profile',
  ['header-text', 'submit-label', 'first-name-label', 'last-name-label', 'success-message'] as const
);
