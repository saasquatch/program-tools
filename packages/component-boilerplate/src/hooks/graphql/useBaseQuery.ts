import { useCallback, useReducer } from "@saasquatch/universal-hooks";
import { RequestDocument } from "graphql-request/dist/types";
import useGraphQLClient from "./useGraphQLClient";

export type GqlType = RequestDocument;

export interface BaseQueryData<T = unknown> {
  loading: boolean;
  data?: T;
  errors?: GraphQlRequestError<T>;
}

export type QueryData<T> = BaseQueryData<T> & {
  refetch: (variables?: unknown) => Promise<T | Error>;
};

/**
 * Note: reverse-engineered from a returned error. May not capture all error types.
 */

export type GraphQlRequestError<T> = {
  response: {
    errors: [
      {
        message: string;
        locations: [{ line: number; column: number }];
        path: string[];
        extensions: {
          apiError: {
            message: string;
            statusCode: number;
            apiErrorCode: string;
            rsCode: string;
          };
          classification: string;
          // V managed identity extensions V
          message?: string;
          code?: string;
        };
      }
    ];
    data: Partial<T>;
    status: number;
  };
  request: {
    query: string;
    variables: { [key: string]: unknown };
  };
  message?: string;
};

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
  initialState: BaseQueryData<T>,
  options = { merge: true }
): [
  BaseQueryData<T>,
  (variables: unknown, skipLoading?: boolean) => Promise<T | Error>
] {
  const client = useGraphQLClient();
  const [state, dispatch] = useReducer<BaseQueryData<T>, Action<T>>(
    reducer,
    initialState
  );
  const update = useCallback(
    async function (variables: unknown, skipLoading = false) {
      if (!client) {
        const error = new Error("No GraphQL client found");
        // Hook will return an error state when no client exists (used to be a loading state)
        dispatch({
          type: "errors",
          // @ts-expect-error -- Need to fix this
          payload: error,
        });
        return error;
      }
      try {
        // Skips showing a "loading" state before the data appears
        if (!skipLoading) dispatch({ type: "loading" });

        const res = await client.request<T>(query, variables, options);
        dispatch({ type: "data", payload: res });
        return res;
      } catch (error) {
        dispatch({ type: "errors", payload: error });
        return error;
      }
    },
    [client, query, dispatch]
  );

  return [state, update];
}
