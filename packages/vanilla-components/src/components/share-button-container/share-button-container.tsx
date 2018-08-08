import { Component, Prop, State } from '@stencil/core';
import { API } from '../../services/WidgetHost';

@Component({
  tag: 'sqh-share-button-container',
  styleUrl: 'share-button-container.scss'
})
export class ShareButtonContainer {
  @Prop() ishidden: boolean = false;

  // Email button properties and default settings
  @Prop() emaildisplayrule: string = "mobile-and-desktop";
  @Prop() emailtext: string = "Email";
  @Prop() emailbackgroundcolor: string = "#4b4d50";
  @Prop() emailtextcolor: string = "#fff";
  @Prop() emailicon: string = "mail";
  @Prop() emailurl: string = "http://short.staging.referralsaasquatch.com/mJjDFl";
  @Prop() emailclassName: string = "email-share";
  @Prop() emailiconhorizontal: number;
  @Prop() emailiconvertical: number;
  @Prop() emailiconsize: number;

  // FaceBook button properties and default settings
  @Prop() facebookdisplayrule: string = "mobile-and-desktop";
  @Prop() facebooktext: string = "Share";
  @Prop() facebookbackgroundcolor: string = "#234079";
  @Prop() facebooktextcolor: string = "#fff";
  @Prop() facebookicon: string = "facebook";
  @Prop() facebookurl: string = "http://short.staging.referralsaasquatch.com/mwjDFl";
  @Prop() facebookclassName: string;
  @Prop() facebookiconhorizontal: number = 9;
  @Prop() facebookiconvertical: number;
  @Prop() facebookiconsize: number = 1.2;

  // Twitter button properties and default settings
  @Prop() twitterdisplayrule: string = "mobile-and-desktop";
  @Prop() twittertext: string = "Tweet";
  @Prop() twitterbackgroundcolor: string = "#4797d2";
  @Prop() twittertextcolor: string = "#fff";
  @Prop() twittericon: string = "twitter";
  @Prop() twitterurl: string = "http://short.staging.referralsaasquatch.com/mcjDFl";
  @Prop() twitterclassName: string;
  @Prop() twittericonhorizontal: number = 9;
  @Prop() twittericonvertical: number;
  @Prop() twittericonsize: number = 1.2;

  // SMS button properties and default settings
  @Prop() smsdisplayrule: string = "mobile-only";
  @Prop() smstext: string = "SMS";
  @Prop() smsbackgroundcolor: string = "#7bbf38";
  @Prop() smstextcolor: string = "#fff";
  @Prop() smsicon: string = "chat";
  @Prop() smsurl: string = "http://short.staging.referralsaasquatch.com/m2jDFl";
  @Prop() smsclassName: string;
  @Prop() smsiconhorizontal: number;
  @Prop() smsiconvertical: number;
  @Prop() smsiconsize: number;

  // Whatsapp button properties and default settings
  @Prop() whatsappdisplayrule: string = "mobile-only";
  @Prop() whatsapptext: string = "Whatsapp";
  @Prop() whatsappbackgroundcolor: string = "#25D366";
  @Prop() whatsapptextcolor: string = "#fff";
  @Prop() whatsappicon: string = "whatsapp";
  @Prop() whatsappurl: string = "http://short.staging.referralsaasquatch.com/mZjDFl";
  @Prop() whatsappclassName: string;
  @Prop() whatsappiconhorizontal: number = 7;
  @Prop() whatsappiconvertical: number = 2;
  @Prop() whatsappiconsize: number = 1.4;
  
  // LinkedIn button properties and default settings
  @Prop() linkedindisplayrule: string = "desktop-only";
  @Prop() linkedintext: string = "LinkedIn";
  @Prop() linkedinbackgroundcolor: string = "#0084b9";
  @Prop() linkedintextcolor: string = "#fff";
  @Prop() linkedinicon: string = "linkedin";
  @Prop() linkedinurl: string = "http://short.staging.referralsaasquatch.com/mHjDFl";
  @Prop() linkedinclassName: string;
  @Prop() linkediniconhorizontal: number;
  @Prop() linkediniconvertical: number;
  @Prop() linkediniconsize: number = 1.2;

  // Pinterest button properties and default settings
  @Prop() pinterestdisplayrule: string = "mobile-and-desktop";
  @Prop() pinteresttext: string = "Pinterest";
  @Prop() pinterestbackgroundcolor: string = "#cb2027";
  @Prop() pinteresttextcolor: string = "#fff";
  @Prop() pinteresticon: string = "pinterest";
  @Prop() pinteresturl: string = "http://short.staging.referralsaasquatch.com/mfjDFl";
  @Prop() pinterestclassName: string;
  @Prop() pinteresticonhorizontal: number = 9;
  @Prop() pinteresticonvertical: number = 4;
  @Prop() pinteresticonsize: number = 1.2;
  
