import request from "graphql-request";
import { useCallback, useReducer } from "@saasquatch/universal-hooks";
import { RequestDocument } from "graphql-request/dist/types";
// import {  useTenantAlias } from "@saasquatch/component-boilerplate";

export type GqlType = RequestDocument;

export interface PortalQueryData<T = unknown> {
  loading: boolean;
  data?: T;
  error?: string;
}

type PortalError = {
  message: string;
  locations: [{ line: number; column: number }];
  path: string[];
  extensions: {
    code: string;
    message: string;
  };
};

type GraphQlRequestError<T> = {
  response: {
    errors: PortalError[];
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
      type: "error";
      payload: string;
    };

function reducer<T>(
  // @ts-ignore = unused
  state: PortalQueryData<T>,
  action: Action<T>
): PortalQueryData<T> {
  switch (action.type) {
    case "loading":
      return { data: undefined, error: undefined, loading: true };
    case "data":
      return { data: action.payload, error: undefined, loading: false };
    case "error":
      return { data: undefined, error: action.payload, loading: false };
  }
}

export function usePortalQuery<T = any>(
  query: GqlType,
  initialState: PortalQueryData<T>
): [PortalQueryData<T>, (variables: unknown) => unknown] {
  const portalDomain = "http://localhost:4000"; //usePortalDomain();
  const tenantAlias = "test_akdq8a9wyvzba"; // useTenantAlias();
  const uri = portalDomain + "/tenant/" + tenantAlias + "/graphql";

  const [state, dispatch] = useReducer<PortalQueryData<T>, Action<T>>(
    reducer,
    initialState
  );

  const update = useCallback(
    async function (variables: unknown) {
      try {
        dispatch({ type: "loading" });
        const res = await request<T>(uri, query, variables);

        dispatch({ type: "data", payload: res });
      } catch (e) {
        const error = e as GraphQlRequestError<T>;
        dispatch({
          type: "error",
          payload:
            error.response?.errors?.[0]?.message || "Something went wrong",
        });
      }
    },
    [query, dispatch]
  );
  return [state, update];
}
