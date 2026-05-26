import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../../index';
import { CouponCodeView } from './CouponCodeView';

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

const baseProps = {
  tooltipText: 'Copied to Clipboard',
  tooltipLifespan: 1000,
  textAlign: 'left' as const,
  copyButtonLabel: 'Copy Code',
  buttonStyle: 'icon' as const,
  buttonType: 'primary' as const,
  errorTextGeneric: 'An error occurred. Please try again.',
  errorTextPending: 'Your reward is pending.',
  errorTextFulfilled: 'This reward has already been fulfilled.',
  errorTextCancelled: 'This reward has been cancelled.',
  errorTextExpired: 'This code has expired.',
  errorTextRedeemed: 'This code has been redeemed.',
};

const meta: Meta = {
  title: 'Components/CouponCode',
  component: 'sql-coupon-code',
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
    return html`<sql-coupon-code
      tooltip-text="${args['tooltip-text'] || 'Copied to Clipboard'}"
      tooltip-lifespan="${args['tooltip-lifespan'] || 1000}"
      text-align="${args['text-align'] || 'left'}"
      copy-button-label="${args['copy-button-label'] || 'Copy Code'}"
      button-style="${args['button-style'] || 'icon'}"
      button-type="${args['button-type'] || 'primary'}"
      background-color="${args['background-color'] || ''}"
      border-color="${args['border-color'] || ''}"
      text-color="${args['text-color'] || ''}"
      border-radius="${args['border-radius'] || ''}"
    ></sql-coupon-code>`;
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const Loading: Story = {
  render: () =>
    CouponCodeView({
      ...baseProps,
      onClick: () => undefined,
      open: false,
      disabled: true,
      loading: true,
      copyString: '...',
      error: '',
      isCopied: false,
    }),
};

export const ErrorGeneric: Story = {
  render: () =>
    CouponCodeView({
      ...baseProps,
      onClick: () => undefined,
      open: false,
      disabled: true,
      loading: false,
      copyString: '...',
      error: baseProps.errorTextGeneric,
      isCopied: false,
    }),
};

export const ErrorPending: Story = {
  render: () =>
    CouponCodeView({
      ...baseProps,
      onClick: () => undefined,
      open: false,
      disabled: true,
      loading: false,
      copyString: '...',
      error: baseProps.errorTextPending,
      isCopied: false,
    }),
};

export const ErrorExpired: Story = {
  render: () =>
    CouponCodeView({
      ...baseProps,
      onClick: () => undefined,
      open: false,
      disabled: true,
      loading: false,
      copyString: '...',
      error: baseProps.errorTextExpired,
      isCopied: false,
    }),
};

export const ErrorRedeemed: Story = {
  render: () =>
    CouponCodeView({
      ...baseProps,
      onClick: () => undefined,
      open: false,
      disabled: true,
      loading: false,
      copyString: '...',
      error: baseProps.errorTextRedeemed,
      isCopied: false,
    }),
};

export const ErrorCancelled: Story = {
  render: () =>
    CouponCodeView({
      ...baseProps,
      onClick: () => undefined,
      open: false,
      disabled: true,
      loading: false,
      copyString: '...',
      error: baseProps.errorTextCancelled,
      isCopied: false,
    }),
};

export const CustomColors: Story = {
  args: {
    'background-color': '#fff7ed',
    'border-color': '#ea580c',
    'text-color': '#9a3412',
  },
};

export const ButtonOutside: Story = {
  args: {
    'button-style': 'button-outside',
  },
};
