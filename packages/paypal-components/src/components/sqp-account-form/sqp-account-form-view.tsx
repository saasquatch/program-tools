import { h } from '@stencil/core';
import { createStyleSheet } from '../../styling/JSS';
import { PortalSectionView } from '../sqp-titled-section/sqp-portal-section-view';

export interface AccountFormViewProps {
  states: {
    open: boolean;
    error: string;
    loading: boolean;
    success: boolean;
    content: {
      modalConnectPayPalAccountHeader: string;
      cancelText: string;
      connectPayPalAccountButtonText: string;
      payPalEmailLabel: string;
      payPalEmailLabelHelpText: string;
      confirmPayPalEmailLabel: string;
      successMessage: string;
      payPalAccountHeaderText: string;
      connectPayPalDescriptionText: string;
    };
  };
  callbacks: {
    setOpen: (open: boolean) => void;
    submit: (event: MouseEvent) => void;
  };
}

export function AccountFormView(props: AccountFormViewProps) {
  const { states, callbacks } = props;
  const style = {
    Dialog: {
      'padding': '0',
      '&::part(close-button)': {
        'margin-top': 'var(--sl-spacing-medium)',
      },

      '&::part(body)': {
        padding: '0 var(--sl-spacing-x-large) var(--sl-spacing-x-large) var(--sl-spacing-x-large)',
      },
    },

    Error: {
      '&::part(erroralert-base)': {
        'margin-bottom': '15px',
      },
    },

    Success: {
      '&::part(successalert-base)': {
        'margin-bottom': '15px',
      },
    },

    InputContainer: {
      '& > :not(:last-child)': {
        'margin-bottom': 'var(--sl-spacing-x-large)',
      },
    },

    CancelButton: {
      width: '25%',
      margin: 'var(--sl-spacing-large) auto',
    },
    ConnectPayPalAccount: {},
    HeaderContainer: {},
  };

  const sheet = createStyleSheet(style);
  const styleString = sheet.toString();

  return (
    <div>
      <style type="text/css">{styleString}</style>
      <sl-dialog class={sheet.classes.Dialog} open={states.open} onSl-hide={() => callbacks.setOpen(false)}>
        <PortalSectionView
          {...{
            labelMargin: 'x-large',
            padding: 'none',
            label: (
              <div class={sheet.classes.HeaderContainer}>
                <img src="https://res.cloudinary.com/saasquatch-staging/image/upload/v1665094610/tenant_test_ahsf8e6g2r1dh/brjh1v3anhzwvef6ntbj.svg" />
                <h2>{states.content.modalConnectPayPalAccountHeader}</h2>
                <p>{states.content.connectPayPalDescriptionText}</p>
              </div>
            ),
            content: (
              <div
              // {...{ direction: "column", padding: "none", gap: "32px" }}
              >
                {states.error && (
                  <sqm-form-message class={sheet.classes.Error} type="error" exportparts="erroralert-icon">
                    <div part="erroralert-text">{states.error}</div>
                  </sqm-form-message>
                )}
                {states.success && (
                  <sqm-form-message class={sheet.classes.Success} type="success" exportparts="successalert-icon">
                    <div part="successalert-text">{states.content.successMessage}</div>
                  </sqm-form-message>
                )}
                <sl-form onSl-submit={callbacks.submit}>
                  <div class={sheet.classes.InputContainer}>
                    <div>
                      <sl-input
                        exportparts="label: input-label"
                        name="/email"
                        label={states.content.payPalEmailLabel}
                        required
                        disabled={states.loading}
                        help-text={states.content.payPalEmailLabelHelpText}
                        type="email"
                      ></sl-input>
                    </div>
                    <sl-input
                      exportparts="label: input-label"
                      name="/confirmEmail"
                      label={states.content.confirmPayPalEmailLabel}
                      required
                      disabled={states.loading}
                      type="email"
                    ></sl-input>
                  </div>

                  <div
                  // {...{ direction: "row", padding: "none", gap: "20px" }}
                  >
                    <sl-button class={sheet.classes.ConnectPayPalAccount} type="primary" submit loading={states.loading}>
                      {states.content.connectPayPalAccountButtonText}
                    </sl-button>
                    <sl-button class={sheet.classes.CancelButton} type="text" onClick={() => callbacks.setOpen(false)}>
                      {states.content.cancelText}
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
          labelMargin: 'x-large',
          padding: 'xxx-large',
          label: (
            <div class={sheet.classes.HeaderContainer}>
              <img src="https://res.cloudinary.com/saasquatch-staging/image/upload/v1665094610/tenant_test_ahsf8e6g2r1dh/brjh1v3anhzwvef6ntbj.svg" />
              <h2>{states.content.payPalAccountHeaderText}</h2>
              <p>{states.content.connectPayPalDescriptionText}</p>
            </div>
          ),
          content: <sl-button onClick={() => callbacks.setOpen(true)}>{states.content.connectPayPalAccountButtonText}</sl-button>,
        }}
      >
        <style type="text/css">{styleString}</style>
      </PortalSectionView>
    </div>
  );
}
