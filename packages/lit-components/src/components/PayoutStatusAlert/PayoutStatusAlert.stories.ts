import type { Meta, StoryObj } from '@storybook/web-components-vite';
import '../../index';
import { PayoutStatusAlertView } from './PayoutStatusAlertView';

const meta: Meta = {
  title: 'Components/PayoutStatusAlert',
  component: 'sql-payout-status-alert',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

const baseProps = {
  pendingText: 'Your payout is being processed.',
  approvedText: 'Your payout has been approved!',
  deniedText: 'Your payout was denied. Please contact support.',
  programId: 'demo-program',
  status: '',
  loading: false,
  variant: 'neutral',
  text: '',
};

export const Pending: Story = {
  render: () =>
    PayoutStatusAlertView({
      ...baseProps,
      status: 'PENDING',
      variant: 'warning',
      text: baseProps.pendingText,
    }),
};

export const Approved: Story = {
  render: () =>
    PayoutStatusAlertView({
      ...baseProps,
      status: 'APPROVED',
      variant: 'success',
      text: baseProps.approvedText,
    }),
};

export const Denied: Story = {
  render: () =>
    PayoutStatusAlertView({
      ...baseProps,
      status: 'DENIED',
      variant: 'danger',
      text: baseProps.deniedText,
    }),
};
