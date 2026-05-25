import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../../index';

const meta: Meta = {
  title: 'Components/PortalFooter',
  component: 'sql-portal-footer',
  tags: ['autodocs'],
  argTypes: {
    'support-email': { control: 'text' },
    'support-link': { control: 'text' },
    'faq-link': { control: 'text' },
    'faq-text': { control: 'text' },
    'terms-link': { control: 'text' },
    'terms-text': { control: 'text' },
    'show-powered-by': { control: 'boolean' },
    'text-color': { control: 'color' },
    padding: { control: 'select', options: ['none', 'small', 'medium', 'large'] },
  },
  render: (args) => html`
    <sql-portal-footer
      support-email="${args['support-email'] || ''}"
      support-link="${args['support-link'] || ''}"
      faq-link="${args['faq-link'] || ''}"
      faq-text="${args['faq-text'] || 'FAQ'}"
      terms-link="${args['terms-link'] || ''}"
      terms-text="${args['terms-text'] || 'Terms & Conditions'}"
      ?show-powered-by="${args['show-powered-by'] ?? true}"
      text-color="${args['text-color'] || ''}"
      padding="${args.padding || 'medium'}"
    ></sql-portal-footer>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    'faq-link': 'https://example.com/faq',
    'terms-link': 'https://example.com/terms',
  },
};

export const WithLinks: Story = {
  args: {
    'support-link': 'https://example.com/support',
    'faq-link': 'https://example.com/faq',
    'terms-link': 'https://example.com/terms',
  },
};

export const NoPoweredBy: Story = {
  args: {
    'faq-link': 'https://example.com/faq',
    'show-powered-by': false,
  },
};

export const CustomColors: Story = {
  args: {
    'faq-link': 'https://example.com/faq',
    'terms-link': 'https://example.com/terms',
    'text-color': '#2563eb',
  },
};

export const WithEmail: Story = {
  args: {
    'support-email': 'support@example.com',
    'faq-link': 'https://example.com/faq',
  },
};
