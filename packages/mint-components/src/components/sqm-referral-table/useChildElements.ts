import { useHost } from "@saasquatch/component-boilerplate";
import { useState } from "@saasquatch/stencil-hooks";
import { useEffect } from "@saasquatch/universal-hooks";
const defaults = [
  "sqm-referral-table-user-column",
  "sqm-referral-table-status-column",
  "sqm-referral-table-rewards-column",
  "sqm-referral-table-date-column",
];
function getDefaultColumns() {
  return defaults.map((component) => {
    return document.createElement(component);
  });
}

export function useChildElements() {
  const host = useHost();
  // const children = Array.from(host.children);
  console.log(getDefaultColumns());

  // TODO: default elements are created without their @Methods
  const initialState = host.children.length ? Array.from(host.children) : getDefaultColumns();
  const [childElements, setChildElements] = useState(initialState);

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
