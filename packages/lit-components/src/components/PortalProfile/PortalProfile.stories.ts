import type { Meta, StoryObj } from '@storybook/web-components-vite';
import '../../index';
import { PortalProfileView } from './PortalProfileView';

const meta: Meta = {
  title: 'Components/PortalProfile',
  component: 'sql-portal-profile',
  tags: ['autodocs'],
  argTypes: {
    'first-name-label': { control: 'text' },
    'last-name-label': { control: 'text' },
    'email-label': { control: 'text' },
    'submit-label': { control: 'text' },
    'header-text': { control: 'text' },
    'show-country': { control: 'boolean' },
    'country-label': { control: 'text' },
  },
};

export default meta;
type Story = StoryObj;

const baseProps = {
  firstNameLabel: 'First Name',
  lastNameLabel: 'Last Name',
  emailLabel: 'Email',
  submitLabel: 'Save Changes',
  headerText: 'Profile',
  showCountry: false,
  countryLabel: 'Country',
  firstName: 'Jane',
  setFirstName: () => undefined,
  lastName: 'Doe',
  setLastName: () => undefined,
  email: 'jane@example.com',
  setEmail: () => undefined,
  country: 'US',
  setCountry: () => undefined,
  error: '',
  success: false,
  loading: false,
  saving: false,
  onSubmit: (event: Event) => event.preventDefault(),
};

export const Default: Story = {
  render: () => PortalProfileView(baseProps),
};

export const Loading: Story = {
  render: () =>
    PortalProfileView({
      ...baseProps,
      loading: true,
    }),
};

export const WithCountry: Story = {
  render: () =>
    PortalProfileView({
      ...baseProps,
      showCountry: true,
    }),
};

export const WithError: Story = {
  render: () =>
    PortalProfileView({
      ...baseProps,
      error: 'Unable to save changes right now.',
    }),
};

export const Success: Story = {
  render: () =>
    PortalProfileView({
      ...baseProps,
      success: true,
    }),
};
