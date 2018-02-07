import { Component, Prop, Element} from '@stencil/core';
import { shadeColor, addClass } from '../../utilities';

const API: MyAPI = window["WidgetHost"];

@Component({
  tag: 'sqh-whatsapp-share-button',
  styleUrl: 'whatsapp-share-button.scss'
})
export class WhatsappShareButton {
  @Prop() text: string = "Whatsapp";
  @Prop() shareBody: string;
  @Prop() backgroundColor: string = "#25D366";
  @Prop() borderColor: string = "#25D366";
  @Prop() textColor: string = "#fff";
  @Prop() displayRule: string = "mobile-only"
  @Element() button: HTMLElement;

  clickHandler() {
    API.analytics.shareEvent('WHATSAPP');
  }

  addStyle() {
    const css = ` .whatsappShare {
                    background-color: ${this.backgroundColor};
                    border: 1px solid ${this.borderColor};
                    color: ${this.textColor};
                  }
                  
                  .whatsappShare:hover {
                    background: ${shadeColor(this.backgroundColor, 10)};
                    border-color: ${shadeColor(this.borderColor, 12)};
                    color: ${this.textColor};
                  }
                  
                  .whatsappShare:focus {
                    color: ${this.textColor};
                  } `
    const style = document.createElement('style');

    style.appendChild(document.createTextNode(css));
    document.getElementsByTagName('head')[0].appendChild(style);
  }

  componentDidLoad() {
    let el = this.button.getElementsByClassName('whatsappShare')[0];
    let url = ' whatsapp://send?text=' + this.shareBody;
    
    el.setAttribute("href", url);
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
        <a class="btn btn-whatsapp squatch-share-btn whatsappShare" target="_blank">
          <i class="icon icon-whatsapp"></i>
          {this.text}
        </a>
      </div>
    );
  }
}
