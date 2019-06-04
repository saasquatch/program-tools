import { Component, Prop, Element } from '@stencil/core';
import { css } from 'emotion';

@Component({
  tag: 'sqh-cta-component',
  styleUrl: 'cta-component.scss'
})
export class CTAComponent {
  @Prop() ishidden: boolean = false;
  @Prop() ismarkdown: boolean = false;
  @Prop() text: string;
  @Prop() fontfamily: string;
  @Prop() color: string;
  @Prop() fontsize: string;
  @Prop() fontweight: string;
  @Prop() paddingtop: string;
  @Prop() paddingbottom: string;
  @Prop() padding: string = '10px 20px 15px';
  @Prop() textalign: string;
  @Prop() background: string;
  @Prop() buttonbackground: string;
  @Prop() height: string;
  @Prop() width: string;
  @Prop() borderradius: string;
  @Prop() url: string;

  @Element() textEl: HTMLElement;   

  render() {
    const buttonStyle = css`
      font-family: ${this.fontfamily || 'inherit'};
      font-size: ${this.fontsize ? this.fontsize + 'px' : 'inherit'};
      font-weight: ${this.fontweight ? this.fontweight : 'inherit'};   
      color: ${this.color || 'inherit'};
      padding-top: ${this.paddingtop ? this.paddingtop+ 'px' : 'inherit'};
      padding-bottom: ${this.paddingbottom ? this.paddingbottom + 'px' : 'inherit'};
      width:${this.width ? this.width + 'px' : 'auto'};
      overflow-wrap: break-word;
      border-radius: ${this.borderradius ? this.borderradius + 'px' : '8px'};
      margin:0 auto;
      border:none;
      background-color: ${this.buttonbackground ? this.buttonbackground : '#F5A100'};
      &:hover {
        cursor:pointer;
        opacity:0.9;
      }
      &:focus {
        outline:none;
      }
    `;

    const divStyle = css`
      text-align: ${this.textalign};
      background: ${this.background ? this.background : 'inherit'};
      height: ${this.height || 'inherit'};
      background-size: contain;
    `;

    return !this.ishidden && 
      <div class={divStyle}>
        <button class={buttonStyle} onClick={() => window.open(this.url, "_blank") }>
          {this.text}
        </button>
      </div>;
  }
}