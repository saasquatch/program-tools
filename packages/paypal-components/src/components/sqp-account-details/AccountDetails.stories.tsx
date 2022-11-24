import { h } from "@stencil/core";
import {
  CombinedPending,
  Empty as EmptyDetailsCard,
} from "./DetailsCard.stories";
import {
  Pending,
  Active,
  WithOtherCurrencies,
  Empty as EmptyScheduleCard,
} from "./ScheduleCard.stories";
import {
  AccountDetailsView,
  AccountDetailsViewProps,
} from "./sqp-account-details-view";
import { AccountFormView, AccountFormViewProps } from "./sqp-account-form-view";
export default {
  title: "Components/PayPal Account Details",
};

const defaultAccountDetailsProps: AccountDetailsViewProps = {
  loading: false,
  integrationDisabled: false,
  integrationPaused: false,
  setOpen: (open: boolean) => console.log(open),
  hasAccount: true,
  detailsHeaderText: "Payout details",
  scheduleHeaderText: "Schedule",
  detailsSlot: <CombinedPending />,
  scheduleSlot: [<Active />, <Pending />, <WithOtherCurrencies />],
  editText: "Edit account",
  integrationDisabledHeader: "PayPal payouts are currently disabled",
  integrationDisabledText:
    "This feature is currently inactive. If this is unexpected, please contact {companyName} for assistance.",
  integrationPausedHeader: "PayPal payouts are paused",
  integrationPausedText:
    "This feature is paused at the moment, but don't worry—your rewards are still being tracked! Once this feature resumes, your payouts will continue on the next payout date.",
  payPalAccountHeaderText: "Payout",
  connectPayPalDescriptionText:
    "Connect your PayPal account to automatically receive payments for the rewards you earn.",
  connectPayPalAccountButtonText: "Connect account",
};

const defaultAccountFormProps: AccountFormViewProps = {
  formRef: { current: null },
  hasAccount: false,
  callbacks: {
    submit: () => {},
    setOpen: () => {},
    disconnect: () => {},
    setEditingAccount: () => {},
  },
  states: {
    loading: false,
    error: "",
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

export const HasAccountIntegrationPaused = () => (
  <div>
    <AccountFormView
      {...{ ...defaultAccountFormProps, integrationPaused: true }}
    />
    <AccountDetailsView
      {...{ ...defaultAccountDetailsProps, integrationPaused: true }}
    />
  </div>
);

export const HasAccountLoading = () => (
  <div>
    <AccountFormView {...defaultAccountFormProps} />
    <AccountDetailsView {...defaultAccountDetailsProps} loading={true} />
  </div>
);

export const HasAccountEmpty = () => (
  <div>
    <AccountFormView {...defaultAccountFormProps} />
    <AccountDetailsView
      {...{
        ...defaultAccountDetailsProps,
        detailsSlot: <EmptyDetailsCard />,
        scheduleSlot: [
          <EmptyScheduleCard />,
          <EmptyScheduleCard />,
          <EmptyScheduleCard />,
        ],
      }}
    />
  </div>
);

export const EditAccountFormOpen = () => (
  <div>
    <AccountFormView
      {...defaultAccountFormProps}
      hasAccount={true}
      states={{
        ...defaultAccountFormProps.states,
        open: true,
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
