import type { Meta, StoryObj } from '@storybook/web-components-vite';
import '../../index';
import { TaxAndCashDashboardView } from './TaxAndCashDashboardView';

const meta: Meta = {
  title: 'Components/TaxAndCashDashboard',
  component: 'sql-tax-and-cash-dashboard',
  tags: ['autodocs'],
  argTypes: {
    'user-info-label': { control: 'text' },
    'tax-form-label': { control: 'text' },
    'banking-info-label': { control: 'text' },
    'payout-label': { control: 'text' },
    'complete-text': { control: 'text' },
    'incomplete-text': { control: 'text' },
    'pending-text': { control: 'text' },
    'program-id': { control: 'text' },
  },
};

export default meta;
type Story = StoryObj;

const getStatusText = (status: string) => {
  switch (status) {
    case 'COMPLETE':
      return 'Complete';
    case 'PENDING':
    case 'PENDING_REVIEW':
      return 'Pending';
    default:
      return 'Incomplete';
  }
};

const getStatusVariant = (status: string) => {
  switch (status) {
    case 'COMPLETE':
      return 'success';
    case 'PENDING':
    case 'PENDING_REVIEW':
      return 'warning';
    default:
      return 'neutral';
  }
};

const baseProps = {
  userInfoLabel: 'Personal Information',
  taxFormLabel: 'Tax Information',
  bankingInfoLabel: 'Banking Information',
  payoutLabel: 'Payout',
  completeText: 'Complete',
  incompleteText: 'Incomplete',
  pendingText: 'Pending',
  programId: 'demo-program',
  loading: false,
  getStatusText,
  getStatusVariant,
  steps: [
    { label: 'Personal Information', status: 'NOT_STARTED', key: 'user-info' },
    { label: 'Tax Information', status: 'NOT_STARTED', key: 'tax-form' },
    { label: 'Banking Information', status: 'NOT_STARTED', key: 'banking-info' },
    { label: 'Payout', status: 'NOT_STARTED', key: 'payout' },
  ],
};

export const Default: Story = {
  render: () => TaxAndCashDashboardView(baseProps),
};

export const Loading: Story = {
  render: () =>
    TaxAndCashDashboardView({
      ...baseProps,
      loading: true,
    }),
};

export const AllComplete: Story = {
  render: () =>
    TaxAndCashDashboardView({
      ...baseProps,
      steps: baseProps.steps.map((step) => ({ ...step, status: 'COMPLETE' })),
    }),
};

export const Mixed: Story = {
  render: () =>
    TaxAndCashDashboardView({
      ...baseProps,
      steps: [
        { label: 'Personal Information', status: 'COMPLETE', key: 'user-info' },
        { label: 'Tax Information', status: 'PENDING_REVIEW', key: 'tax-form' },
        { label: 'Banking Information', status: 'NOT_STARTED', key: 'banking-info' },
        { label: 'Payout', status: 'PENDING', key: 'payout' },
      ],
    }),
};
