import { h } from "@stencil/core";
import {
  TaxFormStepOneView,
  TaxFormStepOneProps,
} from "./sqm-tax-form-step-1-view";
import {
  TaxFormStepTwoProps,
  TaxFormStepTwoView,
} from "./sqm-tax-form-step-2-view";
import {
  TaxDocumentSubmittedProps,
  TaxDocumentSubmittedView,
} from "./sqm-tax-document-submitted-view";
import {
  DocusignWrapper,
  RegisteredInCanada,
  RegisteredInOtherRegion,
  TaxFormSelection,
} from "./small-views/SlotViews.stories";
import {
  taxFormStepOneText,
  taxFormStepThreeText,
  taxFormStepTwoText,
} from "./defaultTextCopy";
import {
  TaxFormStepThreeView,
  TaxFormStepThreeViewProps,
} from "./sqm-tax-form-step-3-view";

export default {
  title: "Components/Tax Form",
};

const stepOneProps: TaxFormStepOneProps = {
  states: {
    loading: false,
    submitDisabled: false,
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
    onSubmit: (props: any) => console.log("Submit"),
  },
  text: taxFormStepOneText,
  refs: {
    formRef: () => {},
  },
};

const stepTwoProps: TaxFormStepTwoProps = {
  states: {
    loading: false,
    submitDisabled: false,
    formState: {
      checked: undefined,
    },
  },
  callbacks: {
    onSubmit: (props: any) => console.log("Submit"),
    onChange: (e) => console.log("Submit"),
    onBack: () => console.log("Submit"),
  },
  refs: { formRef: { current: null } },
  text: taxFormStepTwoText,
};

const documentSubmittedActiveProps: TaxDocumentSubmittedProps = {
  states: {
    status: "ACTIVE",
    documentType: "W9",
    dateSubmitted: "Jan 18th, 2025",
  },
  callbacks: { onClick: () => console.log("Submit new Form") },
  text: {
    statusTextActive: "Active",
    badgeTextSubmittedOn: "Submitted On",
    bankingInformationSectionHeader: "Banking Information",
    taxDocumentSectionHeader: "Tax Documents",
    taxAlertHeader:
      "Your W9 tax form has personal information that doesn't match your profile",
    taxAlertMessage: "Please resubmit a new W9 form.",
    taxDocumentSectionSubHeader: "W9 Tax Documents",
    newFormButton: "Submit New Form",
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
    statusTextNotVerified: "Not Verified",
    badgeTextAwaitingReview: "Awaiting Review. Submitted On",
    bankingInformationSectionHeader: "Banking Information",
    taxDocumentSectionHeader: "Tax Documents",
    taxDocumentSectionSubHeader: "W9 Tax Documents",
    newFormButton: "Submit New Form",
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
    statusTextNotActive: "Not Active",
    badgeTextSubmittedOn: "Submitted On",
    bankingInformationSectionHeader: "Banking Information",
    taxDocumentSectionHeader: "Tax Documents",
    taxAlertHeader:
      "Your W8-BEN-E tax form has personal information that doesn't match your profile",
    taxAlertMessage: "Please resubmit a new W8-BEN-E form.",
    taxDocumentSectionSubHeader: "W8-BEN-E Tax Documents",
    newFormButton: "Submit New Form",
  },
};

const documentSubmittedExpiredProps: TaxDocumentSubmittedProps = {
  states: {
    status: "EXPIRED",
    documentType: "W8-BEN-E",
    dateSubmitted: "Jan 18th, 2025",
  },
  callbacks: { onClick: () => console.log("Submit new Form") },
  text: {
    statusTextExpired: "Expired",
    badgeTextSubmittedOn: "Expired On",
    bankingInformationSectionHeader: "Banking Information",
    taxDocumentSectionHeader: "Tax Documents",
    taxAlertHeader: "Your W8-BEN-E tax form has expired. ",
    taxAlertMessage: "Please resubmit a new W8-BEN-E form.",
    taxDocumentSectionSubHeader: "W8-BEN-E Tax Documents",
    newFormButton: "Submit New Form",
  },
};

const stepThreeProps: TaxFormStepThreeViewProps = {
  states: {
    loading: false,
    submitDisabled: false,
    formState: {
      formSubmisson: false,
    },
    formSlot: <DocusignWrapper />,
  },
  callbacks: {
    onSubmit: (props: any) => console.log(props),
    onBack: () => console.log("Back"),
  },
  text: taxFormStepThreeText,
};

// STEP ONE
export const StepOne = () => {
  return <TaxFormStepOneView {...stepOneProps} />;
};

export const StepOneLoading = () => {
  return (
    <TaxFormStepOneView
      {...stepOneProps}
      states={{ ...stepOneProps.states, loading: true }}
    />
  );
};

export const StepOneDisabled = () => {
  return (
    <TaxFormStepOneView
      {...stepOneProps}
      states={{ ...stepOneProps.states, submitDisabled: true }}
    />
  );
};

export const StepOneWithErrors = () => {
  return (
    <TaxFormStepOneView
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

// STEP TWO
export const StepTwo = () => {
  return <TaxFormStepTwoView {...stepTwoProps} />;
};

export const StepTwoWithError = () => {
  return (
    <TaxFormStepTwoView
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
    <TaxFormStepTwoView
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
    <TaxFormStepTwoView
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
    <TaxFormStepTwoView
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
  return <TaxFormStepThreeView {...stepThreeProps} />;
};

export const StepThreeWithFormSelector = () => {
  return (
    <TaxFormStepThreeView
      {...stepThreeProps}
      states={{
        ...stepThreeProps.states,
        formSlot: <TaxFormSelection />,
      }}
    />
  );
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
