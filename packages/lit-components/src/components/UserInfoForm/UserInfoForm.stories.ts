import type { Meta, StoryObj } from '@storybook/web-components-vite';
import '../../index';
import { UserInfoFormView } from './UserInfoFormView';

const meta: Meta = {
  title: 'Components/UserInfoForm',
  component: 'sql-user-info-form',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

const baseProps = {
  headerText: 'Personal Information',
  submitLabel: 'Continue',
  firstNameLabel: 'First Name',
  lastNameLabel: 'Last Name',
  emailLabel: 'Email',
  phoneLabel: 'Phone Number',
  countryLabel: 'Country',
  programId: 'demo-program',
  firstName: 'Jane',
  setFirstName: () => undefined,
  lastName: 'Doe',
  setLastName: () => undefined,
  email: 'jane@example.com',
  setEmail: () => undefined,
  phone: '+1 555 555 5555',
  setPhone: () => undefined,
  country: 'United States',
  setCountry: () => undefined,
  error: '',
  loading: false,
  onSubmit: (event: Event) => event.preventDefault(),
};

export const Default: Story = {
  render: () => UserInfoFormView(baseProps),
};

export const WithError: Story = {
  render: () =>
    UserInfoFormView({
      ...baseProps,
      error: 'First name, last name, and email are required',
    }),
};

export const Loading: Story = {
  render: () =>
    UserInfoFormView({
      ...baseProps,
      loading: true,
    }),
};
