import { Component, Prop, Element, State} from '@stencil/core';
import { shadeColor, detectMobileSafari } from '../../utilities';

const API: MyAPI = window["WidgetHost"];

@Component({
  tag: 'sqh-facebook-share-button',
  styleUrl: 'facebook-share-button.scss'
})
export class FacebookShareButton {
  @Prop() text: string = "Share";
  @Prop() backgroundcolor: string = "#234079";
  @Prop() textcolor: string = "#fff";
  @Prop() displayrule: string = "mobile-and-desktop"
  @State() fburl: string;
  @Element() facebookShareButton: HTMLElement;

  facebookHandler(e) {
    if (e.type != 'touchstart') {
      e.preventDefault();

      var url = this.fburl + "&display=popup";
      window.open(url, 'fb', 'status=0,width=620,height=400');
    }

    API.analytics.shareEvent('FACEBOOK');
  }

  addStyle() {
    const css = ` .fbShare {
                    background-color: ${this.backgroundcolor};
                    border: 1px solid ${this.backgroundcolor};
                    color: ${this.textcolor};
                  }
                  
                  .fbShare:hover {
                    background: ${shadeColor(this.backgroundcolor, 10)};
                    border-color: ${shadeColor(this.backgroundcolor, 12)};
                    color: ${this.textcolor};
                  }
                  
                  .fbShare:focus {
                    color: ${this.textcolor};
                  } `
    const style = document.createElement('style');

    style.appendChild(document.createTextNode(css));
    document.getElementsByTagName('head')[0].appendChild(style);
  }

  componentDidLoad() {
    let isMobileSafari = detectMobileSafari();
    let el = this.facebookShareButton.getElementsByClassName('fbShare')[0];

    this.fburl = `https://www.facebook.com/dialog/feed?app_id=157382547792399&link=http://ssqt.co/mzddNkO&redirect_uri=http://app.referralsaasquatch.com/widget/close`;

    if (isMobileSafari) {
      el.setAttribute("target", "_parent");
    }

    el.setAttribute("href", this.fburl);
    el.addEventListener("click", this.facebookHandler.bind(this), false);
    el.addEventListener("touchStart", this.facebookHandler.bind(this), false);

    this.addStyle();
  }

  componentWillUpdate() {
    this.addStyle();
  }

  render() {
    const classes = `btn btn-facebook squatch-share-btn fbShare ${this.displayrule}`;

    return (
      <div>
        <a class={classes} target="_blank">
          <i class="icon icon-facebook"></i>
          {this.text}
        </a>
      </div>
    );
  }
}
