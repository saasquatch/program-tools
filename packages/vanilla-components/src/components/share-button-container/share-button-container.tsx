import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'sqh-share-button-container',
  styleUrl: 'share-button-container.scss'
})
export class ShareButtonContainer {
  @Prop() maxwidth: string = "441px";
  @Prop() hidden: boolean = false;

  @Prop() emaildisplayrule: string;
  @Prop() facebookdisplayrule: string;
  @Prop() smsdisplayrule: string;
  @Prop() twitterdisplayrule: string;
  @Prop() whatsappdisplayrule: string;

  @Prop() emailtext: string;
  @Prop() facebooktext: string;
  @Prop() twittertext: string;
  @Prop() smstext: string;
  @Prop() whatsapptext: string;

  @Prop() emailcolor: string;
  @Prop() facebookcolor: string;
  @Prop() twittercolor: string;
  @Prop() smscolor: string;
  @Prop() whatsappcolor: string;
  
  addStyle() {
    const display = this.hidden ? 'none' : 'block';
    const css = ` sqh-share-button-container {
                    max-width: ${this.maxwidth};
                    display: ${display} 
                  } `
    const style = document.createElement('style');

    style.appendChild(document.createTextNode(css));
    document.getElementsByTagName('head')[0].appendChild(style);
  }

  componentDidLoad() {
    this.addStyle();
  }

  render() {
    const emailBtn = <sqh-email-share-button 
                        displayrule={this.emaildisplayrule} 
                        text={this.emailtext}
                        backgroundcolor={this.emailcolor}
                      />
    const facebookBtn = <sqh-facebook-share-button 
                          displayrule={this.facebookdisplayrule}
                          text={this.facebooktext}
                          backgroundcolor={this.facebookcolor}  
                        />
    const twitterBtn = <sqh-twitter-share-button 
                          displayrule={this.twitterdisplayrule}
                          text={this.twittertext}
                          backgroundcolor={this.twittercolor}
                        />;
    const smsBtn = <sqh-sms-share-button 
                      displayrule={this.smsdisplayrule}
                      text={this.smstext}
                      backgroundcolor={this.smscolor}
                    />;
    const whatsappBtn = <sqh-whatsapp-share-button 
                          displayrule={this.whatsappdisplayrule}
                          text={this.whatsapptext}
                          backgroundcolor={this.whatsappcolor}
                        />;

    return (
      <div>
        {emailBtn}
        {facebookBtn}
        {twitterBtn}
        {smsBtn}
        {whatsappBtn}
      </div>
    );
  }
}
  