import { Component, Prop } from '@stencil/core';
import { css } from 'emotion';

@Component({
  tag: 'sqh-global-container',
  styleUrl: 'global-container.scss'
})
export class GlobalContainer {
  @Prop() background: string;
  @Prop() fontfamily: string;
  @Prop() poweredby: boolean = true;

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
    const style = css`
      background-color: ${this.background};
      font-family: ${this.fontfamily};
      position: relative;
    `

    const divClass = [`squatch-container`, style ].join(" ");

    return <div class={divClass}>
      <slot />
      {this.poweredby
        ? <a class="sqh-attribution" href="https://get.referralsaasquatch.com/powered-by/?co=GraphQL%20testing" target="_blank">Powered By Saasquatch</a>
        : ''
      }
      <this.LoadingState />
    </div>
  }
}