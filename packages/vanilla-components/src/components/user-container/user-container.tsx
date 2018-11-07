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
  @State() completedRegister: boolean;

  componentWillLoad(){
    this.registered = false;
    //this.readyToLoadStats = false;

    //fake check for registered user
    if(Math.random() >= 0.5){
      debug("User is already registered")
      this.completedRegister = true;
    } else {
      debug("User is not registered")
      this.completedRegister = false;
    }
  }

  render() {
    const hiddenStyle = { display: "none" };

    const tunnelState = {
      registered: this.registered,
      completedRegister: this.completedRegister,
      registerUser: () => {
        this.registered = true;
        debug("registerUser:", this.registered);
      },
      loadNext: () => {
        this.completedRegister = true;
        debug("readyToLoadStats:", this.completedRegister)
      }
    };

    return (
      <Tunnel.Provider state={tunnelState}>
        <div style={this.completedRegister ? hiddenStyle : null}>
          <slot name="form" />
        </div>
        <div style={this.completedRegister ? null : hiddenStyle}>
          <slot name="stats"/>
        </div>

        <div style={hiddenStyle}>
          <slot />
        </div>
      </Tunnel.Provider>

    );
  }
}