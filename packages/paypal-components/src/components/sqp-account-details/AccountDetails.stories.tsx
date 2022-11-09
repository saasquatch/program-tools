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
  detailsHeaderText: "Payout details",
  scheduleHeaderText: "Schedule",
  detailsSlot: <W9AndOtherCurrencies />,
  scheduleSlot: [<Active />, <Pending />, <WithOtherCurrencies />],
  editText: "Edit account",
  integrationAlertHeader: "PayPal payouts are currently disabled",
  integrationAlertText:
    "This feature is currently inactive. If this is unexpected, please contact {companyName} for assistance.",
  payPalAccountHeaderText: "Payout",
  connectPayPalDescriptionText:
    "Connect your PayPal account to automatically receive payments for the rewards you earn.",
  connectPayPalAccountButtonText: "Connect account",
};

const defaultAccountFormProps: AccountFormViewProps = {
  formRef: { current: null },
  hasAccount: true,
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
    payPalEmailLabel: "PayPal email",
    payPalEmailLabelHelpText: "Enter the email used for your PayPal account.",
    confirmPayPalEmailLabel: "Confirm email",
    successMessage: "Success",
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

export const IntegrationDisabled = () => (
  <div>
    <AccountFormView {...defaultAccountFormProps} />
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

export const HasAccountIntegrationDisabled = () => (
  <div>
    <AccountFormView
      {...{ ...defaultAccountFormProps, integrationDisabled: true }}
    />
    <AccountDetailsView
      {...{ ...defaultAccountDetailsProps, integrationDisabled: true }}
    />
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
