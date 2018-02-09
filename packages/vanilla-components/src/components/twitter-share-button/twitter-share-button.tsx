import { Component, Prop, Element, State} from '@stencil/core';
import { shadeColor, addClass, detectMobileSafari } from '../../utilities';

const API: MyAPI = window["WidgetHost"];

@Component({
  tag: 'sqh-twitter-share-button',
  styleUrl: 'twitter-share-button.scss'
})
export class TwitterShareButton {
  @Prop() text: string = "Tweet";
  @Prop() backgroundColor: string = "#4797d2";
  @Prop() borderColor: string = "#4797d2";
  @Prop() textColor: string = "#fff";
  @Prop() twMessage: string = "";
  @Prop() displayRule: string = "mobile-and-desktop";
  @State() twurl: string;

  @Element() twitterShareButton: HTMLElement;

  clickHandler(e) {
    if (e.type != 'touchstart') {
      e.preventDefault();

      var url = this.twurl + "&display=popup";
      window.open(url, 'fb', 'status=0,width=620,height=400');
    }

    API.analytics.shareEvent('TWITTER');
  }

  addStyle() {
    const css = ` .twitterShare {
                    background-color: ${this.backgroundColor};
                    border: 1px solid ${this.borderColor};
                    color: ${this.textColor};
                  }
                  
                  .twitterShare:hover {
                    background: ${shadeColor(this.backgroundColor, 10)};
                    border-color: ${shadeColor(this.borderColor, 12)};
                    color: ${this.textColor};
                  }
                  
                  .twitterShare:focus {
                    color: ${this.textColor};
                  } `
    const style = document.createElement('style');

    style.appendChild(document.createTextNode(css));
    document.getElementsByTagName('head')[0].appendChild(style);
  }

  componentDidLoad() {
    let isMobileSafari = detectMobileSafari();
    let el = this.twitterShareButton.getElementsByClassName('twitterShare')[0];
    this.twurl = `https://twitter.com/intent/tweet?source=webclient&amp;text=${encodeURIComponent(this.twMessage).replace(/%20/g, "+")}`;
    
    if (isMobileSafari) {
      el.setAttribute("target", "_parent");
    }

    el.setAttribute("href", this.twurl);
    el.addEventListener("click", this.clickHandler.bind(this), false);
    el.addEventListener("touchStart", this.clickHandler.bind(this), false);

    addClass(el, this.displayRule);
    this.addStyle();
  }

  render() {
    return (
      <div>
        <a class="btn btn-twitter squatch-share-btn twitterShare" target="_blank">
          <i class="icon icon-twitter"></i>
          {this.text}
        </a>
      </div>
    );
  }
}
