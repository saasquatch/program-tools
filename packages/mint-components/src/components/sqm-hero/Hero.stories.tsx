import { h } from "@stencil/core";
import { HeroView } from "./sqm-hero-view";
import scenario from "../sqm-hero/sqm-hero.feature";

export default {
  title: "Components/Hero Layout",
  parameters: {
    scenario,
  },
};

export const LoginOneColumn = () => {
  const props = {
    states: {
      columns: 1 as const,
      wrapDirection: "wrap" as const,
      paddingSize: "large" as const,
      minHeight: 0,
    },
    content: {
      primaryColumn: [
        <h1 style={{ textAlign: "center" }}>Get Referring!</h1>,
        <sqm-portal-login></sqm-portal-login>,
      ],
    },
  };
  return (
    <div style={{ height: "800px" }}>
      <HeroView {...props}></HeroView>
    </div>
  );
};
export const LoginOneColumnWithMinHeight = () => {
  return (
    <sqm-hero
      background="https://res.cloudinary.com/saasquatch/image/upload/v1683589933/Portal%20Assets/Screen-Shot-2022-01-06-at-3.23.58-AM.png"
      columns={1}
      padding-size="medium"
      wrap-direction="wrap"
      secondary-background="#FFFFFF"
    >
      <sqm-portal-login></sqm-portal-login>
    </sqm-hero>
  );
};

export const LoginOneColumnWithColor = () => {
  const props = {
    states: {
      columns: 1 as const,
      wrapDirection: "wrap" as const,
      paddingSize: "large" as const,
      minHeight: 0,

      background: "LightSlateGrey",
    },
    content: {
      primaryColumn: <sqm-portal-login></sqm-portal-login>,
    },
  };
  return (
    <div style={{ height: "800px" }}>
      <HeroView {...props}></HeroView>
    </div>
  );
};

export const LoginOneColumnWithImage = () => {
  const props = {
    states: {
      columns: 1 as const,
      wrapDirection: "wrap" as const,
      paddingSize: "large" as const,
      minHeight: 0,

      background:
        "https://images.unsplash.com/photo-1599676821464-3555954838dc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1939&q=80",
    },
    content: { primaryColumn: <sqm-portal-login></sqm-portal-login> },
  };
  return (
    <div style={{ height: "800px" }}>
      <HeroView {...props}></HeroView>
    </div>
  );
};

export const TwoColumnLoginLargePadding = () => {
  const props = {
    states: {
      columns: 2 as const,
      wrapDirection: "wrap" as const,
      paddingSize: "large" as const,
      minHeight: 0,

      background:
        "https://images.unsplash.com/photo-1599676821464-3555954838dc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1939&q=80",
      secondaryBackground: "LightSlateGrey",
    },
    content: {
      primaryColumn: <sqm-portal-login></sqm-portal-login>,
      secondaryColumn: (
        <div>
          <h1 style={{ textAlign: "center" }}>Get Referring!</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.
          </p>
        </div>
      ),
    },
  };
  return (
    <div style={{ height: "800px" }}>
      <HeroView {...props}></HeroView>
    </div>
  );
};

export const TwoColumnLoginMediumPadding = () => {
  const props = {
    states: {
      columns: 2 as const,
      wrapDirection: "wrap" as const,
      paddingSize: "medium" as const,
      minHeight: 0,

      background:
        "https://images.unsplash.com/photo-1599676821464-3555954838dc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1939&q=80",
      secondaryBackground: "LightSlateGrey",
    },
    content: {
      primaryColumn: <sqm-portal-login></sqm-portal-login>,
      secondaryColumn: (
        <div>
          <h1 style={{ textAlign: "center" }}>Get Referring!</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.
          </p>
        </div>
      ),
    },
  };
  return (
    <div style={{ height: "800px" }}>
      <HeroView {...props}></HeroView>
    </div>
  );
};

export const TwoColumnLoginSmallPadding = () => {
  const props = {
    states: {
      columns: 2 as const,
      wrapDirection: "wrap" as const,
      paddingSize: "small" as const,
      minHeight: 0,

      background:
        "https://images.unsplash.com/photo-1599676821464-3555954838dc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1939&q=80",
      secondaryBackground: "LightSlateGrey",
    },
    content: {
      primaryColumn: <sqm-portal-login></sqm-portal-login>,
      secondaryColumn: (
        <div>
          <h1 style={{ textAlign: "center" }}>Get Referring!</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.
          </p>
        </div>
      ),
    },
  };
  return (
    <div style={{ height: "800px" }}>
      <HeroView {...props}></HeroView>
    </div>
  );
};

