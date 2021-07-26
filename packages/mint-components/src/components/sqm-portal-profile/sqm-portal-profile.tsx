import { Component, h, Prop, State } from "@stencil/core";
import { withHooks } from "@saasquatch/stencil-hooks";
import {
  PortalProfileView,
  PortalProfileViewProps,
} from "./sqm-portal-profile-view";
import { usePortalProfile } from "./usePortalProfile";
import { getProps } from "../../utils/utils";
import { isDemo } from "@saasquatch/component-boilerplate";
import { DemoData } from "../../global/demo";
import deepmerge from "deepmerge";

/**
 * @uiName Portal Profile
 */
@Component({
  tag: "sqm-portal-profile",
  shadow: true,
})
export class PortalProfile {
  @State()
  ignored = true;

  @Prop() firstnametext: string = "First Name";
  @Prop() lastnametext: string = "Last Name";
  @Prop() emailtext: string = "Email";
  @Prop() countrytext: string = "Country";
  /** @undocumented */
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

function usePortalProfileDemo(props: PortalProfile): PortalProfileViewProps {
  return deepmerge(
    {
      states: {
        loading: false,
        submitDisabled: false,
        user: {
          id: "01",
          accountId: "111100000",
          firstName: "Joe",
          lastName: "Smith",
          email: "jsmith@gmail.com",
          countryCode: "5000",
        },
        text: {
          firstnametext: "First Name",
          lastnametext: "Last Name",
          emailtext: "Email",
          countrytext: "Country",
        },
        formState: {
          country: "Canada",
          firstName: "Joe",
          lastName: "Smith",
          errors: null,
          error: "",
        },
      },
      callbacks: {
        onSubmit: (e) => console.log(e),
        onChange: (e) => console.log(e),
      },
    },
    props.demoData,
    { arrayMerge: (_, a) => a }
  );
}
