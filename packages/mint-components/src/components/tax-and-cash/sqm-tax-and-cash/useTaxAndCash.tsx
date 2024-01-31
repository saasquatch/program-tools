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
import { FormState } from "../sqm-user-info-form/useUserInfoForm";
import {
  COUNTRIES_NAMESPACE,
  CURRENCIES_NAMESPACE,
  CountriesQuery,
  CurrenciesQuery,
  GET_COUNTRIES,
  GET_CURRENCIES,
  GET_USER,
  TAX_CONTEXT_NAMESPACE,
  USER_INFO_NAMESPACE,
  USER_QUERY_NAMESPACE,
  UserQuery,
} from "./data";

function getCurrentStep(user: UserQuery["user"]) {
  // return "/submitted";
  // @ts-ignore
  if (
    !user.countryCode ||
    !user.customFields?.currency ||
    !user.customFields.participantType
  ) {
    return "/1";
  }

  if (!user.customFields.w9Type) {
    return "/2";
  }

  if (!user.customFields.w9Submitted) {
    return `/3/${user.customFields.w9Type}`;
  }

  if (user.customFields.w9Submitted) {
    return "/submitted";
  }

  return "/1";
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
    // return () => {
    //   window.widgetIdent = undefined;
    //   setUserIdentity(undefined);
    // };
  }, []);
  /*** */

  const user = useUserIdentity();

  // TODO: Load tax document status info

  const [step, setStep] = useParentState<string>({
    host,
    namespace: TAX_CONTEXT_NAMESPACE,
    initialValue: "/loading",
  });

  useParentState<FormState>({
    host,
    namespace: USER_INFO_NAMESPACE,
    initialValue: {},
  });

  const { data } = useParentQuery<UserQuery>({
    host,
    namespace: USER_QUERY_NAMESPACE,
    query: GET_USER,
    variables: {
      id: user?.id,
      accountId: user?.accountId,
    },
    skip: !user,
  });

  useParentQuery<CountriesQuery>({
    host,
    namespace: COUNTRIES_NAMESPACE,
    query: GET_COUNTRIES,
    skip: !user,
  });

  useParentQuery<CurrenciesQuery>({
    host,
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

      console.log({ currentStep });
      setStep(currentStep);
    }
  }, [host, user, data?.user?.email]);

  return {
    step,
    setStep,
    namespace: getContextValueName(TAX_CONTEXT_NAMESPACE),
    loading: step === "/loading",
  };
}
