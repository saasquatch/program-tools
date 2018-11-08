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

    injectGlobal`
    input[type="button"],
    input[type="submit"],
    .squatch-share-btn,
    .sqh-copy-btn {
        touch-action: manipulation;
        cursor: pointer;
        background-image: none;
        border: 1px solid transparent;
        white-space: nowrap;
        border-radius: 4px;
        font-size:14px;
        padding:6px 12px;
        line-height: 1.428571429;
        width:140px;
        &:focus {
          outline: 0; 
        }
        &.disabled,
        &[disabled],
        fieldset[disabled] & {
          cursor: not-allowed;
          pointer-events: none
          opacity: .65;
          -webkit-box-shadow: none;
                  box-shadow: none;
        }
      }
      .input-group {
        padding: 8px 0 10px;
        position: relative;
        display: table;
        border-collapse: separate;
        width: 100%;
        max-width: 440px;
        margin: 0 auto;
      }
      .input-group input {
        height: 34px;
        padding: 6px 12px;
        font-size: 14px;
        line-height: 1.428571429;
        border: 1px solid #ccc;
        -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
        box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
      }
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
        <div style={this.completedRegister ? null : hiddenStyle}>
          <slot />
          <slot name={this.widgettype} />
        </div>
      )}
      </Tunnel.Provider>
    )
  }
}