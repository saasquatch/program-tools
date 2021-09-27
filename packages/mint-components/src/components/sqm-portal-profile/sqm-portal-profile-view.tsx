import { h } from "@stencil/core";
import jss from "jss";
import preset from "jss-preset-default";
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
    FormStyle: {
      "& >*:not(:last-child)": {
        "margin-bottom": "32px",
      },
    },
    Error: {
      "&::part(erroralert-base)": {
        "margin-bottom": "32px",
      },
    },
    NameInputStyle: {
      "&:not(:last-child)": {
        "margin-right": "var(--sl-spacing-medium)",
      },
    },
  };

  jss.setup(preset());
  const sheet = jss.createStyleSheet(style);
  const styleString = sheet.toString();

  const country = states.user?.countryCode
    ? intl.formatDisplayName(states.user?.countryCode, {
        type: "region",
      })
    : "";

  return (
    <PortalContainerView
      {...{
        direction: "row",
        padding: "xxx-large",
        gap: "48px",
        minWidth: "600px",
      }}
    >
      <style type="text/css">{styleString}</style>
      <TextSpanView {...{ type: "h1" }}>{text.editProfileHeader}</TextSpanView>
      <TextSpanView {...{ type: "h2" }}>
        {text.editProfileSubHeader}
      </TextSpanView>
      <form class={sheet.classes.FormStyle} onSubmit={callbacks.onSubmit}>
        {states.success && (
          <sqm-form-message exportparts="success-icon">
            <div part="successalert-text">
              Your profile has been successfully updated.
            </div>
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
        <PortalContainerView
          {...{
            direction: "row",
            padding: "none",
            gap: "32px",
            minWidth: "50%",
          }}
        >
          <sl-input
            class={sheet.classes.NameInputStyle}
            value={states.user?.firstName}
            onInput={callbacks.onChange}
            label={text.firstnametext}
            disabled={states.loading}
            {...(errors?.firstName && errors?.firstName.status !== "valid"
              ? { class: "ErrorStyles", helpText: "Cannot be empty" }
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
              ? { class: "ErrorStyles", helpText: "Cannot be empty" }
              : [])}
            error={
              errors?.lastName && errors?.lastName.status !== "valid"
                ? errors?.lastName.message
                : undefined
            }
          ></sl-input>
        </PortalContainerView>
        <sl-input
          label={text.emailtext}
          value={states.user?.email}
          disabled
        ></sl-input>
        {states.showCountry && (
          <sl-input
            label={text.countrytext}
            value={country}
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
    </PortalContainerView>
  );
}
