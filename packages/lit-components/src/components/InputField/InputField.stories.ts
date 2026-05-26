import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../../index';

const meta: Meta = {
  title: 'Components/InputField',
  component: 'sql-input-field',
  tags: ['autodocs'],
  argTypes: {
    'field-label': { control: 'text' },
    'field-name': { control: 'text' },
    'field-required': { control: 'boolean' },
    'field-disabled': { control: 'boolean' },
    'field-placeholder': { control: 'text' },
    'field-type': { control: 'select', options: ['text', 'number', 'email', 'tel', 'url', 'date'] },
    'field-min-length': { control: 'number' },
    'field-max-length': { control: 'number' },
    'field-pattern': { control: 'text' },
    'field-pattern-message': { control: 'text' },
    'field-value': { control: 'text' },
    'field-help-text': { control: 'text' },
    'field-size': { control: 'select', options: ['small', 'medium', 'large'] },
  },
  render: (args) => html`<sql-input-field
    field-label="${args['field-label'] || 'Input'}"
    field-name="${args['field-name'] || 'inputField'}"
    ?field-required="${args['field-required']}"
    ?field-disabled="${args['field-disabled']}"
    field-placeholder="${args['field-placeholder'] || ''}"
    field-type="${args['field-type'] || 'text'}"
    field-min-length="${args['field-min-length'] || ''}"
    field-max-length="${args['field-max-length'] || ''}"
    field-pattern="${args['field-pattern'] || ''}"
    field-pattern-message="${args['field-pattern-message'] || ''}"
    field-value="${args['field-value'] || ''}"
    field-help-text="${args['field-help-text'] || ''}"
    field-size="${args['field-size'] || 'medium'}"
  ></sql-input-field>`,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    'field-name': 'fullName',
  },
};

export const Required: Story = {
  args: {
    'field-name': 'email',
    'field-label': 'Email',
    'field-required': true,
  },
};

export const WithPlaceholder: Story = {
  args: {
    'field-name': 'company',
    'field-label': 'Company',
    'field-placeholder': 'Enter your company name',
  },
};

export const WithHelpText: Story = {
  args: {
    'field-name': 'website',
    'field-label': 'Website',
    'field-help-text': 'Include the full URL, including https://',
    'field-type': 'url',
  },
};

export const Disabled: Story = {
  args: {
    'field-name': 'disabledField',
    'field-label': 'Disabled field',
    'field-disabled': true,
    'field-value': 'Read only value',
  },
};

export const EmailType: Story = {
  args: {
    'field-name': 'emailAddress',
    'field-label': 'Email Address',
    'field-type': 'email',
    'field-placeholder': 'name@example.com',
  },
};

export const NumberType: Story = {
  args: {
    'field-name': 'quantity',
    'field-label': 'Quantity',
    'field-type': 'number',
    'field-value': '5',
  },
};

export const WithValidation: Story = {
  args: {
    'field-name': 'username',
    'field-label': 'Username',
    'field-required': true,
    'field-min-length': 4,
    'field-max-length': 12,
    'field-pattern': '^[a-zA-Z0-9_]+$',
    'field-pattern-message': 'Only letters, numbers, and underscores are allowed',
    'field-help-text': '4-12 characters',
  },
};

export const WithError: Story = {
  args: {
    'field-name': 'postalCode',
    'field-label': 'Postal Code',
    'field-required': true,
    'field-pattern': '^[0-9]{5}$',
    'field-pattern-message': 'Enter a valid 5-digit postal code',
    'field-value': '12',
  },
};
