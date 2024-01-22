import { gql } from "graphql-request";
import { useParent } from "../../../utils/useParentState";
import { TAX_CONTEXT_NAMESPACE } from "../sqm-tax-and-cash/useTaxAndCash";
import { DocusignForm } from "./sqm-docusign-form";
import { useQuery, useUserIdentity } from "@saasquatch/component-boilerplate";

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

const SUBMIT_TAX_INFO = gql`
  mutation submitTaxInfo ($vars: SubmitTaxInfoInput) {

  }
`;

export function useDocusignForm(props: DocusignForm) {
  const user = useUserIdentity();
  const [step, setStep] = useParent<string>(TAX_CONTEXT_NAMESPACE);

  const variables = {
    id: user.id,
    accountId: user.accountId,
  };
  const { data, loading } = useQuery(GET_USER_TAX_INFO, variables);

  const countryCode = data?.getUserTaxInfo.countryCode;
  const locationRadio = countryCode === "US" ? "US" : "OUTSIDE_US";

  return {
    step: step,
    locationRadio,
    setStep: setStep,
    text: { ...props },
  };
}
