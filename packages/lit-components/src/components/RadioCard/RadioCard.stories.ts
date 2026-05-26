import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../../index';

const meta: Meta = {
  title: 'Components/RadioCard',
  component: 'sql-radio-card',
  tags: ['autodocs'],
  argTypes: {
    'field-name': { control: 'text' },
    'field-value': { control: 'text' },
    'field-label': { control: 'text' },
    'field-description': { control: 'text' },
    'field-disabled': { control: 'boolean' },
    'field-checked': { control: 'boolean' },
    icon: { control: 'text' },
  },
  render: (args) => html`<sql-radio-card
    field-name="${args['field-name'] || 'plan'}"
    field-value="${args['field-value'] || 'basic'}"
    field-label="${args['field-label'] || 'Basic Plan'}"
    field-description="${args['field-description'] || ''}"
    ?field-disabled="${args['field-disabled']}"
    ?field-checked="${args['field-checked']}"
    icon="${args.icon || ''}"
  ></sql-radio-card>`,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    'field-name': 'plan',
    'field-value': 'basic',
    'field-label': 'Basic Plan',
  },
};

export const Selected: Story = {
  args: {
    'field-name': 'plan',
    'field-value': 'pro',
    'field-label': 'Pro Plan',
    'field-checked': true,
  },
};

export const WithIcon: Story = {
  args: {
    'field-name': 'delivery',
    'field-value': 'plane',
    'field-label': 'Express Delivery',
    icon: 'airplane',
  },
};

export const WithDescription: Story = {
  args: {
    'field-name': 'support',
    'field-value': 'premium',
    'field-label': 'Premium Support',
    'field-description': '24/7 access to priority support and onboarding help.',
  },
};

export const Disabled: Story = {
  args: {
    'field-name': 'plan',
    'field-value': 'enterprise',
    'field-label': 'Enterprise Plan',
    'field-disabled': true,
  },
};

export const Group: Story = {
  render: () => html`
    <div style="display: grid; gap: 12px; max-width: 420px;">
      <sql-radio-card
        field-name="plans"
        field-value="starter"
        field-label="Starter"
        field-description="A simple plan for getting started."
      ></sql-radio-card>
      <sql-radio-card
        field-name="plans"
        field-value="growth"
        field-label="Growth"
        field-description="Popular for growing programs."
        field-checked
        icon="graph-up-arrow"
      ></sql-radio-card>
      <sql-radio-card
        field-name="plans"
        field-value="enterprise"
        field-label="Enterprise"
        field-description="Advanced controls and dedicated support."
        icon="building"
      ></sql-radio-card>
    </div>
  `,
};
