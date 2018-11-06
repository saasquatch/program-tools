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

  registerUser = () => {
    this.registered = true;
    debug("registerUser:", this.registered);
  }

  loadStats = () => {
    this.readyToLoad = true;
    debug("readyToLoad:", this.readyToLoad)
  }

  render() {
    const tunnelState = {
      registered: this.registered,
      readyToLoad: this.readyToLoad,
      registerUser: this.registerUser,
      loadStats: this.loadStats
    };

    return (
    <Tunnel.Provider state={tunnelState}>
      {
        this.readyToLoad ? 
        <sqh-stats-container />
        :
        <sqh-form-component />
      
      }
      </Tunnel.Provider>
      
    );
  }
}