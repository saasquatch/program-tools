import { h } from "@stencil/core";
import { ChangeMarktingView } from "./sqm-portal-change-marketing-view";
// import scenario from "./sqm-marketing-emails-checkbox.feature";

export default {
  title: "Components/Change Marketing Emails Status",
  //   parameters: {
  //     scenario,
  //   },
};

const defaultProps = {
  states: {
    success: false,
    loading: false,
    submitDisabled: false,
    formState: {
      marketingEmailOptIn: false,
      errors: null,
      error: "",
    },
    user: {
      id: "zach",
      accountId: "zach",
      marketingEmailOptIn: false,
    },
    text: {
      emailPreferencesHeader: "Email preferences",
      marketingCheckboxLabel:
        "I want to receive marketing emails and promotions for this referral program from impact.com",
      submitChangeButtonText: "Save",
      successMessage: "Opt-in preference has been changed.",
    },
  },
  callbacks: {
    onSubmit: (props: any) => console.log(props),
    setChecked: (value: boolean) => console.log(value),
  },
};

export const Default = () => {
  return <sqm-portal-change-marketing></sqm-portal-change-marketing>;
};

export const Loading = () => {
  return (
    <ChangeMarktingView
      {...defaultProps}
      states={{ ...defaultProps.states, loading: true }}
    />
  );
};

export const Error = () => {
  return (
    <ChangeMarktingView
      {...defaultProps}
      states={{
        ...defaultProps.states,
        formState: {
          ...defaultProps.states.formState,
          errors: { error: true },
          error: "An error string",
        },
      }}
    />
  );
};

export const Success = () => {
  return (
    <ChangeMarktingView
      {...defaultProps}
      states={{
        ...defaultProps.states,
        success: true,
      }}
    />
  );
};
