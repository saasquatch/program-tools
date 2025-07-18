import { h } from "@stencil/core";
import { StoryDemoData } from "../../global/demo";
import { BankingInfoFormViewProps } from "./sqm-banking-info-form/sqm-banking-info-form-view";
import { DocusignStatus } from "./sqm-docusign-form/docusign-iframe/DocusignIframe";
import {
  ParticipantType,
  UseDocusignFormResult,
} from "./sqm-docusign-form/useDocusignForm";
import { UseIndirectTaxFormResult } from "./sqm-indirect-tax-form/useIndirectTaxForm";
import { TaxAndCashDashboardProps } from "./sqm-tax-and-cash-dashboard/sqm-tax-and-cash-dashboard-view";
import { ErrorView } from "./sqm-tax-and-cash/ErrorView";
import LoadingView from "./sqm-tax-and-cash/LoadingView";
import { UseUserInfoFormResult } from "./sqm-user-info-form/useUserInfoForm";
import {
  INDIRECT_TAX_PROVINCES,
  INDIRECT_TAX_SPAIN_REGIONS,
} from "./subregions";
import { taxTypeToName } from "./utils";

export default {
  title: "Components/Tax Form",
};

const stepOneProps: StoryDemoData<UseUserInfoFormResult> = {
  states: {
    step: "1",
    hideSteps: false,
    hideState: false,
    loading: false,
    disabled: false,
    isPartner: false,
    isUser: false,
    loadingError: false,
    formState: {
      firstName: "Bob",
      lastName: "Testerson",
      email: "bobtesterson@example.com",
      phoneNumberCountryCode: "US",
      phoneNumber: "555 555 5555",
      countryCode: "US",
      currency: "CAD",
      address: "2/1337 Johnson Street",
      city: "Vancouver",
      state: "BC",
      postalCode: "555 555",
      errors: {},
    },
  },
  data: {
    regionLabelEnum: "STATE",
    regions: [],
    phoneCountries: [
      {
        countryCode: "CA",
        displayName: "Canada",
      },
    ],
    countries: [
      {
        countryCode: "CA",
        displayName: "Canada",
      },
      {
        countryCode: "ES",
        displayName: "Spain",
      },
      {
        countryCode: "UK",
        displayName: "United Kingdom",
      },
      {
        countryCode: "US",
        displayName: "United States",
      },
      {
        countryCode: "AR",
        displayName: "Argentina",
      },
      {
        countryCode: "AU",
        displayName: "Australia",
      },
      {
        countryCode: "ZW",
        displayName: "Zimbabwe",
      },
    ],
    currencies: [
      {
        currencyCode: "CAD",
        displayName: "CAD",
      },
      {
        currencyCode: "GBP",
        displayName: "GBP",
      },
      {
        currencyCode: "USD",
        displayName: "USD",
      },
    ],
    allCountries: [
      {
        countryCode: "CA",
        displayName: "Canada",
      },
      {
        countryCode: "ES",
        displayName: "Spain",
      },
      {
        countryCode: "UK",
        displayName: "United Kingdom",
      },
      {
        countryCode: "US",
        displayName: "United States",
      },
    ],
    allCurrencies: [
      {
        currencyCode: "CAD",
        displayName: "CAD",
      },
      {
        currencyCode: "GBP",
        displayName: "GBP",
      },
      {
        currencyCode: "USD",
        displayName: "USD",
      },
    ],
  },
  refs: {
    formRef: { current: null },
    currencyRef: { current: null },
    phoneCountryRef: { current: null },
  },
};

