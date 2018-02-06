import { Component, Prop, Element, State} from '@stencil/core';
import { shadeColor } from '../../utilities';

@Component({
  tag: 'twitter-share-button',
  styleUrl: 'twitter-share-button.scss'
})
export class TwitterShareButton {
  @Prop() text: string = "Tweet";
  @Prop() backgroundColor: string = "#4797d2";
  @Prop() borderColor: string = "#4797d2";
  @Prop() textColor: string = "#fff";
  @Prop() twMessage: string = "";

  @State() twurl: string;

  @Element() twitterShareButton: HTMLElement;

  twitterHandler(e) {
    if (e.type != 'touchstart') {
      e.preventDefault();

      var url = this.twurl + "&display=popup";
      window.open(url, 'fb', 'status=0,width=620,height=400');
    }

    // TODO: Wire up analytics once api includes shareEvent
    // const API: MyAPI = window["WidgetHost"];
    // API.analytics.
    // window.frameElement.squatchJsApi._shareEvent(window.squatch, 'TWITTER');
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
    let el = this.twitterShareButton.getElementsByClassName('twitterShare')[0];
    
    this.twurl = `https://twitter.com/intent/tweet?source=webclient&amp;text=${encodeURIComponent(this.twMessage).replace(/%20/g, "+")}`;
    
    el.setAttribute("href", this.twurl);
    el.addEventListener("click", this.twitterHandler.bind(this), false);
    el.addEventListener("touchStart", this.twitterHandler.bind(this), false);

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
