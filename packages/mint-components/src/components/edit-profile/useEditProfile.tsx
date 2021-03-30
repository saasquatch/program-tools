import { EditProfileViewProps } from "./edit-profile-view";

export interface EditProfileProps {
  editprofileheader: string;
  editprofiletext: string;
  firstnametext: string;
  lastnametext: string;
  canceltext: string;
  updatetext: string;
  currentregiontext: string;
}

export function useEditProfile(props: EditProfileProps): EditProfileViewProps {
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
