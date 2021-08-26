import { useHost } from "@saasquatch/component-boilerplate";
import { useEffect, useState } from "@saasquatch/universal-hooks";

export function useChildElements(): Element[] {
  const host = useHost();
  const initialState = host.children.length ? Array.from(host.children) : [];
  const [childElements, setChildElements] = useState<Element[]>(initialState);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const children = Array.from(host.children);
      setChildElements([...children]);
    });
    observer.observe(host, { childList: true });
    return () => observer.disconnect();
  }, [host]);

  return childElements;
}
