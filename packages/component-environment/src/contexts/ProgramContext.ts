import { ContextProvider } from "dom-context";
import { PROGRAM_CONTEXT_NAME } from "../types";
import { debug as _debug } from "../debug";

const debug = (...args: any[]) => _debug(PROGRAM_CONTEXT_NAME, ...args);

/**
 * Lazily start the program context provider. If it already exists, the existing provider is
 * returned. This function is safe to call multiple times.
 *
 * @returns The global program context provider
 */
export function lazilyStartProgramContext() {
  let globalProvider = window.squatchProgramId;

  if (!globalProvider) {
    debug("Creating program context provider");

    // Lazily creates a global provider
    globalProvider = new ContextProvider<string | undefined>({
      element: document.documentElement,
      initialState: window.widgetIdent?.programId || undefined,
      contextName: PROGRAM_CONTEXT_NAME,
    }).start();

    window.squatchProgramId = globalProvider;
  }

  return globalProvider;
}

/**
 * Overide the globally defined Program ID context
 *
 * @param programId the new programID used by the user, or undefined if logged out
 */
export function setProgramId(programId: string | undefined) {
  const globalProvider = lazilyStartProgramContext();
  if (globalProvider.context !== programId) {
    debug(`Setting program context value [${programId}]`);
    globalProvider.context = programId;
  }
}

/**
 * Get the current value of the program context
 */
export function getProgramId() {
  return window.squatchProgramId?.context;
}
