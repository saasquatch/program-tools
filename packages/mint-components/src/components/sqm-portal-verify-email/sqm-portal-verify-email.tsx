import { isDemo } from "@saasquatch/component-boilerplate";
import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Prop, State } from "@stencil/core";
import deepmerge from "deepmerge";
import { DemoData } from "../../global/demo";
import {
  PortalVerifyEmailView,
  PortalVerifyEmailViewProps,
} from "./sqm-portal-verify-email-view";
import { usePortalVerifyEmail } from "./usePortalVerifyEmail";

/**
 * @uiName Portal Verify Email
 */
@Component({
  tag: "sqm-portal-verify-email",
  shadow: true,
})
export class PortalVerifyEmail {
  @State()
  ignored = true;

  @Prop()
  nextPage = "/";

  /** @undocumented */
  @Prop() demoData?: DemoData<PortalVerifyEmailViewProps>;

  constructor() {
    withHooks(this);
  }

  disconnectedCallback() {}

  render() {
    const { states, callbacks } = isDemo()
      ? usePortalVerifyEmailDemo(this)
      : usePortalVerifyEmail(this);
    return <PortalVerifyEmailView states={states} callbacks={callbacks} />;
  }
}
function usePortalVerifyEmailDemo(
  props: PortalVerifyEmail
): PortalVerifyEmailViewProps {
  return deepmerge(
    {
      states: { error: "", loading: false, verified: false },
      callbacks: {
        failed: () => {
          console.log("failed");
        },
        gotoNextPage: () => {},
      },
    },
    props.demoData,
    { arrayMerge: (_, a) => a }
  );
}
