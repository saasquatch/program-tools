import { h } from "@stencil/core";
import EditProfileView from "../components/sqm-edit-profile/sqm-edit-profile-view";

export default {
  title: "Edit Profile Form",
};

const defaultProps = {
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
      editprofileheader: "Edit Profile",
      editprofiletext: "Update your profile.",
      firstnametext: "Bill",
      lastnametext: "Bob",
      canceltext: "Cancel",
      updatetext: "Update",
      currentregiontext: "Canada",
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

export const EditProfileFormDisabled = () => {
  const props = defaultProps;
  return <EditProfileView {...props} />;
};

export const EditProfileFormEnabled = () => {
  const props = {
    ...defaultProps,
    states: { ...defaultProps.states, showEdit: true },
  };
  return <EditProfileView {...props} />;
};

export const FullStackFrameWithMenu = () => {
  return (
    <sqm-edit-profile
      editprofileheader="Edit Profile"
      editprofiletext="Update your profile."
      firstnametext="Bill"
      lastnametext="Bob"
      canceltext="Cancel"
      updatetext="Update"
      currentregiontext="Current Region"
      showregion={true}
    ></sqm-edit-profile>
  );
};
