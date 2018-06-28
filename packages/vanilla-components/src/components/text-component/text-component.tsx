import { Component, Prop, Element } from '@stencil/core';

@Component({
  tag: 'sqh-text-component',
  styleUrl: 'text-component.scss'
})
export class TextComponent {
  @Prop() text: string;
  @Prop() fontfamily: string;
  @Prop() color: string;
  @Prop() fontsize: string;
  @Prop() padding: string;
  @Prop() textalign: string = 'center';
  @Element() textEl: HTMLElement;   

  render() {
    const style = {
      fontFamily: this.fontfamily || 'inherit',
      fontSize: `${this.fontsize}px` || 'inherit',
      textAlign: this.textalign || 'inherit',
      color: this.color || 'inherit',
      padding: this.padding || 'inherit'
    } 

    return (
      <div>
        <p style={style}>{this.text}</p>
      </div>
    );
  }
}