import { h } from "@stencil/core";
import {
  RefereeWelcomeView,
  RefereeWelcomeViewProps,
} from "./sqm-referred-registration-view";

export default {
  title: "Components/Referred Registration",
};

const defaultProps: RefereeWelcomeViewProps = {
  states: {
    error: "",
    loading: false,
  },
  callbacks: {
    submit: async (e) => await e,
  },
  content: {},
  // content: { pageLabel: "Share 50$ with your friend now!" },
};

export const Default = () => <RefereeWelcomeView {...defaultProps} />;

export const HasFirstNameLastName = () => (
  <RefereeWelcomeView
    {...defaultProps}
    {...{
      content: {
        includeName: true,
      },
    }}
  />
);

export const WithSlots = () => (
  <RefereeWelcomeView
    {...defaultProps}
    {...{
      content: {
        topSlot: <div>Hello this is the top slot</div>,
        bottomSlot: <div>Hello this is the bottom slot</div>,
      },
    }}
  />
);

export const HidePoweredBy = () => (
  <RefereeWelcomeView
    {...defaultProps}
    {...{
      content: {
        hidePoweredBy: true,
      },
    }}
  />
);
