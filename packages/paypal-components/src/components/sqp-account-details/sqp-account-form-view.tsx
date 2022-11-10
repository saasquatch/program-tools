import { h } from "@stencil/core";
import { createStyleSheet } from "../../styling/JSS";
import { PortalSectionView } from "../sqp-titled-section/sqp-portal-section-view";

export interface AccountFormViewProps {
  hasAccount: boolean;
  formRef?: any;
  states: {
    open: boolean;
    error: string;
    loading: boolean;
    success: boolean;
    paypalEmail?: string;
    editingAccount?: boolean;
  };
  formContent: {
    modalConnectPayPalAccountHeader: string;
    cancelText: string;
    submitPayPalAccountButtonText: string;
    payPalEmailLabel: string;
    payPalEmailLabelHelpText: string;
    confirmPayPalEmailLabel: string;
    successMessage: string;
    connectAccountModalHeaderText: string;
    connectAccountModalButtonText: string;
    disconnectAccountHeaderText: string;
    disconnectAccountDescriptionText: string;
    disconnectAccountButtonText: string;
    connectPayPalDescriptionText: string;
  };
  callbacks: {
    submit: (event: MouseEvent) => void;
    disconnect: () => void;
    setOpen: (open: boolean) => void;
    setEditingAccount?: (editing: boolean) => void;
  };
}

export function AccountFormView(props: AccountFormViewProps) {
  const { formContent, hasAccount, states, callbacks } = props;
  const style = {
    ButtonContainer: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
    },

    FullWidthButton: {
      width: "100%",
    },

    FormHeaderContainer: {},

    Dialog: {
      padding: "0",
      "&::part(close-button)": {
        "margin-top": "var(--sl-spacing-medium)",
      },

      "&::part(body)": {
        padding:
          "0 var(--sl-spacing-x-large) var(--sl-spacing-x-large) var(--sl-spacing-x-large)",
      },
    },

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

    InputContainer: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--sl-spacing-x-large)",

      "& > :last-child": {
        marginBottom: "var(--sl-spacing-x-large)",
      },
    },

    CancelButton: {
      width: "100%",
      margin: "var(--sl-spacing-large) auto",
    },

    ConnectPayPalAccount: {},

    EditingFormContentContainer: {
      display: "flex",
      flexDirection: "column",
      gap: "20px",
    },
  };

  const sheet = createStyleSheet(style);
  const styleString = sheet.toString();
  const { classes } = sheet;

  return (
    <div style={{ background: "var(--sl-color-neutral-0)" }}>
      <style type="text/css">{styleString}</style>

      <sl-dialog
        class={classes.Dialog}
        open={states.open}
        onSl-hide={() => callbacks.setOpen(false)}
      >
        <PortalSectionView
          {...{
            labelMargin: "x-large",
            padding: "none",
            label: (
              <div class={classes.FormHeaderContainer}>
                <img src="https://res.cloudinary.com/saasquatch-staging/image/upload/v1665703368/tenant_test_a8b41jotf8a1v/tjfxf0qxu2lwqzgtcghw.svg" />
                <h2>
                  {hasAccount
                    ? formContent.connectAccountModalHeaderText
                    : formContent.modalConnectPayPalAccountHeader}
                </h2>
                {!hasAccount && (
                  <p>{formContent.connectPayPalDescriptionText}</p>
                )}
              </div>
            ),
            content:
              hasAccount && !states.editingAccount ? (
                <div>
                  {states.error && (
                    <sqm-form-message
                      class={classes.Error}
                      type="error"
                      exportparts="erroralert-icon"
                    >
                      <div part="erroralert-text">{states.error}</div>
                    </sqm-form-message>
                  )}
                  {states.success && (
                    <sqm-form-message
                      class={classes.Success}
                      type="success"
                      exportparts="successalert-icon"
                    >
                      <div part="successalert-text">
                        {formContent.successMessage}
                      </div>
                    </sqm-form-message>
                  )}
                  <div class={classes.EditingFormContentContainer}>
                    <sl-input
                      exportparts="label: input-label"
                      name="/email"
                      label={formContent.payPalEmailLabel}
                      required
                      disabled={true}
                      help-text={formContent.payPalEmailLabelHelpText}
                      type="email"
                      value={states.paypalEmail || "email@example.com"}
                    ></sl-input>
                    <sl-button
                      class={classes.FullWidthButton}
                      type="primary"
                      onClick={() => callbacks.setEditingAccount(true)}
                      loading={states.loading}
                    >
                      {formContent.connectAccountModalButtonText}
                    </sl-button>
                    <hr
                      style={{
                        width: "100%",
                        borderTop: "none",
                        color: "#E4E4E7",
                      }}
                    />
                    <div>
                      <h2>{formContent.disconnectAccountHeaderText}</h2>
                      <p style={{ marginTop: "0px" }}>
                        {formContent.disconnectAccountDescriptionText}
                      </p>
                      <sl-button
                        class={classes.FullWidthButton}
                        onClick={callbacks.disconnect}
                      >
                        {formContent.disconnectAccountButtonText}
                      </sl-button>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  {states.error && (
                    <sqm-form-message
                      class={classes.Error}
                      type="error"
                      exportparts="erroralert-icon"
                    >
                      <div part="erroralert-text">{states.error}</div>
                    </sqm-form-message>
                  )}
                  {states.success && (
                    <sqm-form-message
                      class={classes.Success}
                      type="success"
                      exportparts="successalert-icon"
                    >
                      <div part="successalert-text">
                        {formContent.successMessage}
                      </div>
                    </sqm-form-message>
                  )}
                  <sl-form
                    onSl-submit={callbacks.submit}
                    ref={(el: HTMLFormElement) => (props.formRef.current = el)}
                  >
                    <div class={classes.InputContainer}>
                      <sl-input
                        exportparts="label: input-label"
                        name="/email"
                        label={formContent.payPalEmailLabel}
                        required
                        disabled={states.loading}
                        help-text={formContent.payPalEmailLabelHelpText}
                        type="email"
                      ></sl-input>
                      <sl-input
                        exportparts="label: input-label"
                        name="/confirmEmail"
                        label={formContent.confirmPayPalEmailLabel}
                        required
                        disabled={states.loading}
                        type="email"
                      ></sl-input>
                    </div>

                    <div class={classes.ButtonContainer}>
                      <sl-button
                        class={classes.ConnectPayPalAccount}
                        type="primary"
                        submit
                        loading={states.loading}
                      >
                        {formContent.submitPayPalAccountButtonText}
                      </sl-button>
                      <sl-button
                        class={classes.CancelButton}
                        type="text"
                        onClick={() => callbacks.setOpen(false)}
                      >
                        {formContent.cancelText}
                      </sl-button>
                    </div>
                  </sl-form>
                </div>
              ),
          }}
        ></PortalSectionView>
      </sl-dialog>
    </div>
  );
}
