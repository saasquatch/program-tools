import { Component, Prop, Element, State} from '@stencil/core';
import { shadeColor } from '../../utilities';

@Component({
  tag: 'facebook-share-button',
  styleUrl: 'facebook-share-button.scss',
  assetsDir: '../../assets/fonts'
})
export class FacebookShareButton {
  @Prop() text: string = "Share";
  @Prop() backgroundColor: string = "#234079";
  @Prop() borderColor: string = "#234079";
  @Prop() textColor: string = "#fff";

  @State() fburl: string;

  @Element() facebookShareButton: HTMLElement;

  facebookHandler(e) {
    if (e.type != 'touchstart') {
      e.preventDefault();

      var url = this.fburl + "&display=popup";
      window.open(url, 'fb', 'status=0,width=620,height=400');
    }

    // TODO: Wire up analytics once api includes shareEvent
    // const API: MyAPI = window["WidgetHost"];
    // API.analytics.
    // window.frameElement.squatchJsApi._shareEvent(window.squatch, 'FACEBOOK');
  }

  addStyle() {
    const css = ` .fbShare {
                    background-color: ${this.backgroundColor};
                    border: 1px solid ${this.borderColor};
                    color: ${this.textColor};
                  }
                  
                  .fbShare:hover {
                    background: ${shadeColor(this.backgroundColor, 10)};
                    border-color: ${shadeColor(this.borderColor, 12)};
                    color: ${this.textColor};
                  }
                  
                  .fbShare:focus {
                    color: ${this.textColor};
                  } `
    const style = document.createElement('style');

    style.appendChild(document.createTextNode(css));
    document.getElementsByTagName('head')[0].appendChild(style);
  }

  componentDidLoad() {
    let el = this.facebookShareButton.getElementsByClassName('fbShare')[0];

    this.fburl = `https://www.facebook.com/dialog/feed?app_id=157382547792399&link=http://ssqt.co/mzddNkO&redirect_uri=http://app.referralsaasquatch.com/widget/close`;
    
    el.setAttribute("href", this.fburl);
    el.addEventListener("click", this.facebookHandler.bind(this), false);
    el.addEventListener("touchStart", this.facebookHandler.bind(this), false);

    this.addStyle();
  }

  render() {
    return (
      <div>
        <a class="btn btn-facebook squatch-share-btn fbShare" target="_blank">
          <i class="icon icon-facebook"></i>
          {this.text}
        </a>
      </div>
    );
  }
}
