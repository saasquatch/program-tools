import { Component, State } from '@stencil/core';

interface tab extends Element {
  open:boolean
  tabname:string
}

@Component({
  tag: 'sqh-tab-container',
  styleUrl: 'tab-container.scss',
})
export class TabContainer {
  @State() tabs:any;

  componentWillLoad() {
    this.tabs = Array.from(document.querySelectorAll('sqh-tab-component'));
  }

  async openTab(tabIndex: number) {
    this.tabs = this.tabs.map((tab:tab) => {
      tab.open = false;
      return tab;
    });
    this.tabs[tabIndex].open = true;
  }

  render() {
    return <div class={`code-container`}>
      <div class="sq-tabs">
        {this.tabs.map((tab:tab, i: number) => {
          const openClass = tab.open ? 'sq-open' : '';
          return (
            <div class={`sq-tab ${openClass} `}>
              <button
                role="tab"
                class={`sq-tab-button`}
                onClick={() => this.openTab(i)}>
                {tab.tabname}
              </button>
            </div>
          );
        })}
      </div>
      <slot />  
    </div>

  }
}
