import { FunctionalComponent, h, Host } from "@stencil/core";
import { TabElement } from "./useTabs";

export type TabsViewProps = {
  placement: string | null;
  content: {
    tabs: TabElement[];
  };
};

export const TabsView: FunctionalComponent<TabsViewProps> = ({
  content,
  placement,
}) => {
  // Vertical padding for top & bottom placement, horizontal for left & right.
  const padding =
    !placement || placement === "bottom"
      ? "var(--sl-spacing-x-large) 0;"
      : "0 var(--sl-spacing-xx-large);";

  const vanillaStyle = `
    sl-tab-panel::part(base) {
      padding: ${padding};
    }
  `;
  return (
    <Host>
      <style type="text/css">{vanillaStyle}</style>
      <sl-tab-group placement={placement}>
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
