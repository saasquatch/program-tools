import { Component, Prop, Element, State} from '@stencil/core';
import { shadeColor, detectMobileSafari } from '../../utilities';

const API: MyAPI = window["WidgetHost"];

@Component({
  tag: 'sqh-pinterest-share-button',
  styleUrl: 'pinterest-share-button.scss'
})
export class PinterestShareButton {
  @Prop() text: string = "Pinterest";
  @Prop() backgroundcolor: string = "#cb2027";
  @Prop() textcolor: string = "#fff";
  @Prop() displayrule: string = "mobile-and-desktop"
  @State() url: string;
  @Element() pinterestShareButton: HTMLElement;

  handler(e) {
    if (e.type != 'touchstart') {
      e.preventDefault();

      var url = this.url + "&display=popup";
      window.open(url, 'pinterest', 'status=0,width=620,height=400');
    }

    API.analytics.shareEvent('PINTEREST');
  }

  addStyle() {
    const css = ` .pinterestShare {
                    background-color: ${this.backgroundcolor};
                    border: 1px solid ${this.backgroundcolor};
                    color: ${this.textcolor};
                  }
                  
                  .pinterestShare:hover {
                    background: ${shadeColor(this.backgroundcolor, 10)};
                    border-color: ${shadeColor(this.backgroundcolor, 12)};
                    color: ${this.textcolor};
                  }
                  
                  .pinterestShare:focus {
                    color: ${this.textcolor};
                  } `
    const style = document.createElement('style');

    style.appendChild(document.createTextNode(css));
    document.getElementsByTagName('head')[0].appendChild(style);
  }

  componentDidLoad() {
    let isMobileSafari = detectMobileSafari();
    let el = this.pinterestShareButton.getElementsByClassName('pinterestShare')[0];

    this.url = `https://sharelink.here`;

    if (isMobileSafari) {
      el.setAttribute("target", "_parent");
    }

    el.setAttribute("href", this.url);
    el.addEventListener("click", this.handler.bind(this), false);
    el.addEventListener("touchStart", this.handler.bind(this), false);

    this.addStyle();
  }

  componentWillUpdate() {
    this.addStyle();
  }

  render() {
    const classes = `btn btn-pinterest squatch-share-btn pinterestShare ${this.displayrule}`;

    return (
      <div>
        <a class={classes} target="_blank">
          <i class="icon icon-pinterest"></i>
          {this.text}
        </a>
      </div>
    );
  }
}
