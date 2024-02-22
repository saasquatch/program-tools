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
    !user.impactConnection ||
    user.impactConnection?.connectionStatus === "NOT_CONNECTED" ||
    !user.impactConnection?.publisher
  ) {
    return "/1";
  }

  // Prioritise sending them to dashboard if no required document
  if (!user.impactConnection.publisher.requiredTaxDocumentType) {
    return "/submitted";
  }

  // If they do have a required document, look at current document
  if (user.impactConnection.publisher.currentTaxDocument) {
    const { status } = user.impactConnection.publisher.currentTaxDocument;

    if (status === "ACTIVE" || status === "NOT_VERIFIED") return "/submitted";

    return "/3";
  }

  // Catchall
  return "/error";
}

export function useTaxAndCash() {
  const host = useHost();

  /**** DEMO DATA */

  const id = "cbe6955555676a66d5623db1c16d40d7a25caed9962020d34494572668893d12";
  const accountId =
    "cbe6955555676a66d5623db1c16d40d7a25caed9962020d34494572668893d12";
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
      jwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IklSTVhzWXk2WVlxcTQ2OTQzN21HOEVSUXQ4UW9LRkJhRzEifQ.eyJ1c2VyIjp7ImlkIjoiY2JlNjk1NTU1NTY3NmE2NmQ1NjIzZGIxYzE2ZDQwZDdhMjVjYWVkOTk2MjAyMGQzNDQ5NDU3MjY2ODg5M2QxMiIsImFjY291bnRJZCI6ImNiZTY5NTU1NTU2NzZhNjZkNTYyM2RiMWMxNmQ0MGQ3YTI1Y2FlZDk5NjIwMjBkMzQ0OTQ1NzI2Njg4OTNkMTIifX0.I23Xf7U10ZXrs_wpS7BItDFZDrNQV6w50eTSXAkIxl4",
    });
  }, []);

  // const id = "64fdeb7347c94ab69bb5ff4c788ca78c0ba127cdc374a8300157250b1643767b";
  // const accountId =
  //   "64fdeb7347c94ab69bb5ff4c788ca78c0ba127cdc374a8300157250b1643767b";
  // const programId = "22514";

  // //@ts-ignore
  // window.widgetIdent = {
  //   tenantAlias: "aprh0cfq6y8tk",
  //   appDomain: "https://staging.referralsaasquatch.com",
  //   programId,
  // };

  // useEffect(() => {
  //   setUserIdentity({
  //     accountId,
  //     id,
  //     jwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IklSTVhzWXk2WVlxcTQ2OTQzN21HOEVSUXQ4UW9LRkJhRzEifQ.eyJ1c2VyIjp7ImlkIjoiNjRmZGViNzM0N2M5NGFiNjliYjVmZjRjNzg4Y2E3OGMwYmExMjdjZGMzNzRhODMwMDE1NzI1MGIxNjQzNzY3YiIsImFjY291bnRJZCI6IjY0ZmRlYjczNDdjOTRhYjY5YmI1ZmY0Yzc4OGNhNzhjMGJhMTI3Y2RjMzc0YTgzMDAxNTcyNTBiMTY0Mzc2N2IifX0.rSeFVjrPvRlO_m4skwgnvJNbWfnIM7f_q2tfqo4R0pU",
  //   });
  // }, []);

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

      // setStep("/1");
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
