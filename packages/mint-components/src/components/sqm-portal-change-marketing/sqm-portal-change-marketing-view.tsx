import { h } from "@stencil/core";
import { createStyleSheet } from "../../styling/JSS";
import { CheckboxFieldView } from "../sqm-checkbox-field/sqm-checkbox-field-view";
import { TextSpanView } from "../sqm-text-span/sqm-text-span-view";

export interface PortalProfileViewProps {
  states: {
    success: boolean;
    loading: boolean;
    submitDisabled: boolean;
    formState: {
      marketingEmailOptIn: boolean;
      errors: any;
      error: string;
    };
    user: {
      id: string;
      accountId: string;
      marketingEmailOptIn: boolean;
    };
    text: {
      emailPreferencesHeader: string;
      marketingCheckboxLabel: string;
      submitChangeButtonText: string;
      successMessage: string;
    };
  };
  callbacks: {
    onSubmit: (props: any) => void;
    setChecked: (value: boolean) => void;
  };
}

export function PortalProfileView(props: PortalProfileViewProps) {
  const { states, callbacks } = props;

  const { text, formState } = states;

  const { error } = formState;

  const style = {
    Container: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--sl-spacing-x-small)",
      padding: "0 var(--sl-spacing-xxx-large) var(--sl-spacing-xxx-large)",
    },

    SubmitButton: { marginBottom: "var(--sl-spacing-medium)" },

    Error: {
      "&::part(erroralert-base)": {
        "margin-bottom": "15px",
      },
    },
    Success: {
      "&::part(successalert-base)": {
        "margin-bottom": "15px",
      },
    },
  };

  const sheet = createStyleSheet(style);
  const styleString = sheet.toString();

  return (
    <div class={sheet.classes.Container} part="sqm-base">
      <style type="text/css">{styleString}</style>
      <TextSpanView {...{ type: "h2" }}>
        {text.emailPreferencesHeader}
      </TextSpanView>
      <sl-form onSl-submit={callbacks.onSubmit}>
        <CheckboxFieldView
          states={{
            checked: states.formState.marketingEmailOptIn,
          }}
          content={{
            checkboxLabel: text.marketingCheckboxLabel,
            checkboxName: "marketingEmailOptIn",
          }}
          callbacks={{
            setChecked: callbacks.setChecked,
          }}
        ></CheckboxFieldView>
        <sl-button
          class={sheet.classes.SubmitButton}
          type="primary"
          submit
          loading={states.loading}
          disabled={states.submitDisabled}
        >
          {text.submitChangeButtonText}
        </sl-button>
        {error && (
          <sqm-form-message
            class={sheet.classes.Error}
            type="error"
            exportparts="erroralert-icon"
          >
            <div part="erroralert-text">{error}</div>
          </sqm-form-message>
        )}
        {states.success && (
          <sqm-form-message
            class={sheet.classes.Success}
            type="success"
            exportparts="successalert-icon"
          >
            <div part="successalert-text">{states.text.successMessage}</div>
          </sqm-form-message>
        )}
      </sl-form>
    </div>
  );
}
