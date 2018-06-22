import { Component, Prop, Element} from '@stencil/core';
import { shadeColor, addClass, detectMobileSafari } from '../../utilities';

const API: MyAPI = window["WidgetHost"];

@Component({
  tag: 'sqh-sms-share-button',
  styleUrl: 'sms-share-button.scss'
})
export class SmsShareButton {
  @Prop() text: string = "SMS";
  @Prop() sharebody: string;
  @Prop() backgroundcolor: string = "#7bbf38";
  @Prop() bordercolor: string = "#7bbf38";
  @Prop() textcolor: string = "#fff";
  @Prop() displayrule: string = "mobile-only"
  @Element() smsShareButton: HTMLElement;

  smsHandler() {
    API.analytics.shareEvent('SMS');
  }

  addStyle() {
    const css = ` .smsShare {
                    background-color: ${this.backgroundcolor};
                    border: 1px solid ${this.bordercolor};
                    color: ${this.textcolor};
                  }
                  
                  .smsShare:hover {
                    background: ${shadeColor(this.backgroundcolor, 10)};
                    border-color: ${shadeColor(this.bordercolor, 12)};
                    color: ${this.textcolor};
                  }
                  
                  .smsShare:focus {
                    color: ${this.textcolor};
                  } `
    const style = document.createElement('style');

    style.appendChild(document.createTextNode(css));
    document.getElementsByTagName('head')[0].appendChild(style);
  }

  componentDidLoad() {
    let isMobileSafari = detectMobileSafari;
    let el = this.smsShareButton.getElementsByClassName('smsShare')[0];
    let smsUrl = 'sms:?&body=' + this.sharebody;
    
    if (isMobileSafari) {
      el.setAttribute("target", "_parent");
    }

    el.setAttribute("href", smsUrl);
    el.addEventListener("click", this.smsHandler.bind(this), false);
    el.addEventListener("touchStart", this.smsHandler.bind(this), false);

    addClass(el, this.displayrule);
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
