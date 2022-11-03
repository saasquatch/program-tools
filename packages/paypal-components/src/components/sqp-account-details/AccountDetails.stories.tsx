import { h } from "@stencil/core";
import { W9AndOtherCurrencies } from "./DetailsCard.stories";
import { Pending, Active, WithOtherCurrencies } from "./ScheduleCard.stories";
import {
  AccountDetailsView,
  AccountDetailsViewProps,
} from "./sqp-account-details-view";
import { AccountFormView, AccountFormViewProps } from "./sqp-account-form-view";
export default {
  title: "Components/PayPal Account Details",
  // parameters: {
  //   scenario,
  // },
};

const defaultAccountDetailsProps: AccountDetailsViewProps = {
  loading: false,
  integrationDisabled: false,
  setOpen: (open: boolean) => console.log(open),
  hasAccount: true,
  overviewContent: {
    headerText: "Payout",
    editText: "Edit account",
    detailsLabel: "Payout details",
    scheduleLabel: "Schedule",
    detailsContent: <W9AndOtherCurrencies />,
    ScheduleContent: [<Active />, <Pending />, <WithOtherCurrencies />],
  },
};

const defaultAccountFormProps: AccountFormViewProps = {
  formRef: { current: null },
  hasAccount: true,
  integrationDisabled: false,
  callbacks: { submit: () => {}, setOpen: () => {}, disconnect: () => {} },
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
  alertContent: {
    integrationAlertHeader: "PayPal payouts are currently disabled",
    integrationAlertText:
      "Looks like this feature is turned off at the moment. Come back later to see if it’s enabled. ",
  },
};

export const NoAccount = () => (
  <div>
    <AccountFormView {...defaultAccountFormProps} hasAccount={false} />
    <AccountDetailsView {...defaultAccountDetailsProps} hasAccount={false} />
  </div>
);

export const IntegrationDisabled = () => (
  <div>
    <AccountFormView {...defaultAccountFormProps} integrationDisabled={true} />
    <AccountDetailsView
      {...defaultAccountDetailsProps}
      integrationDisabled={true}
    />
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
