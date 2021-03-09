import { useDomContext } from "@saasquatch/dom-context-hooks";
import { useHost } from "../hooks/useHost";

export function useProgramContext() {
  const host = useHost();
  return useDomContext<string>(host, "sq-context:program-id");
}
