import { GraphQLClient } from "graphql-request";
import { useCallback, useReducer } from "@saasquatch/stencil-hooks";
import { useGraphQLClient } from "./useGraphQLClient";
import { GqlType } from "./GqlType";
import { BaseQueryData } from "./QueryData";

import { GraphQlRequestError } from "./GraphQlRequestError";

type Action<T> =
  | {
      type: "loading";
    }
  | {
      type: "data";
      payload?: T;
    }
  | {
      type: "errors";
      payload: GraphQlRequestError<T>;
    };

function reducer<T>(
  // @ts-ignore = unused
  state: BaseQueryData<T>,
  action: Action<T>
): BaseQueryData<T> {
  switch (action.type) {
    case "loading":
      return { data: undefined, errors: undefined, loading: true };
    case "data":
      return { data: action.payload, errors: undefined, loading: false };
    case "errors":
      return { data: undefined, errors: action.payload, loading: false };
  }
}

export function useBaseQuery<T = any>(
  query: GqlType,
  initialState: BaseQueryData<T>
): [BaseQueryData<T>, (variables: unknown) => unknown] {
  const client: GraphQLClient = useGraphQLClient();

  const [state, dispatch] = useReducer<
    BaseQueryData<T>,
    BaseQueryData<T>,
    Action<T>
  >(reducer, initialState);

  const update = useCallback(
    async function (variables: unknown) {
      if (!client) {
        // Hook will return an error state when no client exists (used to be a loading state)
        dispatch({
          type: "errors",
          // @ts-expect-error -- Need to fix this
          payload: new Error("No GraphQL client found"),
        });
        return;
      }
      try {
        dispatch({ type: "loading" });
        const res = await client.request(query, variables);
        if (res.errors) {
          dispatch({ type: "errors", payload: res.errors });
        } else {
          dispatch({ type: "data", payload: res });
        }
      } catch (error) {
        dispatch({ type: "errors", payload: error });
      }
    },
    [client, query, dispatch]
  );
  return [state, update];
}
