import { h } from "@stencil/core";
import { createStyleSheet } from "../../styling/JSS";
import { PortalContainerView } from "../sqm-portal-container/sqm-portal-container-view";
import { TextSpanView } from "../sqm-text-span/sqm-text-span-view";
import { intl } from "../../global/global";

export interface PortalProfileViewProps {
  states: {
    success: boolean;
    loading: boolean;
    submitDisabled: boolean;
    showCountry: boolean;
    formState: {
      country: string;
      firstName: string;
      lastName: string;
      errors: any;
      error: string;
    };
    user: {
      id: string;
      accountId: string;
      firstName: string;
      lastName: string;
      email: string;
      countryCode: string;
    };
    text: {
      firstnametext: string;
      lastnametext: string;
      emailtext: string;
      countrytext: string;
      editProfileHeader: string;
      editProfileSubHeader: string;
      submitChangeButtonText: string;
      submissionSuccessText?: string;
      fieldEmptyText?: string;
    };
  };
  callbacks: {
    onSubmit: (props: any) => void;
    onChange: (e) => void;
  };
}

export function PortalProfileView(props: PortalProfileViewProps) {
  const { states, callbacks } = props;

  const { text, formState } = states;

  const { errors, error } = formState;

  const style = {
    Container: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--sl-spacing-xxx-large)",
      padding: "var(--sl-spacing-xxx-large)",
    },
    FormStyle: {
      width: "100%",
      minWidth: "700px",
      "& >*:not(:last-child)": {
        "margin-bottom": "32px",
      },
      "@media screen and (max-width: 1100px)": {
        minWidth: "100%",
      },
    },
    Error: {
      "&::part(erroralert-base)": {
        "margin-bottom": "32px",
      },
    },

    Success: {
      "&::part(successalert-base)": {
        "margin-bottom": "32px",
      },
    },
    NameInputStyle: {
      width: "50%",
      "@media screen and (max-width: 860px)": {
        width: "100%",
        "margin-right": "0",
      },
    },
    NameInputContainer: {
      display: "flex",
      gap: "32px",
      width: "100%",
      "@media screen and (max-width: 860px)": {
        flexDirection: "column",
      },
    },
  };

  const sheet = createStyleSheet(style);
  const styleString = sheet.toString();

  const country = states.user?.countryCode
    ? intl.formatDisplayName(states.user?.countryCode, {
        type: "region",
      })
    : "";

  return (
    <div class={sheet.classes.Container} part="sqm-base">
      <style type="text/css">{styleString}</style>
      <TextSpanView {...{ type: "h1" }}>{text.editProfileHeader}</TextSpanView>
      <TextSpanView {...{ type: "h2" }}>
        {text.editProfileSubHeader}
      </TextSpanView>
      <form class={sheet.classes.FormStyle} onSubmit={callbacks.onSubmit}>
        {states.success && (
          <sqm-form-message
            class={sheet.classes.Success}
            exportparts="success-icon"
          >
            <div part="successalert-text">{text.submissionSuccessText}</div>
          </sqm-form-message>
        )}

        {error && (
          <sqm-form-message
            class={sheet.classes.Error}
            type="error"
            exportparts="erroralert-icon"
          >
            <div part="erroralert-text">{error}</div>
          </sqm-form-message>
        )}
        <div class={sheet.classes.NameInputContainer}>
          <sl-input
            class={sheet.classes.NameInputStyle}
            exportparts="label: input-label"
            value={states.user?.firstName}
            onInput={callbacks.onChange}
            label={text.firstnametext}
            disabled={states.loading}
            {...(errors?.firstName && errors?.firstName.status !== "valid"
              ? { class: "ErrorStyles", helpText: text.fieldEmptyText }
              : [])}
            id="firstName"
            name="firstName"
            error={
              errors?.firstName && errors?.firstName.status !== "valid"
                ? errors?.firstName.message
                : undefined
            }
          ></sl-input>
          <sl-input
            class={sheet.classes.NameInputStyle}
            exportparts="label: input-label"
            value={states.user?.lastName}
            onInput={callbacks.onChange}
            label={text.lastnametext}
            disabled={states.loading}
            id="lastName"
            name="lastName"
            {...(errors?.lastName && errors?.lastName.status !== "valid"
              ? { class: "ErrorStyles", helpText: text.fieldEmptyText }
              : [])}
            error={
              errors?.lastName && errors?.lastName.status !== "valid"
                ? errors?.lastName.message
                : undefined
            }
          ></sl-input>
        </div>
        <sl-input
          label={text.emailtext}
          value={states.user?.email}
          exportparts="label: input-label"
          disabled
        ></sl-input>
        {states.showCountry && (
          <sl-input
            label={text.countrytext}
            value={country}
            exportparts="label: input-label"
            disabled
          ></sl-input>
        )}
        <sl-button
          type="primary"
          loading={states.loading}
          disabled={states.submitDisabled}
          onClick={(e) => {
            callbacks.onSubmit(e);
          }}
          submit
        >
          {text.submitChangeButtonText}
        </sl-button>
      </form>
    </div>
  );
}
