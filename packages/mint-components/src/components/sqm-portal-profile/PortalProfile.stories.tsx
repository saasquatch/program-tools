import { h } from "@stencil/core";
import {
  PortalProfileView,
  PortalProfileViewProps,
} from "./sqm-portal-profile-view";

export default {
  title: "Components/Microsite Profile",
};

const defaultProps: PortalProfileViewProps = {
  states: {
    success: false,
    loading: false,
    submitDisabled: false,
    showCountry: true,
    user: {
      id: "01",
      accountId: "111100000",
      firstName: "Joe",
      lastName: "Smith",
      email: "jsmith@gmail.com",
      countryCode: "5000",
    },
    text: {
      firstnametext: "First Name",
      lastnametext: "Last Name",
      emailtext: "Email",
      countrytext: "Country",
      editProfileHeader: "Edit your profile",
      editProfileSubHeader: "Personal Information",
      submitChangeButtonText: "Submit Changes",
    },
    formState: {
      country: "Canada",
      firstName: "Joe",
      lastName: "Smith",
      errors: null,
      error: "",
    },
  },
  callbacks: {
    onSubmit: (e) => console.log(e),
    onChange: (e) => console.log(e),
  },
};

const noCountry: PortalProfileViewProps = {
  states: {
    success: false,
    loading: false,
    submitDisabled: false,
    showCountry: false,
    user: {
      id: "01",
      accountId: "111100000",
      firstName: "Joe",
      lastName: "Smith",
      email: "jsmith@gmail.com",
      countryCode: "5000",
    },
    text: {
      firstnametext: "First Name",
      lastnametext: "Last Name",
      emailtext: "Email",
      countrytext: "Country",
      editProfileHeader: "Edit your profile",
      editProfileSubHeader: "Personal Information",
      submitChangeButtonText: "Submit Changes",
    },
    formState: {
      country: "Canada",
      firstName: "Joe",
      lastName: "Smith",
      errors: null,
      error: "",
    },
  },
  callbacks: {
    onSubmit: (e) => console.log(e),
    onChange: (e) => console.log(e),
  },
};

const loadingProps: PortalProfileViewProps = {
  states: {
    success: false,
    loading: true,
    submitDisabled: false,
    showCountry: true,
    user: {
      id: "01",
      accountId: "111100000",
      firstName: "Joe",
      lastName: "Smith",
      email: "jsmith@gmail.com",
      countryCode: "5000",
    },
    text: {
      firstnametext: "First Name",
      lastnametext: "Last Name",
      emailtext: "Email",
      countrytext: "Country",
      editProfileHeader: "Edit your profile",
      editProfileSubHeader: "Personal Information",
      submitChangeButtonText: "Submit Changes",
    },
    formState: {
      country: "Canada",
      firstName: "Joe",
      lastName: "Smith",
      errors: null,
      error: "",
    },
  },
  callbacks: {
    onSubmit: (e) => console.log(e),
    onChange: (e) => console.log(e),
  },
};

const disabledProps: PortalProfileViewProps = {
  states: {
    success: false,
    loading: false,
    submitDisabled: true,
    showCountry: true,
    user: {
      id: "01",
      accountId: "111100000",
      firstName: "Joe",
      lastName: "Smith",
      email: "jsmith@gmail.com",
      countryCode: "5000",
    },
    text: {
      firstnametext: "First Name",
      lastnametext: "Last Name",
      emailtext: "Email",
      countrytext: "Country",
      editProfileHeader: "Edit your profile",
      editProfileSubHeader: "Personal Information",
      submitChangeButtonText: "Submit Changes",
    },
    formState: {
      country: "Canada",
      firstName: "Joe",
      lastName: "Smith",
      errors: null,
      error: "",
    },
  },
  callbacks: {
    onSubmit: (e) => console.log(e),
    onChange: (e) => console.log(e),
  },
};

const errorProps: PortalProfileViewProps = {
  states: {
    success: false,
    loading: false,
    submitDisabled: false,
    showCountry: true,
    user: {
      id: "01",
      accountId: "111100000",
      firstName: "Joe",
      lastName: "Smith",
      email: "jsmith@gmail.com",
      countryCode: "5000",
    },
    text: {
      firstnametext: "First Name",
      lastnametext: "Last Name",
      emailtext: "Email",
      countrytext: "Country",
      editProfileHeader: "Edit your profile",
      editProfileSubHeader: "Personal Information",
      submitChangeButtonText: "Submit Changes",
    },
    formState: {
      country: "Canada",
      firstName: "Joe",
      lastName: "Smith",
      errors: null,
      error: "Something went wrong. Please try again.",
    },
  },
  callbacks: {
    onSubmit: (e) => console.log(e),
    onChange: (e) => console.log(e),
  },
};

const successProps: PortalProfileViewProps = {
  states: {
    success: true,
    loading: false,
    submitDisabled: false,
    showCountry: true,
    user: {
      id: "01",
      accountId: "111100000",
      firstName: "Joe",
      lastName: "Smith",
      email: "jsmith@gmail.com",
      countryCode: "5000",
    },
    text: {
      firstnametext: "First Name",
      lastnametext: "Last Name",
      emailtext: "Email",
      countrytext: "Country",
      editProfileHeader: "Edit your profile",
      editProfileSubHeader: "Personal Information",
      submitChangeButtonText: "Submit Changes",
    },
    formState: {
      country: "Canada",
      firstName: "Joe",
      lastName: "Smith",
      errors: null,
      error: "",
    },
  },
  callbacks: {
    onSubmit: (e) => console.log(e),
    onChange: (e) => console.log(e),
  },
};

export const Default = () => <PortalProfileView {...defaultProps} />;

export const DefaultNoCountry = () => <PortalProfileView {...noCountry} />;

export const Loading = () => <PortalProfileView {...loadingProps} />;

export const Disabled = () => <PortalProfileView {...disabledProps} />;

export const Error = () => <PortalProfileView {...errorProps} />;

export const Success = () => <PortalProfileView {...successProps} />;
