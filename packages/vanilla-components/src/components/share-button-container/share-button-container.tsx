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
  @Prop() linkedindisplayrule: string;
  @Prop() pinterestdisplayrule: string;
  @Prop() messengerdisplayrule: string;

  @Prop() emailtext: string;
  @Prop() facebooktext: string;
  @Prop() twittertext: string;
  @Prop() smstext: string;
  @Prop() whatsapptext: string;
  @Prop() linkedintext: string;
  @Prop() pinteresttext: string;
  @Prop() messengertext: string;

  @Prop() emailcolor: string;
  @Prop() facebookcolor: string;
  @Prop() twittercolor: string;
  @Prop() smscolor: string;
  @Prop() whatsappcolor: string;
  @Prop() linkedincolor: string;
  @Prop() pinterestcolor: string;
  @Prop() messengercolor: string;
  
  addStyle() {
    const css = ` sqh-share-button-container {
                    max-width: ${this.maxwidth};
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

    const linkedinBtn = <sqh-linkedin-share-button 
                          displayrule={this.linkedindisplayrule}
                          text={this.linkedintext}
                          backgroundcolor={this.linkedincolor}
                        />

    const pinterestBtn = <sqh-pinterest-share-button
                          displayrule={this.pinterestdisplayrule}
                          text={this.pinteresttext}
                          backgroundcolor={this.pinterestcolor}
                        />

    const messengerBtn = <sqh-messenger-share-button
                          displayrule={this.messengerdisplayrule}
                          text={this.messengertext}
                          backgroundcolor={this.messengercolor}
                          />

    const shareSection = this.hidden ? `` :
                          <div>
                            {emailBtn}
                            {facebookBtn}
                            {twitterBtn}
                            {smsBtn}
                            {whatsappBtn}
                            {linkedinBtn}
                            {pinterestBtn}
                            {messengerBtn}
                          </div>

    return shareSection;
  }
}
  