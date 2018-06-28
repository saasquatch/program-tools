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
  @Prop() textalign: string = 'center';
  @Element() textEl: HTMLElement;   
  
  addStyle(el) {
    if (!el) return;

    const fontFamily = this.fontfamily || 'inherit';
    const fontSize = this.fontsize || 'inherit';
    const textAlign = this.textalign || 'inherit';
    const fontColor = this.color || 'inherit';

    el.setAttribute('style', `font-family: ${fontFamily}; font-size: ${fontSize}px; text-align: ${textAlign}; color: ${fontColor}`);
  }

  componentDidLoad() {
    let el = this.textEl.getElementsByTagName('p')[0];
    this.addStyle(el);
  }

  componentWillUpdate() {
    let el = this.textEl.getElementsByTagName('p')[0];
    this.addStyle(el);
  }

  render() {
    return (
      <div>
        <p class='my-text'>{this.text}</p>
      </div>
    );
  }
}