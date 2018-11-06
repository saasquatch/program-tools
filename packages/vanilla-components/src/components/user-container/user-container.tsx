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
  @State() readyToLoadStats: boolean;

  componentWillLoad(){
    this.registered = false;
    //this.readyToLoadStats = false;

    //fake check for registered user
    if(Math.random() >= 0.5){
      debug("User is already registered")
      this.readyToLoadStats = true;
    } else {
      debug("User is not registered")
      this.readyToLoadStats = false;
    }
  }

  render() {
    const hiddenStyle = { display: "none" };

    const tunnelState = {
      registered: this.registered,
      readyToLoadStats: this.readyToLoadStats,
      registerUser: () => {
        this.registered = true;
        debug("registerUser:", this.registered);
      },
      loadStats: () => {
        this.readyToLoadStats = true;
        debug("readyToLoadStats:", this.readyToLoadStats)
      }
    };

    return (
      <Tunnel.Provider state={tunnelState}>
        <div style={this.readyToLoadStats ? hiddenStyle : null}>
          <slot name="form" />
        </div>
        <div style={this.readyToLoadStats ? null : hiddenStyle}>
          <slot name="stats"/>
        </div>

        <div style={hiddenStyle}>
          <slot />
        </div>
      </Tunnel.Provider>

    );
  }
}