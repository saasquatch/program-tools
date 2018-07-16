import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'sqh-share-button-container',
  styleUrl: 'share-button-container.scss'
})
export class ShareButtonContainer {
  @Prop() maxwidth: string = "441px";
  @Prop() hidden: boolean = false;

  // Email button properties and default settings
  @Prop() emaildisplayrule: string = "mobile-and-desktop";
  @Prop() emailtext: string = "Email";
  @Prop() emailbackgroundcolor: string = "#373a3d";
  @Prop() emailtextcolor: string = "#fff";
  @Prop() emailicon: string = "mail";
  @Prop() emailurl: string = `mailto:?subject=testsubject&body=NEWtestbody`;
  // @Prop() emailclassName: string = "emailShare";

  // FaceBook button properties and default settings
  @Prop() facebookdisplayrule: string = "mobile-and-desktop";
  @Prop() facebooktext: string = "Share";
  @Prop() facebookbackgroundcolor: string = "#234079";
  @Prop() facebooktextcolor: string = "#fff";
  @Prop() facebookicon: string = "facebook";
  @Prop() facebookurl: string;
  // @Prop() facebookclassName: string = "facebookShare";

  // Twitter button properties and default settings
  @Prop() twitterdisplayrule: string = "mobile-and-desktop";
  @Prop() twittertext: string = "Tweet";
  @Prop() twitterbackgroundcolor: string = "#4797d2";
  @Prop() twittertextcolor: string = "#fff";
  @Prop() twittericon: string = "twitter";
  @Prop() twitterurl: string;
  @Prop() twitterclassName: string;

  // SMS button properties and default settings
  @Prop() smsdisplayrule: string = "mobile-only";
  @Prop() smstext: string = "SMS";
  @Prop() smsbackgroundcolor: string = "#7bbf38";
  @Prop() smstextcolor: string = "#fff";
  @Prop() smsicon: string = "chat";
  @Prop() smsurl: string;
  @Prop() smsclassName: string;

  // Whatsapp button properties and default settings
  @Prop() whatsappdisplayrule: string = "mobile-only";
  @Prop() whatsapptext: string = "Whatsapp";
  @Prop() whatsappbackgroundcolor: string = "#25D366";
  @Prop() whatsapptextcolor: string = "#fff";
  @Prop() whatsappicon: string = "whatsapp";
  @Prop() whatsappurl: string;
  @Prop() whatsappclassName: string;
  
  // LinkedIn button properties and default settings
  @Prop() linkedindisplayrule: string = "desktop-only";
  @Prop() linkedintext: string = "LinkedIn";
  @Prop() linkedinbackgroundcolor: string = "#0084b9";
  @Prop() linkedintextcolor: string = "#fff";
  @Prop() linkedinicon: string = "linkedin";
  @Prop() linkedinurl: string;
  @Prop() linkedinclassName: string;

  // Pinterest button properties and default settings
  @Prop() pinterestdisplayrule: string = "mobile-and-desktop";
  @Prop() pinteresttext: string = "Pinterest";
  @Prop() pinterestbackgroundcolor: string = "#cb2027";
  @Prop() pinteresttextcolor: string = "#fff";
  @Prop() pinteresticon: string = "pinterest";
  @Prop() pinteresturl: string;
  @Prop() pinterestclassName: string;
  
  // Messenger button properties and default settings
  @Prop() messengerdisplayrule: string = "hidden";
  @Prop() messengertext: string = "Messenger";
  @Prop() messengerbackgroundcolor: string = "#0084ff";
  @Prop() messengertextcolor: string = "#fff";
  @Prop() messengericon: string = "messenger";
  @Prop() messengerurl: string;
  @Prop() messengerclassName: string;

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
    const emailBtn = <sqh-share-button 
                        displayrule={this.emaildisplayrule} 
                        text={this.emailtext}
                        backgroundcolor={this.emailbackgroundcolor}
                        textcolor={this.emailtextcolor}
                        icon={this.emailicon}
                        url={this.emailurl}
                        // class={this.emailclassName}
                      />;

    const facebookBtn = <sqh-share-button 
                          displayrule={this.facebookdisplayrule} 
                          text={this.facebooktext}
                          backgroundcolor={this.facebookbackgroundcolor}
                          textcolor={this.facebooktextcolor}
                          icon={this.facebookicon}
                          url={this.facebookurl}
                          // class={this.facebookclassName}
                        />;

    const twitterBtn = <sqh-share-button 
                          displayrule={this.twitterdisplayrule} 
                          text={this.twittertext}
                          backgroundcolor={this.twitterbackgroundcolor}
                          textcolor={this.twittertextcolor}
                          icon={this.twittericon}
                          url={this.twitterurl}
                          class={this.twitterclassName}
                        />;

    const smsBtn = <sqh-share-button 
                        displayrule={this.smsdisplayrule} 
                        text={this.smstext}
                        backgroundcolor={this.smsbackgroundcolor}
                        textcolor={this.smstextcolor}
                        icon={this.smsicon}
                        url={this.smsurl}
                        class={this.smsclassName}
                    />;

    const whatsappBtn = <sqh-share-button 
                          displayrule={this.whatsappdisplayrule} 
                          text={this.whatsapptext}
                          backgroundcolor={this.whatsappbackgroundcolor}
                          textcolor={this.whatsapptextcolor}
                          icon={this.whatsappicon}
                          url={this.whatsappurl}
                          class={this.whatsappclassName}
                        />;

    const linkedinBtn = <sqh-share-button 
                          displayrule={this.linkedindisplayrule} 
                          text={this.linkedintext}
                          backgroundcolor={this.linkedinbackgroundcolor}
                          textcolor={this.linkedintextcolor}
                          icon={this.linkedinicon}
                          url={this.linkedinurl}
                          class={this.linkedinclassName}
                        />

    const pinterestBtn = <sqh-share-button
                            displayrule={this.pinterestdisplayrule} 
                            text={this.pinteresttext}
                            backgroundcolor={this.pinterestbackgroundcolor}
                            textcolor={this.pinteresttextcolor}
                            icon={this.pinteresticon}
                            url={this.pinteresturl}
                            class={this.pinterestclassName}
                        />

    const messengerBtn = <sqh-share-button
                            displayrule={this.messengerdisplayrule} 
                            text={this.messengertext}
                            backgroundcolor={this.messengerbackgroundcolor}
                            textcolor={this.messengertextcolor}
                            icon={this.messengericon}
                            url={this.messengerurl}
                            class={this.messengerclassName}
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
  