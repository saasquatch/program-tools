import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../../index';
import { EditProfileView } from './EditProfileView';

const meta: Meta = {
  title: 'Components/EditProfile',
  component: 'sql-edit-profile',
  tags: ['autodocs'],
  argTypes: {
    'header-text': { control: 'text' },
    'submit-label': { control: 'text' },
    'first-name-label': { control: 'text' },
    'last-name-label': { control: 'text' },
    'success-message': { control: 'text' },
  },
  render: (args) => html`
    <sql-edit-profile
      header-text="${args['header-text'] || 'Edit Profile'}"
      submit-label="${args['submit-label'] || 'Save Changes'}"
      first-name-label="${args['first-name-label'] || 'First Name'}"
      last-name-label="${args['last-name-label'] || 'Last Name'}"
      success-message="${args['success-message'] || 'Profile updated successfully!'}"
    ></sql-edit-profile>
  `,
};

export default meta;
type Story = StoryObj;

const baseProps = {
  headerText: 'Edit Profile',
  submitLabel: 'Save Changes',
  firstNameLabel: 'First Name',
  lastNameLabel: 'Last Name',
  successMessage: 'Profile updated successfully!',
};

export const Default: Story = {
  render: () =>
    EditProfileView({
      ...baseProps,
      firstName: 'Jane',
      setFirstName: () => {},
      lastName: 'Doe',
      setLastName: () => {},
      email: 'jane@example.com',
      error: '',
      success: false,
      loading: false,
      saving: false,
      onSubmit: (e: Event) => e.preventDefault(),
    }),
};

export const Loading: Story = {
  render: () =>
    EditProfileView({
      ...baseProps,
      firstName: '',
      setFirstName: () => {},
      lastName: '',
      setLastName: () => {},
      email: '',
      error: '',
      success: false,
      loading: true,
      saving: false,
      onSubmit: (e: Event) => e.preventDefault(),
    }),
};

export const WithError: Story = {
  render: () =>
    EditProfileView({
      ...baseProps,
      firstName: 'Jane',
      setFirstName: () => {},
      lastName: 'Doe',
      setLastName: () => {},
      email: 'jane@example.com',
      error: 'Failed to update profile. Please try again.',
      success: false,
      loading: false,
      saving: false,
      onSubmit: (e: Event) => e.preventDefault(),
    }),
};

export const Success: Story = {
  render: () =>
    EditProfileView({
      ...baseProps,
      firstName: 'Jane',
      setFirstName: () => {},
      lastName: 'Doe',
      setLastName: () => {},
      email: 'jane@example.com',
      error: '',
      success: true,
      loading: false,
      saving: false,
      onSubmit: (e: Event) => e.preventDefault(),
    }),
};
