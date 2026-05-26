import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../../index';

const meta: Meta = {
  title: 'Components/PasswordField',
  component: 'sql-password-field',
  tags: ['autodocs'],
  argTypes: {
    'field-label': { control: 'text' },
    'field-name': { control: 'text' },
    'field-required': { control: 'boolean' },
    'field-disabled': { control: 'boolean' },
    'field-placeholder': { control: 'text' },
    'field-min-length': { control: 'number' },
    'field-max-length': { control: 'number' },
    'field-help-text': { control: 'text' },
    'field-size': { control: 'select', options: ['small', 'medium', 'large'] },
    'show-toggle': { control: 'boolean' },
  },
  render: (args) => html`<sql-password-field
    field-label="${args['field-label'] || 'Password'}"
    field-name="${args['field-name'] || 'password'}"
    ?field-required="${args['field-required']}"
    ?field-disabled="${args['field-disabled']}"
    field-placeholder="${args['field-placeholder'] || ''}"
    field-min-length="${args['field-min-length'] || 8}"
    field-max-length="${args['field-max-length'] || ''}"
    field-help-text="${args['field-help-text'] || ''}"
    field-size="${args['field-size'] || 'medium'}"
    ?show-toggle="${args['show-toggle'] ?? true}"
  ></sql-password-field>`,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {},
};

export const Required: Story = {
  args: {
    'field-required': true,
  },
};

export const WithMinLength: Story = {
  args: {
    'field-min-length': 12,
    'field-help-text': 'Use at least 12 characters for a stronger password.',
  },
};

export const WithPlaceholder: Story = {
  args: {
    'field-placeholder': 'Enter your password',
  },
};

export const Disabled: Story = {
  args: {
    'field-disabled': true,
  },
};

export const WithToggle: Story = {
  args: {
    'show-toggle': true,
  },
};

export const WithError: Story = {
  args: {
    'field-required': true,
    'field-min-length': 10,
  },
};
