import {
  fakeJwt,
  navigation,
  useCurrentPage,
} from "@saasquatch/component-boilerplate";
import { useCannedEnvironment } from "@saasquatch/component-boilerplate/canned";
import { h } from "@stencil/core";
import { PortalFrameView } from "./sqm-portal-frame-view";
import { createHookStory } from "../sqm-stencilbook/HookStoryAddon";

function setupGraphQL() {
  const id = "worried-camera@uexwltgh.mailosaur.net";
  const accountId = id;
  const programId = "a-referral-program";

  //@ts-ignore
  window.SquatchAndroid = true;
  // The Android SDK reads identity from widgetIdent rather than setUserIdentity.
  useCannedEnvironment({
    programId,
    widgetIdent: {
      token: fakeJwt({ user: { id, accountId } }),
      userId: id,
      accountId,
    },
  });
  return { id, accountId };
}

function setupLoggedOut() {
  const programId = "a-referral-program";

  //@ts-ignore
  window.SquatchAndroid = true;
  useCannedEnvironment({ programId });
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

export const FullStackFrame = createHookStory(() => {
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
});

export const FullStackFrameLoggedOut = createHookStory(() => {
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
});
