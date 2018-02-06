import { Component, Prop, Element} from '@stencil/core';
import { shadeColor, addClass } from '../../utilities';

const API: MyAPI = window["WidgetHost"];

@Component({
  tag: 'sms-share-button',
  styleUrl: 'sms-share-button.scss'
})
export class SmsShareButton {
  @Prop() text: string = "SMS";
  @Prop() shareBody: string;
  @Prop() backgroundColor: string = "#7bbf38";
  @Prop() borderColor: string = "#7bbf38";
  @Prop() textColor: string = "#fff";
  @Prop() displayRule: string = "mobile-only"
  @Element() smsShareButton: HTMLElement;

  smsHandler() {
    API.analytics.shareEvent('SMS');
  }

  addStyle() {
    const css = ` .smsShare {
                    background-color: ${this.backgroundColor};
                    border: 1px solid ${this.borderColor};
                    color: ${this.textColor};
                  }
                  
                  .smsShare:hover {
                    background: ${shadeColor(this.backgroundColor, 10)};
                    border-color: ${shadeColor(this.borderColor, 12)};
                    color: ${this.textColor};
                  }
                  
                  .smsShare:focus {
                    color: ${this.textColor};
                  } `
    const style = document.createElement('style');

    style.appendChild(document.createTextNode(css));
    document.getElementsByTagName('head')[0].appendChild(style);
  }

  componentDidLoad() {
    let el = this.smsShareButton.getElementsByClassName('smsShare')[0];
    let smsUrl = 'sms:?&body=' + this.shareBody;
    
    el.setAttribute("href", smsUrl);
    el.addEventListener("click", this.smsHandler.bind(this), false);
    el.addEventListener("touchStart", this.smsHandler.bind(this), false);

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
        <a class="btn btn-sms squatch-share-btn smsShare" target="_blank">
          <i class="icon icon-chat"></i>
          {this.text}
        </a>
      </div>
    );
  }
}
