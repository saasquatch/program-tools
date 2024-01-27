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

export function useTaxAndCash() {
  const host = useHost();

  // TODO: Load tax document status info

  const [step, setStep] = useParentState<string>({
    host,
    namespace: TAX_CONTEXT_NAMESPACE,
    initialValue: "/1",
  });

  const [_userData, setUserData] = useParentState<string>({
    host,
    namespace: USER_CONTEXT_NAMESPACE,
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
      jwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiemFjaC5oYXJyaXNvbkByZWZlcnJhbHNhYXNxdWF0Y2guY29tIiwiYWNjb3VudElkIjoiemFjaC5oYXJyaXNvbkByZWZlcnJhbHNhYXNxdWF0Y2guY29tIn19.Wi8Vd5r64g5n8VNhiY-v5cqFcLwGxPG3Wi3dVSfkFZI",
    });
    // return () => {
    //   window.widgetIdent = undefined;
    //   setUserIdentity(undefined);
    // };
  }, []);
  /*** */

  const user = useUserIdentity();

  const { data, loading } = useQuery(GET_USER, {
    id: user?.id,
    accountId: user?.accountId,
  });

  useEffect(() => {
    if (data) {
      setUserData(data);
    }
  }, [data]);

  console.log({ step });

  return {
    step,
    setStep,
    namespace: getContextValueName(TAX_CONTEXT_NAMESPACE),
    loading,
  };
}
