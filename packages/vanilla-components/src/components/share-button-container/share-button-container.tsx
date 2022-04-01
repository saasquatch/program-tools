import { h, Component, Prop, State } from "@stencil/core";
import { API } from "../../services/WidgetHost";

/**
 * @uiName Share Button Container
 */
@Component({
  tag: "sqh-share-button-container",
  styleUrl: "share-button-container.scss",
})
export class ShareButtonContainer {
  /**
   * Hide the component
   *
   * @uiName Is Hidden
   */
  @Prop() ishidden: boolean;

  /**
   * Show and hide button depending on what type of device the user is on
   *
   * @uiName Email Display Rule
   * @uiGroup emailButton
   */
  @Prop() emaildisplayrule: string;
  /**
   * Text inside the Email button
   *
   * @uiName Email Text
   * @uiGroup emailButton
   */
  @Prop() emailtext: string;
  /**
   * Background color of the Email button
   *
   * @uiName Email Background Color
   * @uiGroup emailButton
   */
  @Prop() emailbackgroundcolor: string;
  /**
   * Color of the text inside the Email button
   *
   * @uiName Email Text Color
   * @uiGroup emailButton
   */
  @Prop() emailtextcolor: string;
  /**
   * Email button icon
   *
   * @uiName Email Icon
   * @uiGroup emailButton
   */
  @Prop() emailicon: string = "mail";
  /**
   * CSS Class name used to style the Email button
   *
   * @uiName Email Class Name
   * @uiGroup emailButton
   */
  @Prop() emailclassName: string = "email-share";
  /**
   * Number to horizontally align the Email button icon
   *
   * @uiName Email Icon Horizontal
   * @uiGroup emailButton
   */
  @Prop() emailiconhorizontal: number;
  /**
   * Number to vertically align the Email button icon
   *
   * @uiName Email Icon Vertical
   * @uiGroup emailButton
   */
  @Prop() emailiconvertical: number;
  /**
   * Size of the Email button icon
   *
   * @uiName Email Icon Size
   * @uiGroup emailButton
   */
  @Prop() emailiconsize: number;

  @State() emailurl: string;

  /**
   * Show and hide button depending on what type of device the user is on
   *
   * @uiName Facebook Display Rule
   * @uiGroup facebookButton
   */
  @Prop() facebookdisplayrule: string;
  /**
   * Text inside the facebook button
   *
   * @uiName Facebook Text
   * @uiGroup facebookButton
   */
  @Prop() facebooktext: string;
  /**
   * Background color of the facebook button
   *
   * @uiName Facebook Background Color
   * @uiGroup facebookButton
   */
  @Prop() facebookbackgroundcolor: string;
  /**
   * Color of the text inside the facebook button
   *
   * @uiName Facebook Text Color
   * @uiGroup facebookButton
   */
  @Prop() facebooktextcolor: string;
  /**
   * Facebook button icon
   *
   * @uiName Facebook Icon
   * @uiGroup facebookButton
   */
  @Prop() facebookicon: string = "facebook";
  /**
   * CSS Class name used to style the facebook button
   *
   * @uiName Facebook Class Name
   * @uiGroup facebookButton
   */
  @Prop() facebookclassName: string;
  /**
   * Number to horizontally align the facebook button icon
   *
   * @uiName Facebook Icon Horizontal
   * @uiGroup facebookButton
   */
  @Prop() facebookiconhorizontal: number = 9;
  /**
   * Number to vertically align the facebook button icon
   *
   * @uiName Facebook Icon Vertical
   * @uiGroup facebookButton
   */
  @Prop() facebookiconvertical: number;
  /**
   * Size of the facebook button icon
   *
   * @uiName Facebook Icon Size
   * @uiGroup facebookButton
   */
  @Prop() facebookiconsize: number = 1.2;

  @State() facebookurl: string;

