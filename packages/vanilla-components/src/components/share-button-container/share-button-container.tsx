import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'sqh-share-button-container',
  styleUrl: 'share-button-container.scss'
})
export class ShareButtonContainer {
  @Prop() maxWidth: string = "441px";
  
  addStyle() {
    const css = ` share-button-container {
                    max-width: ${this.maxWidth};
                  } `
    const style = document.createElement('style');

    style.appendChild(document.createTextNode(css));
    document.getElementsByTagName('head')[0].appendChild(style);
  }

  componentDidLoad() {
    this.addStyle();
  }
}
  