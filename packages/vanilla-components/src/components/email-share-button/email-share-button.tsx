import { Component, Prop, Element, State} from '@stencil/core';
import { shadeColor, detectMobileSafari } from '../../utilities';

const API: MyAPI = window["WidgetHost"];
const mailTo = (url) => {
  try {
    var mailer = window.open(url, 'Mailer');
  } catch(e) {
    console.warn('There was an error opening a mail composer.', e);
  }

  setTimeout(function() {
    // This needs to be in a try/catch block because a Security
    // error is thrown if the protocols doesn't match
    try {
      // At least in Firefox the location is changed to about:blank
      if(mailer.location.href === url || mailer.location.href.substr(0, 6) === 'about:') {
        mailer.close();
      }
    } catch(e) {
      console.warn('There was an error opening a mail composer.', e);
    }
  }, 500);
}

@Component({
  tag: 'sqh-email-share-button',
  styleUrl: 'email-share-button.scss'
})
export class EmailShareButton {
  @Prop() text: string = "Email";
  @Prop() emailsubject: string = "Your friend wants to give stuff!";
  @Prop() emailbody: string = "Hey friend, do this thing and get free stuff! Yay free stuff!";
  @Prop() backgroundcolor: string = "#373a3d";
  @Prop() textcolor: string = "#fff";
  @Prop() displayrule: string = "mobile-and-desktop";
  @State() mailurl: string;
  @Element() emailShareButton: HTMLElement;

  clickHandler(e) {
    if (e.type != 'touchstart') {
      e.preventDefault();
      mailTo(this.mailurl);
    }

    API.analytics.shareEvent('EMAIL');
  }

  addStyle() {
    const css = ` .emailShare {
                    background-color: ${this.backgroundcolor};
                    border: 1px solid ${this.backgroundcolor};
                    color: ${this.textcolor};
                  }
                  
                  .emailShare:hover {
                    background: ${shadeColor(this.backgroundcolor, 10)};
                    border-color: ${shadeColor(this.backgroundcolor, 12)};
                    color: ${this.textcolor};
                  }
                  
                  .emailShare:focus {
                    color: ${this.textcolor};
                  } `
    const style = document.createElement('style');

    style.appendChild(document.createTextNode(css));
    document.getElementsByTagName('head')[0].appendChild(style);
  }

  componentDidLoad() {
    let isMobileSafari = detectMobileSafari();
    let el = this.emailShareButton.getElementsByClassName('emailShare')[0];

    this.mailurl = `mailto:?subject=${encodeURIComponent(this.emailsubject)}&body=${encodeURIComponent(this.emailbody)}`;
    
    if (isMobileSafari) {
      el.setAttribute("target", "_parent");
    }

    el.setAttribute("href", this.mailurl);
    el.addEventListener("click", this.clickHandler.bind(this), false);
    el.addEventListener("touchStart", this.clickHandler.bind(this), false);

    this.addStyle();
  }

  componentWillUpdate() {
    this.addStyle();
  }

  render() {
    const classes = `btn btn-email squatch-share-btn emailShare ${this.displayrule}`;

    return (
      <div>
        <a class={classes} target="_blank">
          <i class="icon icon-mail"></i>
          {this.text}
        </a>
      </div>
    );
  }
}
