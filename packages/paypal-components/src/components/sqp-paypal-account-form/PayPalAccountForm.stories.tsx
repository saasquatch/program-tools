import { h } from '@stencil/core';
import { PayPalAccountFormView } from './sqp-paypal-account-form-view';

export default {
  title: 'Components/PayPal Account Form',
  // parameters: {
  //   scenario,
  // },
};

const content = {
  modalConnectPayPalAccountHeader: 'Connect PayPal account',
  cancelText: 'Cancel',
  connectPayPalAccountButtonText: 'Connect account',
  payPalEmailLabel: 'PayPal email',
  payPalEmailLabelHelpText: 'Enter the email used for your PayPal account.',
  confirmPayPalEmailLabel: 'Confirm email',
  successMessage: 'Success!',
  payPalAccountHeaderText: 'PayPal account',
  connectPayPalDescriptionText: 'Connect your PayPal account to automatically receive payments/cash rewards.',
};

const defaultProps = {
  states: {
    open: false,
    loading: false,
    success: false,
    error: '',
    content: {
      ...content,
    },
  },
  callbacks: {
    setOpen: o => console.log(o),
    submit: e => console.log('Submit', e),
  },
};

const openProps = {
  states: {
    open: true,
    loading: false,
    success: false,
    error: '',
    content: {
      ...content,
    },
  },
  callbacks: {
    setOpen: o => console.log(o),
    submit: e => console.log('Submit', e),
  },
};

const errorProps = {
  states: {
    open: true,
    loading: false,
    success: false,
    error: 'Network error. Please try again.',
    content: {
      ...content,
    },
  },
  callbacks: {
    setOpen: o => console.log(o),
    submit: e => console.log('Submit', e),
  },
};

const emailErrorProps = {
  states: {
    open: true,
    loading: false,
    success: false,
    error: 'Emails do not match.',
    content: {
      ...content,
    },
  },
  callbacks: {
    setOpen: o => console.log(o),
    submit: e => console.log('Submit', e),
  },
};

const loadingProps = {
  states: {
    open: true,
    loading: true,
    success: false,
    error: '',
    content: {
      ...content,
    },
  },
  callbacks: {
    setOpen: o => console.log(o),
    submit: e => console.log('Submit', e),
  },
};

const successProps = {
  states: {
    open: true,
    loading: false,
    success: true,
    error: '',
    content: {
      ...content,
    },
  },
  callbacks: {
    setOpen: o => console.log(o),
    submit: e => console.log('Submit', e),
  },
};

export const Default = () => <PayPalAccountFormView {...defaultProps} />;
export const Open = () => <PayPalAccountFormView {...openProps} />;
export const Error = () => <PayPalAccountFormView {...errorProps} />;
export const EmailError = () => <PayPalAccountFormView {...emailErrorProps} />;
export const Loading = () => <PayPalAccountFormView {...loadingProps} />;
export const Success = () => <PayPalAccountFormView {...successProps} />;
