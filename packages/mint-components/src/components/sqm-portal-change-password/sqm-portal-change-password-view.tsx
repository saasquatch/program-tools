import { h } from "@stencil/core";
import { createStyleSheet } from "../../styling/JSS";
import { PortalContainerView } from "../sqm-portal-container/sqm-portal-container-view";
import { PortalSectionView } from "../sqm-titled-section/sqm-portal-section-view";
import { TextSpanView } from "../sqm-text-span/sqm-text-span-view";

export interface PortalChangePasswordViewProps {
  states: {
    open: boolean;
    error: string;
    loading: boolean;
    success: boolean;
    content: {
      modalChangePasswordHeader: string;
      cancelText: string;
      changePasswordButtonText: string;
      passwordFieldLabel: string;
      confirmPasswordFieldLabel: string;
      successMessage: string;
      portalChangePasswordHeader: string;
      portalChangePasswordButtonText: string;
    };
  };
  callbacks: {
    setOpen: (open: boolean) => void;
    submit: (event: MouseEvent) => void;
  };
}

export function PortalChangePasswordView(props: PortalChangePasswordViewProps) {
  const { states, callbacks } = props;
  const style = {
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
      "& > :not(:last-child)": {
        "margin-bottom": "var(--sl-spacing-x-large)",
      },
    },

    CancelButton: {
      width: "25%",
      margin: "var(--sl-spacing-large) auto",
    },
    PasswordField: {
      marginBottom: "var(--sl-spacing-large) !important",
      display: "block",
    },
    ChangePasswordButton: {
      paddingTop: "var(--sl-spacing-x-large)",
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
              <TextSpanView {...{ type: "h2" }}>
                {states.content.modalChangePasswordHeader}
              </TextSpanView>
            ),
            content: (
              <PortalContainerView
                {...{ direction: "column", padding: "none", gap: "32px" }}
              >
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
                      {states.content.successMessage}
                    </div>
                  </sqm-form-message>
                )}
                <sl-form onSl-submit={callbacks.submit}>
                  <div class={sheet.classes.InputContainer}>
                    <sqm-password-field
                      exportparts="input-label: input-label"
                      class={sheet.classes.PasswordField}
                      fieldLabel={states.content.passwordFieldLabel}
                    ></sqm-password-field>
                    <sl-input
                      exportparts="label: input-label"
                      name="/confirmPassword"
                      label={states.content.confirmPasswordFieldLabel}
                      required
                      togglePassword
                      disabled={states.loading}
                      type="password"
                    ></sl-input>
                  </div>

                  <PortalContainerView
                    {...{ direction: "row", padding: "none", gap: "20px" }}
                  >
                    <sl-button
                      class={sheet.classes.ChangePasswordButton}
                      type="primary"
                      submit
                      loading={states.loading}
                    >
                      {states.content.changePasswordButtonText}
                    </sl-button>
                    <sl-button
                      class={sheet.classes.CancelButton}
                      type="text"
                      onClick={() => callbacks.setOpen(false)}
                    >
                      {states.content.cancelText}
                    </sl-button>
                  </PortalContainerView>
                </sl-form>
              </PortalContainerView>
            ),
          }}
        ></PortalSectionView>
      </sl-dialog>
      <PortalSectionView
        {...{
          labelMargin: "x-large",
          padding: "xxx-large",
          label: (
            <TextSpanView {...{ type: "h2" }}>
              {states.content.portalChangePasswordHeader}
            </TextSpanView>
          ),
          content: (
            <sl-button onClick={() => callbacks.setOpen(true)}>
              {states.content.portalChangePasswordButtonText}
            </sl-button>
          ),
        }}
      >
        <style type="text/css">{styleString}</style>
      </PortalSectionView>
    </div>
  );
}
