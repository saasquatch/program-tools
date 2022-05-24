import { EditProfileViewProps } from "./sqm-edit-profile-view";
export interface EditProfileProps {
  editprofileheader: string;
  editprofiletext: string;
  firstnametext: string;
  lastnametext: string;
  canceltext: string;
  updatetext: string;
  currentregiontext: string;
  showregion: boolean;
}
export declare function useEditProfile(props: EditProfileProps): EditProfileViewProps;
