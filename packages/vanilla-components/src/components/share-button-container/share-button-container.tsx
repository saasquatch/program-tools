import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'sqh-share-button-container',
  styleUrl: 'share-button-container.scss'
})
export class ShareButtonContainer {
  @Prop() maxwidth: string = "441px";
  @Prop() hidden: boolean = false;


  // Email buttons properties and default settings
  @Prop() emaildisplayrule: string = "mobile-and-desktop";
  @Prop() emailtext: string = "Email";
  @Prop() emailbackgroundcolor: string = "#373a3d";
  @Prop() emailtextcolor: string = "#fff";
  @Prop() emailicon: string = "mail";
  @Prop() emailurl: string;
  @Prop() emailclassName: string;


  
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
                        class={this.emailclassName}
                      />
    const facebookBtn = <sqh-share-button 

                        />
    const twitterBtn = <sqh-share-button 

                        />;
    const smsBtn = <sqh-share-button 

                    />;
    const whatsappBtn = <sqh-share-button 

                        />;

    const linkedinBtn = <sqh-share-button 

                        />

    const pinterestBtn = <sqh-share-button

                        />

    const messengerBtn = <sqh-share-button

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
  