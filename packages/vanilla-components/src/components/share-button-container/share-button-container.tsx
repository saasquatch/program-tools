import { Component, Prop, State } from '@stencil/core';
import { API } from '../../services/WidgetHost';

@Component({
  tag: 'sqh-share-button-container',
  styleUrl: 'share-button-container.scss'
})
export class ShareButtonContainer {
  @Prop() ishidden: boolean;

  // Email button properties and default settings
  @Prop() emaildisplayrule: string;
  @Prop() emailtext: string;
  @Prop() emailbackgroundcolor: string;
  @Prop() emailtextcolor: string;
  @Prop() emailicon: string = "mail";
  @Prop() emailclassName: string = "email-share";
  @Prop() emailiconhorizontal: number;
  @Prop() emailiconvertical: number;
  @Prop() emailiconsize: number;
  @State() emailurl: string;

  // FaceBook button properties and default settings
  @Prop() facebookdisplayrule: string;
  @Prop() facebooktext: string;
  @Prop() facebookbackgroundcolor: string;
  @Prop() facebooktextcolor: string;
  @Prop() facebookicon: string = "facebook";
  @Prop() facebookclassName: string;
  @Prop() facebookiconhorizontal: number = 9;
  @Prop() facebookiconvertical: number;
  @Prop() facebookiconsize: number = 1.2;
  @State() facebookurl: string;

  // Twitter button properties and default settings
  @Prop() twitterdisplayrule: string;
  @Prop() twittertext: string;
  @Prop() twitterbackgroundcolor: string;
  @Prop() twittertextcolor: string;
  @Prop() twittericon: string = "twitter";
  @Prop() twitterclassName: string;
  @Prop() twittericonhorizontal: number = 9;
  @Prop() twittericonvertical: number;
  @Prop() twittericonsize: number = 1.2;
  @State() twitterurl: string;

  // SMS button properties and default settings
  @Prop() smsdisplayrule: string;
  @Prop() smstext: string;
  @Prop() smsbackgroundcolor: string;
  @Prop() smstextcolor: string;
  @Prop() smsicon: string = "chat";
  @Prop() smsclassName: string;
  @Prop() smsiconhorizontal: number;
  @Prop() smsiconvertical: number;
  @Prop() smsiconsize: number;
  @State() smsurl: string;

  // Whatsapp button properties and default settings
  @Prop() whatsappdisplayrule: string;
  @Prop() whatsapptext: string;
  @Prop() whatsappbackgroundcolor: string;
  @Prop() whatsapptextcolor: string = "#fff";
  @Prop() whatsappicon: string = "whatsapp";
  @Prop() whatsappclassName: string;
  @Prop() whatsappiconhorizontal: number = 7;
  @Prop() whatsappiconvertical: number = 2;
  @Prop() whatsappiconsize: number = 1.4;
  @State() whatsappurl: string;
  
  // LinkedIn button properties and default settings
  @Prop() linkedindisplayrule: string;
  @Prop() linkedintext: string;
  @Prop() linkedinbackgroundcolor: string;
  @Prop() linkedintextcolor: string;
  @Prop() linkedinicon: string = "linkedin";
  @Prop() linkedinclassName: string;
  @Prop() linkediniconhorizontal: number;
  @Prop() linkediniconvertical: number;
  @Prop() linkediniconsize: number = 1.2;
  @State() linkedinurl: string;

  // Pinterest button properties and default settings
  @Prop() pinterestdisplayrule: string;
  @Prop() pinteresttext: string;
  @Prop() pinterestbackgroundcolor: string;
  @Prop() pinteresttextcolor: string;
  @Prop() pinteresticon: string = "pinterest";
  @Prop() pinterestclassName: string;
  @Prop() pinteresticonhorizontal: number = 9;
  @Prop() pinteresticonvertical: number = 4;
  @Prop() pinteresticonsize: number = 1.2;
  @State() pinteresturl: string;
  
  // Messenger button properties and default settings
  @Prop() messengerdisplayrule: string;
  @Prop() messengertext: string;
  @Prop() messengerbackgroundcolor: string;
  @Prop() messengertextcolor: string;
  @Prop() messengericon: string = "messenger";
  @Prop() messengerclassName: string;
  @Prop() messengericonhorizontal: number = 7;
  @Prop() messengericonvertical: number = 3;
  @Prop() messengericonsize: number = 1.4;
  @State() messengerurl: string;

  // Messenger button properties and default settings
  @Prop() linedisplayrule: string;
  @Prop() linetext: string;
  @Prop() linebackgroundcolor: string;
  @Prop() linetextcolor: string;
  @Prop() lineicon: string = "line";
  @Prop() lineclassName: string;
  @Prop() lineiconhorizontal: number = -2;
  @Prop() lineiconvertical: number = -5;
  @Prop() lineiconsize: number = 2.2;
  @State() lineurl: string;

  componentWillLoad() {
    if (!this.ishidden) {
      const mediums = ['EMAIL', 'FACEBOOK', 'TWITTER', 'SMS', 'WHATSAPP', 'LINKEDIN', 'PINTEREST', 'FBMESSENGER', 'LINEMESSENGER']
      return this.getMessageLinks(mediums);
    }
  }

