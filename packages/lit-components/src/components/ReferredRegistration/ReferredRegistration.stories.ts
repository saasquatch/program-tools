import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../../index';

const meta: Meta = {
  title: 'Components/ReferredRegistration',
  component: 'sql-referred-registration',
  tags: ['autodocs'],
  argTypes: {
    'header-text': { control: 'text' },
    'description-text': { control: 'text' },
    'submit-label': { control: 'text' },
  },
  render: (args) => html`
    <sql-referred-registration
      header-text="${args['header-text'] || "You've Been Referred!"}"
      description-text="${
        args['description-text'] || 'Complete your registration to claim your reward.'
      }"
      submit-label="${args['submit-label'] || 'Register'}"
    >
      <sl-input label="First Name"></sl-input>
      <sl-input label="Last Name"></sl-input>
      <sl-input label="Email" type="email"></sl-input>
      <sl-button variant="primary">${args['submit-label'] || 'Register'}</sl-button>
    </sql-referred-registration>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const CustomText: Story = {
  args: {
    'header-text': 'Join Through Your Referral',
    'description-text': 'Finish signing up below to receive your referral reward.',
    'submit-label': 'Create Account',
  },
};
