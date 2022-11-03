import { h } from "@stencil/core";
import { createStyleSheet } from "../../styling/JSS";
import { PortalSectionView } from "../sqp-titled-section/sqp-portal-section-view";

export interface AccountFormViewProps {
  hasAccount: boolean;
  formRef?: any;
  integrationDisabled: boolean;
  states: {
    open: boolean;
    error: string;
    loading: boolean;
    success: boolean;
    editingAccount?: boolean;
  };
  formContent: {
    modalConnectPayPalAccountHeader: string;
    cancelText: string;
    connectPayPalAccountButtonText: string;
    submitPayPalAccountButtonText: string;
    payPalEmailLabel: string;
    payPalEmailLabelHelpText: string;
    confirmPayPalEmailLabel: string;
    successMessage: string;
    payPalAccountHeaderText: string;
    connectPayPalDescriptionText: string;
    connectAccountModalHeaderText: string;
    connectAccountModalButtonText: string;
    disconnectAccountHeaderText: string;
    disconnectAccountDescriptionText: string;
    disconnectAccountButtonText: string;
    editText: string;
  };
  alertContent: {
    integrationAlertHeader: string;
    integrationAlertText: string;
  };
  callbacks: {
    setOpen: (open: boolean) => void;
    submit: (event: MouseEvent) => void;
    disconnect: () => void;
  };
}

export function AccountFormView(props: AccountFormViewProps) {
  const { formContent, alertContent, states, callbacks, integrationDisabled } =
    props;
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

    EditButton: {
      "@media screen and (min-width: 500px)": {
        width: "max-content",
        marginLeft: "auto",
      },
    },
    HeaderContainer: {
      display: "grid",
      alignItems: "center",
      gap: "var(--sl-spacing-medium)",
      gridTemplateColumns: "1fr max-content",
      "@media screen and (max-width: 499px)": {
        gridTemplateColumns: "1fr",
      },
    },
    TitleContainer: {
      display: "grid",
      alignItems: "center",
      gap: "var(--sl-spacing-x-small)",
      gridTemplateColumns: "max-content max-content",
    },
    ContentContainer: {
      marginBottom: "var(--sl-spacing-medium)",
    },
  };

  const sheet = createStyleSheet(style);
  const styleString = sheet.toString();

  return (
    <div>
      <style type="text/css">{styleString}</style>

      <sl-dialog
        class={sheet.classes.Dialog}
        open={states.open}
        onSl-hide={() => callbacks.setOpen(false)}
      >
        <PortalSectionView
          {...{
            labelMargin: "x-large",
            padding: "none",
            label: (
              <div class={sheet.classes.FormHeaderContainer}>
                <img src="https://res.cloudinary.com/saasquatch-staging/image/upload/v1665703368/tenant_test_a8b41jotf8a1v/tjfxf0qxu2lwqzgtcghw.svg" />
                <h2>
                  {states.editingAccount
                    ? formContent.connectAccountModalHeaderText
                    : formContent.modalConnectPayPalAccountHeader}
                </h2>
                {!states.editingAccount && (
                  <p>{formContent.connectPayPalDescriptionText}</p>
                )}
              </div>
            ),
            content: states.editingAccount ? (
              <div>
                {states.error && (
                  <sqm-form-message
                    class={sheet.classes.Error}
                    type="error"
                    exportparts="erroralert-icon"
                  >
                    <div part="erroralert-text">{states.error}</div>
                  </sqm-form-message>
                )}
                {states.success && (
                  <sqm-form-message
                    class={sheet.classes.Success}
                    type="success"
                    exportparts="successalert-icon"
                  >
                    <div part="successalert-text">
                      {formContent.successMessage}
                    </div>
                  </sqm-form-message>
                )}
                <div class={sheet.classes.EditingFormContentContainer}>
                  <sl-input
                    exportparts="label: input-label"
                    name="/email"
                    label={formContent.payPalEmailLabel}
                    required
                    disabled={true}
                    help-text={formContent.payPalEmailLabelHelpText}
                    type="email"
                    value="email@example.com"
                  ></sl-input>
                  <sl-button
                    class={sheet.classes.FullWidthButton}
                    type="primary"
                    submit
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
                      class={sheet.classes.FullWidthButton}
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
                    class={sheet.classes.Error}
                    type="error"
                    exportparts="erroralert-icon"
                  >
                    <div part="erroralert-text">{states.error}</div>
                  </sqm-form-message>
                )}
                {states.success && (
                  <sqm-form-message
                    class={sheet.classes.Success}
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
                  <div class={sheet.classes.InputContainer}>
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

                  <div class={sheet.classes.ButtonContainer}>
                    <sl-button
                      class={sheet.classes.ConnectPayPalAccount}
                      type="primary"
                      submit
                      loading={states.loading}
                    >
                      {formContent.submitPayPalAccountButtonText}
                    </sl-button>
                    <sl-button
                      class={sheet.classes.CancelButton}
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

      <PortalSectionView
        {...{
          labelMargin: "medium",
          padding: "none",
          label: (
            <div>
              <div class={sheet.classes.HeaderContainer}>
                <div class={sheet.classes.TitleContainer}>
                  <img src="https://res.cloudinary.com/saasquatch-staging/image/upload/v1665703368/tenant_test_a8b41jotf8a1v/tjfxf0qxu2lwqzgtcghw.svg" />
                  <h2>{formContent.payPalAccountHeaderText}</h2>
                </div>
                {!integrationDisabled && props.hasAccount && (
                  <sl-button
                    class={sheet.classes.EditButton}
                    disabled={states.loading}
                    onClick={(e) => {
                      e.preventDefault();
                      callbacks.setOpen(true);
                    }}
                  >
                    {formContent.editText}
                  </sl-button>
                )}
              </div>
              {!integrationDisabled && (
                <p>{formContent.connectPayPalDescriptionText}</p>
              )}
            </div>
          ),
          content: (
            <div class={sheet.classes.ContentContainer}>
              {integrationDisabled && (
                <sl-alert open type="primary">
                  <sl-icon slot="icon" name="info-circle"></sl-icon>
                  <b>{alertContent.integrationAlertHeader}</b>
                  <br />
                  {alertContent.integrationAlertText}
                </sl-alert>
              )}
              {!props.hasAccount && (
                <sl-button
                  disabled={states.loading}
                  onClick={() => callbacks.setOpen(true)}
                >
                  {formContent.connectPayPalAccountButtonText}
                </sl-button>
              )}
            </div>
          ),
        }}
      >
        <style type="text/css">{styleString}</style>
      </PortalSectionView>
    </div>
  );
}
