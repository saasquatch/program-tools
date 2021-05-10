import { GraphQLClient } from "graphql-request";
import {
  useCallback,
  useEffect,
  useReducer,
  useRef,
} from "@saasquatch/universal-hooks";
import useGraphQLClient from "./useGraphQLClient";
import { RequestDocument } from "graphql-request/dist/types";

export type GqlType = RequestDocument;

export interface BaseQueryData<T = unknown> {
  loading: boolean;
  data?: T;
  errors?: GraphQlRequestError<T>;
}

export type QueryData<T> = BaseQueryData<T> & {
  refetch: (variables?: unknown) => unknown;
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
  initialState: BaseQueryData<T>
): [BaseQueryData<T>, (variables: unknown) => unknown] {
  const client: GraphQLClient = useGraphQLClient();
  const isMountedRef = useIsMountedRef();
  const [state, dispatch] = useReducer<BaseQueryData<T>, Action<T>>(
    reducer,
    initialState
  );

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
          if (isMountedRef.current)
            dispatch({ type: "errors", payload: res.errors });
        } else {
          if (isMountedRef.current) dispatch({ type: "data", payload: res });
        }
      } catch (error) {
        dispatch({ type: "errors", payload: error });
      }
    },
    [client, query, dispatch]
  );

  return [state, update];
}

// async cleanup
function useIsMountedRef() {
  const isMountedRef = useRef(null);
  useEffect(() => {
    isMountedRef.current = true;
    return () => (isMountedRef.current = false);
  });
  return isMountedRef;
}
