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
  title: 'Components/ShareLink',
  component: 'sql-share-link',
  tags: ['autodocs'],
  argTypes: {
    'tooltip-text': { control: 'text' },
    'tooltip-lifespan': { control: 'number' },
    'text-align': { control: 'select', options: ['left', 'center', 'right'] },
    'copy-button-label': { control: 'text' },
    'button-style': { control: 'select', options: ['icon', 'button-outside', 'button-below'] },
    'button-type': { control: 'select', options: ['primary', 'secondary'] },
    'background-color': { control: 'color' },
    'border-color': { control: 'color' },
    'text-color': { control: 'color' },
    'border-radius': { control: 'number' },
  },
  render: (args) => {
    setupGlobals();
    return html`<sql-share-link
      tooltip-text="${args['tooltip-text'] || 'Copied to Clipboard'}"
      tooltip-lifespan="${args['tooltip-lifespan'] || 1000}"
      text-align="${args['text-align'] || 'left'}"
      copy-button-label="${args['copy-button-label'] || 'Copy Link'}"
      button-style="${args['button-style'] || 'icon'}"
      button-type="${args['button-type'] || 'primary'}"
      background-color="${args['background-color'] || ''}"
      border-color="${args['border-color'] || ''}"
      text-color="${args['text-color'] || ''}"
      border-radius="${args['border-radius'] || ''}"
    ></sql-share-link>`;
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const ButtonOutside: Story = {
  args: {
    'button-style': 'button-outside',
  },
};

export const ButtonBelow: Story = {
  args: {
    'button-style': 'button-below',
  },
};

export const CustomColors: Story = {
  args: {
    'background-color': '#f0f8ff',
    'border-color': '#4169e1',
    'text-color': '#191970',
  },
};

export const CustomBorderRadius: Story = {
  args: {
    'border-radius': 20,
  },
};

export const WithTooltipText: Story = {
  args: {
    'tooltip-text': 'Link copied!',
  },
};
