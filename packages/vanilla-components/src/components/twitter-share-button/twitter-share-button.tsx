import { Component, Prop, Element, State} from '@stencil/core';
import { shadeColor, addClass, detectMobileSafari } from '../../utilities';

const API: MyAPI = window["WidgetHost"];

@Component({
  tag: 'sqh-twitter-share-button',
  styleUrl: 'twitter-share-button.scss'
})
export class TwitterShareButton {
  @Prop() text: string = "Tweet";
  @Prop() backgroundcolor: string = "#4797d2";
  @Prop() bordercolor: string = "#4797d2";
  @Prop() textcolor: string = "#fff";
  @Prop() twmessage: string = "";
  @Prop() displayrule: string = "mobile-and-desktop";
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
                    background-color: ${this.backgroundcolor};
                    border: 1px solid ${this.bordercolor};
                    color: ${this.textcolor};
                  }
                  
                  .twitterShare:hover {
                    background: ${shadeColor(this.backgroundcolor, 10)};
                    border-color: ${shadeColor(this.bordercolor, 12)};
                    color: ${this.textcolor};
                  }
                  
                  .twitterShare:focus {
                    color: ${this.textcolor};
                  } `
    const style = document.createElement('style');

    style.appendChild(document.createTextNode(css));
    document.getElementsByTagName('head')[0].appendChild(style);
  }

  
  

  componentDidLoad() {
    let isMobileSafari = detectMobileSafari();
    let el = this.twitterShareButton.getElementsByClassName('twitterShare')[0];
    this.twurl = `https://twitter.com/intent/tweet?source=webclient&amp;text=${encodeURIComponent(this.twmessage).replace(/%20/g, "+")}`;
    
    if (isMobileSafari) {
      el.setAttribute("target", "_parent");
    }

    el.setAttribute("href", this.twurl);
    el.addEventListener("click", this.clickHandler.bind(this), false);
    el.addEventListener("touchStart", this.clickHandler.bind(this), false);

    addClass(el, this.displayrule);
    this.addStyle();
  }

  componentWillUpdate() {
    let el = this.twitterShareButton.getElementsByClassName('twitterShare')[0];
    addClass(el, this.displayrule);
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
