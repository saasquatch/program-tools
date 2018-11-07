import { Component, Prop, Event, EventEmitter, Element, Watch } from '@stencil/core';
import { css } from 'emotion';
import Tunnel from '../../services/Registered'; // Import the tunnel

@Component({
  tag: 'sqh-stat-component',
  styleUrl: 'stat-component.scss'
})
export class StatComponent {
  @Element() elem: HTMLElement;
  @Prop() ishidden: boolean = false;
  @Prop() stattype: string;
  @Prop() statvalue: string;
  @Prop() statdescription: string;
  @Prop() statcolor: string;
  @Event() statTypeUpdated: EventEmitter;
  @Event() statAdded: EventEmitter;

  componentWillLoad() {
    this.statAddedHandler(this.elem);
  }

  @Watch('stattype')
  stattypeHandler(newValue: string, oldValue: string) {
    if (newValue !== oldValue) this.statTypeUpdatedHandler(this.elem)
  }

  statAddedHandler(stat: HTMLElement) {
    this.statAdded.emit(stat);
  }

  statTypeUpdatedHandler(stat: HTMLElement) {
    this.statTypeUpdated.emit(stat);
  }

  render() {
    const clz = css`
      color: ${ this.statcolor };
    `
    const hiddenStyle = { display: "none" };

  return (
    <Tunnel.Consumer>
      {({ completedRegister }) => (
        !this.ishidden &&
          <div class={ clz } style={completedRegister? null: hiddenStyle}>
            <div class="stat-value">{this.statvalue}</div>
            <div class="stat-description">{this.statdescription}</div>
          </div>
      )}
    </Tunnel.Consumer>
  )
  }
}