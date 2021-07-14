import { useHost } from "@saasquatch/component-boilerplate";
import { useState } from "@saasquatch/stencil-hooks";
import { useEffect } from "@saasquatch/universal-hooks";

export function useChildElements() {
  const host = useHost();
  const [childElements, setChildElements] = useState(host.children);
  useEffect(() => {
    const observer = new MutationObserver(() =>
      setChildElements(host.children)
    );
    observer.observe(host, {
      characterData: true,
      attributes: true,
      childList: true,
      subtree: true,
    });
    return () => observer.disconnect();
  }, [host]);

  return childElements;
}
