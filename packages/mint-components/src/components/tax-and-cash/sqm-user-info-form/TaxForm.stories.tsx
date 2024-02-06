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
  RegisteredInCanadaWithErrors,
  RegisteredInOtherRegion,
  RegisteredInOtherRegionWithErrors,
} from "./small-views/SlotViews.stories";
import {
  UserInfoFormViewProps,
  UserInfoFormView,
} from "./sqm-user-info-form-view";
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
    // TODO: fix type
    // @ts-ignore
    onSubmit: async (props: any) => console.log("Submit"),
    // TODO: fix type
    // @ts-ignore
    onRadioClick: (props: any) => console.log("Radio Click"),
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
  },
  callbacks: {
    // TODO: fix type
    // @ts-ignore
    onSubmit: async (props: any) => console.log("Submit"),
    // TODO: fix type
    // @ts-ignore
    onChange: (e) => console.log("Submit"),
    onBack: () => console.log("Submit"),
  },
  refs: { formRef: { current: null } },
  slots: {
    registeredInCanadaDetailsSlot: <div></div>,
    registeredInDifferentCountryDetailsSlot: <div></div>,
  },
  text: indirectTaxFormText,
};

const documentSubmittedActiveProps: TaxDocumentSubmittedProps = {
  states: {
    disabled: false,
    status: "ACTIVE",
    documentType: "W9",
    dateSubmitted: "Jan 18th, 2025",
    dateExpired: "Dec 18th, 2025",
  },
  callbacks: { onClick: () => console.log("Submit new Form") },
  text: {
    ...taxFormDocumentSubmittedText,
  },
};

const docusignFormProps: DocusignFormViewProps = {
  states: {
    documentType: "W9",
    loading: false,
    disabled: false,
    submitDisabled: false,
    formState: {
      completedTaxForm: true,
      taxFormExpired: false,
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

const documentTypeFormProps: DocumentTypeFormViewProps = {
  states: {
    loading: false,
    disabled: false,
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
          formState: {
            ...stepTwoProps.states.formState,
            errors: {
              general: true,
            },
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
        slots: {
          registeredInCanadaDetailsSlot: <RegisteredInCanada />,
        },
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
        slots: {
          registeredInCanadaDetailsSlot: <RegisteredInCanadaWithErrors />,
          registeredInDifferentCountryDetailsSlot: <RegisteredInOtherRegion />,
        },
        states: {
          ...stepTwoProps.states,
          formState: {
            ...stepTwoProps.states.formState,
            checked: "hstCanada",
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
        slots: {
          registeredInDifferentCountryDetailsSlot: (
            <RegisteredInOtherRegionWithErrors />
          ),
        },
        states: {
          ...stepTwoProps.states,
          formState: {
            ...stepTwoProps.states.formState,
            checked: "otherRegion",
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
  // @ts-ignore TODO: fix this
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
    // <DocusignFormView {...docusignFormProps}>
    //   <div slot="docusign-iframe">Hey</div>
    // </DocusignFormView>
  );
};

export const StepThreeDocusignWithGeneralError = () => {
  // @ts-ignore TODO: fix this
  return (
    <DocusignFormView
      {...docusignFormProps}
      states={{
        ...docusignFormProps.states,
        formState: {
          ...docusignFormProps.states.formState,
          errors: {
            general: true,
          },
        },
      }}
    />
  );
};

export const StepThreeDocusignWithFormSubmissionError = () => {
  // @ts-ignore TODO: fix this
  return (
    <DocusignFormView
      {...docusignFormProps}
      states={{
        ...docusignFormProps.states,
        formState: {
          ...docusignFormProps.states.formState,
          completedTaxForm: false,
          errors: {
            formSubmission: true,
          },
        },
      }}
    />
  );
};

export const StepThreeDocusignLoading = () => {
  // @ts-ignore TODO: fix this
  return (
    <DocusignFormView
      {...docusignFormProps}
      states={{
        ...docusignFormProps.states,
        loading: true,
      }}
    />
  );
};

export const StepThreeDocusignDisabled = () => {
  // @ts-ignore TODO: fix this
  return (
    <DocusignFormView
      {...docusignFormProps}
      states={{
        ...docusignFormProps.states,
        disabled: true,
      }}
    />
  );
};

export const StepThreeDocusignTimeExpired = () => {
  // @ts-ignore TODO: fix this
  return (
    <DocusignFormView
      {...docusignFormProps}
      states={{
        ...docusignFormProps.states,
        formState: {
          ...docusignFormProps.states.formState,
          taxFormExpired: true,
        },
      }}
    />
  );
};

export const StepThreeWithFormSelector = () => {
  return <DocumentTypeFormView {...documentTypeFormProps} />;
};

export const StepThreeWithFormSelectorLoading = () => {
  return (
    <DocumentTypeFormView
      {...documentTypeFormProps}
      states={{
        ...documentTypeFormProps.states,
        loading: true,
      }}
    />
  );
};

export const StepThreeWithFormSelectorDisabled = () => {
  return (
    <DocumentTypeFormView
      {...documentTypeFormProps}
      states={{
        ...documentTypeFormProps.states,
        disabled: true,
      }}
    />
  );
};

export const StepThreeFormSelectorWithGeneralError = () => {
  return (
    <DocumentTypeFormView
      {...documentTypeFormProps}
      states={{
        ...documentTypeFormProps.states,
        formState: {
          ...documentTypeFormProps.states.formState,
          errors: {
            general: true,
          },
        },
      }}
    />
  );
};

export const TaxDocumentSubmittedActive = () => {
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
          status: "NOT_ACTIVE",
          documentType: "W8-BEN",
          dateSubmitted: "Jan 18th, 2025",
          noFormNeeded: false,
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
          documentType: "W8-BEN-E",
          dateSubmitted: "Jan 18th, 2025",
          noFormNeeded: true,
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

export const TaxDocumentNoFormNeededLoading = () => {
  return (
    <sqm-tax-document-submitted
      demoData={{
        states: {
          disabled: false,
          documentType: undefined,
          noFormNeeded: true,
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
    <TaxDocumentSubmittedView
      {...documentSubmittedActiveProps}
      states={{
        ...documentSubmittedActiveProps.states,
        disabled: true,
      }}
    />
  );
};
