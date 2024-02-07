import { h } from "@stencil/core";
import {
  documentTypeFormText,
  userInfoText,
  indirectTaxFormText,
  docusignFormText,
  taxFormDocumentSubmittedText,
} from "./defaultTextCopy";
import {
  UserInfoFormViewProps,
  UserInfoFormView,
} from "./sqm-user-info-form-view";
import { UseDocusignFormResult } from "../sqm-docusign-form/useDocusignForm";
import { DemoData, StoryDemoData } from "../../../global/demo";
import { UseDocumentTypeFormResult } from "../sqm-document-type-form/useDocumentTypeForm";
import { UseTaxDocumentSubmittedResult } from "../sqm-tax-document-submitted/useTaxDocumentSubmitted";
// import sqmUserInfoSpecs from "./sqm-tax-document-step-1.feature";
// import sqmIndirectTaxFormSpecs from "../sqm-indirect-tax-form/sqm-indirect-tax-form.feature";

export default {
  title: "Components/Tax Form",
};

const stepOneProps: UserInfoFormViewProps = {
  states: {
    loading: false,
    disabled: false,
    isPartner: false,

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
  data: {
    countries: [
      {
        countryCode: "CA",
        displayName: "Canada",
      },
    ],
    currencies: [
      {
        currencyCode: "CAD",
        displayName: "CAD",
      },
    ],
  },
  callbacks: {
    onSubmit: async () => console.log("Submit"),
    onRadioClick: () => console.log("Radio Click"),
  },
  text: userInfoText,
  refs: {
    formRef: () => {},
  },
};

const stepTwoProps = {
  states: {
    loading: false,
    disabled: false,
    isPartner: false,
    formState: {
      checked: undefined,
    },
    errors: {},
  },
  callbacks: {
    onSubmit: async () => console.log("Submit"),
    onChange: () => console.log("Submit"),
    onBack: () => console.log("Submit"),
  },
  refs: { formRef: { current: null } },
  // slots: {
  //   registeredInCanadaDetailsSlot: <div></div>,
  //   registeredInDifferentCountryDetailsSlot: <div></div>,
  // },
  text: indirectTaxFormText,
};

const documentSubmittedActiveProps: StoryDemoData<UseTaxDocumentSubmittedResult> =
  {
    states: {
      disabled: false,
      status: "ACTIVE",
      documentType: "W9",
      dateSubmitted: "Jan 18th, 2025",
      dateExpired: "Dec 18th, 2025",
    },
    callbacks: {
      onClick: () => console.log("Submit new Form"),
      onEditIndirectTax: () => console.log("Edit indirect tax"),
    },
  };

const docusignFormProps: StoryDemoData<UseDocusignFormResult> = {
  states: {
    documentType: "W9",
    loading: false,
    disabled: false,
    submitDisabled: false,
    formState: {
      errors: {},
      completedTaxForm: true,
      taxFormExpired: false,
    },
  },
  callbacks: {
    toggleFormSubmitted: () => console.log("Toggle checkbox"),
    onShowDocumentType: () => console.log("To other form"),
    onSubmit: async () => console.log("submit"),
    onBack: () => console.log("Back"),
  },
};

const documentTypeFormProps: StoryDemoData<UseDocumentTypeFormResult> = {
  states: {
    loading: false,
    disabled: false,
    formState: {
      errors: {},
      formSubmission: false,
      selectedTaxForm: undefined,
    },
  },
  callbacks: {
    onSubmit: async () => console.log("Submit"),
    onBack: () => console.log("Back"),
  },
};

// STEP ONE
export const StepOne = () => {
  return <UserInfoFormView {...stepOneProps} />;
};

export const StepOneLoading = () => {
  return (
    <sqm-user-info-form
      demoData={{
        states: { ...stepOneProps.states, loading: true },
      }}
    ></sqm-user-info-form>
  );
};

export const StepOneDisabled = () => {
  return (
    <sqm-user-info-form
      demoData={{
        states: { ...stepOneProps.states, disabled: true },
      }}
    ></sqm-user-info-form>
  );
};

export const StepOneIsPartner = () => {
  return (
    <sqm-user-info-form
      demoData={{
        states: { ...stepOneProps.states, disabled: true, isPartner: true },
      }}
    ></sqm-user-info-form>
  );
};

export const StepOneWithErrors = () => {
  return (
    <sqm-user-info-form
      demoData={{
        states: {
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
        },
      }}
    ></sqm-user-info-form>
  );
};

export const StepOneWithGeneralError = () => {
  return (
    <sqm-user-info-form
      demoData={{
        states: {
          ...stepOneProps.states,
          formState: {
            ...stepOneProps.states.formState,
            errors: {
              general: true,
            },
          },
        },
      }}
    ></sqm-user-info-form>
  );
};

// STEP TWO
// export const StepTwoWithError = () => {
//   return (
//     <IndirectTaxFormView
//       {...stepTwoProps}
//       states={{
//         ...stepTwoProps.states,
//         formState: {
//           ...stepTwoProps.states.formState,
//           errors: {
//             taxDetails: true,
//           },
//         },
//       }}
//     />
//   );
// };

export const StepTwoLoading = () => {
  return (
    <sqm-indirect-tax-form
      demoData={{
        states: {
          ...stepTwoProps.states,
          loading: true,
        },
      }}
    ></sqm-indirect-tax-form>
  );
};

export const StepTwoDisabled = () => {
  return (
    <sqm-indirect-tax-form
      demoData={{
        states: {
          ...stepTwoProps.states,
          disabled: true,
        },
      }}
    ></sqm-indirect-tax-form>
  );
};

export const StepTwoIsPartner = () => {
  return (
    <sqm-indirect-tax-form
      demoData={{
        states: {
          ...stepTwoProps.states,
          isPartner: true,
        },
      }}
    ></sqm-indirect-tax-form>
  );
};

export const StepTwoWithGeneralError = () => {
  return (
    <sqm-indirect-tax-form
      demoData={{
        states: {
          ...stepTwoProps.states,
          errors: {
            general: true,
          },
          formState: {
            ...stepTwoProps.states.formState,
          },
        },
      }}
    ></sqm-indirect-tax-form>
  );
};

export const StepTwoHSTChecked = () => {
  return (
    <sqm-indirect-tax-form
      demoData={{
        states: {
          ...stepTwoProps.states,
          formState: {
            ...stepTwoProps.states.formState,
            checked: "hstCanada",
          },
        },
      }}
    ></sqm-indirect-tax-form>
  );
};

export const StepTwoHSTCheckedWithInputErrors = () => {
  return (
    <sqm-indirect-tax-form
      demoData={{
        states: {
          ...stepTwoProps.states,
          formState: {
            ...stepTwoProps.states.formState,
            checked: "hstCanada",
          },
        },
        slotProps: {
          formState: {
            errors: {
              province: true,
              indirectTaxNumber: true,
            },
          },
        },
      }}
    ></sqm-indirect-tax-form>
  );
};

export const StepTwoOtherRegionChecked = () => {
  return (
    <sqm-indirect-tax-form
      demoData={{
        states: {
          ...stepTwoProps.states,
          formState: {
            ...stepTwoProps.states.formState,
            checked: "otherRegion",
          },
        },
      }}
    ></sqm-indirect-tax-form>
  );
};

export const StepTwoOtherRegionCheckedWithInputErrors = () => {
  return (
    <sqm-indirect-tax-form
      demoData={{
        states: {
          ...stepTwoProps.states,
          formState: {
            checked: "otherRegion",
          },
        },
        slotProps: {
          formState: {
            errors: {
              selectedRegion: true,
              vatNumber: true,
            },
          },
        },
      }}
    ></sqm-indirect-tax-form>
  );
};

export const StepTwoNotRegisteredChecked = () => {
  return (
    <sqm-indirect-tax-form
      demoData={{
        states: {
          ...stepTwoProps.states,
          formState: {
            ...stepTwoProps.states.formState,
            checked: "notRegistered",
          },
        },
      }}
    ></sqm-indirect-tax-form>
  );
};

// STEP THREE
export const StepThreeWithDocusign = () => {
  return (
    <sqm-docusign-form
      demoData={{
        states: {
          ...docusignFormProps.states,
        },
      }}
    >
      <div slot="docusign-iframe">Hey</div>
    </sqm-docusign-form>
  );
};

export const StepThreeDocusignWithGeneralError = () => {
  return (
    <sqm-docusign-form
      demoData={{
        states: {
          ...docusignFormProps.states,
          formState: {
            ...docusignFormProps.states.formState,
            errors: {
              general: true,
            },
          },
        },
      }}
    >
      <div slot="docusign-iframe">Hey</div>
    </sqm-docusign-form>
  );
};

export const StepThreeDocusignWithFormSubmissionError = () => {
  return (
    <sqm-docusign-form
      demoData={{
        states: {
          ...docusignFormProps.states,
          formState: {
            ...docusignFormProps.states.formState,
            completedTaxForm: false,
            errors: {
              formSubmission: true,
            },
          },
        },
      }}
    >
      <div slot="docusign-iframe">Hey</div>
    </sqm-docusign-form>
  );
};

export const StepThreeDocusignLoading = () => {
  return (
    <sqm-docusign-form
      demoData={{
        states: {
          ...docusignFormProps.states,
          loading: true,
        },
      }}
    >
      <div slot="docusign-iframe">Hey</div>
    </sqm-docusign-form>
  );
};

export const StepThreeDocusignDisabled = () => {
  return (
    <sqm-docusign-form
      demoData={{
        states: {
          ...docusignFormProps.states,
          disabled: true,
        },
      }}
    ></sqm-docusign-form>
  );
};

export const StepThreeWithFormSelector = () => {
  return (
    <sqm-document-type-form
      demoData={{
        states: {
          ...documentTypeFormProps.states,
        },
      }}
    ></sqm-document-type-form>
  );
};

export const StepThreeWithFormSelectorLoading = () => {
  return (
    <sqm-document-type-form
      demoData={{
        states: {
          ...documentTypeFormProps.states,
          loading: true,
        },
      }}
    ></sqm-document-type-form>
  );
};

export const StepThreeWithFormSelectorDisabled = () => {
  return (
    <sqm-document-type-form
      demoData={{
        states: {
          ...documentTypeFormProps.states,
          disabled: true,
        },
      }}
    ></sqm-document-type-form>
  );
};

export const StepThreeFormSelectorWithGeneralError = () => {
  return (
    <sqm-document-type-form
      demoData={{
        states: {
          ...documentTypeFormProps.states,
          formState: {
            ...documentTypeFormProps.states.formState,
            errors: {
              general: true,
            },
          },
        },
      }}
    ></sqm-document-type-form>
  );
};

export const TaxDocumentSubmittedActive = () => {
  return (
    <sqm-tax-document-submitted
      demoData={{
        states: {
          disabled: false,
          status: "ACTIVE",
          documentType: "W8-BEN",
          dateSubmitted: "Jan 18th, 2025",
          dateExpired: "Dec 18th, 2025",
          noFormNeeded: false,
          country: "United Kingdom",
          indirectTaxNumber: 123456,
        },
      }}
    ></sqm-tax-document-submitted>
  );
};

export const TaxDocumentSubmittedNotVerified = () => {
  return (
    <sqm-tax-document-submitted
      demoData={{
        states: {
          disabled: false,
          status: "NOT_VERIFIED",
          documentType: "W8-BEN",
          dateSubmitted: "Jan 18th, 2025",
          noFormNeeded: false,
          country: "United Kingdom",
          indirectTaxNumber: 123456,
        },
      }}
    ></sqm-tax-document-submitted>
  );
};

export const TaxDocumentSubmittedNotActive = () => {
  return (
    <sqm-tax-document-submitted
      demoData={{
        states: {
          disabled: false,
          status: "NOT_ACTIVE",
          documentType: "W8-BEN-E",
          dateSubmitted: "Jan 18th, 2025",
          noFormNeeded: false,
          indirectTaxNumber: 123456,
          country: "Slovania",
        },
      }}
    ></sqm-tax-document-submitted>
  );
};

export const TaxDocumentSubmittedExpired = () => {
  return (
    <sqm-tax-document-submitted
      demoData={{
        states: {
          disabled: false,
          status: "EXPIRED",
          documentType: "W8-BEN-E",
          dateSubmitted: "Jan 18th, 2025",
          dateExpired: "Dec 25th, 2025",
          noFormNeeded: false,
          indirectTaxNumber: 123456,
          country: "United Kingdom",
        },
      }}
    ></sqm-tax-document-submitted>
  );
};

export const TaxDocumentSubmittedExpiringSoon = () => {
  return (
    <sqm-tax-document-submitted
      demoData={{
        states: {
          disabled: false,
          status: "ACTIVE",
          documentType: "W8-BEN-E",
          dateSubmitted: "Jan 18th, 2025",
          dateExpired: "Feb 18th, 2025",
          expiresSoon: true,
          noFormNeeded: false,
          indirectTaxNumber: 123456,
          country: "Slovania",
        },
      }}
    ></sqm-tax-document-submitted>
  );
};

export const TaxDocumentSubmittedIndirectTaxCanada = () => {
  return (
    <sqm-tax-document-submitted
      demoData={{
        states: {
          status: "ACTIVE",
          disabled: false,
          documentType: "W8-BEN-E",
          dateSubmitted: "Jan 18th, 2025",
          dateExpired: "Dec 20, 2026",
          noFormNeeded: false,
          province: "Ontario",
          country: "Canada",
          isIndirectTaxCanada: true,
          indirectTaxNumber: 123456,
        },
      }}
    ></sqm-tax-document-submitted>
  );
};

export const TaxDocumentNoFormNeeded = () => {
  return (
    <sqm-tax-document-submitted
      demoData={{
        states: {
          disabled: false,
          documentType: "W9",
          dateSubmitted: "Jan 18th, 2025",
          noFormNeeded: true,
          province: "Ontario",
          country: "Canada",
          isIndirectTaxCanada: true,
          indirectTaxNumber: 123456,
        },
      }}
    ></sqm-tax-document-submitted>
  );
};

export const TaxDocumentSubmittedLoading = () => {
  return (
    <sqm-tax-document-submitted
      demoData={{
        states: {
          disabled: false,
          status: "ACTIVE",
          documentType: "W9",
          dateSubmitted: "Jan 18th, 2025",
          dateExpired: "Dec 18th, 2025",
          noFormNeeded: false,
          loading: true,
        },
      }}
    ></sqm-tax-document-submitted>
  );
};

export const TaxDocumentSubmittedWithGeneralError = () => {
  return (
    <sqm-tax-document-submitted
      demoData={{
        states: {
          disabled: false,
          status: "ACTIVE",
          documentType: "W9",
          dateSubmitted: "Jan 18th, 2025",
          dateExpired: "Dec 18th, 2025",
          noFormNeeded: false,
          indirectTaxNumber: 123456,
          country: "Slovania",
          errors: {
            general: true,
          },
        },
      }}
    ></sqm-tax-document-submitted>
  );
};

export const TaxDocumentSubmittedDisabled = () => {
  return (
    <sqm-tax-document-submitted
      demoData={{
        states: {
          disabled: true,
          status: "NOT_ACTIVE",
          documentType: "W8-BEN",
          dateSubmitted: "Jan 18th, 2025",
          noFormNeeded: false,
        },
      }}
    ></sqm-tax-document-submitted>
  );
};
