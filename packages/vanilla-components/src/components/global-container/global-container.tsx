import { Component, Prop } from '@stencil/core';
import { css } from 'emotion';

@Component({
  tag: 'sqh-global-container',
  styleUrl: 'global-container.scss'
})
export class GlobalContainer {
  @Prop() background: string;
  @Prop() loadingcolor: string;
  @Prop() fontfamily: string;
  @Prop() maxwidth: string;
  @Prop() poweredby: boolean = true;
  
  LoadingState(props) {
    const style = css`
      background-color: ${props.loadingcolor || '#439B76'};
    `
    return (
      <div class="container-loading">
        <div class="loading-icon">
          <div class={`bar1 ${style}`}></div>
          <div class={`bar2 ${style}`}></div>
          <div class={`bar3 ${style}`}></div>
          <div class={`bar4 ${style}`}></div>
          <div class={`bar5 ${style}`}></div>
        </div>
      </div>
    )
  }

  render() {
    const style = css`
      background-color: ${this.background};
      font-family: ${this.fontfamily};
      position: relative;
      max-width: ${this.maxwidth};
    `

    return <div class={style}>
      <slot />
      {this.poweredby
        ? <a class="sqh-attribution" href="https://www.saasquatch.com/?utm_source=app&utm_medium=user-widget&utm_campaign=referral-widget" target="_blank">Powered By Saasquatch</a>
        : ''
      }
      <this.LoadingState loadingcolor={this.loadingcolor} />
    </div>
  }
}