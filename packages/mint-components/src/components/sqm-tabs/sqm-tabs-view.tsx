import { FunctionalComponent, h, Host, VNode } from "@stencil/core";
import { createStyleSheet } from "../../styling/JSS";
import { TabElement } from "./useTabs";

export type TabsViewProps = {
  content: {
    tabs: TabElement[];
  };
};

const style = {};
const sheet = createStyleSheet(style);
const styleString = sheet.toString();

const vanillaStyle = `
sl-tab-panel::part(base) {
	padding: var(--sl-spacing-x-large) 0;
}
`;

export const TabsView: FunctionalComponent<TabsViewProps> = ({ content }) => {
  return (
    <Host>
      <style type="text/css">
        {vanillaStyle}
        {styleString}
      </style>
      <sl-tab-group>
        {content.tabs.map((tab: TabElement) => {
          const slotName = tab.getAttribute("slot");
          return [
            <sl-tab slot="nav" panel={slotName}>
              {tab.getAttribute("header")}
            </sl-tab>,
            <sl-tab-panel name={slotName}>
              <slot name={slotName} />
            </sl-tab-panel>,
          ];
        })}
      </sl-tab-group>

      <div style={{ display: "none" }}>
        <slot />
      </div>
    </Host>
  );
};
