// import { useDomContext } from "@saasquatch/dom-context-hooks";
// import { useHost } from "../hooks/useHost";
import { WidgetIdent } from "./environment";

declare global {
  interface Window {
    widgetIdent: WidgetIdent;
  }
}

export function useProgramContext() {
  // TODO: implement domContext
  // const host = useHost();
  // return useDomContext<string>(host, "sq-context:program-id");

  // ALSO TODO: figure out programContext for portal environment (this will do for now)
  return window.widgetIdent?.programId || window.SquatchPortal?.programId;
}
