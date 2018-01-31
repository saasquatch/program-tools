import { Component, Prop, State } from '@stencil/core';

@Component({
  tag: 'social-share-button',
  styleUrl: 'social-share-button.scss'
})
export class SocialShareButton {
  @Prop() text: string;
  @Prop() social: string;

  @State() icon: string;

  getIcon(social) {
    if (!social) return;

  }

  componentDidLoad() {
    
  }

  render() {
    return (
      <div>
        <a class="btn squatch-share-btn" target="_blank">
          <img class="icon" src="http://res.cloudinary.com/saasquatch/image/upload/v1511992028/white-email-envelope-md_vtgypw.png"></img>
          {/* <i class="icon icon-link"></i> */}
          {this.text}
        </a>
      </div>
    );
  }
}
