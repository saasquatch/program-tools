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
  // TODO: From partner information
  if (
    !user.countryCode ||
    !user.customFields?.currency ||
    !user.customFields.participantType
  ) {
    return "/1";
  }

  // TODO: Get indirect tax info from impact
  // Right now, this is just set on submit in step 2 to flag it as being completed
  if (!user.customFields.__taxOption) {
    return "/2";
  }

  // Land on specific docusign document
  // TODO: From brand info and partner info
  // If document hasn't been submitted but their settings require a tax doc
  if (
    !user.customFields?.__taxDocumentSubmitted &&
    user.customFields?.__taxDocumentType
  ) {
    if (user.countryCode === "US") {
      return "/3/W9";
    } else if (user.customFields.__taxCountry === "US") {
      if (user.customFields.participantType === "businessEntity") {
        return "/3/W8-BEN-E";
      } else if (
        user.customFields.participantType === "individualParticipant"
      ) {
        return "/3/W8-BEN";
      }
    }
  }

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
    // return () => {
    //   window.widgetIdent = undefined;
    //   setUserIdentity(undefined);
    // };
  }, []);
  /*** */

  const user = useUserIdentity();

  // TODO: Load tax document status info

  const [step, setStep] = useParentState<string>({
    namespace: TAX_CONTEXT_NAMESPACE,
    initialValue: "/loading",
  });

  const [_formState, setFormState] = useParentState<FormState>({
    namespace: USER_INFO_NAMESPACE,
    initialValue: {},
  });

  const { data } = useParentQuery<UserQuery>({
    namespace: USER_QUERY_NAMESPACE,
    query: GET_USER,
    variables: {
      id: user?.id,
      accountId: user?.accountId,
    },
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

      console.log({ currentStep });
      setStep(currentStep);

      if (currentStep !== "/submitted")
        setFormState({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          countryCode: user.countryCode,
          currency: user.customFields?.currency,
          participantType: user.customFields?.participantType,
        });
    }
  }, [host, user, data?.user?.email]);

  return {
    step,
    setStep,
    namespace: getContextValueName(TAX_CONTEXT_NAMESPACE),
    loading: step === "/loading",
  };
}
