import { Component, Prop, Element, State} from '@stencil/core';
import { shadeColor, addClass } from '../../utilities';

const API: MyAPI = window["WidgetHost"];

@Component({
  tag: 'sqh-linkedin-share-button',
  styleUrl: 'linkedin-share-button.scss'
})
export class LinkedinShareButton {
  @Prop() text: string = "linkedin";
  @Prop() shareBody: string;
  @Prop() backgroundColor: string = "#0084b9";
  @Prop() borderColor: string = "#0084b9";
  @Prop() textColor: string = "#fff";
  @Prop() shareImage: string;
  @Prop() link: string;
  @Prop() title: string;
  @Prop() summary: string;
  @Prop() redirectUrl: string;
  @Prop() displayRule: string = "mobile-and-desktop"
  @State() linkedinUrl: string;
  @Element() button: HTMLElement;

  clickHandler(e) {
    if (e.type != 'touchstart') {
      e.preventDefault();

      let url = `${this.linkedinUrl}&display=popup`;
      window.open(url, 'linkedin', 'status=0,width=620,height=400');
    }

    API.analytics.shareEvent('LINKEDIN');
  }

  addStyle() {
    const css = ` .linkedinShare {
                    background-color: ${this.backgroundColor};
                    border: 1px solid ${this.borderColor};
                    color: ${this.textColor};
                  }
                  
                  .linkedinShare:hover {
                    background: ${shadeColor(this.backgroundColor, 10)};
                    border-color: ${shadeColor(this.borderColor, 12)};
                    color: ${this.textColor};
                  }
                  
                  .linkedinShare:focus {
                    color: ${this.textColor};
                  } `
    const style = document.createElement('style');

    style.appendChild(document.createTextNode(css));
    document.getElementsByTagName('head')[0].appendChild(style);
  }

  componentDidLoad() {
    let el = this.button.getElementsByClassName('linkedinShare')[0];
    let pictureString = this.shareImage ? `&picture=${this.shareImage}` : "";
    this.linkedinUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${this.link}&title=${this.title}&summary=${this.summary}${pictureString}&source=${this.redirectUrl}`;
    //TODO: need to url encode this

    el.setAttribute("href", this.linkedinUrl);
    el.addEventListener("click", this.clickHandler.bind(this), false);
    el.addEventListener("touchStart", this.clickHandler.bind(this), false);

    addClass(el, this.displayRule);

    /*var md = new MobileDetect(window.navigator.userAgent);
    var UA = md.userAgent();

    if (UA === 'Safari') {
      smsBtn.target = '_parent';
    }*/

    this.addStyle();
  }

  render() {
    return (
      <div>
        <a class="btn btn-linkedin squatch-share-btn linkedinShare" target="_blank">
          <i class="icon icon-linkedin"></i>
          {this.text}
        </a>
      </div>
    );
  }
}
