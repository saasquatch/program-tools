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

  const id = "zach.harrison@referralsaasquatch.com";
  const accountId = id;
  const programId = "klip-referral-program";

  //@ts-ignore
  window.widgetIdent = {
    tenantAlias: "test_a74miwdpofztj",
    appDomain: "https://staging.referralsaasquatch.com",
    programId,
  };

  useEffect(() => {
    setUserIdentity({
      accountId,
      id,
      jwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiemFjaC5oYXJyaXNvbkByZWZlcnJhbHNhYXNxdWF0Y2guY29tIiwiYWNjb3VudElkIjoiemFjaC5oYXJyaXNvbkByZWZlcnJhbHNhYXNxdWF0Y2guY29tIiwiZW1haWwiOiJ6YWNoLmhhcnJpc29uQHJlZmVycmFsc2Fhc3F1YXRjaC5jb20ifX0.vBPHefz1au0_O-Hub2q6m5S8t-D5EO9LxK_pd9rkLhQ",
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