export const TwoColumnLoginNoPadding = () => {
  const props = {
    states: {
      columns: 2 as const,
      wrapDirection: "wrap" as const,
      paddingSize: "none" as const,
      minHeight: 0,

      background:
        "https://images.unsplash.com/photo-1599676821464-3555954838dc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1939&q=80",
      secondaryBackground: "LightSlateGrey",
    },
    content: {
      primaryColumn: <sqm-portal-login></sqm-portal-login>,
      secondaryColumn: (
        <div>
          <h1 style={{ textAlign: "center" }}>Get Referring!</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.
          </p>
        </div>
      ),
    },
  };
  return (
    <div style={{ height: "800px" }}>
      <HeroView {...props}></HeroView>
    </div>
  );
};

export const TwoColumnLoginReverseWrap = () => {
  const props = {
    states: {
      columns: 2 as const,
      wrapDirection: "wrap-reverse" as const,
      background: "LightSlateGrey",
      paddingSize: "large" as const,
      minHeight: 0,

      secondaryBackground:
        "https://images.unsplash.com/photo-1599676821464-3555954838dc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1939&q=80",
    },
    content: {
      primaryColumn: <sqm-portal-change-password></sqm-portal-change-password>,
      secondaryColumn: (
        <div>
          <h1 style={{ textAlign: "center" }}>Get Referring!</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.
          </p>
        </div>
      ),
    },
  };
  return (
    <div style={{ height: "800px" }}>
      <HeroView {...props}></HeroView>
    </div>
  );
};

export const TwoColumnLoginWithImgElement = () => {
  const props = {
    states: {
      columns: 2 as const,
      wrapDirection: "wrap" as const,
      paddingSize: "large" as const,
      minHeight: 0,
    },
    content: {
      primaryColumn: (
        <div>
          <h1 style={{ textAlign: "center" }}>Get Referring!</h1>
          <sqm-portal-login></sqm-portal-login>
        </div>
      ),
      secondaryColumn: (
        <div>
          <img src="https://images.unsplash.com/photo-1487528278747-ba99ed528ebc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" />
          <p>
            Pellentesque mauris urna, lacinia non turpis sed, pulvinar congue
            ligula. Sed mattis condimentum eros nec vulputate. Cras consectetur
            eget libero at viverra. Aliquam suscipit feugiat ante sit amet
            sagittis. Fusce pulvinar interdum odio ut dapibus. Nulla aliquet
            ultricies augue nec dignissim. Morbi vulputate hendrerit sem.
          </p>
        </div>
      ),
    },
  };
  return (
    <div style={{ height: "800px" }}>
      <HeroView {...props}></HeroView>
    </div>
  );
};

export const MinHeight = () => {
  const props = {
    states: {
      columns: 2 as const,
      wrapDirection: "wrap" as const,
      paddingSize: "large" as const,
      minHeight: 600,
      background:
        "https://images.unsplash.com/photo-1487528278747-ba99ed528ebc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    },
    content: {
      secondaryColumn: (
        <div>
          <h1 style={{ textAlign: "center" }}>Get Referring!</h1>
          <sqm-portal-login></sqm-portal-login>
        </div>
      ),
    },
  };
  return <HeroView {...props}></HeroView>;
};

export const InstantAccessLoggedOutView = () => {
  return (
    <sqm-hero
      background="https://res.cloudinary.com/saasquatch/image/upload/v1683589933/Portal%20Assets/Screen-Shot-2022-01-06-at-3.23.58-AM.png"
      columns={2}
      padding-size="medium"
      wrap-direction="wrap"
      secondary-background="var(--sqm-portal-background)"
      columnToHideInMobile="primary"
    >
      <sqm-referred-registration
        slot="secondary-column"
        register-label="Get $50 off"
        padding-bottom="small"
        padding-left="x-large"
        padding-right="x-large"
        padding-top="small"
      >
        <sqm-titled-section
          text-align="center"
          label-margin="small"
          padding="none"
          slot="top"
        >
          <h1 slot="label">You got &#x24;50 off thanks to a friend!</h1>
          <p slot="content">
            <span>Use this reward to get &#x24;50 off your next purchase.</span>
          </p>
        </sqm-titled-section>
        <div slot="bottom">
          <p style={{ textAlign: "center" }}>
            *Valid on purchases of &#x24;75 or more
          </p>
          <sqm-portal-footer
            slot="footer"
            show-powered-by="true"
            padding-bottom="none"
            padding-left="none"
            padding-right="none"
            padding-top="none"
            hide-support-text
            terms-text="Terms And Conditions"
            terms-link="https://example.com"
          ></sqm-portal-footer>
        </div>
      </sqm-referred-registration>
    </sqm-hero>
  );
};
