import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../../index';
import { TaxAndCashView } from './TaxAndCashView';

const meta: Meta = {
  title: 'Components/TaxAndCash',
  component: 'sql-tax-and-cash',
  tags: ['autodocs'],
  argTypes: {
    'program-id': { control: 'text' },
    step: { control: 'select', options: ['dashboard', 'user-info', 'tax-form', 'banking-info', 'docusign'] },
  },
  render: (args) => html`
    <sql-tax-and-cash program-id="${args['program-id'] || ''}" step="${args.step || 'dashboard'}">
      <sql-tax-and-cash-dashboard></sql-tax-and-cash-dashboard>
    </sql-tax-and-cash>
  `,
};

export default meta;
type Story = StoryObj;

const baseProps = {
  programId: 'demo-program',
  step: 'dashboard' as const,
  currentStep: 'dashboard',
  setCurrentStep: () => undefined,
  loading: false,
  status: 'NOT_STARTED',
  taxFormStatus: 'NOT_STARTED',
  bankingInfoStatus: 'NOT_STARTED',
  payoutStatus: 'NOT_STARTED',
};

export const Default: Story = {};

export const Loading: Story = {
  render: () =>
    TaxAndCashView({
      ...baseProps,
      loading: true,
    }),
};

export const Dashboard: Story = {
  render: () => html`
    <sql-tax-and-cash step="dashboard">
      <div style="padding: 1rem; border: 1px dashed var(--sl-color-neutral-300); border-radius: var(--sl-border-radius-medium);">
        Dashboard content slot
      </div>
    </sql-tax-and-cash>
  `,
};
