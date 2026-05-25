import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../../index';
import { InstantAccessRegistrationView } from './InstantAccessRegistrationView';

const meta: Meta = {
  title: 'Components/InstantAccessRegistration',
  component: 'sql-instant-access-registration',
  tags: ['autodocs'],
  argTypes: {
    'header-text': { control: 'text' },
    'submit-label': { control: 'text' },
    'email-label': { control: 'text' },
    'email-placeholder': { control: 'text' },
    'success-message': { control: 'text' },
    'program-id': { control: 'text' },
  },
  render: (args) => html`
    <sql-instant-access-registration
      header-text="${args['header-text'] || 'Get Instant Access'}"
      submit-label="${args['submit-label'] || 'Get Started'}"
      email-label="${args['email-label'] || 'Email'}"
      email-placeholder="${args['email-placeholder'] || 'Enter your email'}"
      success-message="${args['success-message'] || 'Welcome! Check your email for next steps.'}"
      program-id="${args['program-id'] || ''}"
    ></sql-instant-access-registration>
  `,
};

export default meta;
type Story = StoryObj;

const baseProps = {
  headerText: 'Get Instant Access',
  submitLabel: 'Get Started',
  emailLabel: 'Email',
  emailPlaceholder: 'Enter your email',
  successMessage: 'Welcome! Check your email for next steps.',
  programId: 'demo-program',
};

export const Default: Story = {};

export const WithError: Story = {
  render: () =>
    InstantAccessRegistrationView({
      ...baseProps,
      email: 'invalid-email',
      setEmail: () => {},
      error: 'Please enter a valid email',
      loading: false,
      success: false,
      onSubmit: (e: Event) => e.preventDefault(),
    }),
};

export const Success: Story = {
  render: () =>
    InstantAccessRegistrationView({
      ...baseProps,
      email: 'demo@example.com',
      setEmail: () => {},
      error: '',
      loading: false,
      success: true,
      onSubmit: async (e: Event) => e.preventDefault(),
    }),
};

export const Loading: Story = {
  render: () =>
    InstantAccessRegistrationView({
      ...baseProps,
      email: 'demo@example.com',
      setEmail: () => {},
      error: '',
      loading: true,
      success: false,
      onSubmit: async (e: Event) => e.preventDefault(),
    }),
};
