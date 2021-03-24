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
  return window.widgetIdent?.programId
}