  // Messenger button properties and default settings
  @Prop() messengerdisplayrule: string = "hidden";
  @Prop() messengertext: string = "Messenger";
  @Prop() messengerbackgroundcolor: string = "#0084ff";
  @Prop() messengertextcolor: string = "#fff";
  @Prop() messengericon: string = "messenger";
  @Prop() messengerurl: string = "http://short.staging.referralsaasquatch.com/mgjDFl";
  @Prop() messengerclassName: string;
  @Prop() messengericonhorizontal: number = 7;
  @Prop() messengericonvertical: number = 3;
  @Prop() messengericonsize: number = 1.4;

  @State() messageLink: string;

  componentWillLoad() {
    return this.getMessageLinks('FACEBOOK');
  }

  // TODO: test this function with real (not demo) data
  getMessageLinks(type) {
    return API.graphql.getMessageLinks(type).then(res => {
      this.messageLink = res;
    }).catch(e => {
      this.onError(e);
    });
  }

  onError(e: Error) {
    console.log("Error loading via GraphQL.", e);
  }
  
  render() {
    const emailBtn = <sqh-share-button 
                        displayrule={this.emaildisplayrule} 
                        text={this.emailtext}
                        backgroundcolor={this.emailbackgroundcolor}
                        textcolor={this.emailtextcolor}
                        icon={this.emailicon}
                        url={this.emailurl}
                        class={this.emailclassName}
                        iconhorizontal={this.emailiconhorizontal}
                        iconvertical={this.emailiconvertical}
                        iconsize={this.emailiconsize}
                      />;

    const facebookBtn = <sqh-share-button 
                          displayrule={this.facebookdisplayrule} 
                          text={this.facebooktext}
                          backgroundcolor={this.facebookbackgroundcolor}
                          textcolor={this.facebooktextcolor}
                          icon={this.facebookicon}
                          url={this.facebookurl}
                          class={this.facebookclassName}
                          iconhorizontal={this.facebookiconhorizontal}
                          iconvertical={this.facebookiconvertical}
                          iconsize={this.facebookiconsize}
                        />;

    const twitterBtn = <sqh-share-button 
                          displayrule={this.twitterdisplayrule} 
                          text={this.twittertext}
                          backgroundcolor={this.twitterbackgroundcolor}
                          textcolor={this.twittertextcolor}
                          icon={this.twittericon}
                          url={this.twitterurl}
                          class={this.twitterclassName}
                          iconhorizontal={this.twittericonhorizontal}
                          iconvertical={this.twittericonvertical}
                          iconsize={this.twittericonsize}
                        />;

    const smsBtn = <sqh-share-button 
                        displayrule={this.smsdisplayrule} 
                        text={this.smstext}
                        backgroundcolor={this.smsbackgroundcolor}
                        textcolor={this.smstextcolor}
                        icon={this.smsicon}
                        url={this.smsurl}
                        class={this.smsclassName}
                        iconhorizontal={this.smsiconhorizontal}
                        iconvertical={this.smsiconvertical}
                        iconsize={this.smsiconsize}
                    />;

    const whatsappBtn = <sqh-share-button 
                          displayrule={this.whatsappdisplayrule} 
                          text={this.whatsapptext}
                          backgroundcolor={this.whatsappbackgroundcolor}
                          textcolor={this.whatsapptextcolor}
                          icon={this.whatsappicon}
                          url={this.whatsappurl}
                          class={this.whatsappclassName}
                          iconhorizontal={this.whatsappiconhorizontal}
                          iconvertical={this.whatsappiconvertical}
                          iconsize={this.whatsappiconsize}
                        />;

    const linkedinBtn = <sqh-share-button 
                          displayrule={this.linkedindisplayrule} 
                          text={this.linkedintext}
                          backgroundcolor={this.linkedinbackgroundcolor}
                          textcolor={this.linkedintextcolor}
                          icon={this.linkedinicon}
                          url={this.linkedinurl}
                          class={this.linkedinclassName}
                          iconhorizontal={this.linkediniconhorizontal}
                          iconvertical={this.linkediniconvertical}
                          iconsize={this.linkediniconsize}
                        />

    const pinterestBtn = <sqh-share-button
                            displayrule={this.pinterestdisplayrule} 
                            text={this.pinteresttext}
                            backgroundcolor={this.pinterestbackgroundcolor}
                            textcolor={this.pinteresttextcolor}
                            icon={this.pinteresticon}
                            url={this.pinteresturl}
                            class={this.pinterestclassName}
                            iconhorizontal={this.pinteresticonhorizontal}
                            iconvertical={this.pinteresticonvertical}
                            iconsize={this.pinteresticonsize}
                        />

    const messengerBtn = <sqh-share-button
                            displayrule={this.messengerdisplayrule} 
                            text={this.messengertext}
                            backgroundcolor={this.messengerbackgroundcolor}
                            textcolor={this.messengertextcolor}
                            icon={this.messengericon}
                            url={this.messengerurl}
                            class={this.messengerclassName}
                            iconhorizontal={this.messengericonhorizontal}
                            iconvertical={this.messengericonvertical}
                            iconsize={this.messengericonsize}
                          />

    const shareSection = this.ishidden ? `` :
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
  