import { Component, Prop, Element } from '@stencil/core';
import { css } from 'emotion';
// import marked from 'marked';

@Component({
  tag: 'sqh-summary-container',
  styleUrl: 'summary-container.scss'
})
export class SummaryContainer {
  @Prop() ishidden: boolean;
  @Prop() ismarkdown: boolean;
  @Prop() text: string;
  @Prop() fontfamily: string;
  @Prop() color: string;
  @Prop() fontsize: string;
  @Prop() paddingtop: string;
  @Prop() paddingbottom: string;
  @Prop() padding: string = '10px 20px 15px';
  @Prop() textalign: string;
  @Prop() background: string;
  @Prop() height: string;

  @Element() textEl: HTMLElement;   

  render() {
    const divStyle = css`
      height:150px;
      border:1px solid #555;
    `

    return !this.ishidden && 
      <div class={divStyle}>
        <slot />
      </div>;
  }
}