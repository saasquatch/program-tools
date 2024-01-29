import {
  setUserIdentity,
  useHost,
  useQuery,
  useUserIdentity,
} from "@saasquatch/component-boilerplate";
import { useEffect } from "@saasquatch/universal-hooks";
import { gql } from "graphql-request";
import {
  getContextValueName,
  useParentState,
} from "../../../utils/useParentState";
import { FormState } from "../sqm-user-info-form/useUserInfoForm";

export const TAX_CONTEXT_NAMESPACE = "sq:tax-and-cash";

export const USER_CONTEXT_NAMESPACE = "sq:tax-and-cash-user";

export type TaxContextType = {
  step: string;
  setStep: (value: string) => void;
};

const GET_USER = gql`
  query {
    viewer {
      ... on User {
        firstName
        lastName
        email
        countryCode
        customFields
      }
    }
  }
`;

export type UserQuery = {
  viewer: {
    firstName?: string;
    lastName?: string;
    email?: string;
    countryCode?: string;
    customFields?: {
      [key: string]: any;
    };
  };
};

export const USER_INFO_NAMESPACE = "sq:user-info-form";

function getCurrentStep(user) {
  console.log({ user });
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
    return "/3b";
  }

  return "/loading";
}

export function useTaxAndCash() {
  const host = useHost();

  // TODO: Load tax document status info

  const [step, setStep] = useParentState<string>({
    host,
    namespace: TAX_CONTEXT_NAMESPACE,
    initialValue: "/1",
  });

  const [_userData, setUserData] = useParentState<UserQuery>({
    host,
    namespace: USER_CONTEXT_NAMESPACE,
  });

  useParentState<FormState>({
    host,
    namespace: USER_INFO_NAMESPACE,
    initialValue: {},
  });

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

  const { data, loading } = useQuery<UserQuery>(GET_USER, {
    id: user?.id,
    accountId: user?.accountId,
  });

  useEffect(() => {
    if (data) {
      setUserData(data);
      const user = data?.viewer;
      if (!user) return;
      const currentStep = getCurrentStep(user);

      console.log({ currentStep });
      setStep(currentStep);
    }
  }, [data]);

  return {
    step,
    setStep,
    namespace: getContextValueName(TAX_CONTEXT_NAMESPACE),
    loading,
  };
}
