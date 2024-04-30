import { navigation, useCurrentPage } from "@saasquatch/component-boilerplate";
import { h } from "@stencil/core";
import { PortalFrameView } from "./sqm-portal-frame-view";

function setupGraphQL() {
  const id = "worried-camera@uexwltgh.mailosaur.net";
  const accountId = id;
  const programId = "a-referral-program";

  //@ts-ignore
  window.SquatchAndroid = true;
  //@ts-ignore
  window.widgetIdent = {
    tenantAlias: "test_as36zjtpfy7oo",
    appDomain: "https://staging.referralsaasquatch.com",
    token:
      // you have to change this if you change the id or accountId
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImFjY291bnRJZCI6IndvcnJpZWQtY2FtZXJhQHVleHdsdGdoLm1haWxvc2F1ci5uZXQiLCJpZCI6IndvcnJpZWQtY2FtZXJhQHVleHdsdGdoLm1haWxvc2F1ci5uZXQifX0.-WGV4_bzGCFp-OTIO-h-yp0MlgtkdufT_GgI4T691OY",
    userId: id,
    accountId,
    programId,
  };
  return { id, accountId };
}

function setupLoggedOut() {
  const programId = "a-referral-program";

  //@ts-ignore
  window.SquatchAndroid = true;
  //@ts-ignore
  window.widgetIdent = {
    tenantAlias: "test_as36zjtpfy7oo",
    appDomain: "https://staging.referralsaasquatch.com",
    programId,
  };
}

export default {
  title: "Components/Microsite Frame",
};

const defaultProps = {
  data: {
    footer: <span>example@example.com</span>,
    header: (
      <div slot="header" style={{ display: "flex", flexDirection: "column" }}>
        <span
          style={{
            fontSize: "var(--sl-font-size-large)",
            fontWeight: "bold",
          }}
        >
          Microsite Header
        </span>
        <span style={{ fontSize: "var(--sl-font-size-small)" }}>
          A description for the microsite
        </span>
      </div>
    ),
  },
  callbacks: {
    rerender: () => {},
  },
  ref: { current: undefined },
};

export const FrameWithMenu = () => {
  const props = {
    ...defaultProps,
  };
  return (
    <PortalFrameView {...props}>
      <sqm-navigation-menu menu-label="Menu">
        <sl-menu-item exportparts="base: menuitem-base" value="/widget">
          Dashboard
        </sl-menu-item>
        <sl-menu-item exportparts="base: menuitem-base" value="/editProfile">
          Edit Profile
        </sl-menu-item>
        <sl-menu-divider></sl-menu-divider>
        <sl-menu-item exportparts="base: menuitem-base" value="/logout">
          Logout
        </sl-menu-item>
      </sqm-navigation-menu>
    </PortalFrameView>
  );
};

export const FrameWithoutMenu = () => {
  const props = {
    ...defaultProps,
  };
  return <PortalFrameView {...props} />;
};

export const FullStackFrame = () => {
  setupGraphQL();
  return (
    <div>
      <sqm-portal-frame>
        <div slot="header" style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{
              fontSize: "var(--sl-font-size-large)",
              fontWeight: "bold",
            }}
          >
            Portal Header
          </span>
          <span style={{ fontSize: "var(--sl-font-size-small)" }}>
            A description for the portal
          </span>
        </div>
        <a
          slot="footer"
          class="FooterEmail"
          href="mailto:referrals@servicetitan.com"
        >
          referrals@servicetitan.com
        </a>
        <sqm-navigation-menu menu-label="Menu">
          <sl-menu-item exportparts="base: menuitem-base" value="/widget">
            Dashboard
          </sl-menu-item>
          <sl-menu-item exportparts="base: menuitem-base" value="/editProfile">
            Edit Profile
          </sl-menu-item>
          <sl-menu-divider></sl-menu-divider>
          <sl-menu-item exportparts="base: menuitem-base" value="/logout">
            Logout
          </sl-menu-item>
        </sqm-navigation-menu>
        <h1>Something</h1>
      </sqm-portal-frame>
      <p>
        Current path:{" "}
        <code>
          <strong>{useCurrentPage()?.pathname}</strong>
        </code>
      </p>
      <button onClick={navigation.back}>Go Back</button>
    </div>
  );
};

export const FullStackFrameLoggedOut = () => {
  setupLoggedOut();
  return (
    <div>
      <sqm-portal-frame>
        <div slot="header" style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{
              fontSize: "var(--sl-font-size-large)",
              fontWeight: "bold",
            }}
          >
            Portal Header
          </span>
          <span style={{ fontSize: "var(--sl-font-size-small)" }}>
            A description for the portal
          </span>
        </div>
        <span slot="footer">sample@example.com</span>
        <sqm-navigation-menu menu-label="Menu">
          <sl-menu-item exportparts="base: menuitem-base" value="/widget">
            Dashboard
          </sl-menu-item>
          <sl-menu-item exportparts="base: menuitem-base" value="/editProfile">
            Edit Profile
          </sl-menu-item>
          <sl-menu-divider></sl-menu-divider>
          <sl-menu-item exportparts="base: menuitem-base" value="/logout">
            Logout
          </sl-menu-item>
        </sqm-navigation-menu>
        <h1>Something</h1>
      </sqm-portal-frame>
      <p>
        Current path:{" "}
        <code>
          <strong>{useCurrentPage()?.pathname}</strong>
        </code>
      </p>
      <button onClick={navigation.back}>Go Back</button>
    </div>
  );
};
