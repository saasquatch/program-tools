import { useMemo } from "@saasquatch/universal-hooks";
import { useChildElements } from "../../tables/useChildElements";
import { TabsViewProps } from "./sqm-tabs-view";

export interface TabElement extends Element {
  open: boolean;
  header: string;
}

export function useTabs(): TabsViewProps {
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
