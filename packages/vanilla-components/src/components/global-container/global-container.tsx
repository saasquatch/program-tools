import { Component, Prop, State } from '@stencil/core';
import { css, injectGlobal } from 'emotion';
import Tunnel from '../../services/Registered';
import debugFn from "debug";

const debug = debugFn("sqh-global-container");

@Component({
  tag: 'sqh-global-container',
  styleUrl: 'global-container.scss'
})
export class GlobalContainer {
  @State() registered: boolean;
  @State() completedRegister: boolean;

  @Prop() background: string;
  @Prop() fontfamily: string;
  @Prop() widgettype: string;
  @Prop() skipregister: boolean;
  @Prop() poweredby: boolean = true;
  
  componentWillLoad(){
    this.skipregister;

    if(this.skipregister){
      this.registered = true;
      this.completedRegister = true;
    } else {
      this.registered = false;
      this.completedRegister = false;
    }
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

  render() {

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
    const style = css`
      background-color: ${this.background};
      font-family: ${this.fontfamily};
      position: relative;
    `
    
    return (
      <Tunnel.Provider state={tunnelState}>
      { !this.completedRegister && 
      !this.skipregister ? (
        <div class={style}>
          <slot />
          {this.poweredby
            ? <a class="sqh-attribution" href="https://www.saasquatch.com/?utm_source=app&utm_medium=user-widget&utm_campaign=referral-widget" target="_blank">Powered By Saasquatch</a>
            : ''
          }
          <this.LoadingState />
          <div style={hiddenStyle}>
            <slot name={this.widgettype} />
          </div>
        </div>
      ) 
      :
      (
        <div class={style} style={this.completedRegister ? null : hiddenStyle}>
          <slot />
          {this.poweredby
            ? <a class="sqh-attribution" href="https://www.saasquatch.com/?utm_source=app&utm_medium=user-widget&utm_campaign=referral-widget" target="_blank">Powered By Saasquatch</a>
            : ''
          }
          <this.LoadingState />
        </div>
      )}
      </Tunnel.Provider>
    )
  }
}