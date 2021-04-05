import { navigation, useCurrentPage } from "@saasquatch/component-boilerplate";
import { h } from "@stencil/core";
import { PortalFrameView } from "../components/portal-frame/portal-frame-view";

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
  title: "Portal Frame",
};

const defaultProps = {
  data: {
    email: "example@example.com",
  },
  callbacks: {
    rerender: () => {},
  },
  ref: { current: undefined },
};

export const FrameWithMenu = () => {
  const props = {
    ...defaultProps,
    states: {
      includeDropdown: true,
      styles: {
        headertext: "Service Titan",
        description: "Portal description",
        logoutLabel: "Logout",
        menuLabel: "Menu",
        editProfileLabel: "Edit Profile",
        dashboardLabel: "Dashboard",
      },
    },
  };
  return <PortalFrameView {...props} />;
};

export const FrameWithoutMenu = () => {
  const props = {
    ...defaultProps,
    states: {
      includeDropdown: false,
      styles: {
        headertext: "Service Titan",
        description: "Portal description",
        logoutLabel: "Logout",
        menuLabel: "Menu",
        editProfileLabel: "Edit Profile",
        dashboardLabel: "Dashboard",
      },
    },
  };
  return <PortalFrameView {...props} />;
};

export const FullStackFrame = () => {
  setupGraphQL();
  return (
    <div>
      <sqm-portal-frame
        headertext="Service Titan"
        description="Portal Description"
        dashboard-path="/dashboard"
        profile-path="/profile"
        logout-path="/logout"
        logout-label="Logout"
        menu-label="Menu"
        edit-profile-label="Edit Profile"
        dashboard-label="Dashboard"
      >
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
      <sqm-portal-frame
        headertext="Service Titan"
        description="Portal Description"
        dashboard-path="/dashboard"
        profile-path="/profile"
        logout-path="/logout"
        logout-label="Logout"
        menu-label="Menu"
        edit-profile-label="Edit Profile"
        dashboard-label="Dashboard"
      >
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
