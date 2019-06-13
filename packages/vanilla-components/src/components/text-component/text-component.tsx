import { Component, Prop, Element } from '@stencil/core';
import { css } from 'emotion';
import marked from 'marked';

@Component({
  tag: 'sqh-text-component',
  styleUrl: 'text-component.scss'
})
export class TextComponent {
  @Prop() ishidden: boolean = false;
  @Prop() ismarkdown: boolean = false;
  @Prop() text: string;
  @Prop() fontfamily: string;
  @Prop() color: string;
  @Prop() fontsize: string;
  @Prop() fontweight: string;
  @Prop() paddingtop: string;
  @Prop() paddingbottom: string;
  @Prop() padding: string;
  @Prop() textalign: string;
  @Prop() background: string;
  @Prop() height: string;

  @Element() textEl: HTMLElement;   

  render() {
    const regex = /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/i;

    const textStyle = css`
      font-family: ${this.fontfamily || 'inherit'};
      font-size: ${this.fontsize ? this.fontsize + 'px' : 'inherit'};
      font-weight: ${this.fontweight ? this.fontweight : 'inherit'};
      text-align: ${this.textalign};
      color: ${this.color || 'inherit'};
      padding-top: ${this.paddingtop ? this.paddingtop+ 'px' : 'inherit'};
      padding-bottom: ${this.paddingbottom ? this.paddingbottom + 'px' : 'inherit'};
      padding: ${ this.padding ? this.padding : ''};
      overflow-wrap: break-word;
    `;

    const divStyle = css`
      background: ${this.background ? this.background.match(regex) ? `url(${this.background}) no-repeat center center;` : this.background : 'inherit'};
      height: ${this.height || 'inherit'};
      background-size: contain;
    `;

    const content = this.ismarkdown
      ? <div innerHTML={marked(this.text)} />
      : this.text

    return !this.ishidden && 
      <div class={divStyle}>
        <p class={textStyle}>
          {content}
        </p>
      </div>;
  }
}