import { h } from "@stencil/core";
import {
  AccountDetailsView,
  AccountDetailsViewProps,
} from "./sqp-account-details-view";
import { useRef } from "@saasquatch/universal-hooks";
import { AccountFormView, AccountFormViewProps } from "./sqp-account-form-view";
export default {
  title: "Components/PayPal Account Details",
  // parameters: {
  //   scenario,
  // },
};

const defaultAccountDetailsProps: AccountDetailsViewProps = {
  setOpen: (open: boolean) => console.log(open),
  hasAccount: true,
  accountDetails: {
    email: "jonsnow@example.com",
    recentPayment: { amount: 10000, date: 12345678900 },
    nextPayment: {
      date: 12345678900,
    },
  },
  detailsContent: {
    headerText: "PayPal account",
    accountLabel: "Account",
    recentPaymentLabel: "Recent payment",
    nextPaymentLabel: "Next payment",
    editText: "Edit",
  },
};

const defaultAccountFormProps: AccountFormViewProps = {
  formRef: useRef<HTMLFormElement>(null),
  hasAccount: true,
  callbacks: { submit: () => {}, setOpen: () => {} },
  states: {
    loading: false,
    error: undefined,
    success: false,
    open: true,
  },
  formContent: {
    modalConnectPayPalAccountHeader: "Connect PayPal accoun",
    cancelText: "Cancel",
    connectPayPalAccountButtonText: "Connect account",
    payPalEmailLabel: "PayPal email",
    payPalEmailLabelHelpText: "Enter the email used for your PayPal account.",
    confirmPayPalEmailLabel: "Confirm email",
    successMessage: "Success",
    payPalAccountHeaderText: "PayPal account",
    connectPayPalDescriptionText:
      "Connect your PayPal account to automatically receive payments/cash rewards",
  },
};

export const HasAccount = () => (
  <div>
    <AccountFormView {...defaultAccountFormProps} />
    <AccountDetailsView {...defaultAccountDetailsProps} />
  </div>
);

export const NoAccount = () => (
  <div>
    <AccountFormView {...defaultAccountFormProps} hasAccount={false} />
    <AccountDetailsView {...defaultAccountDetailsProps} hasAccount={false} />
  </div>
);
