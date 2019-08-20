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
  @State() copied:boolean;
  
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

      this.clipboard.on('success', async(e) => {
        this.copied = true;
        e.trigger.innerHTML = `<i class="icon-sqh-copy"></i> Copied!`
        await new Promise(resolve => setTimeout(resolve, 3000))
        this.copied = false;
        e.trigger.innerHTML = `<i class="icon-sqh-copy"></i> Copy`
    });
    
    this.clipboard.on('error', async(e) => {
      e.trigger.innerHTML = `Failed, try again`
      await new Promise(resolve => setTimeout(resolve, 3000))
      e.trigger.innerHTML = `<i class="icon-sqh-copy"></i> Copy`
    });
  }

  async openTab(tabIndex: number) {
    this.copied = false;
    this.tabs = this.tabs.map((tab:tab) => {
      tab.open = false;
      return tab;
    });
    this.tabs[tabIndex].open = true;
    const openedTab:HTMLElement = this.tabs[tabIndex];
    this.clipboard = new Clipboard('.copy-button', {
      text: () => {       
        return openedTab.getElementsByClassName(`original`)[0].textContent
      }
    }) 
  }

  render() {
    return <div class={`code-container ${this.copied && `copied`}`}>
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
      <button class="copy-button" onClick={() => {}}><i class="icon-sqh-copy"></i> Copy</button>
      <slot />  
    </div>

  }
}
