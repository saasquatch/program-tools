import { h } from "@stencil/core";
import jss from "jss";
import preset from "jss-preset-default";
import { PortalContainerView } from "../sqm-portal-container/sqm-portal-container-view";
import { TextView } from "../sqm-text/sqm-text-view";

export interface PortalProfileProps {}

export function PortalProfileView() {
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
      <TextView {...{ type: "h1" }}>Edit your profile</TextView>
      <TextView {...{ type: "h2" }}>Personal Information</TextView>
      <form class={sheet.classes.FormStyle}>
        <PortalContainerView
          {...{
            direction: "row",
            padding: "none",
            gap: "32px",
            minWidth: "200px",
          }}
        >
          <sl-input label="First Name"></sl-input>
          <sl-input label="Last Name"></sl-input>
        </PortalContainerView>
        <sl-input label="Email"></sl-input>
        <sl-input label="Country"></sl-input>
        <sl-button>Submit Changes</sl-button>
      </form>
    </PortalContainerView>
  );
}