  /**
   * Show and hide button depending on what type of device the user is on
   *
   * @uiName Twitter Display Rule
   * @uiGroup twitterButton
   */
  @Prop() twitterdisplayrule: string;
  /**
   * Text inside the twitter button
   *
   * @uiName Twitter Text
   * @uiGroup twitterButton
   */
  @Prop() twittertext: string;
  /**
   * Background color of the twitter button
   *
   * @uiName Twitter Background Color
   * @uiGroup twitterButton
   */
  @Prop() twitterbackgroundcolor: string;
  /**
   * Color of the text inside the twitter button
   *
   * @uiName Twitter Text Color
   * @uiGroup twitterButton
   */
  @Prop() twittertextcolor: string;
  /**
   * Twitter button icon
   *
   * @uiName Twitter Icon
   * @uiGroup twitterButton
   */
  @Prop() twittericon: string = "twitter";
  /**
   * CSS Class name used to style the twitter button
   *
   * @uiName Twitter Class Name
   * @uiGroup twitterButton
   */
  @Prop() twitterclassName: string;
  /**
   * Number to horizontally align the twitter button icon
   *
   * @uiName Twitter Icon Horizontal
   * @uiGroup twitterButton
   */
  @Prop() twittericonhorizontal: number = 9;
  /**
   * Number to vertically align the twitter button icon
   *
   * @uiName Twitter Icon Vertical
   * @uiGroup twitterButton
   */
  @Prop() twittericonvertical: number;
  /**
   * Size of the twitter button icon
   *
   * @uiName Twitter Icon Size
   * @uiGroup twitterButton
   */
  @Prop() twittericonsize: number = 1.2;

  @State() twitterurl: string;

  /**
   * Show and hide button depending on what type of device the user is on
   *
   * @uiName SMS Display Rule
   * @uiGroup smsButton
   */
  @Prop() smsdisplayrule: string;
  /**
   * Text inside the SMS button
   *
   * @uiName SMS Text
   * @uiGroup smsButton
   */
  @Prop() smstext: string;
  /**
   * Background color of the SMS button
   *
   * @uiName SMS Background Color
   * @uiGroup smsButton
   */
  @Prop() smsbackgroundcolor: string;
  /**
   * Color of the text inside the SMS button
   *
   * @uiName SMS Text Color
   * @uiGroup smsButton
   */
  @Prop() smstextcolor: string;
  /**
   * SMS button icon
   *
   * @uiName SMS Icon
   * @uiGroup smsButton
   */
  @Prop() smsicon: string = "chat";
  /**
   * CSS Class name used to style the SMS button
   *
   * @uiName SMS Class Name
   * @uiGroup smsButton
   */
  @Prop() smsclassName: string;
  /**
   * Number to horizontally align the SMS button icon
   *
   * @uiName SMS Icon Horizontal
   * @uiGroup smsButton
   */
  @Prop() smsiconhorizontal: number;
  /**
   * Number to vertically align the SMS button icon
   *
   * @uiName SMS Icon Vertical
   * @uiGroup smsButton
   */
  @Prop() smsiconvertical: number;
  /**
   * Size of the SMS button icon
   *
   * @uiName SMS Icon Size
   * @uiGroup smsButton
   */
  @Prop() smsiconsize: number;
  @State() smsurl: string;

  /**
   * Show and hide button depending on what type of device the user is on
   *
   * @uiName WhatsApp Display Rule
   * @uiGroup whatsappButton
   */
  @Prop() whatsappdisplayrule: string;
  /**
   * Text inside the WhatsApp button
   *
   * @uiName WhatsApp Text
   * @uiGroup whatsappButton
   */
  @Prop() whatsapptext: string;
  /**
   * Background color of the WhatsApp button
   *
   * @uiName WhatsApp Background Color
   * @uiGroup whatsappButton
   */
  @Prop() whatsappbackgroundcolor: string;
  /**
   * Color of the text inside the WhatsApp button
   *
   * @uiName WhatsApp Text Color
   * @uiGroup whatsappButton
   */
  @Prop() whatsapptextcolor: string = "#fff";
  /**
   * WhatsApp button icon
   *
   * @uiName WhatsApp Icon
   * @uiGroup whatsappButton
   */
  @Prop() whatsappicon: string = "whatsapp";
  /**
   * CSS Class name used to style the WhatsApp button
   *
   * @uiName WhatsApp Class Name
   * @uiGroup whatsappButton
   */
  @Prop() whatsappclassName: string;
  /**
   * Number to horizontally align the WhatsApp button icon
   *
   * @uiName WhatsApp Icon Horizontal
   * @uiGroup whatsappButton
   */
  @Prop() whatsappiconhorizontal: number = 7;
  /**
   * Number to vertically align the WhatsApp button icon
   *
   * @uiName WhatsApp Icon Vertical
   * @uiGroup whatsappButton
   */
  @Prop() whatsappiconvertical: number = 2;
  /**
   * Size of the WhatsApp button icon
   *
   * @uiName WhatsApp Icon Size
   * @uiGroup whatsappButton
   */
  @Prop() whatsappiconsize: number = 1.4;

