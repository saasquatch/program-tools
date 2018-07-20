import { Component, Prop } from '@stencil/core';
import { css } from 'emotion';

@Component({
  tag: 'sqh-image-component',
  styleUrl: 'image-component.scss'
})

export class ImageComponent {
  @Prop() url: string;
  @Prop() width: number;
  @Prop() borderradius: number;
  @Prop() alignment: string;
  // Option: a text box/code editor that allows for any css rules in this format  [key]:[value];
  @Prop() css: string;

  render() {
    const imageString = this.url;
    const alignment = css `{
      position: relative;
      text-align: ${this.alignment};
    }`
    const myStyle = css`{
      width: ${this.width}px;
      max-width: 100%;
      height: auto;
      border-radius: ${this.borderradius}px;
      ${this.css}
    }`
  
   return(
    <div class={alignment}>
      <img src={imageString} class={myStyle}/>
    </div>
    );
  }
}