import { Component, Prop, Element} from '@stencil/core';
import { shadeColor, addClass, detectMobileSafari } from '../../utilities';

const API: MyAPI = window["WidgetHost"];

@Component({
  tag: 'sqh-whatsapp-share-button',
  styleUrl: 'whatsapp-share-button.scss'
})
export class WhatsappShareButton {
  @Prop() text: string = "Whatsapp";
  @Prop() sharebody: string;
  @Prop() backgroundcolor: string = "#25D366";
  @Prop() bordercolor: string = "#25D366";
  @Prop() textcolor: string = "#fff";
  @Prop() displayrule: string = "mobile-only"
  @Element() button: HTMLElement;

  clickHandler() {
    API.analytics.shareEvent('WHATSAPP');
  }

  addStyle() {
    const css = ` .whatsappShare {
                    background-color: ${this.backgroundcolor};
                    border: 1px solid ${this.bordercolor};
                    color: ${this.textcolor};
                  }
                  
                  .whatsappShare:hover {
                    background: ${shadeColor(this.backgroundcolor, 10)};
                    border-color: ${shadeColor(this.bordercolor, 12)};
                    color: ${this.textcolor};
                  }
                  
                  .whatsappShare:focus {
                    color: ${this.textcolor};
                  } `
    const style = document.createElement('style');

    style.appendChild(document.createTextNode(css));
    document.getElementsByTagName('head')[0].appendChild(style);
  }

  componentDidLoad() {
    let isMobileSafari = detectMobileSafari();
    let el = this.button.getElementsByClassName('whatsappShare')[0];
    let url = ' whatsapp://send?text=' + this.sharebody;
    
    if (isMobileSafari) {
      el.setAttribute("target", "_parent");
    }

    el.setAttribute("href", url);
    el.addEventListener("click", this.clickHandler.bind(this), false);
    el.addEventListener("touchStart", this.clickHandler.bind(this), false);

    addClass(el, this.displayrule);
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
