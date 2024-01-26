import { useQuery } from "@saasquatch/component-boilerplate";
import { useRef, useState } from "@saasquatch/universal-hooks";
import { gql } from "graphql-request";
import JSONPointer from "jsonpointer";
import { useParent } from "../../../utils/useParentState";
import { TAX_CONTEXT_NAMESPACE } from "../sqm-tax-and-cash/useTaxAndCash";

const GET_COUNTRIES = gql`
  query getCurrencies {
    countries(limit: 1000) {
      data {
        countryCode
        displayName
      }
    }
  }
`;

export function useTaxFormStepTwo(props: any) {
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useParent(TAX_CONTEXT_NAMESPACE);
  const [option, setOption] = useState<
    "hstCanada" | "otherRegion" | "notRegistered"
  >(null);
  const [errors, setErrors] = useState({});

  const { data: _countries, loading: countriesLoading } = useQuery(
    GET_COUNTRIES,
    {}
  );
  const countries = _countries?.countries.data;

  /**** DEMO DATA */

  const id = "zach.harrison@referralsaasquatch.com";
  const accountId = id;
  const programId = "klip-referral-program";

  // //@ts-ignore
  // window.widgetIdent = {
  //   tenantAlias: "test_a74miwdpofztj",
  //   appDomain: "https://staging.referralsaasquatch.com",
  //   programId,
  // };

  // useEffect(() => {
  //   setUserIdentity({
  //     accountId,
  //     id,
  //     jwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiemFjaC5oYXJyaXNvbkByZWZlcnJhbHNhYXNxdWF0Y2guY29tIiwiYWNjb3VudElkIjoiemFjaC5oYXJyaXNvbkByZWZlcnJhbHNhYXNxdWF0Y2guY29tIn19.Wi8Vd5r64g5n8VNhiY-v5cqFcLwGxPG3Wi3dVSfkFZI",
  //   });
  //   return () => {
  //     window.widgetIdent = undefined;
  //     setUserIdentity(undefined);
  //   };
  // }, []);
  /*** */

  const onSubmit = async (event: any) => {
    if (!option) {
      setErrors({ taxOption: true });
      return;
    }

    let formData: Record<string, string> = { taxOption: option };
    let validationErrors: Record<string, string> = {};

    const controls = event.target.getFormControls();
    const optionFields = ["hstCanada", "otherRegion", "notRegistered"];
    controls.forEach((control) => {
      if (!control.name || optionFields.includes(control.name)) return;

      const key = control.name;
      const value = control.value;
      console.log({ key, value });
      JSONPointer.set(formData, key, value);

      if (control.required && !value) {
        JSONPointer.set(validationErrors, key, true);
      }
    });

    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
    }

    console.log({ formData });

    setLoading(true);
    try {
      // Backend request
      setStep("/3");
    } catch (e) {
      setErrors({ graphqlError: true });
    } finally {
      setLoading(false);
    }
  };

  const onBack = () => {
    setStep("/1");
  };

  return {
    loading: loading || countriesLoading,
    countries,
    text: props,
    errors,
    onBack,
    onSubmit,
    submitDisabled: !option,
    option,
    setOption,
    formRef,
  };
}
