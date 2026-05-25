import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../../index';

const meta: Meta = {
  title: 'Components/LinkButton',
  component: 'sql-link-button',
  tags: ['autodocs'],
  argTypes: {
    href: { control: 'text' },
    target: { control: 'select', options: ['_self', '_blank'] },
    'button-text': { control: 'text' },
    'button-type': {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'neutral', 'warning', 'danger'],
    },
    size: { control: 'select', options: ['small', 'medium', 'large'] },
    pill: { control: 'boolean' },
    outline: { control: 'boolean' },
    disabled: { control: 'boolean' },
    icon: { control: 'text' },
  },
  render: (args) => html`
    <sql-link-button
      href="${args.href || 'https://www.example.com'}"
      target="${args.target || '_self'}"
      button-text="${args['button-text'] || 'Click Here'}"
      button-type="${args['button-type'] || 'primary'}"
      size="${args.size || 'medium'}"
      ?pill="${args.pill}"
      ?outline="${args.outline}"
      ?disabled="${args.disabled}"
      icon="${args.icon || ''}"
    ></sql-link-button>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    href: 'https://www.example.com',
    'button-text': 'Click Here',
  },
};

export const ExternalLink: Story = {
  args: {
    href: 'https://www.example.com',
    target: '_blank',
    'button-text': 'Open External Link',
  },
};

export const Secondary: Story = {
  args: {
    'button-type': 'secondary',
    'button-text': 'Secondary Button',
  },
};

export const Outline: Story = {
  args: {
    outline: true,
    'button-text': 'Outline Button',
  },
};

export const Pill: Story = {
  args: {
    pill: true,
    'button-text': 'Pill Button',
  },
};

export const WithIcon: Story = {
  args: {
    icon: 'box-arrow-up-right',
    'button-text': 'Button With Icon',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    'button-text': 'Large Button',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    'button-text': 'Disabled Button',
  },
};
