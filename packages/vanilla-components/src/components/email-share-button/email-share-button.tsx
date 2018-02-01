import { Component, Prop, Element} from '@stencil/core';

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
  tag: 'email-share-button',
  styleUrl: 'email-share-button.scss'
})
export class EmailShareButton {
  @Prop() text: string = "Email";
  @Prop() emailSubject: string = "";
  @Prop() emailBody: string = "";
  @Prop() backgroundColor: string = "#373a3d";
  @Prop() borderColor: string = "#373a3d";
  @Prop() textColor: string = "#fff";

  @Element() emailShareButton: HTMLElement;

  emailHandler(e) {
    if (e.type != 'touchstart') {
      e.preventDefault();
      var mailurl = `mailto:?subject=${encodeURIComponent(this.emailSubject)}&body=${encodeURIComponent(this.emailBody)}`;
      mailTo(mailurl);
    }

    // TODO: Wire up analytics once api includes shareEvent
    // const API: MyAPI = window["WidgetHost"];
    // API.analytics.
    // window.frameElement.squatchJsApi._shareEvent(window.squatch, 'EMAIL');
  }

  addStyle() {
    const css = ` .emailShare {
                    background-color: ${this.backgroundColor};
                    border-color: ${this.borderColor};
                    color: ${this.textColor};
                  }
                  
                  .emailShare:hover {
                    background: darken(${this.backgroundColor}, 10%);
                    border-color: darken(#${this.borderColor}, 12%);
                    color: ${this.textColor};
                  }
                  
                  .emailShare:focus {
                    color: ${this.textColor};
                  } `
    const style = document.createElement('style');

    style.appendChild(document.createTextNode(css));
    document.getElementsByTagName('head')[0].appendChild(style);
  }

  componentDidLoad() {
    let el = this.emailShareButton.getElementsByClassName('emailShare')[0];
    
    el.setAttribute("href", "https://www.google.com");
    el.addEventListener("click", this.emailHandler.bind(this), false);
    el.addEventListener("touchStart", this.emailHandler.bind(this), false);

    this.addStyle();
  }

  render() {
    return (
      <div>
        <a class="btn btn-email squatch-share-btn emailShare" target="_blank">
          <i class="icon icon-mail"></i>
          {this.text}
        </a>
      </div>
    );
  }
}
