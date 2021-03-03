import {
  useDomContext,
  useDomContextState,
  useEffect,
} from "@saasquatch/stencil-hooks";
import equal from "@wry/equality";

/**
 * Creates a context container similar to `unstated-next` but with the provider as a hook instead of as a component.
 *
 * @param name
 * @param hook
 */
export function createUnstated<T>(name: string, hook: () => T) {
  const useProvider = () => {
    const value = hook();
    const [current, setState] = useDomContextState(name, value);
    useEffect(() => {
      if (!equal(current, value)) {
        setState(value);
      }
    }, [value]);
  };
  return {
    useProvider,
    useContext: () => useDomContext<T>(name),
  };
}
