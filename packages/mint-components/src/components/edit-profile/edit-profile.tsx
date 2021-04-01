import { Component, h, Prop, State } from "@stencil/core";
import { withHooks } from "@saasquatch/stencil-hooks";
import EditProfileView, { EditProfileViewProps } from "./edit-profile-view";
import { EditProfileProps, useEditProfile } from "./useEditProfile";
import { isDemo } from "@saasquatch/component-boilerplate";

/**
 * @uiName Edit Profile
 */
@Component({
  tag: "sqm-edit-profile",
  styleUrl: "edit-profile.scss",
  shadow: true,
})
export class EditProfile {
  @State()
  ignored = true;

  @Prop() editprofileheader: string;
  @Prop() editprofiletext: string;
  @Prop() firstnametext: string;
  @Prop() lastnametext: string;
  @Prop() canceltext: string;
  @Prop() updatetext: string;
  @Prop() currentregiontext: string;

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  render() {
    const props = isDemo() ? useEditProfileDemo(this) : useEditProfile(this);
    return <EditProfileView {...props} />;
  }
}

function useEditProfileDemo(props: EditProfileProps): EditProfileViewProps {
  console.log("DEMO DEMO DEMO")
  return {
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
        editprofileheader: props.editprofileheader ? props.editprofileheader : "Edit Profile",
        editprofiletext: props.editprofiletext ? props.editprofiletext : "Update your profile.",
        firstnametext: props.firstnametext ? props.firstnametext : "Bill",
        lastnametext: props.lastnametext ? props.lastnametext : "Bob",
        canceltext: props.canceltext ? props.canceltext : "Cancel",
        updatetext: props.updatetext ? props.updatetext : "Update",
        currentregiontext: props.currentregiontext ? props.currentregiontext : "Canada",
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
  };
}
