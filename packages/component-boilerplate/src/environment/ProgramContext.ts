import { createContext } from "@saasquatch/stencil-hooks";
import { useContext } from "@saasquatch/universal-hooks";

export function useProgramContext() {
  return useContext<string>("sq-context:program-id");
}
