import { useEffect, useState } from "@saasquatch/universal-hooks";
import { useChildElements } from "../../tables/useChildElements";
export interface tab extends Element {
  open: boolean;
  header: string;
}

export function useTabs() {
  const tabs = useChildElements() as tab[];
  console.log({ tabs });
  function openTab(tabIndex: number) {
    const currentTabs = tabs.map((tab: tab) => {
      tab.open = false;
      return tab;
    });
    currentTabs[tabIndex].open = true;
  }
  return { callbacks: { openTab }, content: { tabs } };
}
