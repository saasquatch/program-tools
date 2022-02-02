import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, State } from "@stencil/core";
import { TabsView } from "./sqm-tabs-view";

interface tab extends Element {
  open: boolean;
  tabname: string;
}

@Component({
  tag: "sqm-tabs",
})
export class Tabs {
  @State() tabs: any;

  componentWillLoad() {
    this.tabs = Array.from(document.querySelectorAll("sqm-tab"));
  }

  async openTab(tabIndex: number) {
    this.tabs = this.tabs.map((tab: tab) => {
      tab.open = false;
      return tab;
    });
    this.tabs[tabIndex].open = true;
  }

  constructor() {
    withHooks(this);
  }

  disconnectedCallback() {}

  render() {
    return (
      // <div class={`code-container`}>
      //   <div class="sq-tabs">
      //     {this.tabs.map((tab: tab, i: number) => {
      //       const openClass = tab.open ? "sq-open" : "";
      //       return (
      //         <div class={`sq-tab ${openClass} `}>
      //           <button
      //             role="tab"
      //             class={`sq-tab-button`}
      //             onClick={() => this.openTab(i)}
      //           >
      //             {tab.tabname}
      //           </button>
      //         </div>
      //       );
      //     })}
      //   </div>
      //   <slot />
      // </div>

      <TabsView>
        <slot />
      </TabsView>
    );
  }
}
