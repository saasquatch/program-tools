import { Component, h, Prop, State } from "@stencil/core";
import { withHooks } from "@saasquatch/stencil-hooks";
import EditProfileView, { EditProfileViewProps } from "./sqm-edit-profile-view";
import { EditProfileProps, useEditProfile } from "./useEditProfile";
import { isDemo } from "@saasquatch/component-boilerplate";
import { getProps } from "../../utils/utils";
import deepmerge from "deepmerge";
import { DemoData } from "../../global/demo";

/**
 * @uiName Edit Profile
 */
@Component({
  tag: "sqm-edit-profile",
  styleUrl: "sqm-edit-profile.scss",
  shadow: true,
})
export class EditProfile {
  @State()
  ignored = true;

  /**
   * @uiName Heading
   */
  @Prop() editprofileheader: string;
  /**
   * @uiName Enable editing button text
   */
  @Prop() editprofiletext: string;
  /**
   * @uiName Cancel button text
   */
  @Prop() canceltext: string;
  /**
   * @uiName Update info button text
   */
  @Prop() updatetext: string;
  /**
   * @uiName First name field label
   */
  @Prop() firstnametext: string;
  /**
   * @uiName Last name field label
   */
  @Prop() lastnametext: string;
  /**
   * @uiName Region field label
   */
  @Prop() currentregiontext: string;
  /**
   * @uiName Show or hide current region
   */
  @Prop() showregion: boolean;

  /** @undocumented */
  @Prop() demoData?: DemoData<EditProfileViewProps>;

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  render() {
    const props = isDemo()
      ? useEditProfileDemo(getProps(this))
      : useEditProfile(getProps(this));
    return <EditProfileView {...props} />;
  }
}

function useEditProfileDemo(props: EditProfile): EditProfileViewProps {
  return deepmerge(
    {
      states: {
        loading: false,
        submitDisabled: false,
        formState: {
          currentRegion: "Canada",
          firstName: "Bill",
          lastName: "Bob",
          errors: {},
          error: "An error string",
        },
        user: {
          firstName: "Bill",
          lastName: "Bob",
          email: "billbob@example.com",
        },
        showEdit: false,
        text: {
          editprofileheader: props.editprofileheader
            ? props.editprofileheader
            : "Edit Profile",
          editprofiletext: props.editprofiletext
            ? props.editprofiletext
            : "Update your profile.",
          firstnametext: props.firstnametext
            ? props.firstnametext
            : "First Name",
          lastnametext: props.lastnametext ? props.lastnametext : "Last Name",
          canceltext: props.canceltext ? props.canceltext : "Cancel",
          updatetext: props.updatetext ? props.updatetext : "Update",
          currentregiontext: props.currentregiontext
            ? props.currentregiontext
            : "Region",
          showregion: true,
        },
      },
      callbacks: {
        onSubmit: (props) => {
          console.log(props);
        },
        resetForm: () => {
          console.log("reset");
        },
        onChange: () => {
          console.log("change");
        },
        setShowEdit: (props) => {
          console.log(props);
        },
      },
    },
    props.demoData || {},
    { arrayMerge: (_, a) => a }
  );
}
