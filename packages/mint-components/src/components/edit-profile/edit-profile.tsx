import { Component, h, Prop, State } from "@stencil/core";
import { withHooks } from "@saasquatch/stencil-hooks";
import { isDemo } from "@saasquatch/component-boilerplate";
import EditProfileView, { EditProfileViewProps } from "./edit-profile-view";
import { EditProfileProps, useEditProfile } from "./useEditProfile";

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
        editprofileheader: props.editprofileheader,
        editprofiletext: props.editprofiletext,
        firstnametext: props.firstnametext,
        lastnametext: props.lastnametext,
        canceltext: props.canceltext,
        updatetext: props.updatetext,
        currentregiontext: props.currentregiontext,
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