const stepTwoProps: StoryDemoData<UseIndirectTaxFormResult> = {
  states: {
    step: "2",
    hideSteps: false,
    disabled: false,
    loading: false,
    isPartner: false,
    loadingError: false,
    formState: {
      checked: undefined,
      errors: {},
    },
  },
  callbacks: {
    onSubmit: async () => console.log("Submit"),
    onChange: () => console.log("Submit"),
    onBack: () => console.log("Submit"),
    onFormChange: (field: string, e: CustomEvent) => console.log(field, e),
    onQstToggle: () => {},
    onSpainToggle: () => {},
    setCountrySearch: (c) => console.log(c),
  },
  data: {
    esRegions: INDIRECT_TAX_SPAIN_REGIONS,
    countries: [
      {
        countryCode: "CA",
        displayName: "Canada",
      },
      {
        countryCode: "ES",
        displayName: "Spain",
      },
      {
        countryCode: "UK",
        displayName: "United Kingdom",
      },
      {
        countryCode: "US",
        displayName: "United States",
      },
    ],
    allCountries: [
      {
        countryCode: "CA",
        displayName: "Canada",
      },
      {
        countryCode: "ES",
        displayName: "Spain",
      },
      {
        countryCode: "UK",
        displayName: "United Kingdom",
      },
      {
        countryCode: "US",
        displayName: "United States",
      },
    ],
    provinces: INDIRECT_TAX_PROVINCES,
  },
  slotProps: {
    formState: {
      errors: {},
    },
  },
  refs: { formRef: { current: null } },
};

const stepFourProps: StoryDemoData<BankingInfoFormViewProps> = {
  states: {
    showVerification: false,
    step: "4",
    hideSteps: false,
    disabled: false,
    loading: false,
    hasPayPal: false,
    isPartner: false,
    hideBackButton: false,
    saveDisabled: false,
    thresholds: [],
    loadingError: false,
    email: "test@example.com",
    formState: {
      paymentMethodChecked: "toBankAccount",
    },
    showModal: false,
  },
  callbacks: {
    onVerificationHide: () => {},
    onVerification: () => {},
    onSubmit: async () => console.log("Submit"),
    setPaymentMethodChecked: () => {},
    setPaymentScheduleChecked: () => {},
    onBack: async () => console.log("back"),
    setCountrySearch: () => {},
    onModalOpen: () => {},
    onModalClose: () => {},
  },
  refs: { formRef: { current: null } },
};

const docusignFormProps: StoryDemoData<UseDocusignFormResult> = {
  states: {
    showExitButton: true,
    step: "3",
    urlLoading: false,
    docusignStatus: undefined,
    hideSteps: false,
    documentType: "W9" as const,
    documentTypeString: "W9",
    loading: false,
    disabled: false,
    participantTypeDisabled: false,
    loadingError: false,
    formState: {
      participantType: "individualParticipant" as ParticipantType,
      errors: {},
      taxFormExpired: false,
    },
    showModal: false,
  },
  callbacks: {
    onExit: () => {},
    completeDocument: async () => {},
    setParticipantType: (p) => console.log({ p }),
    setDocusignStatus: (status: DocusignStatus) => console.log(status),
    onModalOpen: () => {},
    onModalClose: () => {},
  },
};

const dashboardProps: StoryDemoData<TaxAndCashDashboardProps> = {
  states: {
    veriffLoading: false,
    payoutStatus: "DONE",
    canEditPayoutInfo: true,
    disabled: false,
    status: "ACTIVE",
    documentType: "W9",
    documentTypeString: taxTypeToName("W9"),
    dateSubmitted: "Jan 18th, 2025",
    noFormNeeded: false,
    country: "United Kingdom",
    indirectTaxNumber: "123456",
    indirectTaxType: "VAT",
    showNewFormDialog: false,
    hasHold: false,
  },
  slots: {
    payoutDetailsCardSlot: (
      <sqm-payout-details-card
        demoData={{
          states: {
            badgeStatus: "nextPayout",
          },
        }}
      ></sqm-payout-details-card>
    ),
  },
};

export const GeneralLoadingView = () => {
  return <LoadingView />;
};

export const GeneralErrorView = () => {
  return (
    <sqm-form-message type="error">
      <p part="alert-title">There was a problem loading your form</p>
      <p part="alert-description">
        Please refresh the page and try again. If this problem continues,
        contact our support team.
      </p>
    </sqm-form-message>
  );
};

