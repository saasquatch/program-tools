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
 * @uiName Microsite Participant Profile
 */
@Component({
  tag: "sqm-portal-profile",
  shadow: true,
})
export class PortalProfile {
  @State()
  ignored = true;

  /**
   * @uiName First Name Label
   */
  @Prop() firstnametext: string = "First Name";

  /**
   * @uiName Last Name Field Label
   */
  @Prop() lastnametext: string = "Last Name";

  /**
   * @uiName Email Field Label
   */
  @Prop() emailtext: string = "Email";

  /**
   * @uiName Country Field Label
   */
  @Prop() countrytext: string = "Country";

  /**
   * @uiName Edit Profile Header
   */
  @Prop() editProfileHeader: string = "Edit your profile";

  /**
   * @uiName Edit Profile Sub Header
   */
  @Prop() editProfileSubHeader: string = "Personal Information";

  /**
   * @uiName Submit Changes Button Text
   */
  @Prop() submitChangeButtonText: string = "Submit Changes";

  /**
   * Show or hide the country field.
   *
   * @uiName Show Country Field
   */
  @Prop() showCountry: boolean = true;

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

function usePortalProfileDemo(props: PortalProfile): PortalProfileViewProps {
  return deepmerge(
    {
      states: {
        success: false,
        loading: false,
        submitDisabled: false,
        showCountry: true,
        user: {
          id: "01",
          accountId: "111100000",
          firstName: "Joe",
          lastName: "Smith",
          email: "jsmith@gmail.com",
          countryCode: "CA",
        },
        text: {
          firstnametext: "First Name",
          lastnametext: "Last Name",
          emailtext: "Email",
          countrytext: "Country",
          editProfileHeader: "Edit your profile",
          editProfileSubHeader: "Personal Information",
          submitChangeButtonText: "Submit Changes",
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
    props.demoData || {},
    { arrayMerge: (_, a) => a }
  );
}
