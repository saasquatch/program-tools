import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../../index';

const meta: Meta = {
  title: 'Components/MarketingEmailsCheckbox',
  component: 'sql-marketing-emails-checkbox',
  tags: ['autodocs'],
  render: (args) => html`
    <sql-marketing-emails-checkbox
      label="${args.label || 'I agree to receive marketing emails'}"
      field-name="${args['field-name'] || 'marketingOptIn'}"
      ?default-checked="${args['default-checked']}"
    ></sql-marketing-emails-checkbox>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const Checked: Story = {
  args: {
    'default-checked': true,
  },
};

export const CustomLabel: Story = {
  args: {
    label: 'Send me product news and offers',
  },
};
