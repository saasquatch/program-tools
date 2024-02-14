import {
  setUserIdentity,
  useHost,
  useUserIdentity,
} from "@saasquatch/component-boilerplate";
import { useEffect } from "@saasquatch/universal-hooks";
import { useParentQuery } from "../../../utils/useParentQuery";
import {
  getContextValueName,
  useParentState,
} from "../../../utils/useParentState";
import {
  COUNTRIES_NAMESPACE,
  CURRENCIES_NAMESPACE,
  CountriesQuery,
  CurrenciesQuery,
  GET_COUNTRIES,
  GET_CURRENCIES,
  GET_USER,
  TAX_CONTEXT_NAMESPACE,
  TAX_FORM_CONTEXT_NAMESPACE,
  TaxContext,
  USER_FORM_CONTEXT_NAMESPACE,
  USER_QUERY_NAMESPACE,
  UserFormContext,
  UserQuery,
} from "./data";

function getCurrentStep(user: UserQuery["user"]) {
  if (
    !user.impactPartner ||
    user.impactPartner?.connectionStatus === "NOT_CONNECTED"
  ) {
    return "/1";
  }

  if (user.impactPartner.currentTaxDocument) {
    const { status, type } = user.impactPartner.currentTaxDocument;

    if (status === "ACTIVE" || status === "NOT_VERIFIED") return "/submitted";

    return "/3";
  }

  if (user.impactPartner.requiredTaxDocumentType) {
    return `/3`;
  }

  // If impact partner exists but no requiredTaxDocument, go straight to the dashboard
  return "/submitted";
}

export function useTaxAndCash() {
  const host = useHost();

  /**** DEMO DATA */

  const id = "e5dce75a6773b42feb0d3a5599d4b9bc0bc14320f857dce94a7534027378c583";
  const accountId =
    "e5dce75a6773b42feb0d3a5599d4b9bc0bc14320f857dce94a7534027378c583";
  const programId = "22514";

  //@ts-ignore
  window.widgetIdent = {
    tenantAlias: "aprh0cfq6y8tk",
    appDomain: "https://staging.referralsaasquatch.com",
    programId,
  };

  useEffect(() => {
    setUserIdentity({
      accountId,
      id,
      jwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IklSTVhzWXk2WVlxcTQ2OTQzN21HOEVSUXQ4UW9LRkJhRzEifQ.eyJ1c2VyIjp7ImlkIjoiZTVkY2U3NWE2NzczYjQyZmViMGQzYTU1OTlkNGI5YmMwYmMxNDMyMGY4NTdkY2U5NGE3NTM0MDI3Mzc4YzU4MyIsImFjY291bnRJZCI6ImU1ZGNlNzVhNjc3M2I0MmZlYjBkM2E1NTk5ZDRiOWJjMGJjMTQzMjBmODU3ZGNlOTRhNzUzNDAyNzM3OGM1ODMifX0.Cw4sJM8ZG_oApmvN2JjjX1CirKj3c1oa-ubu3iZxOtQ",
    });
  }, []);

  const user = useUserIdentity();

  // State for current step of form
  const [step, setStep] = useParentState<string>({
    namespace: TAX_CONTEXT_NAMESPACE,
    initialValue: "/loading",
  });

  // State for when to hide steps, or override certain actions
  const [context, setContext] = useParentState<TaxContext>({
    namespace: TAX_FORM_CONTEXT_NAMESPACE,
    initialValue: {} as TaxContext,
  });

  // State to carry user form information into step 2
  const [userFormContext, setUserFormContext] = useParentState<UserFormContext>(
    {
      namespace: USER_FORM_CONTEXT_NAMESPACE,
      initialValue: {} as UserFormContext,
    }
  );

  const { data } = useParentQuery<UserQuery>({
    namespace: USER_QUERY_NAMESPACE,
    query: GET_USER,
    skip: !user,
  });

  useParentQuery<CountriesQuery>({
    namespace: COUNTRIES_NAMESPACE,
    query: GET_COUNTRIES,
    skip: !user,
  });

  useParentQuery<CurrenciesQuery>({
    namespace: CURRENCIES_NAMESPACE,
    query: GET_CURRENCIES,
    skip: !user,
  });

  useEffect(() => {
    if (!host || !user) return;

    if (data) {
      const user = data?.user;
      if (!user || step !== "/loading") return;

      const currentStep = getCurrentStep(user);
      setStep(currentStep);
    }
  }, [host, user, data?.user?.email]);

  return {
    step,
    setStep,
    context,
    namespace: getContextValueName(TAX_CONTEXT_NAMESPACE),
    loading: step === "/loading",
  };
}

export type UseTaxAndCashResultType = ReturnType<typeof useTaxAndCash>;
