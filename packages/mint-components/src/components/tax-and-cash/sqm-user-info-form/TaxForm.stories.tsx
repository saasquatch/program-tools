import { h } from "@stencil/core";
import {
  DocumentTypeFormView,
  DocumentTypeFormViewProps,
} from "../sqm-document-type-form/sqm-document-type-form-view";
import {
  DocusignFormView,
  DocusignFormViewProps,
} from "../sqm-docusign-form/sqm-docusign-form-view";
import {
  IndirectTaxFormView,
  IndirectTaxFormViewProps,
} from "../sqm-indirect-tax-form/sqm-indirect-tax-form-view";
import {
  TaxDocumentSubmittedProps,
  TaxDocumentSubmittedView,
} from "../sqm-tax-document-submitted/sqm-tax-document-submitted-view";
import {
  documentTypeFormText,
  userInfoText,
  indirectTaxFormText,
  docusignFormText,
  taxFormDocumentSubmittedText,
} from "./defaultTextCopy";
import {
  RegisteredInCanada,
  RegisteredInOtherRegion,
} from "./small-views/SlotViews.stories";
import {
  UserInfoFormViewProps,
  UserInfoFormView,
} from "./sqm-user-info-form-view";

export default {
  title: "Components/Tax Form",
};

const stepOneProps: UserInfoFormViewProps = {
  states: {
    loading: false,
    disabled: false,
    formState: {
      firstName: "Bob",
      lastName: "Testerson",
      email: "bobtesterson@example.com",
      countryCode: "US",
      currency: "CAD",
      allowBankingCollection: true,
      participantType: "individualParticipant",
    },
  },
  callbacks: {
    // TODO: fix type
    onSubmit: (props: any) => console.log("Submit"),
    // TODO: fix type
    onRadioClick: (props: any) => console.log("Radio Click"),
  },
  text: userInfoText,
  refs: {
    formRef: () => {},
  },
};

const stepTwoProps: IndirectTaxFormViewProps = {
  states: {
    loading: false,
    submitDisabled: false,
    formState: {
      checked: undefined,
    },
  },
  callbacks: {
    // TODO: fix type
    onSubmit: (props: any) => console.log("Submit"),
    // TODO: fix type
    onChange: (e) => console.log("Submit"),
    onBack: () => console.log("Submit"),
  },
  refs: { formRef: { current: null } },
  text: indirectTaxFormText,
};

const documentSubmittedActiveProps: TaxDocumentSubmittedProps = {
  states: {
    status: "ACTIVE",
    documentType: "W9",
    dateSubmitted: "Jan 18th, 2025",
    dateExpired: "Dec 18th, 2025",
  },
  callbacks: { onClick: () => console.log("Submit new Form") },
  text: {
    ...taxFormDocumentSubmittedText,
    taxDocumentSectionSubHeader: "W9 Tax Documents",
  },
};

const documentSubmittedNotVerifiedProps: TaxDocumentSubmittedProps = {
  states: {
    status: "NOT_VERIFIED",
    documentType: "W9",
    dateSubmitted: "Jan 18th, 2025",
  },
  callbacks: { onClick: () => console.log("Submit new Form") },
  text: {
    ...taxFormDocumentSubmittedText,
    badgeTextAwaitingReview: "Awaiting Review. Submitted on {dateSubmitted}.",
    taxDocumentSectionSubHeader: "W9 Tax Documents",
  },
};
const documentSubmittedNotActiveProps: TaxDocumentSubmittedProps = {
  states: {
    status: "NOT_ACTIVE",
    documentType: "W8-BEN-E",
    dateSubmitted: "Jan 18th, 2025",
  },
  callbacks: { onClick: () => console.log("Submit new Form") },
  text: {
    ...taxFormDocumentSubmittedText,
    taxAlertHeader:
      "Your W8-BEN-E tax form has personal information that doesn't match your profile",
    taxAlertMessage: "Please resubmit a new W8-BEN-E form.",
    taxDocumentSectionSubHeader: "W8-BEN-E Tax Documents",
    invalidForm:
      "Ensure your information matches your profile and resubmit a new document",
  },
};

const documentSubmittedExpiredProps: TaxDocumentSubmittedProps = {
  states: {
    status: "EXPIRED",
    documentType: "W8-BEN-E",
    dateSubmitted: "Jan 18th, 2025",
    dateExpired: "Dec 18th, 2025",
    expiresSoon: true,
  },
  callbacks: { onClick: () => console.log("Submit new Form") },
  text: {
    ...taxFormDocumentSubmittedText,
    badgeTextExpiredOn: "Expired On {dateExpired}.",
    taxAlertHeader: "Your W8-BEN-E tax form has expired.",
    taxAlertMessage: "Please resubmit a new W8-BEN-E form.",
    taxDocumentSectionSubHeader: "W8-BEN-E Tax Documents",
  },
};

const documentSubmittedExpiringSoonProps: TaxDocumentSubmittedProps = {
  states: {
    status: "ACTIVE",
    documentType: "W8-BEN-E",
    dateSubmitted: "Jan 18th, 2025",
    dateExpired: "Feb 18th, 2025",
    expiresSoon: true,
  },
  callbacks: { onClick: () => console.log("Submit new Form") },
  text: {
    ...taxFormDocumentSubmittedText,
    taxAlertHeader: "Your W8-BEN-E tax form expires on {dateExpired}",
    taxAlertMessage:
      "Please submit a new W8-BEN-E form to continue receiving your rewards",
    taxDocumentSectionSubHeader: "W8-BEN-E Tax Documents",
  },
};

