import { gql } from "graphql-request";
import { useParent } from "../../../utils/useParentState";
import { TAX_CONTEXT_NAMESPACE } from "../sqm-tax-and-cash/useTaxAndCash";
import { DocusignForm } from "./sqm-docusign-form";
import { useQuery, useUserIdentity } from "@saasquatch/component-boilerplate";
import { useEffect, useState } from "@saasquatch/universal-hooks";

const GET_USER_TAX_INFO = gql`
  query getUserTaxInfo($id: String!, $accountId: String!) {
    id
    accountId
    firstName
    lastName
    email
    countryCode
  }
`;

// TODO: Fill out when API is released
const SUBMIT_TAX_INFO = gql`
  mutation submitTaxInfo ($vars: SubmitTaxInfoInput) {
  }
`;

export function useDocusignForm(props: DocusignForm) {
  const user = useUserIdentity();
  const [step, setStep] = useParent<string>(TAX_CONTEXT_NAMESPACE);
  const [showTypeForm, setShowTypeForm] = useState<boolean>(false);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [errors, setErrors] = useState({});
  const [currentForm, setCurrentForm] = useState<"W9" | "W8-BEN" | "W8-BEN-E">(
    null
  );

  const variables = {
    id: user.id,
    accountId: user.accountId,
  };
  const { data, loading } = useQuery(GET_USER_TAX_INFO, variables);

  // TODO: Replace with real backend data
  const { data: taxInfo, loading: taxInfoLoading } = {
    data: {
      taxForm: "W9" as const,
      documentUrl: "https://example.com",
    },
    loading: false,
  };

  useEffect(() => {
    if (!taxInfo?.taxForm) return;

    setCurrentForm(taxInfo.taxForm);
  }, [taxInfo]);

  const onSubmit = () => {
    if (!formSubmitted) {
      setErrors({ submitCheckbox: true });
      return;
    }

    setStep("/4");
  };

  const onFormTypeSubmit = (e) => {
    let selectedFormType: string;
    const controls = e.target.getFormControls();
    controls.forEach((control) => {
      if (control.value) {
        selectedFormType = control.name;
      }
    });

    // Refetch data for new form
  };

  return {
    text: { ...props },
    errors,
    step: step,
    loading: loading || taxInfoLoading,
    taxForm: currentForm,
    documentUrl: taxInfo?.documentUrl,
    formSubmitted,
    showTypeForm,
    setShowTypeForm,
    onFormTypeSubmit,
    setStep,
    onSubmit,
    toggleFormSubmitted: () => setFormSubmitted((x) => !x),
  };
}
