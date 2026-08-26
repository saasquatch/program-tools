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
  window.squatchToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IklSTVhzWXk2WVlxcTQ2OTQzN21HOEVSUXQ4UW9LRkJhRzEifQ.eyJ1c2VyIjp7ImlkIjoidGVzdHVzZXIiLCJhY2NvdW50SWQiOiJ0ZXN0dXNlciIsImVtYWlsIjoidGVzdHVzZXJAZXhhbXBsZS5jb20ifX0.tegzTaLms4g47rwcWoyhk1WW4hqB16PulQV9zouJNfU';
  // @ts-expect-error setup globals
  window.widgetIdent = {
    programId: '41863',
    userId: 'testuser',
    accountId: 'testuser',
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IklSTVhzWXk2WVlxcTQ2OTQzN21HOEVSUXQ4UW9LRkJhRzEifQ.eyJ1c2VyIjp7ImlkIjoidGVzdHVzZXIiLCJhY2NvdW50SWQiOiJ0ZXN0dXNlciIsImVtYWlsIjoidGVzdHVzZXJAZXhhbXBsZS5jb20ifX0.tegzTaLms4g47rwcWoyhk1WW4hqB16PulQV9zouJNfU',
    tenantAlias: 'ac52kfybp1tkr',
    engagementMedium: 'EMBED',
    appDomain: 'https://staging.referralsaasquatch.com',
  };
};

const meta: Meta = {
  title: 'Components/ReferralCode',
  component: 'sql-referral-code',
  tags: ['autodocs'],
  argTypes: {
    'tooltip-text': { control: 'text' },
    'show-notification-text': { control: 'boolean' },
    'notification-text': { control: 'text' },
    'tooltip-lifespan': { control: 'number' },
    'text-align': { control: 'select', options: ['left', 'center', 'right'] },
    'copy-button-label': { control: 'text' },
    'copy-button-style': { control: 'select', options: ['icon', 'button-outside', 'button-below'] },
    'background-color': { control: 'color' },
    'border-color': { control: 'color' },
    'text-color': { control: 'color' },
    'border-radius': { control: 'number' },
    'button-type': { control: 'select', options: ['primary', 'secondary'] },
  },
  render: (args) => {
    setupGlobals();
    return html`<sql-referral-code
      tooltip-text="${args['tooltip-text'] || 'Copied to Clipboard'}"
      ?show-notification-text="${args['show-notification-text']}"
      notification-text="${args['notification-text'] || "You've copied this code before"}"
      tooltip-lifespan="${args['tooltip-lifespan'] || 1000}"
      text-align="${args['text-align'] || 'left'}"
      copy-button-label="${args['copy-button-label'] || 'Copy Code'}"
      copy-button-style="${args['copy-button-style'] || 'icon'}"
      background-color="${args['background-color'] || ''}"
      border-color="${args['border-color'] || ''}"
      text-color="${args['text-color'] || ''}"
      border-radius="${args['border-radius'] || ''}"
      button-type="${args['button-type'] || 'primary'}"
    ></sql-referral-code>`;
  },
};

export default meta;
type Story = StoryObj;

/**
 * Default referral code component with icon button
 */
export const Default: Story = {
  args: {
    'tooltip-text': 'Copied to Clipboard',
    'copy-button-label': 'Copy Code',
    'copy-button-style': 'icon',
    'button-type': 'primary',
  },
};

/**
 * Button style outside the input
 */
export const ButtonOutside: Story = {
  args: {
    'copy-button-style': 'button-outside',
  },
};

/**
 * Button style below the input
 */
export const ButtonBelow: Story = {
  args: {
    'copy-button-style': 'button-below',
  },
};

/**
 * Custom button label
 */
export const CustomButtonLabel: Story = {
  args: {
    'copy-button-style': 'button-outside',
    'copy-button-label': 'Copy My Code',
  },
};

/**
 * Secondary button type
 */
export const SecondaryButton: Story = {
  args: {
    'copy-button-style': 'button-outside',
    'button-type': 'secondary',
  },
};

/**
 * Custom colors
 */
export const CustomColors: Story = {
  args: {
    'background-color': '#f0f8ff',
    'border-color': '#4169e1',
    'text-color': '#191970',
  },
};

/**
 * Custom border radius
 */
export const CustomBorderRadius: Story = {
  args: {
    'border-radius': 20,
  },
};

/**
 * With notification text shown
 */
export const WithNotification: Story = {
  args: {
    'show-notification-text': true,
    'notification-text': 'This code has been copied',
  },
};

/**
 * Custom tooltip text
 */
export const CustomTooltip: Story = {
  args: {
    'tooltip-text': '✓ Code copied!',
  },
};

/**
 * All customizations combined
 */
export const FullyCustomized: Story = {
  args: {
    'copy-button-style': 'button-below',
    'copy-button-label': 'Copy Referral Code',
    'button-type': 'primary',
    'background-color': '#e8f5e9',
    'border-color': '#4caf50',
    'text-color': '#1b5e20',
    'border-radius': 12,
    'tooltip-text': 'Successfully copied!',
    'show-notification-text': true,
    'notification-text': 'Remember to share this code with your friends',
  },
};