const documentSubmittedLoadingProps: TaxDocumentSubmittedProps = {
  states: {
    status: "ACTIVE",
    documentType: "W8-BEN-E",
    dateSubmitted: "Jan 18th, 2025",
    loading: true,
  },
  callbacks: { onClick: () => console.log("Submit new Form") },
  text: {
    ...taxFormDocumentSubmittedText,
  },
};

const stepThreeAProps: DocusignFormViewProps = {
  states: {
    loading: false,
    submitDisabled: false,
    formState: {
      completedTaxForm: true,
    },
  },
  callbacks: {
    toggleFormSubmitted: () => console.log("Toggle checkbox"),
    onShowDocumentType: () => console.log("To other form"),
    onSubmit: (props: any) => console.log(props),
    onBack: () => console.log("Back"),
  },
  text: docusignFormText,
};

const stepThreeBProps: DocumentTypeFormViewProps = {
  states: {
    loading: false,
    submitDisabled: false,
    formState: {
      selectedTaxForm: undefined,
    },
  },
  callbacks: {
    onSubmit: (props: any) => console.log(props),
    onBack: () => console.log("Back"),
  },
  text: documentTypeFormText,
};

// STEP ONE
export const StepOne = () => {
  return <UserInfoFormView {...stepOneProps} />;
};

export const StepOneLoading = () => {
  return (
    <UserInfoFormView
      {...stepOneProps}
      states={{ ...stepOneProps.states, loading: true }}
    />
  );
};

export const StepOneDisabled = () => {
  return (
    <UserInfoFormView
      {...stepOneProps}
      states={{ ...stepOneProps.states, disabled: true }}
    />
  );
};

export const StepOneWithErrors = () => {
  return (
    <UserInfoFormView
      {...stepOneProps}
      states={{
        ...stepOneProps.states,
        formState: {
          ...stepOneProps.states.formState,
          errors: {
            firstName: true,
            lastName: true,
            email: true,
            countryCode: true,
            currency: true,
            participantType: true,
            allowBankingCollection: true,
          },
        },
      }}
    />
  );
};

export const StepOneWithGeneralError = () => {
  return (
    <UserInfoFormView
      {...stepOneProps}
      states={{
        ...stepOneProps.states,
        formState: {
          ...stepOneProps.states.formState,
          errors: {
            general: true,
          },
        },
      }}
    />
  );
};

// STEP TWO
export const StepTwo = () => {
  return <IndirectTaxFormView {...stepTwoProps} />;
};

export const StepTwoWithError = () => {
  return (
    <IndirectTaxFormView
      {...stepTwoProps}
      states={{
        ...stepTwoProps.states,
        formState: {
          ...stepTwoProps.states.formState,
          errors: {
            taxDetails: true,
          },
        },
      }}
    />
  );
};

export const StepTwoHSTChecked = () => {
  return (
    <IndirectTaxFormView
      {...stepTwoProps}
      states={{
        ...stepTwoProps.states,
        registeredInCanadaDetailsSlot: <RegisteredInCanada />,
        formState: {
          ...stepTwoProps.states.formState,
          checked: "hstCanada",
        },
      }}
    />
  );
};

export const StepTwoOtherRegionChecked = () => {
  return (
    <IndirectTaxFormView
      {...stepTwoProps}
      states={{
        ...stepTwoProps.states,
        registeredInDifferentCountryDetailsSlot: <RegisteredInOtherRegion />,
        formState: {
          ...stepTwoProps.states.formState,
          checked: "otherRegion",
        },
      }}
    />
  );
};

export const StepTwoNotRegisteredChecked = () => {
  return (
    <IndirectTaxFormView
      {...stepTwoProps}
      states={{
        ...stepTwoProps.states,
        formState: {
          ...stepTwoProps.states.formState,
          checked: "notRegistered",
        },
      }}
    />
  );
};

// STEP THREE
export const StepThreeWithDocusign = () => {
  return <DocusignFormView {...stepThreeAProps} />;
};

export const StepThreeWithFormSelector = () => {
  return <DocumentTypeFormView {...stepThreeBProps} />;
};

export const TaxDocumentSubmittedActive = () => {
  return <TaxDocumentSubmittedView {...documentSubmittedActiveProps} />;
};

export const TaxDocumentSubmittedNotVerified = () => {
  return <TaxDocumentSubmittedView {...documentSubmittedNotVerifiedProps} />;
};

export const TaxDocumentSubmittedNotActive = () => {
  return <TaxDocumentSubmittedView {...documentSubmittedNotActiveProps} />;
};

export const TaxDocumentSubmittedExpired = () => {
  return <TaxDocumentSubmittedView {...documentSubmittedExpiredProps} />;
};

export const TaxDocumentSubmittedExpiringSoon = () => {
  return <TaxDocumentSubmittedView {...documentSubmittedExpiringSoonProps} />;
};

export const TaxDocumentSubmittedLoading = () => {
  return <TaxDocumentSubmittedView {...documentSubmittedLoadingProps} />;
};
