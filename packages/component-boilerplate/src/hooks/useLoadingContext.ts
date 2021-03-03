import {
  createContext,
  useEffect,
  // useHost,
  useReducer,
  // useRef,
} from "@saasquatch/stencil-hooks";
import debugFn from "debug";
import { useDebounce } from "./useDebounce";
const debug = debugFn("sq:useLoadingContext");

// Not for external use -- should use the wrapped hooks
const LoadingContext = createContext<{ dispatch: Dispatch }>(
  "sq-context:loading"
);

// let current = 1;

interface LoadingEntry {
  loading: boolean;
  ref?: unknown;
}

interface ErrorEntry {
  error: string;
}

type InternalState = {
  loadingEntries: Record<string, LoadingEntry>;
  errorEntries: Record<string, ErrorEntry>;
};

type Action =
  | { type: "addLoadingEntry"; key: string; entry: LoadingEntry }
  | { type: "removeLoadingEntry"; key: string }
  | { type: "addErrorEntry"; key: string; entry: ErrorEntry }
  | { type: "removeErrorEntry"; key: string };
type Dispatch = (props: Action) => void;

export function useLoadingManager(
  debounceWait: number = 1000
): [
  boolean,
  string[] | null,
  { internal: LoadingEntry[]; undebounced: boolean; debounced: boolean }
] {
  useEffect(() => {
    setTimeout(() => {
      dispatch({
        type: "addLoadingEntry",
        key: "self",
        entry: {
          loading: false,
          ref: "self",
        },
      });
    });
  }, []);

  // Uses an internal object as a map. Only if all
  const [state, dispatch] = useReducer<InternalState, InternalState, Action>(
    (state, action) => {
      if (!action || !action.type) {
        throw Error(`Invalid action: ${JSON.stringify(action)}`);
      }

      switch (action.type) {
        case "addLoadingEntry": {
          return {
            ...state,
            loadingEntries: {
              ...state.loadingEntries,
              [action.key]: {
                loading: action.entry.loading,
                ref: action.entry.ref,
              },
            },
          };
        }

        case "removeLoadingEntry": {
          const newLoadingEntries = { ...state.loadingEntries };
          if (action.key in newLoadingEntries)
            delete newLoadingEntries[action.key];
          const newState = {
            ...state,
            loadingEntries: newLoadingEntries,
          };
          return newState;
        }

        case "addErrorEntry": {
          return {
            ...state,
            errorEntries: {
              ...state.errorEntries,
              [action.key]: {
                error: action.entry.error,
              },
            },
          };
        }

        case "removeErrorEntry": {
          const newErrorEntries = { ...state.errorEntries };
          if (action.key in newErrorEntries) delete newErrorEntries[action.key];
          const newState = {
            ...state,
            errorEntries: newErrorEntries,
          };
          return newState;
        }

        default:
          throw Error(`Invalid action`);
      }
    },
    {
      loadingEntries: {
        self: {
          loading: true,
          ref: "Self",
        },
      },
      errorEntries: {},
    }
  );

  LoadingContext.useContextState({ dispatch });

  const loading = Object.values(state.loadingEntries).reduce((acc, cur) => {
    return acc || cur.loading;
  }, false);

  const errors = Object.values(state.errorEntries).map(
    (errorEntry) => errorEntry.error
  );

  const [debounced] = useDebounce(loading, debounceWait);
  debug(
    "Loading state children",
    state,
    "loading",
    loading,
    "debounced",
    debounced,
    "errors",
    errors
  );

  const internal = Object.values(state.loadingEntries);
  return [
    debounced,
    errors.length > 0 ? errors : null,
    { internal, undebounced: loading, debounced },
  ];
}

export function useLoadingState(loading: boolean): void {
  debug(loading);
  // const [key] = useCachedUniqueID();
  // const { dispatch } = LoadingContext.useContext();
  // const host = useHost();
  // const ref = key + "-" + host.tagName;
  // useEffect(() => {
  //   debug(ref, "is", loading ? "loading" : "DONE loading");
  //   dispatch({
  //     type: "addLoadingEntry",
  //     key: key,
  //     entry: {
  //       loading,
  //       ref,
  //     },
  //   });
  // }, [key, loading, host]);
  // useEffect(() => {
  //   // Cleanup if this component is removed or memo expires
  //   return () => {
  //     debug(ref, "is unmounting");
  //     dispatch({
  //       type: "removeLoadingEntry",
  //       key: key,
  //     });
  //   };
  // }, [key]);
}

export function useErrorState(error?: string | null) {
  debug(error);
  // const host = useHost();
  // const [key] = useCachedUniqueID();
  // const { dispatch } = LoadingContext.useContext();

  // useEffect(() => {
  //   if (error) {
  //     dispatch({
  //       type: "addErrorEntry",
  //       key: key,
  //       entry: {
  //         error,
  //       },
  //     });
  //   }
  // }, [key, error, host]);

  // useEffect(() => {
  //   // Cleanup if this component is removed or memo expires
  //   return () => {
  //     dispatch({
  //       type: "removeErrorEntry",
  //       key: key,
  //     });
  //   };
  // }, [key]);
}

// function useCachedUniqueID(): string {
//   return useRef(current++ + "").current;
// }

// function useCache<T>(fn: () => T) {
//   debug("useReducer", useReducer);
//   const arr = useReducer<T, T, T>((t) => t, undefined, fn);
//   debug("useReducer return", useReducer);
//   const [value] = arr;
//   return value;
// }
