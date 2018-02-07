import { Component, Prop, Element } from '@stencil/core';

@Component({
  tag: 'sqh-text-component',
  styleUrl: 'text-component.scss'
})
export class TextComponent {
  @Prop() text: string;
  @Prop() fontSize: string;
  @Prop() textAlign: string;
  @Element() textEl: HTMLElement;   
  
  addStyle(el) {
    if (!el) return;

    el.setAttribute('style', `font-size: ${this.fontSize}; text-align: ${this.textAlign}`);
  }

  componentDidLoad() {
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