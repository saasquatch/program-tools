export interface EditProfileViewProps {
  states: {
    loading: boolean;
    submitDisabled: boolean;
    formState: {
      currentRegion: string;
      firstName: string;
      lastName: string;
      errors: any;
      error: string;
    };
    user: {
      firstName: string;
      lastName: string;
      email: string;
    };
    showEdit: boolean;
    text: {
      editprofileheader: string;
      editprofiletext: string;
      firstnametext: string;
      lastnametext: string;
      canceltext: string;
      updatetext: string;
      currentregiontext: string;
      showregion?: boolean;
    };
  };
  callbacks: {
    onSubmit: (props: any) => void;
    resetForm: () => void;
    onChange: (e: any) => void;
    setShowEdit: (props: boolean) => void;
  };
}
declare const EditProfileView: (props: EditProfileViewProps) => any;
export default EditProfileView;
