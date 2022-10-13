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
  loading: false,
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
    headerText: "Payout",
    accountLabel: "Account",
    recentPaymentLabel: "Recent payment",
    nextPaymentLabel: "Next payment",
    editText: "Edit account",
  },
};

const defaultAccountFormProps: AccountFormViewProps = {
  formRef: { current: null },
  hasAccount: true,
  callbacks: { submit: () => {}, setOpen: () => {} },
  states: {
    editingAccount: false,
    loading: false,
    error: undefined,
    success: false,
    open: false,
  },
  formContent: {
    modalConnectPayPalAccountHeader: "Connect PayPal account",
    cancelText: "Cancel",
    connectPayPalAccountButtonText: "Connect account",
    payPalEmailLabel: "PayPal email",
    payPalEmailLabelHelpText: "Enter the email used for your PayPal account.",
    confirmPayPalEmailLabel: "Confirm email",
    successMessage: "Success",
    payPalAccountHeaderText: "Payout",
    connectPayPalDescriptionText:
      "Connect your PayPal account to automatically receive payments/cash rewards",
    submitPayPalAccountButtonText: "Connect account",
    connectAccountModalHeaderText: "Connected account settings",
    connectAccountModalButtonText: "Change account",
    disconnectAccountHeaderText: "Disconnect account",
    disconnectAccountDescriptionText:
      "You will not be able to receive payments if you disconnect your PayPal account.",
    disconnectAccountButtonText: "Disconnect account",
  },
};

export const NoAccount = () => (
  <div>
    <AccountFormView {...defaultAccountFormProps} hasAccount={false} />
    <AccountDetailsView {...defaultAccountDetailsProps} hasAccount={false} />
  </div>
);

export const NoAccountFormOpen = () => (
  <div>
    <AccountFormView
      {...defaultAccountFormProps}
      hasAccount={false}
      states={{ ...defaultAccountFormProps.states, open: true }}
    />
    <AccountDetailsView {...defaultAccountDetailsProps} hasAccount={false} />
  </div>
);

export const HasAccount = () => (
  <div>
    <AccountFormView {...defaultAccountFormProps} />
    <AccountDetailsView {...defaultAccountDetailsProps} />
  </div>
);

export const HasAccountLoading = () => (
  <div>
    <AccountFormView {...defaultAccountFormProps} />
    <AccountDetailsView {...defaultAccountDetailsProps} loading={true} />
  </div>
);

export const EditAccountFormOpen = () => (
  <div>
    <AccountFormView
      {...defaultAccountFormProps}
      hasAccount={false}
      states={{
        ...defaultAccountFormProps.states,
        open: true,
        editingAccount: true,
      }}
    />
    <AccountDetailsView {...defaultAccountDetailsProps} hasAccount={false} />
  </div>
);

export const Error = () => {
  return (
    <div>
      <AccountFormView
        {...defaultAccountFormProps}
        hasAccount={false}
        states={{
          ...defaultAccountFormProps.states,
          open: true,
          error: "Emails do not match",
        }}
      />
      <AccountDetailsView {...defaultAccountDetailsProps} hasAccount={false} />
    </div>
  );
};

export const Success = () => {
  return (
    <div>
      <AccountFormView
        {...defaultAccountFormProps}
        hasAccount={false}
        states={{
          ...defaultAccountFormProps.states,
          open: true,
          success: true,
        }}
      />
      <AccountDetailsView {...defaultAccountDetailsProps} hasAccount={false} />
    </div>
  );
};