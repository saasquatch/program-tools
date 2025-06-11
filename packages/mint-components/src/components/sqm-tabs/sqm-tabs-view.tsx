import { FunctionalComponent, h, Host } from "@stencil/core";
import { TabElement } from "./useTabs";

export type TabsViewProps = {
  placement: "left" | "right" | "bottom" | "top";
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
    !placement || placement === "top" || placement === "bottom"
      ? "var(--sl-spacing-x-large) 0;"
      : "0 var(--sl-spacing-xx-large);";

  const vanillaStyle = `
    sl-tab-panel::part(base) {
      padding: ${padding};
    }

    sl-tab::part(tab) {
      color: red;
    }
  `;

  return (
    <Host>
      <style type="text/css">{vanillaStyle}</style>
      <sl-tab-group placement={placement}>
        {content.tabs.map((tab: TabElement) => {
          const slotName = tab.getAttribute("slot");
          if (tab.tagName === "RAISINS-PLOP-TARGET") {
            return (
              <sl-tab slot="nav">
                <div style={{ marginTop: "10px" }}>
                  <slot name={slotName} />
                </div>
              </sl-tab>
            );
          }
          return [
            <sl-tab
              slot="nav"
              panel={slotName}
              part="tab"
              id={tab.getAttribute("id") || slotName}
            >
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