// STEP ONE
export const StepOne = () => {
  return <sqm-user-info-form demoData={stepOneProps} />;
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

export const StepOneIsUser = () => {
  return (
    <sqm-user-info-form
      demoData={{
        states: { ...stepOneProps.states, isUser: true },
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

export const StepOneWithLoadingError = () => {
  return (
    <sqm-user-info-form
      demoData={{
        states: {
          ...stepOneProps.states,
          loadingError: true,
          loading: true,
          formState: {
            ...stepOneProps.states.formState,
          },
        },
      }}
    ></sqm-user-info-form>
  );
};

// STEP TWO
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

export const StepTwoLoadingError = () => {
  return (
    <sqm-indirect-tax-form
      demoData={{
        states: {
          ...stepTwoProps.states,
          loading: true,
          loadingError: true,
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
        slotProps: {
          formState: {
            selectedRegion: "UK",
            indirectTaxNumber: "123456",
            errors: {},
          },
        },
      }}
    ></sqm-indirect-tax-form>
  );
};

export const StepTwoOtherRegionCheckedCanada = () => {
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
        slotProps: {
          formState: {
            selectedRegion: "CA",
            province: "BRITISHCOLUMBIA",
            indirectTaxNumber: "123456",
            errors: {},
          },
        },
      }}
    ></sqm-indirect-tax-form>
  );
};

export const StepTwoOtherRegionCheckedCanadaGST = () => {
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
        slotProps: {
          formState: {
            selectedRegion: "CA",
            province: "QUEBEC",
            indirectTaxNumber: "123456",
            errors: {},
          },
        },
      }}
    ></sqm-indirect-tax-form>
  );
};

export const StepTwoOtherRegionCheckedCanadaGSTAndQST = () => {
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
        slotProps: {
          formState: {
            selectedRegion: "CA",
            province: "QUEBEC",
            qstNumber: "654321",
            hasQst: true,
            errors: {},
          },
        },
      }}
    ></sqm-indirect-tax-form>
  );
};

export const StepTwoOtherRegionCheckedOtherCountrySubRegion = () => {
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
        slotProps: {
          formState: {
            selectedRegion: "ES",
            subRegion: "CANARYISLANDS",
            errors: {},
          },
        },
      }}
    ></sqm-indirect-tax-form>
  );
};

export const StepTwoOtherRegionCheckedOtherCountrySubRegionIncomeTax = () => {
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
        slotProps: {
          formState: {
            selectedRegion: "ES",
            subRegion: "CANARYISLANDS",
            hasSubRegionTaxNumber: true,
            subRegionTaxNumber: "654321",
            errors: {},
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
            errors: {},
          },
        },
        slotProps: {
          formState: {
            province: "",
            selectedRegion: "GB",
            errors: {
              selectedRegion: true,
              indirectTaxNumber: true,
            },
          },
        },
      }}
    ></sqm-indirect-tax-form>
  );
};

export const StepTwoOtherRegionCheckedCanadaWithProvinceError = () => {
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
        slotProps: {
          formState: {
            selectedRegion: "CA",
            province: "BC",
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

export const StepTwoOtherRegionCheckedCanadaGSTAndQSTError = () => {
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
        slotProps: {
          formState: {
            selectedRegion: "CA",
            province: "QUEBEC",
            hasQst: true,
            errors: {
              province: true,
              indirectTaxNumber: true,
              qstNumber: true,
            },
          },
        },
      }}
    ></sqm-indirect-tax-form>
  );
};

export const StepTwoOtherRegionCheckedOtherCountrySubRegionErrors = () => {
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
        slotProps: {
          formState: {
            selectedRegion: "ES",
            hasSubRegionTaxNumber: true,
            errors: {
              indirectTaxNumber: true,
              subRegionTaxNumberError: true,
              subRegion: true,
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
          documentType: "W9",
          documentTypeString: taxTypeToName("W9"),
          ...docusignFormProps.states,
        },
      }}
    ></sqm-docusign-form>
  );
};

export const StepThreeWithDocusignW8BEN = () => {
  return (
    <sqm-docusign-form
      demoData={{
        states: {
          ...docusignFormProps.states,
          documentType: "W8BEN",
          documentTypeString: taxTypeToName("W8BEN"),
        },
      }}
    ></sqm-docusign-form>
  );
};

