import { Component, Prop, State, Element, Watch } from '@stencil/core';
import Tunnel from '../../services/Registered';
import debugFn from "debug";
import { API } from '../../services/WidgetHost';

const debug = debugFn("sqh-global-container");

@Component({
  tag: 'sqh-global-container',
  styleUrl: 'global-container.scss'
})
export class GlobalContainer {
  @State() registered: boolean = false;
  @State() completedRegister: boolean = false;

  @Prop() background: string;
  @Prop() fontfamily: string;
  @Prop() widgettype: string;
  @Prop() skipregister: boolean = false;
  @Prop() poweredby: boolean = false;

  @Element() el: HTMLElement;
  
  componentWillLoad(){
    this.checkSkipRegister(this.skipregister);
    debug("registered check:", API.graphql.checkRegisteredUser());
    if(API.graphql.checkRegisteredUser()){
      this.registered = true;
      this.completedRegister = true;
    }
  }

  @Watch('skipregister')
  skipRegister(newValue: boolean, oldValue: boolean) {
    debug(newValue, oldValue)
    if (newValue !== oldValue) this.checkSkipRegister(newValue);
  }

  LoadingState() {
    return (
      <div class="container-loading">
        <div class="loading-icon">
          <div class="bar1"></div>
          <div class="bar2"></div>
          <div class="bar3"></div>
          <div class="bar4"></div>
          <div class="bar5"></div>
        </div>
      </div>
    )
  }

  checkSkipRegister(newValue: boolean = false) {
    this.registered = newValue;
    this.completedRegister = newValue;
  }

  render() {

    debug("this.registered:", this.registered)
    debug("this.completedRegister:", this.completedRegister)

    const tunnelState = {
      widgetType: this.widgettype,
      registered: this.registered,
      completedRegister: this.completedRegister,
      registerUser: () => {
        this.registered = true;
        debug("registered:", this.registered)
      },
      loadNext: () => {
        this.completedRegister = true;
        debug("completedRegister:", this.completedRegister)
      }
    };
    
    const hiddenStyle = { display: "none" };

    /*
    const style = css`
      background-color: ${this.background};
      font-family: ${this.fontfamily};
      position: relative;
    `*/

    // temporary fix since using slots removes parent div to place emotion style in
    this.el.style.setProperty('background-color', this.background?this.background: 'inherit');
    this.el.style.setProperty('font-family', this.fontfamily?this.fontfamily : 'inherit');

    return (
      <Tunnel.Provider state={tunnelState}>
        <slot />
        {this.poweredby
          ? <a class="sqh-attribution" href="https://www.saasquatch.com/?utm_source=app&utm_medium=user-widget&utm_campaign=referral-widget" target="_blank">Powered By Saasquatch</a>
          : ''
        }
        <this.LoadingState />
        { !this.completedRegister && 
          !this.skipregister 
          ? <div style={hiddenStyle}>
              <slot name={this.widgettype} />
            </div>
          : ''
        }
      </Tunnel.Provider>
    )
  }
}