  @State() whatsappurl: string;

  /**
   * Show and hide button depending on what type of device the user is on
   *
   * @uiName Linkedin Display Rule
   * @uiGroup linkedinButton
   */
  @Prop() linkedindisplayrule: string;
  /**
   * Text inside the linkedin button
   *
   * @uiName Linkedin Text
   * @uiGroup linkedinButton
   */
  @Prop() linkedintext: string;
  /**
   * Background color of the linkedin button
   *
   * @uiName Linkedin Background Color
   * @uiGroup linkedinButton
   */
  @Prop() linkedinbackgroundcolor: string;
  /**
   * Color of the text inside the Linkedin button
   *
   * @uiName Linkedin Text Color
   * @uiGroup linkedinButton
   */
  @Prop() linkedintextcolor: string;
  /**
   * Linkedin button icon
   *
   * @uiName Linkedin Icon
   * @uiGroup linkedinButton
   */
  @Prop() linkedinicon: string = "linkedin";
  /**
   * CSS Class name used to style the Linkedin button
   *
   * @uiName Linkedin Class Name
   * @uiGroup linkedinButton
   */
  @Prop() linkedinclassName: string;
  /**
   * Number to horizontally align the Linkedin button icon
   *
   * @uiName Linkedin Icon Horizontal
   * @uiGroup linkedinButton
   */
  @Prop() linkediniconhorizontal: number;
  /**
   * Number to vertically align the Linkedin button icon
   *
   * @uiName Linkedin Icon Vertical
   * @uiGroup linkedinButton
   */
  @Prop() linkediniconvertical: number;
  /**
   * Size of the Linkedin button icon
   *
   * @uiName Linkedin Icon Size
   * @uiGroup linkedinButton
   */
  @Prop() linkediniconsize: number = 1.2;

  @State() linkedinurl: string;
  /**
   * Show and hide button depending on what type of device the user is on
   *
   * @uiName Pinterest Display Rule
   * @uiGroup pinterestButton
   */
  @Prop() pinterestdisplayrule: string;
  /**
   * Text inside the Pinterest button
   *
   * @uiName Pinterest Text
   * @uiGroup pinterestButton
   */
  @Prop() pinteresttext: string;
  /**
   * Background color of the Pinterest button
   *
   * @uiName Pinterest Background Color
   * @uiGroup pinterestButton
   */
  @Prop() pinterestbackgroundcolor: string;
  /**
   * Color of the text inside the Pinterest button
   *
   * @uiName Pinterest Text Color
   * @uiGroup pinterestButton
   */
  @Prop() pinteresttextcolor: string;
  /**
   * Pinterest button icon
   *
   * @uiName Pinterest Icon
   * @uiGroup pinterestButton
   */
  @Prop() pinteresticon: string = "pinterest";
  /**
   * CSS Class name used to style the Pinterest button
   *
   * @uiName Pinterest Class Name
   * @uiGroup pinterestButton
   */
  @Prop() pinterestclassName: string;
  /**
   * Number to horizontally align the Pinterest button icon
   *
   * @uiName Pinterest Icon Horizontal
   * @uiGroup pinterestButton
   */
  @Prop() pinteresticonhorizontal: number = 9;
  /**
   * Number to vertically align the Pinterest button icon
   *
   * @uiName Pinterest Icon Vertical
   * @uiGroup pinterestButton
   */
  @Prop() pinteresticonvertical: number = 4;
  /**
   * Size of the Pinterest button icon
   *
   * @uiName Pinterest Icon Size
   * @uiGroup pinterestButton
   */
  @Prop() pinteresticonsize: number = 1.2;

  @State() pinteresturl: string;

