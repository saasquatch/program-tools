import { h } from "@stencil/core";
import { HeroView } from "../components/sqm-hero/sqm-hero-view";

export default {
  title: "Hero Layout",
  parameters: {
    //   scenario,
  },
};

export const LoginOneColumn = () => {
  const props = {
    states: {
      columns: 1 as const,
    },
    content: {},
  };
  return (
    <div style={{ height: "800px" }}>
      <div>
        <h1 style={{ textAlign: "center" }}>Get Referring!</h1>
        <sqm-portal-login></sqm-portal-login>
      </div>
    </div>
  );
};

export const LoginOneColumnWithColor = () => {
  const props = {
    states: {
      columns: 1 as const,
      background:
        "LightSlateGrey",
    },
    content: {},
  };
  return (
    <div style={{ height: "800px" }}>
      <HeroView {...props}>
        <sqm-portal-login></sqm-portal-login>
      </HeroView>
    </div>
  );
};

export const LoginOneColumnWithImage = () => {
  const props = {
    states: {
      columns: 1 as const,
      background:
        "https://images.unsplash.com/photo-1599676821464-3555954838dc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1939&q=80",
    },
    content: {},
  };
  return (
    <div style={{ height: "800px" }}>
      <HeroView {...props}>
        <sqm-portal-login></sqm-portal-login>
      </HeroView>
    </div>
  );
};

export const TwoColumnLogin = () => {
  const props = {
    states: {
      columns: 2 as const,
    },
    content: {
      rightColumn: (
        <div style={{ width: "85%" }}>
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
      leftColumn: (
        <sqm-portal-login style={{ width: "85%" }}></sqm-portal-login>
      ),
    },
  };
  return (
    <div style={{ height: "800px" }}>
      <HeroView {...props}></HeroView>
    </div>
  );
};

export const TwoColumnLoginWithImage = () => {
  const props = {
    states: {
      columns: 2 as const,
    },
    content: {
      leftColumn: (
        <div style={{ width: "85%" }}>
          <h1 style={{ textAlign: "center" }}>Get Referring!</h1>
          <sqm-portal-login></sqm-portal-login>
        </div>
      ),
      rightColumn: (
        <img src="https://images.unsplash.com/photo-1629004021495-83fe9b730acb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=735&q=80"></img>
      ),
    },
  };
  return (
    <div style={{ height: "800px" }}>
      <HeroView {...props}></HeroView>
    </div>
  );
};
