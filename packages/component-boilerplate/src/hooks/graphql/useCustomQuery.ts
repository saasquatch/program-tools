import {
  useCallback,
  useEffect,
  useReducer,
  useRef,
} from "@saasquatch/universal-hooks";
import { RequestDocument } from "graphql-request/dist/types";
import { request } from "graphql-request";
import { useDeepMemo } from "../useDeepMemo";
import { useTick } from "../useTick";

type GqlType = RequestDocument;

interface CustomQueryData<T = unknown, E = any> {
  loading: boolean;
  data?: T;
  errors?: CustomGraphQlRequestError<T, E>;
}

type QueryData<T> = CustomQueryData<T> & {
  refetch: (variables?: unknown) => unknown;
};

type CustomGraphQlRequestError<T, E> = {
  response: {
    errors: E[];
    data: Partial<T>;
    status: number;
  };
  request: {
    query: string;
    variables: { [key: string]: unknown };
  };
};

type Action<T, E> =
  | {
      type: "loading";
    }
  | {
      type: "data";
      payload?: T;
    }
  | {
      type: "errors";
      payload: CustomGraphQlRequestError<T, E>;
    };

function reducer<T, E>(
  // @ts-ignore = unused
  state: CustomQueryData<T, E>,
  action: Action<T, E>
): CustomQueryData<T> {
  switch (action.type) {
    case "loading":
      return { data: undefined, errors: undefined, loading: true };
    case "data":
      return { data: action.payload, errors: undefined, loading: false };
    case "errors":
      return { data: undefined, errors: action.payload, loading: false };
  }
}

export function useCustomQuery<T = any, E = any>(
  query: GqlType,
  initialState: CustomQueryData<T>,
  url: string
): [CustomQueryData<T>, (variables: unknown) => unknown] {
  const isMountedRef = useIsMountedRef();
  const [state, dispatch] = useReducer<CustomQueryData<T, E>, Action<T, E>>(
    reducer,
    initialState
  );

  const update = useCallback(
    async function (variables: unknown) {
      try {
        dispatch({ type: "loading" });
        const res = await request<T>(url, query, variables);
        if (!isMountedRef.current) return;
        dispatch({ type: "data", payload: res });
      } catch (error) {
        dispatch({ type: "errors", payload: error });
      }
    },
    [url, query, dispatch]
  );

  return [state, update];
}

// async cleanup -- https://www.debuggr.io/react-update-unmounted-component/
function useIsMountedRef() {
  const isMountedRef = useRef(null);
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  });
  return isMountedRef;
}

//todo: support headers, or create a memoized client similar to the BaseQuery
export const customQueryHooksFactory = <E>(url: string) => {
  // from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze
  function deepFreeze(object) {
    // Retrieve the property names defined on object
    const propNames = Object.getOwnPropertyNames(object);

    // Freeze properties before freezing self

    for (const name of propNames) {
      const value = object[name];

      if (value && typeof value === "object") {
        deepFreeze(value);
      }
    }

    return Object.freeze(object);
  }

  const initialQueryState: CustomQueryData = {
    loading: true,
    data: undefined,
    errors: undefined,
  } as const;

  function useQuery<T = any>(
    query: GqlType,
    variables: unknown,
    skip?: boolean
  ): QueryData<T> {
    const [state, update] = useCustomQuery<T, E>(
      query,
      initialQueryState as CustomQueryData<T>,
      url
    );

    const [tick, forceUpdate] = useTick();

    useDeepMemo(() => {
      !skip && update(variables);
    }, [query, variables, update, tick, skip]);
    return deepFreeze({
      ...state,
      // can override props when refetching for new pagination, offset, etc
      refetch: forceUpdate,
    });
  }

  function useLazyQuery<T = any>(
    query: GqlType
  ): [(e: unknown) => unknown, QueryData<T>] {
    const [state, update] = useCustomQuery<T>(
      query,
      initialQueryState as CustomQueryData<T>,
      url
    );

    return [
      update,
      {
        ...state,
        // can override props when refetching for new pagination, offset, etc
        refetch: (variables) => update(variables),
      },
    ];
  }

  function useMutation<T = any>(
    query: GqlType
  ): [(e: unknown) => unknown, CustomQueryData<T>] {
    const [state, update] = useCustomQuery<T>(
      query,
      initialQueryState as CustomQueryData<T>,
      url
    );
    return [update, state];
  }

  return {
    useQuery,
    useLazyQuery,
    useMutation,
  };
};
