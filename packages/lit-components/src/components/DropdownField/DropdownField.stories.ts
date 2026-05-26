import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../../index';

const defaultOptions = 'Option 1, Option 2, Option 3';

const meta: Meta = {
  title: 'Components/DropdownField',
  component: 'sql-dropdown-field',
  tags: ['autodocs'],
  argTypes: {
    'field-label': { control: 'text' },
    'field-name': { control: 'text' },
    'field-required': { control: 'boolean' },
    'field-disabled': { control: 'boolean' },
    'field-placeholder': { control: 'text' },
    'field-help-text': { control: 'text' },
    'field-size': { control: 'select', options: ['small', 'medium', 'large'] },
    'field-options': { control: 'text' },
  },
  render: (args) => html`<sql-dropdown-field
    field-label="${args['field-label'] || 'Select'}"
    field-name="${args['field-name'] || 'dropdownField'}"
    ?field-required="${args['field-required']}"
    ?field-disabled="${args['field-disabled']}"
    field-placeholder="${args['field-placeholder'] || 'Select an option'}"
    field-help-text="${args['field-help-text'] || ''}"
    field-size="${args['field-size'] || 'medium'}"
    field-options="${args['field-options'] || defaultOptions}"
  ></sql-dropdown-field>`,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    'field-name': 'favoriteColor',
  },
};

export const WithOptions: Story = {
  args: {
    'field-name': 'country',
    'field-label': 'Country',
    'field-options': '[{"label":"Canada","value":"ca"},{"label":"United States","value":"us"},{"label":"United Kingdom","value":"uk"}]',
  },
};

export const Required: Story = {
  args: {
    'field-name': 'department',
    'field-label': 'Department',
    'field-required': true,
  },
};

export const Disabled: Story = {
  args: {
    'field-name': 'disabledSelect',
    'field-label': 'Disabled select',
    'field-disabled': true,
  },
};

export const WithHelpText: Story = {
  args: {
    'field-name': 'timezone',
    'field-label': 'Timezone',
    'field-help-text': 'Select the timezone used for notifications.',
  },
};

export const WithPreselected: Story = {
  args: {
    'field-name': 'size',
    'field-label': 'T-Shirt Size',
    'field-options': 'Small, Medium, Large',
  },
};