  /**
   * Show and hide button depending on what type of device the user is on
   *
   * @uiName Messenger Display Rule
   * @uiGroup messengerButton
   */
  @Prop() messengerdisplayrule: string;
  /**
   * Text inside the Messenger button
   *
   * @uiName Messenger Text
   * @uiGroup messengerButton
   */
  @Prop() messengertext: string;
  /**
   * Background color of the Messenger button
   *
   * @uiName Messenger Background Color
   * @uiGroup messengerButton
   */
  @Prop() messengerbackgroundcolor: string;
  /**
   * Color of the text inside the Messenger button
   *
   * @uiName Messenger Text Color
   * @uiGroup messengerButton
   */
  @Prop() messengertextcolor: string;
  /**
   * Messenger button icon
   *
   * @uiName Messenger Icon
   * @uiGroup messengerButton
   */
  @Prop() messengericon: string = "messenger";
  /**
   * CSS Class name used to style the Messenger button
   *
   * @uiName Messenger Class Name
   * @uiGroup messengerButton
   */
  @Prop() messengerclassName: string;
  /**
   * Number to horizontally align the Messenger button icon
   *
   * @uiName Messenger Icon Horizontal
   * @uiGroup messengerButton
   */
  @Prop() messengericonhorizontal: number = 7;
  /**
   * Number to vertically align the Messenger button icon
   *
   * @uiName Messenger Icon Vertical
   * @uiGroup messengerButton
   */
  @Prop() messengericonvertical: number = 3;
  /**
   * Size of the Messenger button icon
   *
   * @uiName Messenger Icon Size
   * @uiGroup messengerButton
   */
  @Prop() messengericonsize: number = 1.4;

  @State() messengerurl: string;

  /**
   * Show and hide button depending on what type of device the user is on
   *
   * @uiName Line Display Rule
   * @uiGroup lineButton
   */
  @Prop() linedisplayrule: string;
  /**
   * Text inside the Line button
   *
   * @uiName Line Text
   * @uiGroup lineButton
   */
  @Prop() linetext: string;
  /**
   * Background color of the Line button
   *
   * @uiName Line Background Color
   * @uiGroup lineButton
   */
  @Prop() linebackgroundcolor: string;
  /**
   * Color of the text inside the Line button
   *
   * @uiName Line Text Color
   * @uiGroup lineButton
   */
  @Prop() linetextcolor: string;
  /**
   * Line button icon
   *
   * @uiName Line Icon
   * @uiGroup lineButton
   */
  @Prop() lineicon: string = "line";
  /**
   * CSS Class name used to style the Line button
   *
   * @uiName Line Class Name
   * @uiGroup lineButton
   */
  @Prop() lineclassName: string;
  /**
   * Number to horizontally align the Line button icon
   *
   * @uiName Line Icon Horizontal
   * @uiGroup lineButton
   */
  @Prop() lineiconhorizontal: number = -2;
  /**
   * Number to vertically align the Line button icon
   *
   * @uiName Line Icon Vertical
   * @uiGroup lineButton
   */
  @Prop() lineiconvertical: number = -5;
  /**
   * Size of the Line button icon
   *
   * @uiName Line Icon Size
   * @uiGroup lineButton
   */
  @Prop() lineiconsize: number = 2.2;

  @State() lineurl: string;

  componentWillLoad() {
    if (!this.ishidden) {
      const mediums = [
        "EMAIL",
        "FACEBOOK",
        "TWITTER",
        "SMS",
        "WHATSAPP",
        "LINKEDIN",
        "PINTEREST",
        "FBMESSENGER",
        "LINEMESSENGER",
      ];
      return this.getMessageLinks(mediums);
    }
  }

  getMessageLinks(mediums: Array<string>) {
    return API.graphql
      .getMessageLinks(mediums)
      .then((res) => {
        this.emailurl = res.EMAIL;
        this.facebookurl = res.FACEBOOK;
        this.twitterurl = res.TWITTER;
        this.smsurl = res.SMS;
        this.whatsappurl = res.WHATSAPP;
        this.linkedinurl = res.LINKEDIN;
        this.pinteresturl = res.PINTEREST;
        this.messengerurl = res.FBMESSENGER;
        this.lineurl = res.LINEMESSENGER;
      })
      .catch((e) => {
        this.onError(e);
      });
  }

  onError(e: Error) {
    console.log("Error loading via GraphQL.", e);
  }

  render() {
    const emailBtn = (
      <sqh-share-button
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
      />
    );

    const facebookBtn = (
      <sqh-share-button
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
      />
    );

    const twitterBtn = (
      <sqh-share-button
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
      />
    );

    const smsBtn = (
      <sqh-share-button
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
      />
    );

    const whatsappBtn = (
      <sqh-share-button
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
      />
    );

    const linkedinBtn = (
      <sqh-share-button
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
    );

    const pinterestBtn = (
      <sqh-share-button
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
    );

    const messengerBtn = (
      <sqh-share-button
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
    );

    const lineBtn = (
      <sqh-share-button
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
    );

    return (
      !this.ishidden && (
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
        </div>
      )
    );
  }
}
