import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../../index';

const meta: Meta = {
  title: 'Components/NameFields',
  component: 'sql-name-fields',
  tags: ['autodocs'],
  argTypes: {
    'first-name-label': { control: 'text' },
    'last-name-label': { control: 'text' },
    'first-name-placeholder': { control: 'text' },
    'last-name-placeholder': { control: 'text' },
    'field-required': { control: 'boolean' },
    'field-disabled': { control: 'boolean' },
    'field-size': { control: 'select', options: ['small', 'medium', 'large'] },
    layout: { control: 'select', options: ['horizontal', 'vertical'] },
  },
  render: (args) => html`<sql-name-fields
    first-name-label="${args['first-name-label'] || 'First Name'}"
    last-name-label="${args['last-name-label'] || 'Last Name'}"
    first-name-placeholder="${args['first-name-placeholder'] || ''}"
    last-name-placeholder="${args['last-name-placeholder'] || ''}"
    ?field-required="${args['field-required']}"
    ?field-disabled="${args['field-disabled']}"
    field-size="${args['field-size'] || 'medium'}"
    layout="${args.layout || 'horizontal'}"
  ></sql-name-fields>`,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {},
};

export const Vertical: Story = {
  args: {
    layout: 'vertical',
  },
};

export const Required: Story = {
  args: {
    'field-required': true,
  },
};

export const Disabled: Story = {
  args: {
    'field-disabled': true,
  },
};

export const WithPlaceholders: Story = {
  args: {
    'first-name-placeholder': 'Jane',
    'last-name-placeholder': 'Doe',
  },
};

export const WithErrors: Story = {
  args: {
    'field-required': true,
  },
};
