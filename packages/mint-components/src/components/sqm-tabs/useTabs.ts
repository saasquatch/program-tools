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
  const rawTabs = useChildElements<TabElement>();
  const host = useHost();
  console.log({ rawTabs });
  const tabs = useMemo(
    () =>
      rawTabs
        .filter(
          (tab) =>
            tab.tagName === "SQM-TAB" || tab.tagName === "RAISINS-PLOP-TARGET"
        )
        .map((tab, i) => {
          if (tab.tagName === "RAISINS-PLOP-TARGET") {
            tab.setAttribute("slot", "tab-" + i);
            // set id as targets for scroll component
            tab.setAttribute("id", "tab-" + i);
            // @ts-ignore
            tab.setAttribute("header", tab.innerText);
            return tab;
          }
          tab.setAttribute("slot", "tab-" + i);
          // set id as targets for scroll component
          tab.setAttribute("id", "tab-" + i);
          return tab;
        }),
    [rawTabs]
  );

  useEffect(() => {
    const listener = (e: CustomEvent) => {
      const target = e.target as HTMLElement;
      console.log({ target });
      if (target.tagName === "RAISINS-PLOP-TARGET") {
        return;
      }
      // Prevents recursively nested components from sending requests up all the way
      e.stopPropagation();

      if (!target) return;

      const tabsComponent = target.closest("sqm-tabs");

      if (!host.contains(target) || !tabsComponent) return;

      const targetTab = target.closest("sqm-tab");
      const tabGroup = tabsComponent.shadowRoot.querySelector("sl-tab-group");
      (tabGroup as SlTabGroup)?.show(targetTab.id);
    };
    host.addEventListener(REVEAL_EVENT, listener);
    return () => {
      host.removeEventListener(REVEAL_EVENT, listener);
    };
  }, []);

  return { content: { tabs } };
}
