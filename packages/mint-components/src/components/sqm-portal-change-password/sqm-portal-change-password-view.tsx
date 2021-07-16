import { h } from "@stencil/core";
import jss from "jss";
import preset from "jss-preset-default";
import { PortalContainerView } from "../sqm-portal-container/sqm-portal-container-view";
import { PortalSectionView } from "../sqm-titled-section/sqm-portal-section-view";
import { TextView } from "../sqm-text/sqm-text-view";

export interface PortalChangePasswordProps {
  states: { open: boolean };
}

export function PortalChangePasswordView(props: PortalChangePasswordProps) {
  const style = {};

  jss.setup(preset());
  const sheet = jss.createStyleSheet(style);
  const styleString = sheet.toString();

  return (
    <div>
      <sl-dialog open={props.states.open}>
        <PortalSectionView
          {...{
            labelMargin: "xxxx-large",
            padding: "none",
            label: <TextView {...{ type: "h2" }}>Change password</TextView>,
            content: (
              <PortalContainerView
                {...{ direction: "column", padding: "none", gap: "32px" }}
              >
                <sl-input label="Old password"></sl-input>
                <sl-input label="New password"></sl-input>
                <sl-input label="Confirm new password"></sl-input>
                <PortalContainerView
                  {...{ direction: "row", padding: "none", gap: "20px" }}
                >
                  <sl-button type="text">Cancel</sl-button>
                  <sl-button type="default">Change Password</sl-button>
                </PortalContainerView>
              </PortalContainerView>
            ),
          }}
        ></PortalSectionView>
      </sl-dialog>
      <PortalSectionView
        {...{
          labelMargin: "x-large",
          padding: "xxx-large",
          label: <TextView {...{ type: "h2" }}>Password</TextView>,
          content: <sl-button>Change your password...</sl-button>,
        }}
      >
        <style type="text/css">{styleString}</style>
      </PortalSectionView>
    </div>
  );
}
