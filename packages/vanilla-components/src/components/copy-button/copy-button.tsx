import { Component, Prop } from '@stencil/core';
import { shadeColor } from '../../utilities';
import { css } from 'emotion';

@Component({
  tag: 'sqh-copy-button',
  styleUrl: 'copy-button.scss'
})
export class CopyButton {
  @Prop() ishidden: boolean = false;
  @Prop() text: string = "COPY CODE";
  @Prop() width: number = 170;
  @Prop() backgroundcolor: string = "#35b21e";
  @Prop() borderradius: number = 4;
  @Prop() textcolor: string = "#ffffff";

  render() {
    const style = css`
    max-width: ${this.width}px;
    background-color: ${this.backgroundcolor};
    border: ${this.backgroundcolor};
    color: ${this.textcolor};
    border-radius: ${this.borderradius}px;

    &:hover {
      background-color: ${shadeColor(this.backgroundcolor, 10)};
      border-color: ${shadeColor(this.backgroundcolor, 12)};
      color: ${this.textcolor};
    }

    &:focus {
      color: ${this.textcolor};
    }
    `;
    const classes = [`sqh-copy-button`, style].join(" ");

    return (
      <button class={classes}>{this.text}</button>
    );
  }
}
