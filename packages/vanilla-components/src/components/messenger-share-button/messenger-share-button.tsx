import { Component, Prop, Element, State } from '@stencil/core';
import { shadeColor, detectMobileSafari } from '../../utilities';

const API: MyAPI = window["WidgetHost"];

@Component({
  tag: 'sqh-messenger-share-button',
  styleUrl: "messenger-share-button.scss"
})
export class MessengerShareButton {
  @Prop() text: string = "Messenger";
  @Prop() backgroundcolor: string = "#0084ff";
  @Prop() textcolor: string = "#fff";
  @Prop() displayrule: string = "mobile-and-desktop";
  @State() messengerurl: string;
  @Element() messengerShareButton: HTMLElement;

  // what happens on click
  messengerClickHandler(e) {
    if (e.type != 'touchstart') {
      e.preventDefault();

      // sets url to include popup display so it is smaller (not full length)
      let url = this.messengerurl + '&display=popup';
      // opens a new window with messenger link
      window.open(url, 'messenger', 'status=0,width=550,height=450');
    }

    // not sure what this if for (some kind of analytics tracking for clicks?)
    API.analytics.shareEvent('MESSENGER');
  }

  // dynamically renders style rules based on props
  addStyle() {
    const css = ` .messengerShare {
                    background-color: ${this.backgroundcolor};
                    border: 1px solid ${this.backgroundcolor};
                    color: ${this.textcolor};
                    text-decoration: none;
                  }
                  
                  .messengerShare:hover {
                    background: ${shadeColor(this.backgroundcolor, 10)};
                    border-color: ${shadeColor(this.backgroundcolor, 12)};
                    color: ${this.textcolor};
                    text-decoration: none;
                  }
                  
                  .messengerShare:focus {
                    color: ${this.textcolor};
                    text-decoration: none;
                  }`
    
    const style = document.createElement('style');

    style.appendChild(document.createTextNode(css));
    document.getElementsByTagName('head')[0].appendChild(style);
  }

  componentDidLoad() {
    // some kind of mobile device detection
    let isMobileSafari = detectMobileSafari();

    // declaring variable el to be the messenger button
    let el = this.messengerShareButton.getElementsByClassName('messengerShare')[0];

    // not sure about what this does? (mimicks getting a url from a graphQL call?)
    this.messengerurl = `https://www.facebook.com/dialog/send?app_id=157382547792399&link=http://ssqt.co/mzddNkO&redirect_uri=http://app.referralsaasquatch.com/widget/close`
    
    // alternate action if mobile
    if (isMobileSafari) {
      el.setAttribute("target", "_parent");
    }

    // sets the messenger button to have attribute of href set to the state of the url
    el.setAttribute('href', this.messengerurl);
    // on click event handlers
    el.addEventListener('click', this.messengerClickHandler.bind(this), false);
    el.addEventListener('touchStart', this.messengerClickHandler.bind(this), false);

    // loads styles based on props when loaded
    this.addStyle();
  }

  componentWillUpdate() {
    // updates styles if props change
    this.addStyle()
  }

  render() {
    // need equivalent to 'btn-facebook' class?
    const classes = `btn squatch-share-btn messengerShare ${this.displayrule}`;

    return (
      <div>
        <a class={classes} target="_blank">
          <i class="icon icon-messenger"></i>
          {this.text}
        </a>
      </div>
    );
  }
}