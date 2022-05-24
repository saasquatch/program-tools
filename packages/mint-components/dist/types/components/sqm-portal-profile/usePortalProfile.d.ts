import { PortalProfileViewProps } from "./sqm-portal-profile-view";
export interface PortalProfileProps {
  firstnametext: string;
  lastnametext: string;
  countrytext: string;
  emailtext: string;
  editProfileHeader: string;
  editProfileSubHeader: string;
  submitChangeButtonText: string;
  showCountry: boolean;
}
export declare function usePortalProfile(props: PortalProfileProps): PortalProfileViewProps;
