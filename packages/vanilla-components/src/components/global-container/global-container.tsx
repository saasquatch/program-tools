import { Component, Prop, State } from '@stencil/core';
import { css } from 'emotion';
import Tunnel from '../../services/Registered';
import debugFn from "debug";
import { API } from '../../services/WidgetHost';

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

    if(this.skipregister){
      this.registered = true;
      this.completedRegister = true;
      return;
    } else {
      this.registered = false;
      this.completedRegister = false;
    }
    debug("registered check:", API.graphql.checkRegisteredUser());
    if(API.graphql.checkRegisteredUser()){
      this.registered = true;
      this.completedRegister = true;
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
        <div class={style}>
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
        </div>
      </Tunnel.Provider>
    )
  }
}