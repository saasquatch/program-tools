import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'email-share-button',
  styleUrl: 'email-share-button.scss'
})
export class EmailShareButton {
  @Prop() text: string = "Email";

  render() {
    return (
      <div>
        <a class="btn btn-email squatch-share-btn emailShare" target="_blank">
          <i class="icon icon-mail"></i>
          {this.text}
        </a>
      </div>
    );
  }
}
