import { Component, h, State } from '@stencil/core';
import Clipboard from 'clipboard'


interface tab extends Element {
  syntax:string
  open:boolean
  tabname:string
}

@Component({
  tag: 'sq-code-example',
  styleUrl: 'sq-code-example.scss',
})
export class SqCodeExample {
  @State() tabs:any;
  @State() code:Array<tab> = [];
  @State() clipboard:Clipboard;
  
  componentWillLoad() {
    this.tabs = Array.from(document.querySelectorAll('sq-code'));
  }

  componentDidLoad() {
    const openedTab = this.tabs.filter(t => {
      //console.log("did load t?", t, t.open);
      return t.open
    });

      this.clipboard = new Clipboard('.copy-button', {
        text: () => {
          
          //console.log('tab  ', openedTab);
          // console.log("elements:", elements)
          return openedTab[0].innerText
        }
      }) 
  }

  async openTab(tabIndex: number) {
    this.tabs = this.tabs.map((tab:tab) => {
      tab.open = false;
      return tab;
    });
    this.tabs[tabIndex].open = true;
    const openedTab:HTMLElement = this.tabs[tabIndex];
    new Clipboard('.copy-button', {
      text: () => {       
        return openedTab.getElementsByClassName(`original`)[0].textContent
      }
    }) 
  }

  render() {
    return <div>
      <div class="sq-tabs">
        {this.tabs.map((tab:tab, i: number) => {
          const openClass = tab.open ? 'sq-open' : '';
          return (
            <div class={`sq-tab ${openClass}`}>
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
      <button class="copy-button">Copy</button>
      <slot />  
    </div>

  }
}