  getMessageLinks(mediums:Array<string>) {
    return API.graphql.getMessageLinks(mediums).then(res => {
      this.emailurl = res.EMAIL;
      this.facebookurl = res.FACEBOOK;
      this.twitterurl = res.TWITTER;
      this.smsurl = res.SMS;
      this.whatsappurl = res.WHATSAPP;
      this.linkedinurl = res.LINKEDIN;
      this.pinteresturl = res.PINTEREST;
      this.messengerurl = res.FBMESSENGER;
      this.lineurl = res.LINEMESSENGER;
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
                        class={this.emailclassName}
                        iconhorizontal={this.emailiconhorizontal}
                        iconvertical={this.emailiconvertical}
                        iconsize={this.emailiconsize}
                        url={this.emailurl}
                      />;

    const facebookBtn = <sqh-share-button 
                          displayrule={this.facebookdisplayrule} 
                          text={this.facebooktext}
                          backgroundcolor={this.facebookbackgroundcolor}
                          textcolor={this.facebooktextcolor}
                          icon={this.facebookicon}
                          class={this.facebookclassName}
                          iconhorizontal={this.facebookiconhorizontal}
                          iconvertical={this.facebookiconvertical}
                          iconsize={this.facebookiconsize}
                          url={this.facebookurl}
                        />;

    const twitterBtn = <sqh-share-button 
                          displayrule={this.twitterdisplayrule} 
                          text={this.twittertext}
                          backgroundcolor={this.twitterbackgroundcolor}
                          textcolor={this.twittertextcolor}
                          icon={this.twittericon}
                          class={this.twitterclassName}
                          iconhorizontal={this.twittericonhorizontal}
                          iconvertical={this.twittericonvertical}
                          iconsize={this.twittericonsize}
                          url={this.twitterurl}
                        />;

    const smsBtn = <sqh-share-button 
                        displayrule={this.smsdisplayrule} 
                        text={this.smstext}
                        backgroundcolor={this.smsbackgroundcolor}
                        textcolor={this.smstextcolor}
                        icon={this.smsicon}
                        class={this.smsclassName}
                        iconhorizontal={this.smsiconhorizontal}
                        iconvertical={this.smsiconvertical}
                        iconsize={this.smsiconsize}
                        url={this.smsurl}
                    />;

    const whatsappBtn = <sqh-share-button 
                          displayrule={this.whatsappdisplayrule} 
                          text={this.whatsapptext}
                          backgroundcolor={this.whatsappbackgroundcolor}
                          textcolor={this.whatsapptextcolor}
                          icon={this.whatsappicon}
                          class={this.whatsappclassName}
                          iconhorizontal={this.whatsappiconhorizontal}
                          iconvertical={this.whatsappiconvertical}
                          iconsize={this.whatsappiconsize}
                          url={this.whatsappurl}
                        />;

    const linkedinBtn = <sqh-share-button 
                          displayrule={this.linkedindisplayrule} 
                          text={this.linkedintext}
                          backgroundcolor={this.linkedinbackgroundcolor}
                          textcolor={this.linkedintextcolor}
                          icon={this.linkedinicon}
                          class={this.linkedinclassName}
                          iconhorizontal={this.linkediniconhorizontal}
                          iconvertical={this.linkediniconvertical}
                          iconsize={this.linkediniconsize}
                          url={this.linkedinurl}
                        />

    const pinterestBtn = <sqh-share-button
                            displayrule={this.pinterestdisplayrule} 
                            text={this.pinteresttext}
                            backgroundcolor={this.pinterestbackgroundcolor}
                            textcolor={this.pinteresttextcolor}
                            icon={this.pinteresticon}
                            class={this.pinterestclassName}
                            iconhorizontal={this.pinteresticonhorizontal}
                            iconvertical={this.pinteresticonvertical}
                            iconsize={this.pinteresticonsize}
                            url={this.pinteresturl}
                        />

    const messengerBtn = <sqh-share-button
                            displayrule={this.messengerdisplayrule} 
                            text={this.messengertext}
                            backgroundcolor={this.messengerbackgroundcolor}
                            textcolor={this.messengertextcolor}
                            icon={this.messengericon}
                            class={this.messengerclassName}
                            iconhorizontal={this.messengericonhorizontal}
                            iconvertical={this.messengericonvertical}
                            iconsize={this.messengericonsize}
                            url={this.messengerurl}
                          />
    
    const lineBtn = <sqh-share-button
                            displayrule={this.linedisplayrule} 
                            text={this.linetext}
                            backgroundcolor={this.linebackgroundcolor}
                            textcolor={this.linetextcolor}
                            icon={this.lineicon}
                            class={this.lineclassName}
                            iconhorizontal={this.lineiconhorizontal}
                            iconvertical={this.lineiconvertical}
                            iconsize={this.lineiconsize}
                            url={this.lineurl}
                          />

    return !this.ishidden &&
      <div>
        {emailBtn}
        {facebookBtn}
        {twitterBtn}
        {smsBtn}
        {whatsappBtn}
        {linkedinBtn}
        {pinterestBtn}
        {messengerBtn}
        {lineBtn}
      </div>;
  }
}
  