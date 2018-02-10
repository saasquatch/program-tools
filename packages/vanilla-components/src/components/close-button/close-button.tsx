import { Component, Prop, Element, Listen } from '@stencil/core';

const API: MyAPI = window["WidgetHost"];
const widget = window["widgetIdent"];

@Component({
  tag: 'sqh-close-button',
  styleUrl: 'close-button.scss'
})
export class TwitterShareButton {
  @Prop() text: string = "Close";
  @Element() closeButton: HTMLElement;

  @Listen('click')
  handleClick(ev){
    console.log('clicked')
    API.ui.close();
  }

  componentDidLoad() {
    console.log(widget);
    if (widget && widget.mode != "POPUP") {
      this.closeButton.setAttribute('style', 'display:none');
    }
  }

  render() {
    return (
      <span class="close squatch-header-close" data-close-panel="#squatch-panel">{this.text}</span>
    );
  }
}
