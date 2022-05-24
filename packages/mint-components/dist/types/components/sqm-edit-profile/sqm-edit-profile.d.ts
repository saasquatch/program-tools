import { EditProfileViewProps } from "./sqm-edit-profile-view";
import { DemoData } from "../../global/demo";
/**
 * @uiName Edit Profile
 */
export declare class EditProfile {
  ignored: boolean;
  /**
   * @uiName Heading
   */
  editprofileheader: string;
  /**
   * @uiName Enable editing button text
   */
  editprofiletext: string;
  /**
   * @uiName Cancel button text
   */
  canceltext: string;
  /**
   * @uiName Update info button text
   */
  updatetext: string;
  /**
   * @uiName First name field label
   */
  firstnametext: string;
  /**
   * @uiName Last name field label
   */
  lastnametext: string;
  /**
   * @uiName Region field label
   */
  currentregiontext: string;
  /**
   * @uiName Show or hide current region
   */
  showregion: boolean;
  /**
   * @undocumented
   * @uiType object
   */
  demoData?: DemoData<EditProfileViewProps>;
  constructor();
  disconnectedCallback(): void;
  render(): any;
}
