import { isDemo } from "@saasquatch/component-boilerplate";
import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Prop, State } from "@stencil/core";
import deepmerge from "deepmerge";
import { DemoData } from "../../global/demo";
import {
  PortalEmailVerificationView,
  PortalEmailVerificationViewProps,
} from "./sqm-portal-email-verification-view";
import { usePortalEmailVerification } from "./usePortalEmailVerification";

/**
 * @uiName Portal Email Verification
 */
@Component({
  tag: "sqm-portal-email-verification",
  shadow: true,
})
export class PortalEmailVerification {
  @State()
  ignored = true;

  /** @undocumented */
  @Prop() demoData?: DemoData<PortalEmailVerificationViewProps>;

  constructor() {
    withHooks(this);
  }

  disconnectedCallback() {}

  render() {
    const { states, callbacks, content } = isDemo()
      ? usePortalEmailVerificationDemo(this)
      : usePortalEmailVerification();
    return (
      <PortalEmailVerificationView
        states={states}
        callbacks={callbacks}
        content={content}
      />
    );
  }
}
function usePortalEmailVerificationDemo(
  props: PortalEmailVerification
): PortalEmailVerificationViewProps {
  return deepmerge(
    {
      states: { error: "", loading: false, success: false },
      callbacks: {
        submit: async (_event) => {},
      },
      content: {
        email: "test@example.com",
      },
    },
    props.demoData || {},
    { arrayMerge: (_, a) => a }
  );
}
