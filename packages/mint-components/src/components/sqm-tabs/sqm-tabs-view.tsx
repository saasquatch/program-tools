import { h, Host, VNode } from "@stencil/core";
import { createStyleSheet } from "../../styling/JSS";
import { tab } from "./useTabs";

type TabsViewProps = {
  callbacks: {
    openTab: Function;
  };
  content: {
    tabs: tab[];
  };
};

const style = {};
const sheet = createStyleSheet(style);
const styleString = sheet.toString();

export const TabsView = (
  { callbacks, content }: TabsViewProps,
  children: any
) => {
  return (
    <Host>
      <style type="text/css">{styleString}</style>
      <div class={`code-container`}>
        <div class="sq-tabs">
          {content.tabs.map((tab: tab, i: number) => {
            const openClass = tab.open ? "sq-open" : "";
            return (
              <div class={`sq-tab ${openClass} `}>
                <button
                  role="tab"
                  class={`sq-tab-button`}
                  onClick={() => callbacks.openTab(i)}
                >
                  {tab.header}
                </button>
              </div>
            );
          })}
        </div>
        <slot />
      </div>

      {children}
    </Host>
  );
};
