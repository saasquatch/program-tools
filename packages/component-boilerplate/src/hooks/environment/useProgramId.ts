import { useDomContext } from "@saasquatch/dom-context-hooks";
import {
  PROGRAM_CONTEXT_NAME,
  lazilyStartProgramContext,
} from "@saasquatch/component-environment";
import { useHost } from "../useHost";

export function useProgramId(): string | undefined {
  lazilyStartProgramContext();
  const host = useHost();
  return useDomContext<string>(host, PROGRAM_CONTEXT_NAME);
}
