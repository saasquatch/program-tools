import { h } from "@stencil/core";
import jss from "jss";
import preset from "jss-preset-default";
import { PortalContainerView } from "../sqm-portal-container/sqm-portal-container-view";
import { PortalSectionView } from "../sqm-titled-section/sqm-portal-section-view";
import { TextSpanView } from "../sqm-text-span/sqm-text-span-view";

export interface PortalChangePasswordProps {
  states: { open: boolean; error: string };
  callbacks: {
    setOpen: (open: boolean) => void;
    submit: (event: MouseEvent) => void;
  };
}

export function PortalChangePasswordView(props: PortalChangePasswordProps) {
  const { states, callbacks } = props;
  const style = {
    Error: {
      "&::part(erroralert-base)": {
        "margin-bottom": "15px",
      },
    },
  };

  jss.setup(preset());
  const sheet = jss.createStyleSheet(style);
  const styleString = sheet.toString();

  return (
    <div>
      <style type="text/css">{styleString}</style>
      <sl-dialog open={states.open} onSl-hide={() => callbacks.setOpen(false)}>
        {states.error && (
          <sqm-form-message
            class={sheet.classes.Error}
            type="error"
            exportparts="erroralert-icon"
          >
            <div part="erroralert-text">{states.error}</div>
          </sqm-form-message>
        )}
        <PortalSectionView
          {...{
            labelMargin: "xxxx-large",
            padding: "none",
            label: <TextSpanView {...{ type: "h2" }}>Change password</TextSpanView>,
            content: (
              <PortalContainerView
                {...{ direction: "column", padding: "none", gap: "32px" }}
              >
                <sl-form onSl-submit={callbacks.submit}>
                  <sl-input
                    name="/oldPassword"
                    label="Old password"
                    required
                    type="password"
                  ></sl-input>
                  <sl-input
                    name="/newPasswordOne"
                    label="New password"
                    required
                    type="password"
                  ></sl-input>
                  <sl-input
                    name="/newPasswordTwo"
                    label="Confirm new password"
                    required
                    type="password"
                  ></sl-input>
                  <PortalContainerView
                    {...{ direction: "row", padding: "none", gap: "20px" }}
                  >
                    <sl-button type="text">Cancel</sl-button>
                    <sl-button type="default" submit>
                      Change Password
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
          label: <TextSpanView {...{ type: "h2" }}>Password</TextSpanView>,
          content: (
            <sl-button onClick={() => callbacks.setOpen(true)}>
              Change your password...
            </sl-button>
          ),
        }}
      >
        <style type="text/css">{styleString}</style>
      </PortalSectionView>
    </div>
  );
}
