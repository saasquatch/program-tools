import type { Meta, StoryObj } from '@storybook/web-components-vite';
import '../../index';
import { BankingInfoFormView } from './BankingInfoFormView';

const meta: Meta = {
  title: 'Components/BankingInfoForm',
  component: 'sql-banking-info-form',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

const baseProps = {
  headerText: 'Banking Information',
  submitLabel: 'Save',
  accountNameLabel: 'Account Holder Name',
  bankNameLabel: 'Bank Name',
  accountNumberLabel: 'Account Number',
  routingNumberLabel: 'Routing Number',
  programId: 'demo-program',
  accountName: 'Jane Doe',
  setAccountName: () => undefined,
  bankName: 'Mint Bank',
  setBankName: () => undefined,
  accountNumber: '****1234',
  setAccountNumber: () => undefined,
  routingNumber: '110000000',
  setRoutingNumber: () => undefined,
  error: '',
  loading: false,
  success: false,
  onSubmit: (event: Event) => event.preventDefault(),
};

export const Default: Story = {
  render: () => BankingInfoFormView(baseProps),
};

export const WithError: Story = {
  render: () =>
    BankingInfoFormView({
      ...baseProps,
      error: 'All fields are required',
    }),
};

export const Success: Story = {
  render: () =>
    BankingInfoFormView({
      ...baseProps,
      success: true,
    }),
};

export const Loading: Story = {
  render: () =>
    BankingInfoFormView({
      ...baseProps,
      loading: true,
    }),
};
