export interface PortalProfileViewProps {
  states: {
    success: boolean;
    loading: boolean;
    submitDisabled: boolean;
    showCountry: boolean;
    formState: {
      country: string;
      firstName: string;
      lastName: string;
      errors: any;
      error: string;
    };
    user: {
      id: string;
      accountId: string;
      firstName: string;
      lastName: string;
      email: string;
      countryCode: string;
    };
    text: {
      firstnametext: string;
      lastnametext: string;
      emailtext: string;
      countrytext: string;
      editProfileHeader: string;
      editProfileSubHeader: string;
      submitChangeButtonText: string;
    };
  };
  callbacks: {
    onSubmit: (props: any) => void;
    onChange: (e: any) => void;
  };
}
export declare function PortalProfileView(props: PortalProfileViewProps): any;
