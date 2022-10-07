import { h } from '@stencil/core';
import { AccountDetailsView } from './sqp-account-details-view';

export default {
  title: 'Components/PayPal Account Details',
  // parameters: {
  //   scenario,
  // },
};

const content = {
      headerText: "PayPal account",
      accountLabel:"Account",
      recentPaymentLabel:"Recent payment",
      nextPaymentLabel:"Next payment",
      editText:"Edit",
};

const defaultProps = {

    content: {
      ...content,
  },
  accountDetails: {
    email: "jonsnow@gmail.com",
         recentPayment: { amount: 10000, date: 12345678900 },
      nextPayment: {
        date: 12345678900,
      },
  }
};

export const Default = () => <AccountDetailsView {...defaultProps} />;
