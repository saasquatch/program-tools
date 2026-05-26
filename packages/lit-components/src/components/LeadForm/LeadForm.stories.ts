import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { UI } from '../../ui';
import '../../index';
import { LeadFormView } from './LeadFormView';

const meta: Meta = {
  title: 'Components/LeadForm',
  component: 'sql-lead-form',
  tags: ['autodocs'],
  argTypes: {
    'header-text': { control: 'text' },
    'submit-label': { control: 'text' },
    'success-message': { control: 'text' },
    'program-id': { control: 'text' },
  },
  render: (args) => html`
    <sql-lead-form
      header-text="${args['header-text'] || 'Get Started'}"
      submit-label="${args['submit-label'] || 'Submit'}"
      success-message="${args['success-message'] || 'Thank you for your submission!'}"
      program-id="${args['program-id'] || ''}"
    >
      ${UI.Input({ label: 'First Name' })}
      ${UI.Input({ label: 'Last Name' })}
      ${UI.Input({ label: 'Email', type: 'email' })}
    </sql-lead-form>
  `,
};

export default meta;
type Story = StoryObj;

const baseProps = {
  headerText: 'Get Started',
  submitLabel: 'Submit',
  successMessage: 'Thank you for your submission!',
  programId: 'demo-program',
};

export const Default: Story = {};

export const WithError: Story = {
  render: () =>
    LeadFormView({
      ...baseProps,
      formData: {},
      updateField: () => {},
      error: 'An error occurred. Please try again.',
      loading: false,
      success: false,
      onSubmit: (e: Event) => e.preventDefault(),
    }),
};

export const Success: Story = {
  render: () =>
    LeadFormView({
      ...baseProps,
      formData: {},
      updateField: () => {},
      error: '',
      loading: false,
      success: true,
      onSubmit: (e: Event) => e.preventDefault(),
    }),
};

export const Loading: Story = {
  render: () =>
    LeadFormView({
      ...baseProps,
      formData: {},
      updateField: () => {},
      error: '',
      loading: true,
      success: false,
      onSubmit: (e: Event) => e.preventDefault(),
    }),
};
