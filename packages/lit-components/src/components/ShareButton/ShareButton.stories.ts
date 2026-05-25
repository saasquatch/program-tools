import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../../index';

const setupGlobals = () => {
  // @ts-expect-error setup globals
  window.squatchTenant = 'ac52kfybp1tkr';
  // @ts-expect-error setup globals
  window.squatchConfig = {
    domain: 'https://staging.referralsaasquatch.com',
  };
  // @ts-expect-error setup globals
  window.squatchToken = '******';
  // @ts-expect-error setup globals
  window.widgetIdent = {
    programId: '41863',
    userId: 'testuser',
    accountId: 'testuser',
    token: '******',
    tenantAlias: 'ac52kfybp1tkr',
    engagementMedium: 'EMBED',
    appDomain: 'https://staging.referralsaasquatch.com',
  };
};

const meta: Meta = {
  title: 'Components/ShareButton',
  component: 'sql-share-button',
  tags: ['autodocs'],
  argTypes: {
    medium: {
      control: 'select',
      options: ['facebook', 'twitter', 'email', 'sms', 'linkedin', 'pinterest', 'whatsapp'],
    },
    'icon-slot': { control: 'select', options: ['prefix', 'suffix', 'label'] },
    'button-text': { control: 'text' },
    'hide-text': { control: 'boolean' },
    'hide-icon': { control: 'boolean' },
    'background-color': { control: 'color' },
    'text-color': { control: 'color' },
    'border-radius': { control: 'number' },
    'pill-layout': { control: 'boolean' },
    size: { control: 'select', options: ['small', 'medium', 'large'] },
  },
  render: (args) => {
    setupGlobals();
    return html`<sql-share-button
      medium="${args.medium || 'facebook'}"
      icon-slot="${args['icon-slot'] || 'prefix'}"
      button-text="${args['button-text'] || ''}"
      ?hide-text="${args['hide-text']}"
      ?hide-icon="${args['hide-icon']}"
      background-color="${args['background-color'] || ''}"
      text-color="${args['text-color'] || ''}"
      border-radius="${args['border-radius'] || ''}"
      ?pill-layout="${args['pill-layout']}"
      size="${args.size || 'medium'}"
    ></sql-share-button>`;
  },
};

export default meta;
type Story = StoryObj;

export const Facebook: Story = {};

export const Twitter: Story = { args: { medium: 'twitter' } };

export const Email: Story = { args: { medium: 'email' } };

export const SMS: Story = { args: { medium: 'sms' } };

export const LinkedIn: Story = { args: { medium: 'linkedin' } };

export const WhatsApp: Story = { args: { medium: 'whatsapp' } };

export const Pinterest: Story = { args: { medium: 'pinterest' } };

export const CustomColors: Story = {
  args: {
    'background-color': '#111827',
    'text-color': '#f9fafb',
  },
};

export const PillLayout: Story = {
  args: {
    'pill-layout': true,
  },
};

export const IconOnly: Story = {
  args: {
    'hide-text': true,
  },
};

export const TextOnly: Story = {
  args: {
    'hide-icon': true,
  },
};

export const LargeSize: Story = {
  args: {
    size: 'large',
  },
};