export const StepThreeWithDocusignW8BENE = () => {
  return (
    <sqm-docusign-form
      demoData={{
        states: {
          ...docusignFormProps.states,
          documentType: "W8BENE",
          documentTypeString: taxTypeToName("W8BENE"),
          formState: {
            taxFormExpired: false,
            participantType: "businessEntity",
            errors: {
              participantType: "",
              general: false,
            },
          },
        },
      }}
    ></sqm-docusign-form>
  );
};

export const StepThreeWithDocusignExpired = () => {
  return (
    <sqm-docusign-form
      demoData={{
        states: {
          ...docusignFormProps.states,
          docusignStatus: "ttl_expired",
          formState: {
            participantType: "individualParticipant" as ParticipantType,
            taxFormExpired: true,
            errors: {},
          },
        },
      }}
    ></sqm-docusign-form>
  );
};

export const StepThreeWithDocusignCompleted = () => {
  return (
    <sqm-docusign-form
      demoData={{
        states: {
          ...docusignFormProps.states,
          docusignStatus: "signing_complete",
          formState: {
            participantType: "individualParticipant" as ParticipantType,
            taxFormExpired: false,
            errors: {},
          },
        },
      }}
    ></sqm-docusign-form>
  );
};

export const StepThreeDocusignWithError = () => {
  return (
    <sqm-docusign-form
      demoData={{
        states: {
          ...docusignFormProps.states,
          docusignStatus: "exception",
          formState: {
            ...docusignFormProps.states.formState,
            errors: {
              formSubmission: true,
            },
          },
        },
      }}
    ></sqm-docusign-form>
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
    ></sqm-docusign-form>
  );
};

