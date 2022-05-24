import { PortalProfileViewProps } from "./sqm-portal-profile-view";
import { DemoData } from "../../global/demo";
/**
 * @uiName Portal Profile
 */
export declare class PortalProfile {
  ignored: boolean;
  /**
   * @uiName First name input field label
   */
  firstnametext: string;
  /**
   * @uiName Last name input field label
   */
  lastnametext: string;
  /**
   * @uiName Email input field label
   */
  emailtext: string;
  /**
   * @uiName Country input field label
   */
  countrytext: string;
  /**
   * @uiName Edit profile header
   */
  editProfileHeader: string;
  /**
   * @uiName Edit profile sub header
   */
  editProfileSubHeader: string;
  /**
   * @uiName Text for the submit changes button
   */
  submitChangeButtonText: string;
  /**
   * @uiName Show or hide country field
   */
  showCountry: boolean;
  /**
   * @undocumented
   * @uiType object
   */
  demoData?: DemoData<PortalProfileViewProps>;
  constructor();
  disconnectedCallback(): void;
  render(): any;
}
