import type { Meta, StoryObj } from '@storybook/web-components-vite';
import '../../index';
import { IndirectTaxFormView } from './IndirectTaxFormView';

const meta: Meta = {
  title: 'Components/IndirectTaxForm',
  component: 'sql-indirect-tax-form',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

const baseProps = {
  headerText: 'Tax Information',
  submitLabel: 'Submit',
  taxIdLabel: 'Tax ID / VAT Number',
  countryLabel: 'Country',
  programId: 'demo-program',
  taxId: 'VAT-123456',
  setTaxId: () => undefined,
  country: 'Canada',
  setCountry: () => undefined,
  error: '',
  loading: false,
  success: false,
  onSubmit: (event: Event) => event.preventDefault(),
};

export const Default: Story = {
  render: () => IndirectTaxFormView(baseProps),
};

export const WithError: Story = {
  render: () =>
    IndirectTaxFormView({
      ...baseProps,
      error: 'Tax ID is required',
    }),
};

export const Success: Story = {
  render: () =>
    IndirectTaxFormView({
      ...baseProps,
      success: true,
    }),
};

export const Loading: Story = {
  render: () =>
    IndirectTaxFormView({
      ...baseProps,
      loading: true,
    }),
};
