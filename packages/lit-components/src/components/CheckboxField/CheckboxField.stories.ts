import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../../index';

const meta: Meta = {
  title: 'Components/CheckboxField',
  component: 'sql-checkbox-field',
  tags: ['autodocs'],
  argTypes: {
    'field-label': { control: 'text' },
    'field-name': { control: 'text' },
    'field-required': { control: 'boolean' },
    'field-disabled': { control: 'boolean' },
    'field-checked': { control: 'boolean' },
    'field-help-text': { control: 'text' },
    'field-size': { control: 'select', options: ['small', 'medium', 'large'] },
  },
  render: (args) => html`<sql-checkbox-field
    field-label="${args['field-label'] || 'Checkbox'}"
    field-name="${args['field-name'] || 'checkboxField'}"
    ?field-required="${args['field-required']}"
    ?field-disabled="${args['field-disabled']}"
    ?field-checked="${args['field-checked']}"
    field-help-text="${args['field-help-text'] || ''}"
    field-size="${args['field-size'] || 'medium'}"
  ></sql-checkbox-field>`,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    'field-name': 'terms',
    'field-label': 'I agree to the terms and conditions',
  },
};

export const Checked: Story = {
  args: {
    'field-name': 'updates',
    'field-label': 'Send me product updates',
    'field-checked': true,
  },
};

export const Required: Story = {
  args: {
    'field-name': 'privacy',
    'field-label': 'I accept the privacy policy',
    'field-required': true,
  },
};

export const Disabled: Story = {
  args: {
    'field-name': 'disabledConsent',
    'field-label': 'This option is unavailable',
    'field-disabled': true,
  },
};

export const WithHelpText: Story = {
  args: {
    'field-name': 'marketing',
    'field-label': 'Subscribe to marketing emails',
    'field-help-text': 'You can unsubscribe at any time.',
  },
};

export const WithError: Story = {
  args: {
    'field-name': 'requiredConsent',
    'field-label': 'I confirm this action',
    'field-required': true,
  },
};
