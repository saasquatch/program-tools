import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { UI } from '../../ui';
import '../../index';
import { BaseRegistrationView } from './BaseRegistrationView';

const meta: Meta = {
  title: 'Components/BaseRegistration',
  component: 'sql-base-registration',
  tags: ['autodocs'],
  argTypes: {
    'page-label': { control: 'text' },
    'email-label': { control: 'text' },
    'submit-label': { control: 'text' },
    'required-field-error-message': { control: 'text' },
    'invalid-email-error-message': { control: 'text' },
    'show-google-button': { control: 'boolean' },
    'show-secondary-button': { control: 'boolean' },
  },
  render: (args) => html`
    <sql-base-registration
      page-label="${args['page-label'] || 'Register'}"
      email-label="${args['email-label'] || 'Email'}"
      submit-label="${args['submit-label'] || 'Register'}"
      required-field-error-message="${args['required-field-error-message'] || 'Cannot be empty'}"
      invalid-email-error-message="${args['invalid-email-error-message'] || 'Must be a valid email address'}"
      ?show-google-button="${args['show-google-button'] ?? true}"
      ?show-secondary-button="${args['show-secondary-button'] ?? true}"
    >
      ${UI.Button({ slot: 'googleButton', variant: 'default', children: 'Register with Google' })}
      <div slot="secondaryButton" style="text-align: center;">
        Already have an account?
        ${UI.Button({ variant: 'text', children: 'Sign in' })}
      </div>
    </sql-base-registration>
  `,
};

export default meta;
type Story = StoryObj<typeof meta>;

const baseProps = {
  pageLabel: 'Register',
  emailLabel: 'Email',
  submitLabel: 'Register',
  requiredFieldErrorMessage: 'Cannot be empty',
  invalidEmailErrorMessage: 'Must be a valid email address',
  showGoogleButton: true,
  showSecondaryButton: true,
  email: '',
  setEmail: (_value: string) => undefined,
  validationErrors: {},
  loading: false,
  onSubmit: async (event: Event) => event.preventDefault(),
};

export const Default: Story = {};

export const EmailError: Story = {
  render: () =>
    BaseRegistrationView({
      ...baseProps,
      validationErrors: {
        email: 'Must be a valid email address',
      },
    }),
};

export const EmailOnly: Story = {
  args: {
    'show-google-button': false,
    'show-secondary-button': false,
  },
};
