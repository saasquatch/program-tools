import { useMemo } from "@saasquatch/universal-hooks";
import { useChildElements } from "../../tables/useChildElements";

export interface TabElement extends Element {
  open: boolean;
  header: string;
}

export function useTabs() {
  const rawTabs = useChildElements() as TabElement[];
  const tabs = useMemo(
    () =>
      rawTabs
        .filter((tab) => tab.tagName === "SQM-TAB")
        .map((tab, i) => {
          tab.setAttribute("slot", "tab-" + i);
          return tab;
        }),
    [rawTabs]
  );

  return { content: { tabs } };
}
