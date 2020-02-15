import { Component, Prop, Element, State } from '@stencil/core';
import { css } from 'emotion';
import marked from 'marked';
import { API } from '../../services/WidgetHost';

@Component({
  tag: 'sqh-program-component',
  styleUrl: 'program-component.scss'
})
export class ProgramComponent {
  @Prop() ishidden: boolean;
  @Prop() ismarkdown: boolean;
  @Prop() text: string;
  @Prop() textalign: string;
  @Prop() iconplacement:string;
  @Prop() icon:string;
  @Prop() ctaurl:string;
  @Prop() ctatext:string;
  @Prop() reward:string;
  @Prop() programid:string;
  @Element() textEl: HTMLElement;   
  @State() programData: any;

  async componentWillLoad() {
    this.programData = {
      data:{}
    }
    const programData = await API.graphql.getProgramCardData(this.programid);
    console.log(programData)
    this.programData = {
      data:programData
    }
  }

  render() {

    const textStyle = css`
      padding-top: inherit;
      padding-bottom: inherit;
      overflow-wrap: break-word;
      grid-column:3 / span 2;
      grid-row:2;
      text-align:left;
    `;

    const divStyle = css`
      background: #FFF;
      border-top:1px solid #555;
      border-bottom:1px solid #555;
      padding:8px;
      text-align:center;
      height:125px;
      display:grid;
      grid-template-columns: 20% 5% 35% 35% 5%;
      grid-template-rows: 12.5% 25% 25% 25% 12.5%;
      margin-top:1em;
    `;

    const iconDivStyle = css`
      grid-column:1;
      grid-row:2 / span 3;
      align-self:center;
    `

    const iconStyle = css`
      height:70px;
      vertical-align:middle;
    `

    const ctaStyle = css`
      border:1px solid #555;
      border-radius:4px;
      color:#FFF;
      text-decoration:none;
      background-color:rgb(245, 168, 65);
      padding:6px 12px;
      grid-column:4;
      grid-row:4;
      align-self: center;
    `

    const rewardStyle = css`
      text-align:left;
      grid-column:3 / span 2;
      grid-row:4;
      align-self:center;
    `

    const content = this.ismarkdown
      ? <div innerHTML={marked(this.text)} />
      : this.text

    return !this.ishidden && 
      <div class={divStyle}>
        <div class={iconDivStyle}><img src={this.icon} class={iconStyle}></img></div>
        <p class={textStyle}>
          {content}
        </p>
        <p class={rewardStyle}>{this.reward}</p>
        {this.ctaurl && <a target="_blank" class={ctaStyle} href={this.ctaurl}><span>{this.ctatext}</span></a>}
      </div>;
  }
}