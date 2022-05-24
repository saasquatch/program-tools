import { useDomContext } from "@saasquatch/dom-context-hooks";
import { ContextProvider } from "dom-context";
import { useHost } from "../hooks/useHost";
import { WidgetIdent } from "./environment";

const CONTEXT_NAME = "sq:program-id";

declare global {
  interface Window {
    widgetIdent: WidgetIdent;
    squatchProgramId: ContextProvider<string>;
  }
}

function _lazilyStartGlobally() {
  const globalProvider = window.squatchProgramId;
  if (!globalProvider) {
    // Lazily creates a global provider
    window.squatchProgramId = new ContextProvider<string>({
      element: document.documentElement,
      initialState: window.widgetIdent?.programId || undefined,
      contextName: CONTEXT_NAME,
    }).start();
  }
}

export function useProgramId(): string | undefined {
  _lazilyStartGlobally();
  const host = useHost();
  return useDomContext<string>(host, CONTEXT_NAME);
}

/**
 * Overide the globally defined Program ID context
 *
 * @param programId the new programID used by the user, or undefined if logged out
 */
export function setProgramId(programId: string) {
  _lazilyStartGlobally();
  const globalProvider = window.squatchProgramId;
  globalProvider.context = programId;
}
