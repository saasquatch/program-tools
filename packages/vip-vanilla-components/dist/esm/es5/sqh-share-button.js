var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
/*! Built with http://stenciljs.com */
import { h } from './widget-components.core.js';
import { a as shadeColor, e as detectMobileSafari } from './chunk-bf7ffeb2.js';
import { a as css } from './chunk-06494afc.js';
import { a as API } from './chunk-eeb26f85.js';
import './chunk-7081a6f1.js';
var ShareButton = /** @class */ (function () {
    function ShareButton() {
    }
    ShareButton.prototype.clickHandler = function (e) {
        if (window["widgetIdent"].env === "demo") {
            e.preventDefault();
            return;
        }
        // checking for null on closest 'a' tag makes click handler avoid firing when margin is clicked
        var anchor = e.target.closest('a');
        if (anchor !== null && this.className !== "email-share") {
            e.preventDefault();
            var url = this.url;
            var target = '_blank';
            var features = 'status=0,width=680,height=580';
            window.open(url, target, features);
        }
    };
    ShareButton.prototype.componentDidLoad = function () {
        var el = this.button;
        el.addEventListener("click", this.clickHandler.bind(this), false);
    };
    ShareButton.prototype.render = function () {
        var isMobileSafari = detectMobileSafari();
        var target = isMobileSafari ? '_parent' : '_blank';
        var iconClass = "icon icon-" + this.icon;
        var style = css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n      background-color: ", ";\n      border: 1px solid ", ";\n      color: ", ";\n\n                        \n      &:hover {\n        background: ", ";\n        border-color: ", ";\n        color: ", ";\n      }\n                    \n      &:focus {\n        color: ", ";\n      }\n      .icon-", " {\n        left: ", "px;\n        top: ", "px;\n        font-size: ", "em;\n      }\n    "], ["\n      background-color: ", ";\n      border: 1px solid ", ";\n      color: ", ";\n\n                        \n      &:hover {\n        background: ", ";\n        border-color: ", ";\n        color: ", ";\n      }\n                    \n      &:focus {\n        color: ", ";\n      }\n      .icon-", " {\n        left: ", "px;\n        top: ", "px;\n        font-size: ", "em;\n      }\n    "])), this.backgroundcolor, this.backgroundcolor, this.textcolor, shadeColor(this.backgroundcolor, 10), shadeColor(this.backgroundcolor, 12), this.textcolor, this.textcolor, this.icon, this.iconhorizontal, this.iconvertical, this.iconsize);
        var classes = ["squatch-share-btn", this.className, this.displayrule, style].join(" ");
        return (h("a", { class: classes, href: this.url, target: target }, h("i", { class: iconClass }), h("span", { class: "share-btn-text" }, this.text)));
    };
    Object.defineProperty(ShareButton, "is", {
        get: function () { return "sqh-share-button"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShareButton, "properties", {
        get: function () {
            return {
                "backgroundcolor": {
                    "type": String,
                    "attr": "backgroundcolor"
                },
                "button": {
                    "elementRef": true
                },
                "className": {
                    "type": String,
                    "attr": "class-name"
                },
                "displayrule": {
                    "type": String,
                    "attr": "displayrule"
                },
                "icon": {
                    "type": String,
                    "attr": "icon"
                },
                "iconhorizontal": {
                    "type": Number,
                    "attr": "iconhorizontal"
                },
                "iconsize": {
                    "type": Number,
                    "attr": "iconsize"
                },
                "iconvertical": {
                    "type": Number,
                    "attr": "iconvertical"
                },
                "text": {
                    "type": String,
                    "attr": "text"
                },
                "textcolor": {
                    "type": String,
                    "attr": "textcolor"
                },
                "type": {
                    "type": String,
                    "attr": "type"
                },
                "url": {
                    "type": String,
                    "attr": "url"
                }
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShareButton, "style", {
        get: function () { return "sqh-share-button {\n  display: inline-block; }\n  sqh-share-button .squatch-share-btn {\n    display: block;\n    text-align: center;\n    -ms-touch-action: manipulation;\n    touch-action: manipulation;\n    cursor: pointer;\n    background-image: none;\n    white-space: nowrap;\n    padding: 6px 12px;\n    font-size: 14px;\n    line-height: 1.428571429;\n    border-radius: 4px;\n    width: 140px;\n    margin: 5px; }\n    sqh-share-button .squatch-share-btn .share-btn-text {\n      text-align: center;\n      padding-left: 30px; }\n    sqh-share-button .squatch-share-btn:focus {\n      outline: 0; }\n    sqh-share-button .squatch-share-btn.disabled, sqh-share-button .squatch-share-btn[disabled],\n    fieldset[disabled] sqh-share-button .squatch-share-btn {\n      cursor: not-allowed;\n      pointer-events: none;\n      opacity: .65;\n      -webkit-box-shadow: none;\n      box-shadow: none; }\n  sqh-share-button a {\n    position: relative;\n    text-decoration: none; }\n    sqh-share-button a .icon {\n      position: absolute;\n      left: 10px;\n      top: 6px;\n      width: 16px; }\n    sqh-share-button a:before {\n      bottom: -1px;\n      background: rgba(255, 255, 255, 0.18);\n      content: '';\n      left: -1px;\n      position: absolute;\n      top: -1px;\n      width: 40px; }\n\n\@media (max-width: 499px) {\n  sqh-share-button {\n    display: block; } }\n\n\@media (max-width: 499px) {\n  sqh-share-button .squatch-share-btn {\n    margin: 5px 0px;\n    width: auto; } }"; },
        enumerable: true,
        configurable: true
    });
    return ShareButton;
}());
var ShareButtonContainer = /** @class */ (function () {
    function ShareButtonContainer() {
        this.ishidden = false;
        this.emailicon = "mail";
        this.emailclassName = "email-share";
        this.facebookicon = "facebook";
        this.facebookiconhorizontal = 9;
        this.facebookiconsize = 1.2;
        this.twittericon = "twitter";
        this.twittericonhorizontal = 9;
        this.twittericonsize = 1.2;
        this.smsicon = "chat";
        this.whatsapptextcolor = "#fff";
        this.whatsappicon = "whatsapp";
        this.whatsappiconhorizontal = 7;
        this.whatsappiconvertical = 2;
        this.whatsappiconsize = 1.4;
        this.linkedinicon = "linkedin";
        this.linkediniconsize = 1.2;
        this.pinteresticon = "pinterest";
        this.pinteresticonhorizontal = 9;
        this.pinteresticonvertical = 4;
        this.pinteresticonsize = 1.2;
        this.messengericon = "messenger";
        this.messengericonhorizontal = 7;
        this.messengericonvertical = 3;
        this.messengericonsize = 1.4;
        this.lineicon = "line";
        this.lineiconhorizontal = -2;
        this.lineiconvertical = -5;
        this.lineiconsize = 2.2;
    }
    ShareButtonContainer.prototype.componentWillLoad = function () {
        if (!this.ishidden) {
            var mediums = ['EMAIL', 'FACEBOOK', 'TWITTER', 'SMS', 'WHATSAPP', 'LINKEDIN', 'PINTEREST', 'FBMESSENGER', 'LINEMESSENGER'];
            return this.getMessageLinks(mediums);
        }
    };
    ShareButtonContainer.prototype.getMessageLinks = function (mediums) {
        var _this = this;
        return API.graphql.getMessageLinks(mediums).then(function (res) {
            _this.emailurl = res.EMAIL;
            _this.facebookurl = res.FACEBOOK;
            _this.twitterurl = res.TWITTER;
            _this.smsurl = res.SMS;
            _this.whatsappurl = res.WHATSAPP;
            _this.linkedinurl = res.LINKEDIN;
            _this.pinteresturl = res.PINTEREST;
            _this.messengerurl = res.FBMESSENGER;
            _this.lineurl = res.LINEMESSENGER;
        }).catch(function (e) {
            _this.onError(e);
        });
    };
    ShareButtonContainer.prototype.onError = function (e) {
        console.log("Error loading via GraphQL.", e);
    };
    ShareButtonContainer.prototype.render = function () {
        var emailBtn = h("sqh-share-button", { displayrule: this.emaildisplayrule, text: this.emailtext, backgroundcolor: this.emailbackgroundcolor, textcolor: this.emailtextcolor, icon: this.emailicon, class: this.emailclassName, iconhorizontal: this.emailiconhorizontal, iconvertical: this.emailiconvertical, iconsize: this.emailiconsize, url: this.emailurl });
        var facebookBtn = h("sqh-share-button", { displayrule: this.facebookdisplayrule, text: this.facebooktext, backgroundcolor: this.facebookbackgroundcolor, textcolor: this.facebooktextcolor, icon: this.facebookicon, class: this.facebookclassName, iconhorizontal: this.facebookiconhorizontal, iconvertical: this.facebookiconvertical, iconsize: this.facebookiconsize, url: this.facebookurl });
        var twitterBtn = h("sqh-share-button", { displayrule: this.twitterdisplayrule, text: this.twittertext, backgroundcolor: this.twitterbackgroundcolor, textcolor: this.twittertextcolor, icon: this.twittericon, class: this.twitterclassName, iconhorizontal: this.twittericonhorizontal, iconvertical: this.twittericonvertical, iconsize: this.twittericonsize, url: this.twitterurl });
        var smsBtn = h("sqh-share-button", { displayrule: this.smsdisplayrule, text: this.smstext, backgroundcolor: this.smsbackgroundcolor, textcolor: this.smstextcolor, icon: this.smsicon, class: this.smsclassName, iconhorizontal: this.smsiconhorizontal, iconvertical: this.smsiconvertical, iconsize: this.smsiconsize, url: this.smsurl });
        var whatsappBtn = h("sqh-share-button", { displayrule: this.whatsappdisplayrule, text: this.whatsapptext, backgroundcolor: this.whatsappbackgroundcolor, textcolor: this.whatsapptextcolor, icon: this.whatsappicon, class: this.whatsappclassName, iconhorizontal: this.whatsappiconhorizontal, iconvertical: this.whatsappiconvertical, iconsize: this.whatsappiconsize, url: this.whatsappurl });
        var linkedinBtn = h("sqh-share-button", { displayrule: this.linkedindisplayrule, text: this.linkedintext, backgroundcolor: this.linkedinbackgroundcolor, textcolor: this.linkedintextcolor, icon: this.linkedinicon, class: this.linkedinclassName, iconhorizontal: this.linkediniconhorizontal, iconvertical: this.linkediniconvertical, iconsize: this.linkediniconsize, url: this.linkedinurl });
        var pinterestBtn = h("sqh-share-button", { displayrule: this.pinterestdisplayrule, text: this.pinteresttext, backgroundcolor: this.pinterestbackgroundcolor, textcolor: this.pinteresttextcolor, icon: this.pinteresticon, class: this.pinterestclassName, iconhorizontal: this.pinteresticonhorizontal, iconvertical: this.pinteresticonvertical, iconsize: this.pinteresticonsize, url: this.pinteresturl });
        var messengerBtn = h("sqh-share-button", { displayrule: this.messengerdisplayrule, text: this.messengertext, backgroundcolor: this.messengerbackgroundcolor, textcolor: this.messengertextcolor, icon: this.messengericon, class: this.messengerclassName, iconhorizontal: this.messengericonhorizontal, iconvertical: this.messengericonvertical, iconsize: this.messengericonsize, url: this.messengerurl });
        var lineBtn = h("sqh-share-button", { displayrule: this.linedisplayrule, text: this.linetext, backgroundcolor: this.linebackgroundcolor, textcolor: this.linetextcolor, icon: this.lineicon, class: this.lineclassName, iconhorizontal: this.lineiconhorizontal, iconvertical: this.lineiconvertical, iconsize: this.lineiconsize, url: this.lineurl });
        return !this.ishidden &&
            h("div", null, emailBtn, facebookBtn, twitterBtn, smsBtn, whatsappBtn, linkedinBtn, pinterestBtn, messengerBtn, lineBtn);
    };
    Object.defineProperty(ShareButtonContainer, "is", {
        get: function () { return "sqh-share-button-container"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShareButtonContainer, "properties", {
        get: function () {
            return {
                "emailbackgroundcolor": {
                    "type": String,
                    "attr": "emailbackgroundcolor"
                },
                "emailclassName": {
                    "type": String,
                    "attr": "emailclass-name"
                },
                "emaildisplayrule": {
                    "type": String,
                    "attr": "emaildisplayrule"
                },
                "emailicon": {
                    "type": String,
                    "attr": "emailicon"
                },
                "emailiconhorizontal": {
                    "type": Number,
                    "attr": "emailiconhorizontal"
                },
                "emailiconsize": {
                    "type": Number,
                    "attr": "emailiconsize"
                },
                "emailiconvertical": {
                    "type": Number,
                    "attr": "emailiconvertical"
                },
                "emailtext": {
                    "type": String,
                    "attr": "emailtext"
                },
                "emailtextcolor": {
                    "type": String,
                    "attr": "emailtextcolor"
                },
                "emailurl": {
                    "state": true
                },
                "facebookbackgroundcolor": {
                    "type": String,
                    "attr": "facebookbackgroundcolor"
                },
                "facebookclassName": {
                    "type": String,
                    "attr": "facebookclass-name"
                },
                "facebookdisplayrule": {
                    "type": String,
                    "attr": "facebookdisplayrule"
                },
                "facebookicon": {
                    "type": String,
                    "attr": "facebookicon"
                },
                "facebookiconhorizontal": {
                    "type": Number,
                    "attr": "facebookiconhorizontal"
                },
                "facebookiconsize": {
                    "type": Number,
                    "attr": "facebookiconsize"
                },
                "facebookiconvertical": {
                    "type": Number,
                    "attr": "facebookiconvertical"
                },
                "facebooktext": {
                    "type": String,
                    "attr": "facebooktext"
                },
                "facebooktextcolor": {
                    "type": String,
                    "attr": "facebooktextcolor"
                },
                "facebookurl": {
                    "state": true
                },
                "ishidden": {
                    "type": Boolean,
                    "attr": "ishidden"
                },
                "linebackgroundcolor": {
                    "type": String,
                    "attr": "linebackgroundcolor"
                },
                "lineclassName": {
                    "type": String,
                    "attr": "lineclass-name"
                },
                "linedisplayrule": {
                    "type": String,
                    "attr": "linedisplayrule"
                },
                "lineicon": {
                    "type": String,
                    "attr": "lineicon"
                },
                "lineiconhorizontal": {
                    "type": Number,
                    "attr": "lineiconhorizontal"
                },
                "lineiconsize": {
                    "type": Number,
                    "attr": "lineiconsize"
                },
                "lineiconvertical": {
                    "type": Number,
                    "attr": "lineiconvertical"
                },
                "linetext": {
                    "type": String,
                    "attr": "linetext"
                },
                "linetextcolor": {
                    "type": String,
                    "attr": "linetextcolor"
                },
                "lineurl": {
                    "state": true
                },
                "linkedinbackgroundcolor": {
                    "type": String,
                    "attr": "linkedinbackgroundcolor"
                },
                "linkedinclassName": {
                    "type": String,
                    "attr": "linkedinclass-name"
                },
                "linkedindisplayrule": {
                    "type": String,
                    "attr": "linkedindisplayrule"
                },
                "linkedinicon": {
                    "type": String,
                    "attr": "linkedinicon"
                },
                "linkediniconhorizontal": {
                    "type": Number,
                    "attr": "linkediniconhorizontal"
                },
                "linkediniconsize": {
                    "type": Number,
                    "attr": "linkediniconsize"
                },
                "linkediniconvertical": {
                    "type": Number,
                    "attr": "linkediniconvertical"
                },
                "linkedintext": {
                    "type": String,
                    "attr": "linkedintext"
                },
                "linkedintextcolor": {
                    "type": String,
                    "attr": "linkedintextcolor"
                },
                "linkedinurl": {
                    "state": true
                },
                "messengerbackgroundcolor": {
                    "type": String,
                    "attr": "messengerbackgroundcolor"
                },
                "messengerclassName": {
                    "type": String,
                    "attr": "messengerclass-name"
                },
                "messengerdisplayrule": {
                    "type": String,
                    "attr": "messengerdisplayrule"
                },
                "messengericon": {
                    "type": String,
                    "attr": "messengericon"
                },
                "messengericonhorizontal": {
                    "type": Number,
                    "attr": "messengericonhorizontal"
                },
                "messengericonsize": {
                    "type": Number,
                    "attr": "messengericonsize"
                },
                "messengericonvertical": {
                    "type": Number,
                    "attr": "messengericonvertical"
                },
                "messengertext": {
                    "type": String,
                    "attr": "messengertext"
                },
                "messengertextcolor": {
                    "type": String,
                    "attr": "messengertextcolor"
                },
                "messengerurl": {
                    "state": true
                },
                "pinterestbackgroundcolor": {
                    "type": String,
                    "attr": "pinterestbackgroundcolor"
                },
                "pinterestclassName": {
                    "type": String,
                    "attr": "pinterestclass-name"
                },
                "pinterestdisplayrule": {
                    "type": String,
                    "attr": "pinterestdisplayrule"
                },
                "pinteresticon": {
                    "type": String,
                    "attr": "pinteresticon"
                },
                "pinteresticonhorizontal": {
                    "type": Number,
                    "attr": "pinteresticonhorizontal"
                },
                "pinteresticonsize": {
                    "type": Number,
                    "attr": "pinteresticonsize"
                },
                "pinteresticonvertical": {
                    "type": Number,
                    "attr": "pinteresticonvertical"
                },
                "pinteresttext": {
                    "type": String,
                    "attr": "pinteresttext"
                },
                "pinteresttextcolor": {
                    "type": String,
                    "attr": "pinteresttextcolor"
                },
                "pinteresturl": {
                    "state": true
                },
                "smsbackgroundcolor": {
                    "type": String,
                    "attr": "smsbackgroundcolor"
                },
                "smsclassName": {
                    "type": String,
                    "attr": "smsclass-name"
                },
                "smsdisplayrule": {
                    "type": String,
                    "attr": "smsdisplayrule"
                },
                "smsicon": {
                    "type": String,
                    "attr": "smsicon"
                },
                "smsiconhorizontal": {
                    "type": Number,
                    "attr": "smsiconhorizontal"
                },
                "smsiconsize": {
                    "type": Number,
                    "attr": "smsiconsize"
                },
                "smsiconvertical": {
                    "type": Number,
                    "attr": "smsiconvertical"
                },
                "smstext": {
                    "type": String,
                    "attr": "smstext"
                },
                "smstextcolor": {
                    "type": String,
                    "attr": "smstextcolor"
                },
                "smsurl": {
                    "state": true
                },
                "twitterbackgroundcolor": {
                    "type": String,
                    "attr": "twitterbackgroundcolor"
                },
                "twitterclassName": {
                    "type": String,
                    "attr": "twitterclass-name"
                },
                "twitterdisplayrule": {
                    "type": String,
                    "attr": "twitterdisplayrule"
                },
                "twittericon": {
                    "type": String,
                    "attr": "twittericon"
                },
                "twittericonhorizontal": {
                    "type": Number,
                    "attr": "twittericonhorizontal"
                },
                "twittericonsize": {
                    "type": Number,
                    "attr": "twittericonsize"
                },
                "twittericonvertical": {
                    "type": Number,
                    "attr": "twittericonvertical"
                },
                "twittertext": {
                    "type": String,
                    "attr": "twittertext"
                },
                "twittertextcolor": {
                    "type": String,
                    "attr": "twittertextcolor"
                },
                "twitterurl": {
                    "state": true
                },
                "whatsappbackgroundcolor": {
                    "type": String,
                    "attr": "whatsappbackgroundcolor"
                },
                "whatsappclassName": {
                    "type": String,
                    "attr": "whatsappclass-name"
                },
                "whatsappdisplayrule": {
                    "type": String,
                    "attr": "whatsappdisplayrule"
                },
                "whatsappicon": {
                    "type": String,
                    "attr": "whatsappicon"
                },
                "whatsappiconhorizontal": {
                    "type": Number,
                    "attr": "whatsappiconhorizontal"
                },
                "whatsappiconsize": {
                    "type": Number,
                    "attr": "whatsappiconsize"
                },
                "whatsappiconvertical": {
                    "type": Number,
                    "attr": "whatsappiconvertical"
                },
                "whatsapptext": {
                    "type": String,
                    "attr": "whatsapptext"
                },
                "whatsapptextcolor": {
                    "type": String,
                    "attr": "whatsapptextcolor"
                },
                "whatsappurl": {
                    "state": true
                }
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShareButtonContainer, "style", {
        get: function () { return "sqh-share-button-container {\n  text-align: center;\n  display: block;\n  max-width: 100%;\n  padding-bottom: 24px;\n  border-bottom: 1px solid lightgray; }\n  sqh-share-button-container .squatch-share-btn.hidden {\n    display: none; }\n  sqh-share-button-container .squatch-share-btn.mobile-only {\n    display: none; }\n    \@media (max-width: 499px) {\n      sqh-share-button-container .squatch-share-btn.mobile-only {\n        display: block; } }\n  \@media (max-width: 499px) {\n    sqh-share-button-container .squatch-share-btn.desktop-only {\n      display: none; } }"; },
        enumerable: true,
        configurable: true
    });
    return ShareButtonContainer;
}());
export { ShareButton as SqhShareButton, ShareButtonContainer as SqhShareButtonContainer };
var templateObject_1;
