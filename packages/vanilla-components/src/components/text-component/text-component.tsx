import { Component, Prop, Element } from '@stencil/core';

@Component({
  tag: 'sqh-text-component',
  styleUrl: 'text-component.scss'
})
export class TextComponent {
  @Prop() hidden: boolean = false;
  @Prop() text: string;
  @Prop() fontfamily: string;
  @Prop() color: string;
  @Prop() fontsize: string;
  @Prop() padding: string = '10px 20px 15px';
  @Prop() textalign: string = 'center';
  @Prop() background: string;
  @Prop() height: string;
  @Element() textEl: HTMLElement;   

  render() {
    const style = {
      fontFamily: this.fontfamily || 'inherit',
      fontSize: `${this.fontsize}px` || 'inherit',
      textAlign: this.textalign || 'inherit',
      color: this.color || 'inherit',
      padding: this.padding || '0'
    } 

    const divStyle = {
      background: `url(${this.background}) no-repeat center center` || 'inherit',
      height: this.height || 'inherit'
    }

    const textSection = this.hidden 
      ? `` 
      : (
        <div style={divStyle}>
          <p style={style}>
            {this.text}
            <slot name="markdown-content" />
          </p>
        </div>
      )

    return textSection;
  }
}