import { h } from "@stencil/core";
import { HeroView } from "./sqm-hero-view";
import scenario from "../components/sqm-hero/sqm-hero.feature";

export default {
  title: "Hero Layout",
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

export const LoginOneColumnWithColor = () => {
  const props = {
    states: {
      columns: 1 as const,
      wrapDirection: "wrap" as const,
      paddingSize: "large" as const,

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
