import { createContext, useEffect } from "@saasquatch/stencil-hooks";
import { createBrowserHistory, Listener, History } from "history";

const history: History<HistoryState | null> = createBrowserHistory();
const HistoryContext = createContext<History<HistoryState | null>>(
  "sq:history-context",
  history
);
HistoryContext.provideGlobally(history);

export type HistoryState = {
  sam?: "use this";
};

export function useHistory() {
  return HistoryContext.useContext();
}

export function useHistoryListener(cb: Listener<HistoryState | null>) {
  const hist = HistoryContext.useContext();

  useEffect(() => {
    // Handles cleanup
    return hist.listen(cb);
  }, [cb]);
}
