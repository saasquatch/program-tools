import { useHost } from "@saasquatch/component-boilerplate";
import { useMemo, useState } from "@saasquatch/universal-hooks";

export function useChildElements<T>(): T[] {
  const host = useHost();
  const initialState = host.children.length
    ? (Array.from(host.children) as T[] & Element[])
    : [];
  const [childElements, setChildElements] = useState<T[]>(initialState);
  let observer: MutationObserver;

  // Create observer once
  useMemo(() => {
    observer = new MutationObserver(() => {
      const children = Array.from(host.children) as T[] & Element[];
      setChildElements([...children]);
    });
  }, []);

  // Listen to host and observe / disconnect
  useMemo(() => {
    if (!observer) return;
    observer.observe(host, { childList: true });
    return () => {
      observer.disconnect();
    };
  }, [host]);

  return childElements;
}
