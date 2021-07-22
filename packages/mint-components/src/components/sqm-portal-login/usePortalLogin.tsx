import jsonpointer from "jsonpointer";
import { useEffect } from "@saasquatch/universal-hooks";
import {
  navigation,
  useUserIdentity,
  useAuthenticateWithEmailAndPasswordMutation,
} from "@saasquatch/component-boilerplate";

export function usePortalLogin({ nextPage, nextPageUrlParameter }) {
  const [request, { loading, errors }] =
    useAuthenticateWithEmailAndPasswordMutation();
  const userIdent = useUserIdentity();

  const urlParams = new URLSearchParams(window.location.search);
  const nextPageOverride = urlParams.get(nextPageUrlParameter);
  urlParams.delete(nextPageUrlParameter);

  const submit = async (event: any) => {
    let formData = event.detail.formData;

    formData?.forEach((value: any, key: string) => {
      jsonpointer.set(formData, key, value);
    });
    const variables = { email: formData.email, password: formData.password };

    await request(variables);
  };

  useEffect(() => {
    if (userIdent?.jwt) {
      navigation.push({
        pathname: nextPageOverride || nextPage,
        search: urlParams.toString(),
      });
    }
  }, [userIdent?.jwt]);

  return {
    states: {
      loading,
      error: errors?.response?.errors?.[0]?.message,
    },
    callbacks: {
      submit,
    },
  };
}
