import type { Meta, StoryObj } from '@storybook/web-components-vite';
import '../../index';
import { PayoutDetailsCardView } from './PayoutDetailsCardView';

const meta: Meta = {
  title: 'Components/PayoutDetailsCard',
  component: 'sql-payout-details-card',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

const baseProps = {
  headerText: 'Payout Details',
  nextPayoutLabel: 'Next Payout',
  balanceLabel: 'Available Balance',
  programId: 'demo-program',
  loading: false,
  nextPayoutDate: '2025-01-15',
  availableBalance: '$1,250.00',
  currency: 'USD',
  payoutMethod: 'ACH',
};

export const Default: Story = {
  render: () => PayoutDetailsCardView(baseProps),
};

export const Loading: Story = {
  render: () =>
    PayoutDetailsCardView({
      ...baseProps,
      loading: true,
    }),
};

export const WithData: Story = {
  render: () =>
    PayoutDetailsCardView({
      ...baseProps,
      availableBalance: '$2,340.55',
      nextPayoutDate: '2025-02-01',
      payoutMethod: 'Wire',
    }),
};
