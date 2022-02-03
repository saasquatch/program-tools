import { useHost } from "@saasquatch/component-boilerplate";
import { useEffect, useMemo } from "@saasquatch/universal-hooks";
import { SlTabGroup } from "@shoelace-style/shoelace";
import { useChildElements } from "../../tables/useChildElements";

const REVEAL_EVENT = "sq:reveal";

export interface TabElement extends Element {
  open: boolean;
  header: string;
}

export function useTabs() {
  const rawTabs = useChildElements() as TabElement[];
  const host = useHost();
  const tabs = useMemo(
    () =>
      rawTabs
        .filter((tab) => tab.tagName === "SQM-TAB")
        .map((tab, i) => {
          tab.setAttribute("slot", "tab-" + i);
          // set id as targets for scroll component
          tab.setAttribute("id", "tab-" + i);
          return tab;
        }),
    [rawTabs]
  );

  useEffect(() => {
    const listener = (e: CustomEvent) => {
      // Prevents recursively nested components from sending requests up all the way
      e.stopPropagation();
      //@ts-ignore
      if (!host.contains(e?.target) || !e?.target?.parentElement?.shadowRoot)
        return;

      const element =
        //@ts-ignore
        e?.target?.parentElement?.shadowRoot?.querySelector(`#${e.target.id}`);

      (element.parentElement as SlTabGroup)?.show(element?.panel);
    };
    host.addEventListener(REVEAL_EVENT, listener);
    return () => {
      host.removeEventListener(REVEAL_EVENT, listener);
    };
  }, []);

  return { content: { tabs } };
}
