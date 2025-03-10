import { Component, h, Prop, State } from "@stencil/core";
import { withHooks } from "@saasquatch/stencil-hooks";
import {
  PortalProfileView,
  PortalProfileViewProps,
} from "./sqm-portal-change-marketing-view";
import { usePortalProfile } from "./usePortalChangeMarketing";
import { getProps } from "../../utils/utils";
import { isDemo } from "@saasquatch/component-boilerplate";
import { DemoData } from "../../global/demo";
import deepmerge from "deepmerge";

/**
 * @uiName Change Marketing Opt in Status
 * @exampleGroup Microsite Components
 * @example Change Marketing Opt in Status - <sqm-portal-container direction="column" gap="xxx-large"><sqm-portal-change-marketing></sqm-portal-change-marketing></sqm-portal-container> */
@Component({
  tag: "sqm-portal-change-marketing",
  shadow: true,
})
export class PortalChangeMarketing {
  @State()
  ignored = true;

  /**
   * @uiName Email preferences header
   */
  @Prop() emailPreferencesHeader: string = "Email preferences";

  /**
   * @uiName Marketing checkbox label
   */
  @Prop() marketingCheckboxLabel: string =
    "I want to receive marketing emails and promotions for this referral program from impact.com";

  /**
   * @uiName Submit changes button text
   */
  @Prop() submitChangeButtonText: string = "Save";

  /**
   * @uiName Network request error message
   * Displayed when the page fails to load due to a network error. The participant can try refreshing the page.
   */
  @Prop() networkRequestMessage: string =
    "An error occurred while loading this page. Please refresh the page.";

  /**
   * @uiName Successful update message
   */
  @Prop() successMessage: string = "Opt-in preference has been changed.";

  /**
   * @undocumented
   * @uiType object
   */
  @Prop() demoData?: DemoData<PortalProfileViewProps>;

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  render() {
    const props = isDemo()
      ? usePortalProfileDemo(getProps(this))
      : usePortalProfile(getProps(this));
    return <PortalProfileView {...props} />;
  }
}

function usePortalProfileDemo(
  props: PortalChangeMarketing
): PortalProfileViewProps {
  return deepmerge(
    {
      states: {
        success: false,
        loading: false,
        submitDisabled: false,
        user: {
          id: "01",
          accountId: "111100000",
          marketingEmailOptIn: false,
        },
        text: {
          emailPreferencesHeader: props.emailPreferencesHeader,
          marketingCheckboxLabel: props.marketingCheckboxLabel,
          submitChangeButtonText: props.submitChangeButtonText,
          successMessage: props.successMessage,
        },
        formState: {
          marketingEmailOptIn: false,
          errors: null,
          error: "",
        },
      },
      callbacks: {
        onSubmit: (e) => console.log(e),
        setChecked: () => {},
      },
    },
    props.demoData || {},
    { arrayMerge: (_, a) => a }
  );
}
