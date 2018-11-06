import { Component, State } from '@stencil/core';
import Tunnel from '../../services/Registered';
import debugFn from "debug";

const debug = debugFn("sqh-user-container");

@Component({
  tag: 'sqh-user-container',
  styleUrl: 'user-container.scss'
})
export class UserContainer {

  @State() registered: boolean;
  @State() readyToLoad: boolean;

  componentWillLoad(){
    this.registered = false;
    this.readyToLoad = false;
  }

  render() {
    const hiddenStyle = { display: "none" };

    const tunnelState = {
      registered: this.registered,
      readyToLoad: this.readyToLoad,
      registerUser: () => {
        this.registered = true;
        debug("registerUser:", this.registered);
      },
      loadStats: () => {
        this.readyToLoad = true;
        debug("readyToLoad:", this.readyToLoad)
      }
    };

    return (
      <Tunnel.Provider state={tunnelState}>

        <div style={this.readyToLoad ? hiddenStyle : null}>
          <slot name="form" />
        </div>
        <div style={this.readyToLoad ? null : hiddenStyle}>
          <slot name="stats"/>
        </div>

        <div style={hiddenStyle}>
          <slot />
        </div>
      </Tunnel.Provider>

    );
  }
}