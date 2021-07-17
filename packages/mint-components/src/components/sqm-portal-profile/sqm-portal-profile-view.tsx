import { h } from "@stencil/core";
import jss from "jss";
import preset from "jss-preset-default";
import { PortalContainerView } from "../sqm-portal-container/sqm-portal-container-view";
import { PresetText } from "../../functional-components/PresetText";

export interface PortalProfileProps {}

export function PortalProfileView(props) {
  const { states, callbacks } = props;

  const { text, errors } = states;

  const style = {
    FormStyle: {
      "& >*:not(:last-child)": {
        "margin-bottom": "32px",
      },
    },
  };

  jss.setup(preset());
  const sheet = jss.createStyleSheet(style);
  const styleString = sheet.toString();

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
      <PresetText {...{ type: "h1" }}>Edit your profile</PresetText>
      <PresetText {...{ type: "h2" }}>Personal Information</PresetText>
      <form class={sheet.classes.FormStyle} onSubmit={callbacks.onSubmit}>
        <PortalContainerView
          {...{
            direction: "row",
            padding: "none",
            gap: "32px",
            minWidth: "200px",
          }}
        >
          <sl-input
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
        <sl-input label="Email" value={states.user?.email}></sl-input>
        <sl-input label="Country"></sl-input>
        <sl-button
          type="primary"
          loading={states.loading}
          disabled={states.submitDisabled}
          onClick={(e) => {
            callbacks.onSubmit(e);
          }}
          submit
        >
          Submit Changes
        </sl-button>
      </form>
    </PortalContainerView>
  );
}
