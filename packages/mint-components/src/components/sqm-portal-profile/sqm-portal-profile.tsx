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
   * @uiName First name label
   */
  @Prop() firstnametext: string = "First Name";

  /**
   * @uiName Last name field label
   */
  @Prop() lastnametext: string = "Last Name";

  /**
   * @uiName Email field label
   */
  @Prop() emailtext: string = "Email";

  /**
   * @uiName Country field label
   */
  @Prop() countrytext: string = "Country";

  /**
   * @uiName Edit profile header
   */
  @Prop() editProfileHeader: string = "Edit your profile";

  /**
   * @uiName Edit profile sub header
   */
  @Prop() editProfileSubHeader: string = "Personal Information";

  /**
   * @uiName Submit changes button text
   */
  @Prop() submitChangeButtonText: string = "Submit Changes";

  /**
   * @uiName Hide country field
   */
  @Prop() hideCountry: boolean = false;

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
        showCountry: !props.hideCountry,
        user: {
          id: "01",
          accountId: "111100000",
          firstName: "Joe",
          lastName: "Smith",
          email: "jsmith@gmail.com",
          countryCode: "CA",
        },
        text: {
          firstnametext: props.firstnametext,
          lastnametext: props.lastnametext,
          emailtext: props.emailtext,
          countrytext: props.countrytext,
          editProfileHeader: props.editProfileHeader,
          editProfileSubHeader: props.editProfileSubHeader,
          submitChangeButtonText: props.submitChangeButtonText,
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
