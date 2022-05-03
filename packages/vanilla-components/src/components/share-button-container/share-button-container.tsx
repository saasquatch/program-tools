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
   * Hide or show the component
   *
   * @uiName Hide Share Buttons
   */
  @Prop() ishidden: boolean;
  /**
   * Show and hide button depending on what type of device the user is on
   *
   * @uiName Email Display Rule
   * @uiGroup Email
   * @uiEnum ["mobile-and-desktop","mobile-only","desktop-only","hidden"]
   * @uiEnumNames ["Mobile and Desktop","Mobile Only","Desktop Only","Hide"]
   * @default "mobile-and-desktop"
   */
  @Prop() emaildisplayrule: string;
  /**
   * Text inside the Email button
   *
   * @uiName Email Text
   * @uiGroup Email
   * @default "Email"
   */
  @Prop() emailtext: string;
  /**
   * Background color of the Email button
   *
   * @uiName Email Background Color
   * @uiGroup Email
   * @uiWidget color
   * @format color
   * @default "#4b4d50"
   */
  @Prop() emailbackgroundcolor: string;
  /**
   * Color of the text inside the Email button
   *
   * @uiName Email Text Color
   * @uiGroup Email
   * @uiWidget color
   * @format color
   * @default "#ffffff"
   */
  @Prop() emailtextcolor: string;
  /**
   * Email button icon
   *
   * @uiName Email Icon
   * @uiGroup Email
   */
  @Prop() emailicon: string = "mail";
  /**
   * CSS Class name used to style the Email button
   *
   * @uiName Email Class Name
   * @uiGroup Email
   */
  @Prop() emailclassName: string = "email-share";
  /**
   * Number to horizontally align the Email button icon
   *
   * @uiName Email Icon Horizontal
   * @uiGroup Email
   */
  @Prop() emailiconhorizontal: number;
  /**
   * Number to vertically align the Email button icon
   *
   * @uiName Email Icon Vertical
   * @uiGroup Email
   */
  @Prop() emailiconvertical: number;
  /**
   * Size of the Email button icon
   *
   * @uiName Email Icon Size
   * @uiGroup Email
   */
  @Prop() emailiconsize: number;

  @State() emailurl: string;
  /**
   * Show and hide button depending on what type of device the user is on
   *
   * @uiName Facebook Display Rule
   * @uiGroup Facebook
   * @uiEnum ["mobile-and-desktop","mobile-only","desktop-only","hidden"]
   * @uiEnumNames ["Mobile and Desktop","Mobile Only","Desktop Only","Hide"]
   * @default "mobile-and-desktop"
   */
  @Prop() facebookdisplayrule: string;
  /**
   * Text inside the facebook button
   *
   * @uiName Facebook Text
   * @uiGroup Facebook
   * @default "Facebook"
   */
  @Prop() facebooktext: string;
  /**
   * Background color of the facebook button
   *
   * @uiName Facebook Background Color
   * @uiGroup Facebook
   * @uiWidget color
   * @format color
   * @default "#234079"
   */
  @Prop() facebookbackgroundcolor: string;
  /**
   * Color of the text inside the facebook button
   *
   * @uiName Facebook Text Color
   * @uiGroup Facebook
   * @uiWidget color
   * @format color
   * @default "#ffffff"
   */
  @Prop() facebooktextcolor: string;
  /**
   * Facebook button icon
   *
   * @uiName Facebook Icon
   * @uiGroup Facebook
   */
  @Prop() facebookicon: string = "facebook";
  /**
   * CSS Class name used to style the facebook button
   *
   * @uiName Facebook Class Name
   * @uiGroup Facebook
   */
  @Prop() facebookclassName: string;
  /**
   * Number to horizontally align the facebook button icon
   *
   * @uiName Facebook Icon Horizontal
   * @uiGroup Facebook
   */
  @Prop() facebookiconhorizontal: number = 9;
  /**
   * Number to vertically align the facebook button icon
   *
   * @uiName Facebook Icon Vertical
   * @uiGroup Facebook
   */
  @Prop() facebookiconvertical: number;
  /**
   * Size of the facebook button icon
   *
   * @uiName Facebook Icon Size
   * @uiGroup Facebook
   */
  @Prop() facebookiconsize: number = 1.2;

  @State() facebookurl: string;

  /**
   * Show and hide button depending on what type of device the user is on
   *
   * @uiName Twitter Display Rule
   * @uiGroup Twitter
   * @uiEnum ["mobile-and-desktop","mobile-only","desktop-only","hidden"]
   * @uiEnumNames ["Mobile and Desktop","Mobile Only","Desktop Only","Hide"]
   * @default "mobile-and-desktop"
   */
  @Prop() twitterdisplayrule: string;
  /**
   * Text inside the twitter button
   *
   * @uiName Twitter Text
   * @uiGroup Twitter
   * @default "Twitter"
   */
  @Prop() twittertext: string;
  /**
   * Background color of the twitter button
   *
   * @uiName Twitter Background Color
   * @uiGroup Twitter
   * @uiWidget color
   * @format color
   * @default "#4797d2"
   */
  @Prop() twitterbackgroundcolor: string;
  /**
   * Color of the text inside the twitter button
   *
   * @uiName Twitter Text Color
   * @uiGroup Twitter
   * @uiWidget color
   * @format color
   * @default "#ffffff"
   */
  @Prop() twittertextcolor: string;
  /**
   * Twitter button icon
   *
   * @uiName Twitter Icon
   * @uiGroup Twitter
   */
  @Prop() twittericon: string = "twitter";
  /**
   * CSS Class name used to style the twitter button
   *
   * @uiName Twitter Class Name
   * @uiGroup Twitter
   */
  @Prop() twitterclassName: string;
  /**
   * Number to horizontally align the twitter button icon
   *
   * @uiName Twitter Icon Horizontal
   * @uiGroup Twitter
   */
  @Prop() twittericonhorizontal: number = 9;
  /**
   * Number to vertically align the twitter button icon
   *
   * @uiName Twitter Icon Vertical
   * @uiGroup Twitter
   */
  @Prop() twittericonvertical: number;
  /**
   * Size of the twitter button icon
   *
   * @uiName Twitter Icon Size
   * @uiGroup Twitter
   */
  @Prop() twittericonsize: number = 1.2;

  @State() twitterurl: string;

  /**
   * Show and hide button depending on what type of device the user is on
   *
   * @uiName SMS Display Rule
   * @uiGroup SMS
   * @uiEnum ["mobile-only","hidden"]
   * @uiEnumNames ["Mobile Only","Hide"]
   * @default "mobile-only"
   */
  @Prop() smsdisplayrule: string;
  /**
   * Text inside the SMS button
   *
   * @uiName SMS Text
   * @uiGroup SMS
   * @default "SMS"
   */
  @Prop() smstext: string;
  /**
   * Background color of the SMS button
   *
   * @uiName SMS Background Color
   * @uiGroup SMS
   * @uiWidget color
   * @format color
   * @default "#7bbf38"
   */
  @Prop() smsbackgroundcolor: string;
  /**
   * Color of the text inside the SMS button
   *
   * @uiName SMS Text Color
   * @uiGroup SMS
   * @uiWidget color
   * @format color
   * @default "#ffffff"
   */
  @Prop() smstextcolor: string;
  /**
   * SMS button icon
   *
   * @uiName SMS Icon
   * @uiGroup SMS
   */
  @Prop() smsicon: string = "chat";
  /**
   * CSS Class name used to style the SMS button
   *
   * @uiName SMS Class Name
   * @uiGroup SMS
   */
  @Prop() smsclassName: string;
  /**
   * Number to horizontally align the SMS button icon
   *
   * @uiName SMS Icon Horizontal
   * @uiGroup SMS
   */
  @Prop() smsiconhorizontal: number;
  /**
   * Number to vertically align the SMS button icon
   *
   * @uiName SMS Icon Vertical
   * @uiGroup SMS
   */
  @Prop() smsiconvertical: number;
  /**
   * Size of the SMS button icon
   *
   * @uiName SMS Icon Size
   * @uiGroup SMS
   */
  @Prop() smsiconsize: number;
  @State() smsurl: string;

  /**
   * Show and hide button depending on what type of device the user is on
   *
   * @uiName WhatsApp Display Rule
   * @uiGroup WhatsApp
   * @uiEnum ["mobile-only","hidden"]
   * @uiEnumNames ["Mobile Only","Hide"]
   * @default "mobile-only"
   */
  @Prop() whatsappdisplayrule: string;
  /**
   * Text inside the WhatsApp button
   *
   * @uiName WhatsApp Text
   * @uiGroup WhatsApp
   * @default "Whatspp"
   */
  @Prop() whatsapptext: string;
  /**
   * Background color of the WhatsApp button
   *
   * @uiName WhatsApp Background Color
   * @uiGroup WhatsApp
   * @uiWidget color
   * @format color
   * @default "#25D366"
   */
  @Prop() whatsappbackgroundcolor: string;
  /**
   * Color of the text inside the WhatsApp button
   *
   * @uiName WhatsApp Text Color
   * @uiGroup WhatsApp
   * @uiWidget color
   * @format color
   * @default "#ffffff"
   */
  @Prop() whatsapptextcolor: string = "#fff";
  /**
   * WhatsApp button icon
   *
   * @uiName WhatsApp Icon
   * @uiGroup WhatsApp
   */
  @Prop() whatsappicon: string = "whatsapp";
  /**
   * CSS Class name used to style the WhatsApp button
   *
   * @uiName WhatsApp Class Name
   * @uiGroup WhatsApp
   */
  @Prop() whatsappclassName: string;
  /**
   * Number to horizontally align the WhatsApp button icon
   *
   * @uiName WhatsApp Icon Horizontal
   * @uiGroup WhatsApp
   */
  @Prop() whatsappiconhorizontal: number = 7;
  /**
   * Number to vertically align the WhatsApp button icon
   *
   * @uiName WhatsApp Icon Vertical
   * @uiGroup WhatsApp
   */
  @Prop() whatsappiconvertical: number = 2;
  /**
   * Size of the WhatsApp button icon
   *
   * @uiName WhatsApp Icon Size
   * @uiGroup WhatsApp
   */
  @Prop() whatsappiconsize: number = 1.4;

  @State() whatsappurl: string;

  /**
   * Show and hide button depending on what type of device the user is on
   *
   * @uiName Linkedin Display Rule
   * @uiGroup LinkedIn
   * @uiEnum ["mobile-and-desktop","mobile-only","desktop-only","hidden"]
   * @uiEnumNames ["Mobile and Desktop","Mobile Only","Desktop Only","Hide"]
   * @default "hidden"
   */
  @Prop() linkedindisplayrule: string;
  /**
   * Text inside the linkedin button
   *
   * @uiName Linkedin Text
   * @uiGroup LinkedIn
   * @default "LinkedIn"
   */
  @Prop() linkedintext: string;
  /**
   * Background color of the linkedin button
   *
   * @uiName Linkedin Background Color
   * @uiGroup LinkedIn
   * @uiWidget color
   * @format color
   * @default "#ffffff"
   */
  @Prop() linkedinbackgroundcolor: string;
  /**
   * Color of the text inside the Linkedin button
   *
   * @uiName Linkedin Text Color
   * @uiGroup LinkedIn
   * @uiWidget color
   * @format color
   * @default "#0084b9"
   */
  @Prop() linkedintextcolor: string;
  /**
   * Linkedin button icon
   *
   * @uiName Linkedin Icon
   * @uiGroup LinkedIn
   */
  @Prop() linkedinicon: string = "linkedin";
  /**
   * CSS Class name used to style the Linkedin button
   *
   * @uiName Linkedin Class Name
   * @uiGroup LinkedIn
   */
  @Prop() linkedinclassName: string;
  /**
   * Number to horizontally align the Linkedin button icon
   *
   * @uiName Linkedin Icon Horizontal
   * @uiGroup LinkedIn
   */
  @Prop() linkediniconhorizontal: number;
  /**
   * Number to vertically align the Linkedin button icon
   *
   * @uiName Linkedin Icon Vertical
   * @uiGroup LinkedIn
   */
  @Prop() linkediniconvertical: number;
  /**
   * Size of the Linkedin button icon
   *
   * @uiName Linkedin Icon Size
   * @uiGroup LinkedIn
   */
  @Prop() linkediniconsize: number = 1.2;

  @State() linkedinurl: string;
  /**
   * Show and hide button depending on what type of device the user is on
   *
   * @uiName Pinterest Display Rule
   * @uiGroup Pinterest
   * @uiEnum ["mobile-and-desktop","mobile-only","desktop-only","hidden"]
   * @uiEnumNames ["Mobile and Desktop","Mobile Only","Desktop Only","Hide"]
   * @default "hidden"
   */
  @Prop() pinterestdisplayrule: string;
  /**
   * Text inside the Pinterest button
   *
   * @uiName Pinterest Text
   * @uiGroup Pinterest
   * @default "Pinterest"
   */
  @Prop() pinteresttext: string;
  /**
   * Background color of the Pinterest button
   *
   * @uiName Pinterest Background Color
   * @uiGroup Pinterest
   * @uiWidget color
   * @format color
   * @default "#cb2027"
   */
  @Prop() pinterestbackgroundcolor: string;
  /**
   * Color of the text inside the Pinterest button
   *
   * @uiName Pinterest Text Color
   * @uiGroup Pinterest
   * @uiWidget color
   * @format color
   * @default "#ffffff"
   */
  @Prop() pinteresttextcolor: string;
  /**
   * Pinterest button icon
   *
   * @uiName Pinterest Icon
   * @uiGroup Pinterest
   */
  @Prop() pinteresticon: string = "pinterest";
  /**
   * CSS Class name used to style the Pinterest button
   *
   * @uiName Pinterest Class Name
   * @uiGroup Pinterest
   */
  @Prop() pinterestclassName: string;
  /**
   * Number to horizontally align the Pinterest button icon
   *
   * @uiName Pinterest Icon Horizontal
   * @uiGroup Pinterest
   */
  @Prop() pinteresticonhorizontal: number = 9;
  /**
   * Number to vertically align the Pinterest button icon
   *
   * @uiName Pinterest Icon Vertical
   * @uiGroup Pinterest
   */
  @Prop() pinteresticonvertical: number = 4;
  /**
   * Size of the Pinterest button icon
   *
   * @uiName Pinterest Icon Size
   * @uiGroup Pinterest
   */
  @Prop() pinteresticonsize: number = 1.2;

  @State() pinteresturl: string;

  /**
   * Show and hide button depending on what type of device the user is on
   *
   * @uiName Messenger Display Rule
   * @uiGroup Messenger
   * @uiEnum ["mobile-and-desktop","mobile-only","desktop-only","hidden"]
   * @uiEnumNames ["Mobile and Desktop","Mobile Only","Desktop Only","Hide"]
   * @default "hidden"
   */
  @Prop() messengerdisplayrule: string;
  /**
   * Text inside the Messenger button
   *
   * @uiName Messenger Text
   * @uiGroup Messenger
   * @default "Messenger"
   */
  @Prop() messengertext: string;
  /**
   * Background color of the Messenger button
   *
   * @uiName Messenger Background Color
   * @uiGroup Messenger
   * @uiWidget color
   * @format color
   * @default "#0084ff"
   */
  @Prop() messengerbackgroundcolor: string;
  /**
   * Color of the text inside the Messenger button
   *
   * @uiName Messenger Text Color
   * @uiGroup Messenger
   * @uiWidget color
   * @format color
   * @default "#ffffff"
   */
  @Prop() messengertextcolor: string;
  /**
   * Messenger button icon
   *
   * @uiName Messenger Icon
   * @uiGroup Messenger
   */
  @Prop() messengericon: string = "messenger";
  /**
   * CSS Class name used to style the Messenger button
   *
   * @uiName Messenger Class Name
   * @uiGroup Messenger
   */
  @Prop() messengerclassName: string;
  /**
   * Number to horizontally align the Messenger button icon
   *
   * @uiName Messenger Icon Horizontal
   * @uiGroup Messenger
   */
  @Prop() messengericonhorizontal: number = 7;
  /**
   * Number to vertically align the Messenger button icon
   *
   * @uiName Messenger Icon Vertical
   * @uiGroup Messenger
   */
  @Prop() messengericonvertical: number = 3;
  /**
   * Size of the Messenger button icon
   *
   * @uiName Messenger Icon Size
   * @uiGroup Messenger
   */
  @Prop() messengericonsize: number = 1.4;

  @State() messengerurl: string;
  /**
   * Show and hide button depending on what type of device the user is on
   *
   * @uiName Line Display Rule
   * @uiGroup Line Messenger
   * @uiEnum ["mobile-only","hidden"]
   * @uiEnumNames ["Mobile Only","Hide"]
   * @default "mobile-only"
   */
  @Prop() linedisplayrule: string;
  /**
   * Text inside the Line button
   *
   * @uiName Line Text
   * @uiGroup Line Messenger
   * @default "Line Messenger"
   */
  @Prop() linetext: string;
  /**
   * Background color of the Line button
   *
   * @uiName Line Background Color
   * @uiGroup Line Messenger
   * @uiWidget color
   * @format color
   * @default "#00c300"
   */
  @Prop() linebackgroundcolor: string;
  /**
   * Color of the text inside the Line button
   *
   * @uiName Line Text Color
   * @uiGroup Line Messenger
   * @uiWidget color
   * @format color
   * @default "#ffffff"
   */
  @Prop() linetextcolor: string;
  /**
   * Line button icon
   *
   * @uiName Line Icon
   * @uiGroup Line Messenger
   */
  @Prop() lineicon: string = "line";
  /**
   * CSS Class name used to style the Line button
   *
   * @uiName Line Class Name
   * @uiGroup Line Messenger
   */
  @Prop() lineclassName: string;
  /**
   * Number to horizontally align the Line button icon
   *
   * @uiName Line Icon Horizontal
   * @uiGroup Line Messenger
   */
  @Prop() lineiconhorizontal: number = -2;
  /**
   * Number to vertically align the Line button icon
   *
   * @uiName Line Icon Vertical
   * @uiGroup Line Messenger
   */
  @Prop() lineiconvertical: number = -5;
  /**
   * Size of the Line button icon
   *
   * @uiName Line Icon Size
   * @uiGroup Line Messenger
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
