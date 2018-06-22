import { Component, Prop, Element, State} from '@stencil/core';
import { shadeColor, addClass, detectMobileSafari } from '../../utilities';

const API: MyAPI = window["WidgetHost"];

@Component({
  tag: 'sqh-linkedin-share-button',
  styleUrl: 'linkedin-share-button.scss'
})
export class LinkedinShareButton {
  @Prop() text: string = "linkedin";
  @Prop() sharebody: string;
  @Prop() backgroundcolor: string = "#0084b9";
  @Prop() bordercolor: string = "#0084b9";
  @Prop() textcolor: string = "#fff";
  @Prop() shareimage: string;
  @Prop() link: string;
  @Prop() linktitle: string;
  @Prop() summary: string;
  @Prop() redirecturl: string;
  @Prop() displayrule: string = "mobile-and-desktop";
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
                    background-color: ${this.backgroundcolor};
                    border: 1px solid ${this.bordercolor};
                    color: ${this.textcolor};
                  }
                  
                  .linkedinShare:hover {
                    background: ${shadeColor(this.backgroundcolor, 10)};
                    border-color: ${shadeColor(this.bordercolor, 12)};
                    color: ${this.textcolor};
                  }
                  
                  .linkedinShare:focus {
                    color: ${this.textcolor};
                  } `
    const style = document.createElement('style');

    style.appendChild(document.createTextNode(css));
    document.getElementsByTagName('head')[0].appendChild(style);
  }

  componentDidLoad() {
    let isMobileSafari  = detectMobileSafari();
    let el = this.button.getElementsByClassName('linkedinShare')[0];
    let pictureString = this.shareimage ? `&picture=${this.shareimage}` : "";
    this.linkedinUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${this.link}&title=${this.linktitle}&summary=${this.summary}${pictureString}&source=${this.redirecturl}`;
    //TODO: need to url encode this
    if (isMobileSafari) {
      el.setAttribute("target", "_parent");
    }

    el.setAttribute("href", this.linkedinUrl);
    el.addEventListener("click", this.clickHandler.bind(this), false);
    el.addEventListener("touchStart", this.clickHandler.bind(this), false);

    addClass(el, this.displayrule);
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