export const StepThreeDocusignWithLoadingError = () => {
  return (
    <sqm-docusign-form
      demoData={{
        states: {
          ...docusignFormProps.states,
          loadingError: true,
          formState: {
            ...docusignFormProps.states.formState,
          },
        },
      }}
    ></sqm-docusign-form>
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
    ></sqm-docusign-form>
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

export const StepThreeWithDocusignModalOpen = () => {
  return (
    <sqm-docusign-form
      demoData={{
        states: {
          documentType: "W9",
          documentTypeString: taxTypeToName("W9"),
          ...docusignFormProps.states,
          showModal: true,
        },
      }}
    ></sqm-docusign-form>
  );
};

// STEP 4
export const StepFourDefault = () => {
  return <sqm-banking-info-form></sqm-banking-info-form>;
};

export const StepFourIsPartner = () => {
  return (
    <sqm-banking-info-form
      demoData={{
        ...stepFourProps,
        states: {
          ...stepFourProps.states,
          isPartner: true,
          formState: {
            ...stepFourProps.states.formState,
          },
        },
      }}
    ></sqm-banking-info-form>
  );
};

export const StepFourDirectToBankChecked = () => {
  return (
    <sqm-banking-info-form
      demoData={{
        ...stepFourProps,
        states: {
          ...stepFourProps.states,
          formState: {
            ...stepFourProps.states.formState,
          },
        },
      }}
    ></sqm-banking-info-form>
  );
};

export const StepFourToPaypalChecked = () => {
  return (
    <sqm-banking-info-form
      demoData={{
        ...stepFourProps,
        states: {
          ...stepFourProps.states,
          formState: {
            ...stepFourProps.states.formState,
            paymentMethodChecked: "toPayPalAccount",
          },
        },
      }}
    ></sqm-banking-info-form>
  );
};

export const StepFourReVerifyEmail = () => {
  return (
    <sqm-banking-info-form
      demoData={{
        ...stepFourProps,
        states: {
          ...stepFourProps.states,
          showVerification: true,
          isPartner: true,
          formState: {
            ...stepFourProps.states.formState,
            paymentMethodChecked: "toPayPalAccount",
          },
        },
      }}
    ></sqm-banking-info-form>
  );
};

export const TaxAndCashDashboardActiveW9Form = () => {
  return (
    <sqm-tax-and-cash-dashboard
      demoData={{
        ...dashboardProps,
      }}
    ></sqm-tax-and-cash-dashboard>
  );
};

export const TaxAndCashDashboardActiveW8BENForm = () => {
  return (
    <sqm-tax-and-cash-dashboard
      demoData={{
        ...dashboardProps,
        states: {
          payoutStatus: "DONE",
          veriffLoading: false,
          noFormNeeded: false,
          canEditPayoutInfo: true,
          documentType: "W8BEN",
          documentTypeString: taxTypeToName("W8BEN"),
          country: "United Kingdom",
          indirectTaxType: "VAT",
          indirectTaxNumber: "123456",
          showNewFormDialog: false,
          hasHold: false,
        },
      }}
    ></sqm-tax-and-cash-dashboard>
  );
};

export const TaxAndCashDashboardActiveW8BENEForm = () => {
  return (
    <sqm-tax-and-cash-dashboard
      demoData={{
        ...dashboardProps,
        states: {
          payoutStatus: "DONE",
          veriffLoading: false,
          noFormNeeded: false,
          canEditPayoutInfo: true,
          documentType: "W8BENE",
          documentTypeString: taxTypeToName("W8BENE"),
          country: "United Kingdom",
          indirectTaxType: "VAT",
          indirectTaxNumber: "123456",
          showNewFormDialog: false,
          hasHold: false,
        },
      }}
    ></sqm-tax-and-cash-dashboard>
  );
};

export const TaxAndCashDashboardNotActiveW9Form = () => {
  return (
    <sqm-tax-and-cash-dashboard
      demoData={{
        ...dashboardProps,
        states: {
          payoutStatus: "DONE",
          veriffLoading: false,
          noFormNeeded: false,
          canEditPayoutInfo: true,
          status: "INACTIVE",
          documentType: "W9",
          documentTypeString: taxTypeToName("W9"),
          country: "United Kingdom",
          indirectTaxType: "VAT",
          indirectTaxNumber: "123456",
          showNewFormDialog: false,
          hasHold: false,
        },
      }}
    ></sqm-tax-and-cash-dashboard>
  );
};
export const TaxAndCashDashboardNotVerifiedW9Form = () => {
  return (
    <sqm-tax-and-cash-dashboard
      demoData={{
        ...dashboardProps,
        states: {
          payoutStatus: "DONE",
          canEditPayoutInfo: true,
          disabled: false,
          status: "NOT_VERIFIED",
          documentType: "W9",
          documentTypeString: taxTypeToName("W9"),
          noFormNeeded: false,
          country: "United States",
          indirectTaxType: "VAT",
          indirectTaxNumber: "123456",
          showNewFormDialog: false,
          hasHold: false,
          veriffLoading: false,
        },
      }}
    ></sqm-tax-and-cash-dashboard>
  );
};

export const TaxAndCashDashboardNotVerifiedW8BENForm = () => {
  return (
    <sqm-tax-and-cash-dashboard
      demoData={{
        ...dashboardProps,
        states: {
          payoutStatus: "DONE",
          veriffLoading: false,
          canEditPayoutInfo: true,
          disabled: false,
          status: "NOT_VERIFIED",
          documentType: "W8BEN",
          documentTypeString: taxTypeToName("W8BEN"),
          dateSubmitted: "Jan 18th, 2025",
          noFormNeeded: false,
          country: "United Kingdom",
          indirectTaxType: "VAT",
          indirectTaxNumber: "123456",
          showNewFormDialog: false,
          hasHold: false,
        },
      }}
    ></sqm-tax-and-cash-dashboard>
  );
};

export const TaxAndCashDashboardNotVerifiedW8BENEForm = () => {
  return (
    <sqm-tax-and-cash-dashboard
      demoData={{
        ...dashboardProps,
        states: {
          payoutStatus: "DONE",
          veriffLoading: false,
          canEditPayoutInfo: true,
          disabled: false,
          status: "NOT_VERIFIED",
          documentType: "W8BENE",
          documentTypeString: taxTypeToName("W8BENE"),
          dateSubmitted: "Jan 18th, 2025",
          noFormNeeded: false,
          country: "United Kingdom",
          indirectTaxType: "VAT",
          indirectTaxNumber: "123456",
          showNewFormDialog: false,
          hasHold: false,
        },
      }}
    ></sqm-tax-and-cash-dashboard>
  );
};

export const TaxAndCashDashboardNotActiveW8BENEForm = () => {
  return (
    <sqm-tax-and-cash-dashboard
      demoData={{
        ...dashboardProps,
        states: {
          payoutStatus: "DONE",
          veriffLoading: false,
          canEditPayoutInfo: true,
          disabled: false,
          status: "NOT_ACTIVE",
          documentType: "W8BENE",
          documentTypeString: taxTypeToName("W8BENE"),
          dateSubmitted: "Jan 18th, 2025",
          noFormNeeded: false,
          indirectTaxNumber: "123456",
          indirectTaxType: "VAT",
          country: "United Kingdom",
          showNewFormDialog: false,
          hasHold: false,
        },
      }}
    ></sqm-tax-and-cash-dashboard>
  );
};

export const TaxAndCashDashboardNoFormNeeded = () => {
  return (
    <sqm-tax-and-cash-dashboard
      demoData={{
        ...dashboardProps,
        states: {
          payoutStatus: "DONE",
          veriffLoading: false,
          canEditPayoutInfo: true,
          disabled: false,
          documentType: "W9",
          documentTypeString: taxTypeToName("W9"),
          dateSubmitted: "Jan 18th, 2025",
          noFormNeeded: true,
          province: "Ontario",
          country: "Canada",
          indirectTaxNumber: "123456",
          indirectTaxType: "GST",
          showNewFormDialog: false,
          hasHold: false,
        },
      }}
    ></sqm-tax-and-cash-dashboard>
  );
};

export const TaxAndCashDashboardIndirectTaxCanada = () => {
  return (
    <sqm-tax-and-cash-dashboard
      demoData={{
        ...dashboardProps,
        states: {
          payoutStatus: "DONE",
          veriffLoading: false,
          canEditPayoutInfo: true,
          status: "ACTIVE",
          disabled: false,
          documentType: "W8BENE",
          documentTypeString: taxTypeToName("W8BENE"),
          dateSubmitted: "Jan 18th, 2025",
          noFormNeeded: false,
          province: "Ontario",
          country: "Canada",
          indirectTaxType: "GST",
          indirectTaxNumber: "123456",
          showNewFormDialog: false,
          hasHold: false,
        },
      }}
    ></sqm-tax-and-cash-dashboard>
  );
};

export const TaxAndCashDashboardIndirectTaxCanadaQuebec = () => {
  return (
    <sqm-tax-and-cash-dashboard
      demoData={{
        ...dashboardProps,
        states: {
          payoutStatus: "DONE",
          veriffLoading: false,
          canEditPayoutInfo: true,
          status: "ACTIVE",
          disabled: false,
          documentType: "W8BENE",
          documentTypeString: taxTypeToName("W8BENE"),
          dateSubmitted: "Jan 18th, 2025",
          noFormNeeded: false,
          province: "Quebec",
          country: "Canada",
          indirectTaxType: "GST",
          indirectTaxNumber: "123456",
          qstNumber: "44212",
          showNewFormDialog: false,
          hasHold: false,
        },
      }}
    ></sqm-tax-and-cash-dashboard>
  );
};

export const TaxAndCashDashboardIndirectTaxSpain = () => {
  return (
    <sqm-tax-and-cash-dashboard
      demoData={{
        ...dashboardProps,
        states: {
          payoutStatus: "DONE",
          veriffLoading: false,
          canEditPayoutInfo: true,
          status: "ACTIVE",
          disabled: false,
          documentType: "W8BENE",
          documentTypeString: taxTypeToName("W8BENE"),
          dateSubmitted: "Jan 18th, 2025",
          noFormNeeded: false,
          country: "Spain",
          subRegion: "Spain Proper",
          indirectTaxType: "VAT",
          indirectTaxNumber: "123456",
          subRegionTaxNumber: "44212",
          showNewFormDialog: false,
          hasHold: false,
        },
      }}
    ></sqm-tax-and-cash-dashboard>
  );
};

export const TaxAndCashDashboardIndirectTaxNotRegistered = () => {
  return (
    <sqm-tax-and-cash-dashboard
      demoData={{
        ...dashboardProps,
        states: {
          payoutStatus: "DONE",
          veriffLoading: false,
          canEditPayoutInfo: true,
          status: "ACTIVE",
          documentType: "W8BEN",
          documentTypeString: taxTypeToName("W8BEN"),
          dateSubmitted: "Jan 18th, 2025",
          noFormNeeded: false,
          notRegistered: true,
          showNewFormDialog: false,
          hasHold: false,
        },
      }}
    ></sqm-tax-and-cash-dashboard>
  );
};

export const TaxAndCashDashboardIdentityVerifcationRequired = () => {
  return (
    <sqm-tax-and-cash-dashboard
      demoData={{
        ...dashboardProps,
        states: {
          payoutStatus: "VERIFICATION:REQUIRED",
          veriffLoading: false,
          canEditPayoutInfo: true,
          status: "ACTIVE",
          documentType: "W8BEN",
          documentTypeString: taxTypeToName("W8BEN"),
          dateSubmitted: "Jan 18th, 2025",
          noFormNeeded: false,
          notRegistered: true,
          showNewFormDialog: false,
          hasHold: false,
        },
      }}
    ></sqm-tax-and-cash-dashboard>
  );
};

export const TaxAndCashDashboardIdentityVerifcationRequiredInternal = () => {
  return (
    <sqm-tax-and-cash-dashboard
      demoData={{
        ...dashboardProps,
        states: {
          payoutStatus: "VERIFICATION:INTERNAL",
          veriffLoading: false,
          canEditPayoutInfo: true,
          status: "ACTIVE",
          documentType: "W8BEN",
          documentTypeString: taxTypeToName("W8BEN"),
          dateSubmitted: "Jan 18th, 2025",
          noFormNeeded: false,
          notRegistered: true,
          showNewFormDialog: false,
          hasHold: false,
        },
      }}
    ></sqm-tax-and-cash-dashboard>
  );
};

export const TaxAndCashDashboardIdentityVerifcationReviewInternal = () => {
  return (
    <sqm-tax-and-cash-dashboard
      demoData={{
        ...dashboardProps,
        states: {
          payoutStatus: "VERIFICATION:REVIEW",
          veriffLoading: false,
          canEditPayoutInfo: true,
          status: "ACTIVE",
          documentType: "W8BEN",
          documentTypeString: taxTypeToName("W8BEN"),
          dateSubmitted: "Jan 18th, 2025",
          noFormNeeded: false,
          notRegistered: true,
          showNewFormDialog: false,
          hasHold: false,
        },
      }}
    ></sqm-tax-and-cash-dashboard>
  );
};

export const TaxAndCashDashboardIdentityVerifcationFailedInternal = () => {
  return (
    <sqm-tax-and-cash-dashboard
      demoData={{
        ...dashboardProps,
        states: {
          payoutStatus: "VERIFICATION:FAILED",
          veriffLoading: false,
          canEditPayoutInfo: true,
          status: "ACTIVE",
          documentType: "W8BEN",
          documentTypeString: taxTypeToName("W8BEN"),
          dateSubmitted: "Jan 18th, 2025",
          noFormNeeded: false,
          notRegistered: true,
          showNewFormDialog: false,
          hasHold: false,
        },
      }}
    ></sqm-tax-and-cash-dashboard>
  );
};

export const TaxAndCashDashboardNewTaxForm = () => {
  return (
    <sqm-tax-and-cash-dashboard
      demoData={{
        ...dashboardProps,
        states: {
          payoutStatus: "DONE",
          veriffLoading: false,
          canEditPayoutInfo: true,
          status: "ACTIVE",
          documentType: "W8BEN",
          documentTypeString: taxTypeToName("W8BEN"),
          dateSubmitted: "Jan 18th, 2025",
          noFormNeeded: false,
          notRegistered: true,
          showNewFormDialog: true,
          hasHold: false,
        },
      }}
    ></sqm-tax-and-cash-dashboard>
  );
};

export const TaxAndCashDashboardPayoutsOnHold = () => {
  return (
    <sqm-tax-and-cash-dashboard
      demoData={{
        ...dashboardProps,
        states: {
          payoutStatus: "DONE",
          veriffLoading: false,
          canEditPayoutInfo: true,
          disabled: true,
          status: "ACTIVE",
          documentType: "W8BEN",
          documentTypeString: taxTypeToName("W8BEN"),
          dateSubmitted: "Jan 18th, 2025",
          noFormNeeded: false,
          indirectTaxNumber: "123456",
          country: "Slovania",
          showNewFormDialog: false,
          hasHold: true,
        },
      }}
    ></sqm-tax-and-cash-dashboard>
  );
};

export const TaxAndCashDashboardLoading = () => {
  return (
    <sqm-tax-and-cash-dashboard
      demoData={{
        ...dashboardProps,
        states: {
          payoutStatus: "DONE",
          veriffLoading: false,
          canEditPayoutInfo: true,
          disabled: false,
          status: "ACTIVE",
          documentType: "W9",
          documentTypeString: taxTypeToName("W9"),
          dateSubmitted: "Jan 18th, 2025",
          noFormNeeded: false,
          loading: true,
          showNewFormDialog: false,
          hasHold: false,
        },
      }}
    ></sqm-tax-and-cash-dashboard>
  );
};

export const TaxAndCashDashboardWithLoadingError = () => {
  return (
    <sqm-tax-and-cash-dashboard
      demoData={{
        ...dashboardProps,
        states: {
          payoutStatus: "DONE",
          veriffLoading: false,
          disabled: false,
          canEditPayoutInfo: true,
          status: "ACTIVE",
          documentType: "W9",
          documentTypeString: taxTypeToName("W9"),
          dateSubmitted: "Jan 18th, 2025",
          noFormNeeded: false,
          loading: true,
          loadingError: true,
          showNewFormDialog: false,
          hasHold: false,
        },
      }}
    ></sqm-tax-and-cash-dashboard>
  );
};

export const TaxAndCashDashboardWithGeneralError = () => {
  return (
    <sqm-tax-and-cash-dashboard
      demoData={{
        ...dashboardProps,
        states: {
          payoutStatus: "DONE",
          veriffLoading: false,
          canEditPayoutInfo: true,
          disabled: false,
          status: "ACTIVE",
          documentType: "W9",
          documentTypeString: taxTypeToName("W9"),
          dateSubmitted: "Jan 18th, 2025",
          noFormNeeded: false,
          indirectTaxNumber: "123456",
          indirectTaxType: "VAT",
          country: "Slovania",
          showNewFormDialog: false,
          hasHold: false,
          errors: {
            general: true,
          },
        },
      }}
    ></sqm-tax-and-cash-dashboard>
  );
};

export const TaxAndCashDashboardDisabled = () => {
  return (
    <sqm-tax-and-cash-dashboard
      demoData={{
        ...dashboardProps,
        states: {
          payoutStatus: "DONE",
          veriffLoading: false,
          canEditPayoutInfo: true,
          disabled: true,
          status: "ACTIVE",
          documentType: "W8BEN",
          documentTypeString: taxTypeToName("W8BEN"),
          dateSubmitted: "Jan 18th, 2025",
          noFormNeeded: false,
          indirectTaxNumber: "123456",
          country: "Slovania",
          showNewFormDialog: false,
          hasHold: false,
        },
      }}
    ></sqm-tax-and-cash-dashboard>
  );
};

// export const TaxAndCashTextProps = () => {
//   return (
//     <sqm-tax-and-cash
//       demoData={{
//         // @ts-ignore
//         showTextProps: true,
//       }}
//     ></sqm-tax-and-cash>
//   );
// };
