import { Component, Prop } from '@stencil/core';
import { css } from 'emotion';

@Component({
  tag: 'sqh-global-container',
  styleUrl: 'global-container.scss'
})
export class GlobalContainer {
  @Prop() background: string;
  @Prop() fontfamily: string;
  
  render() {
    const myStyle = css`
      background-color: ${this.background};
      font-family: ${this.fontfamily};
    `
    return [
      <div class={myStyle}>
        <slot />
      </div>
    ]
  }
}