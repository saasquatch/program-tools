/*! Built with http://stenciljs.com */
var __makeTemplateObject=this&&this.__makeTemplateObject||function(t,e){return Object.defineProperty?Object.defineProperty(t,"raw",{value:e}):t.raw=e,t};WidgetComponents.loadBundle("esi8ibvk",["exports","./chunk-3d9a4dff.js","./chunk-18186f60.js","./chunk-a3044998.js","./chunk-5e27bf52.js"],function(t,e,i,r,n){var o=window.WidgetComponents.h,s=function(){function t(){}return t.prototype.clickHandler=function(t){if("demo"!==window.widgetIdent.env){if(null!==t.target.closest("a")&&"email-share"!==this.className){t.preventDefault();var e=this.url;window.open(e,"_blank","status=0,width=680,height=580")}}else t.preventDefault()},t.prototype.componentDidLoad=function(){this.button.addEventListener("click",this.clickHandler.bind(this),!1)},t.prototype.render=function(){var t=e.detectMobileSafari()?"_parent":"_blank",r="icon icon-"+this.icon,n=i.css(__makeTemplateObject(["\n      background-color: ",";\n      border: 1px solid ",";\n      color: ",";\n\n                        \n      &:hover {\n        background: ",";\n        border-color: ",";\n        color: ",";\n      }\n                    \n      &:focus {\n        color: ",";\n      }\n      .icon-"," {\n        left: ","px;\n        top: ","px;\n        font-size: ","em;\n      }\n    "],["\n      background-color: ",";\n      border: 1px solid ",";\n      color: ",";\n\n                        \n      &:hover {\n        background: ",";\n        border-color: ",";\n        color: ",";\n      }\n                    \n      &:focus {\n        color: ",";\n      }\n      .icon-"," {\n        left: ","px;\n        top: ","px;\n        font-size: ","em;\n      }\n    "]),this.backgroundcolor,this.backgroundcolor,this.textcolor,e.shadeColor(this.backgroundcolor,10),e.shadeColor(this.backgroundcolor,12),this.textcolor,this.textcolor,this.icon,this.iconhorizontal,this.iconvertical,this.iconsize),s=["squatch-share-btn",this.className,this.displayrule,n].join(" ");return o("a",{class:s,href:this.url,target:t},o("i",{class:r}),o("span",{class:"share-btn-text"},this.text))},Object.defineProperty(t,"is",{get:function(){return"sqh-share-button"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"properties",{get:function(){return{backgroundcolor:{type:String,attr:"backgroundcolor"},button:{elementRef:!0},className:{type:String,attr:"class-name"},displayrule:{type:String,attr:"displayrule"},icon:{type:String,attr:"icon"},iconhorizontal:{type:Number,attr:"iconhorizontal"},iconsize:{type:Number,attr:"iconsize"},iconvertical:{type:Number,attr:"iconvertical"},text:{type:String,attr:"text"},textcolor:{type:String,attr:"textcolor"},type:{type:String,attr:"type"},url:{type:String,attr:"url"}}},enumerable:!0,configurable:!0}),Object.defineProperty(t,"style",{get:function(){return"sqh-share-button{display:inline-block}sqh-share-button .squatch-share-btn{display:block;text-align:center;-ms-touch-action:manipulation;touch-action:manipulation;cursor:pointer;background-image:none;white-space:nowrap;padding:6px 12px;font-size:14px;line-height:1.428571429;border-radius:4px;width:140px;margin:5px}sqh-share-button .squatch-share-btn .share-btn-text{text-align:center;padding-left:30px}sqh-share-button .squatch-share-btn:focus{outline:0}fieldset[disabled] sqh-share-button .squatch-share-btn,sqh-share-button .squatch-share-btn.disabled,sqh-share-button .squatch-share-btn[disabled]{cursor:not-allowed;pointer-events:none;opacity:.65;-webkit-box-shadow:none;box-shadow:none}sqh-share-button a{position:relative;text-decoration:none}sqh-share-button a .icon{position:absolute;left:10px;top:6px;width:16px}sqh-share-button a:before{bottom:-1px;background:rgba(255,255,255,.18);content:'';left:-1px;position:absolute;top:-1px;width:40px}\@media (max-width:499px){sqh-share-button{display:block}sqh-share-button .squatch-share-btn{margin:5px 0;width:auto}}"},enumerable:!0,configurable:!0}),t}(),a=function(){function t(){this.ishidden=!1,this.emailicon="mail",this.emailclassName="email-share",this.facebookicon="facebook",this.facebookiconhorizontal=9,this.facebookiconsize=1.2,this.twittericon="twitter",this.twittericonhorizontal=9,this.twittericonsize=1.2,this.smsicon="chat",this.whatsapptextcolor="#fff",this.whatsappicon="whatsapp",this.whatsappiconhorizontal=7,this.whatsappiconvertical=2,this.whatsappiconsize=1.4,this.linkedinicon="linkedin",this.linkediniconsize=1.2,this.pinteresticon="pinterest",this.pinteresticonhorizontal=9,this.pinteresticonvertical=4,this.pinteresticonsize=1.2,this.messengericon="messenger",this.messengericonhorizontal=7,this.messengericonvertical=3,this.messengericonsize=1.4,this.lineicon="line",this.lineiconhorizontal=-2,this.lineiconvertical=-5,this.lineiconsize=2.2}return t.prototype.componentWillLoad=function(){if(!this.ishidden)return this.getMessageLinks(["EMAIL","FACEBOOK","TWITTER","SMS","WHATSAPP","LINKEDIN","PINTEREST","FBMESSENGER","LINEMESSENGER"])},t.prototype.getMessageLinks=function(t){var e=this;return r.API.graphql.getMessageLinks(t).then(function(t){e.emailurl=t.EMAIL,e.facebookurl=t.FACEBOOK,e.twitterurl=t.TWITTER,e.smsurl=t.SMS,e.whatsappurl=t.WHATSAPP,e.linkedinurl=t.LINKEDIN,e.pinteresturl=t.PINTEREST,e.messengerurl=t.FBMESSENGER,e.lineurl=t.LINEMESSENGER}).catch(function(t){e.onError(t)})},t.prototype.onError=function(t){console.log("Error loading via GraphQL.",t)},t.prototype.render=function(){var t=o("sqh-share-button",{displayrule:this.emaildisplayrule,text:this.emailtext,backgroundcolor:this.emailbackgroundcolor,textcolor:this.emailtextcolor,icon:this.emailicon,class:this.emailclassName,iconhorizontal:this.emailiconhorizontal,iconvertical:this.emailiconvertical,iconsize:this.emailiconsize,url:this.emailurl}),e=o("sqh-share-button",{displayrule:this.facebookdisplayrule,text:this.facebooktext,backgroundcolor:this.facebookbackgroundcolor,textcolor:this.facebooktextcolor,icon:this.facebookicon,class:this.facebookclassName,iconhorizontal:this.facebookiconhorizontal,iconvertical:this.facebookiconvertical,iconsize:this.facebookiconsize,url:this.facebookurl}),i=o("sqh-share-button",{displayrule:this.twitterdisplayrule,text:this.twittertext,backgroundcolor:this.twitterbackgroundcolor,textcolor:this.twittertextcolor,icon:this.twittericon,class:this.twitterclassName,iconhorizontal:this.twittericonhorizontal,iconvertical:this.twittericonvertical,iconsize:this.twittericonsize,url:this.twitterurl}),r=o("sqh-share-button",{displayrule:this.smsdisplayrule,text:this.smstext,backgroundcolor:this.smsbackgroundcolor,textcolor:this.smstextcolor,icon:this.smsicon,class:this.smsclassName,iconhorizontal:this.smsiconhorizontal,iconvertical:this.smsiconvertical,iconsize:this.smsiconsize,url:this.smsurl}),n=o("sqh-share-button",{displayrule:this.whatsappdisplayrule,text:this.whatsapptext,backgroundcolor:this.whatsappbackgroundcolor,textcolor:this.whatsapptextcolor,icon:this.whatsappicon,class:this.whatsappclassName,iconhorizontal:this.whatsappiconhorizontal,iconvertical:this.whatsappiconvertical,iconsize:this.whatsappiconsize,url:this.whatsappurl}),s=o("sqh-share-button",{displayrule:this.linkedindisplayrule,text:this.linkedintext,backgroundcolor:this.linkedinbackgroundcolor,textcolor:this.linkedintextcolor,icon:this.linkedinicon,class:this.linkedinclassName,iconhorizontal:this.linkediniconhorizontal,iconvertical:this.linkediniconvertical,iconsize:this.linkediniconsize,url:this.linkedinurl}),a=o("sqh-share-button",{displayrule:this.pinterestdisplayrule,text:this.pinteresttext,backgroundcolor:this.pinterestbackgroundcolor,textcolor:this.pinteresttextcolor,icon:this.pinteresticon,class:this.pinterestclassName,iconhorizontal:this.pinteresticonhorizontal,iconvertical:this.pinteresticonvertical,iconsize:this.pinteresticonsize,url:this.pinteresturl}),c=o("sqh-share-button",{displayrule:this.messengerdisplayrule,text:this.messengertext,backgroundcolor:this.messengerbackgroundcolor,textcolor:this.messengertextcolor,icon:this.messengericon,class:this.messengerclassName,iconhorizontal:this.messengericonhorizontal,iconvertical:this.messengericonvertical,iconsize:this.messengericonsize,url:this.messengerurl}),l=o("sqh-share-button",{displayrule:this.linedisplayrule,text:this.linetext,backgroundcolor:this.linebackgroundcolor,textcolor:this.linetextcolor,icon:this.lineicon,class:this.lineclassName,iconhorizontal:this.lineiconhorizontal,iconvertical:this.lineiconvertical,iconsize:this.lineiconsize,url:this.lineurl});return!this.ishidden&&o("div",null,t,e,i,r,n,s,a,c,l)},Object.defineProperty(t,"is",{get:function(){return"sqh-share-button-container"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"properties",{get:function(){return{emailbackgroundcolor:{type:String,attr:"emailbackgroundcolor"},emailclassName:{type:String,attr:"emailclass-name"},emaildisplayrule:{type:String,attr:"emaildisplayrule"},emailicon:{type:String,attr:"emailicon"},emailiconhorizontal:{type:Number,attr:"emailiconhorizontal"},emailiconsize:{type:Number,attr:"emailiconsize"},emailiconvertical:{type:Number,attr:"emailiconvertical"},emailtext:{type:String,attr:"emailtext"},emailtextcolor:{type:String,attr:"emailtextcolor"},emailurl:{state:!0},facebookbackgroundcolor:{type:String,attr:"facebookbackgroundcolor"},facebookclassName:{type:String,attr:"facebookclass-name"},facebookdisplayrule:{type:String,attr:"facebookdisplayrule"},facebookicon:{type:String,attr:"facebookicon"},facebookiconhorizontal:{type:Number,attr:"facebookiconhorizontal"},facebookiconsize:{type:Number,attr:"facebookiconsize"},facebookiconvertical:{type:Number,attr:"facebookiconvertical"},facebooktext:{type:String,attr:"facebooktext"},facebooktextcolor:{type:String,attr:"facebooktextcolor"},facebookurl:{state:!0},ishidden:{type:Boolean,attr:"ishidden"},linebackgroundcolor:{type:String,attr:"linebackgroundcolor"},lineclassName:{type:String,attr:"lineclass-name"},linedisplayrule:{type:String,attr:"linedisplayrule"},lineicon:{type:String,attr:"lineicon"},lineiconhorizontal:{type:Number,attr:"lineiconhorizontal"},lineiconsize:{type:Number,attr:"lineiconsize"},lineiconvertical:{type:Number,attr:"lineiconvertical"},linetext:{type:String,attr:"linetext"},linetextcolor:{type:String,attr:"linetextcolor"},lineurl:{state:!0},linkedinbackgroundcolor:{type:String,attr:"linkedinbackgroundcolor"},linkedinclassName:{type:String,attr:"linkedinclass-name"},linkedindisplayrule:{type:String,attr:"linkedindisplayrule"},linkedinicon:{type:String,attr:"linkedinicon"},linkediniconhorizontal:{type:Number,attr:"linkediniconhorizontal"},linkediniconsize:{type:Number,attr:"linkediniconsize"},linkediniconvertical:{type:Number,attr:"linkediniconvertical"},linkedintext:{type:String,attr:"linkedintext"},linkedintextcolor:{type:String,attr:"linkedintextcolor"},linkedinurl:{state:!0},messengerbackgroundcolor:{type:String,attr:"messengerbackgroundcolor"},messengerclassName:{type:String,attr:"messengerclass-name"},messengerdisplayrule:{type:String,attr:"messengerdisplayrule"},messengericon:{type:String,attr:"messengericon"},messengericonhorizontal:{type:Number,attr:"messengericonhorizontal"},messengericonsize:{type:Number,attr:"messengericonsize"},messengericonvertical:{type:Number,attr:"messengericonvertical"},messengertext:{type:String,attr:"messengertext"},messengertextcolor:{type:String,attr:"messengertextcolor"},messengerurl:{state:!0},pinterestbackgroundcolor:{type:String,attr:"pinterestbackgroundcolor"},pinterestclassName:{type:String,attr:"pinterestclass-name"},pinterestdisplayrule:{type:String,attr:"pinterestdisplayrule"},pinteresticon:{type:String,attr:"pinteresticon"},pinteresticonhorizontal:{type:Number,attr:"pinteresticonhorizontal"},pinteresticonsize:{type:Number,attr:"pinteresticonsize"},pinteresticonvertical:{type:Number,attr:"pinteresticonvertical"},pinteresttext:{type:String,attr:"pinteresttext"},pinteresttextcolor:{type:String,attr:"pinteresttextcolor"},pinteresturl:{state:!0},smsbackgroundcolor:{type:String,attr:"smsbackgroundcolor"},smsclassName:{type:String,attr:"smsclass-name"},smsdisplayrule:{type:String,attr:"smsdisplayrule"},smsicon:{type:String,attr:"smsicon"},smsiconhorizontal:{type:Number,attr:"smsiconhorizontal"},smsiconsize:{type:Number,attr:"smsiconsize"},smsiconvertical:{type:Number,attr:"smsiconvertical"},smstext:{type:String,attr:"smstext"},smstextcolor:{type:String,attr:"smstextcolor"},smsurl:{state:!0},twitterbackgroundcolor:{type:String,attr:"twitterbackgroundcolor"},twitterclassName:{type:String,attr:"twitterclass-name"},twitterdisplayrule:{type:String,attr:"twitterdisplayrule"},twittericon:{type:String,attr:"twittericon"},twittericonhorizontal:{type:Number,attr:"twittericonhorizontal"},twittericonsize:{type:Number,attr:"twittericonsize"},twittericonvertical:{type:Number,attr:"twittericonvertical"},twittertext:{type:String,attr:"twittertext"},twittertextcolor:{type:String,attr:"twittertextcolor"},twitterurl:{state:!0},whatsappbackgroundcolor:{type:String,attr:"whatsappbackgroundcolor"},whatsappclassName:{type:String,attr:"whatsappclass-name"},whatsappdisplayrule:{type:String,attr:"whatsappdisplayrule"},whatsappicon:{type:String,attr:"whatsappicon"},whatsappiconhorizontal:{type:Number,attr:"whatsappiconhorizontal"},whatsappiconsize:{type:Number,attr:"whatsappiconsize"},whatsappiconvertical:{type:Number,attr:"whatsappiconvertical"},whatsapptext:{type:String,attr:"whatsapptext"},whatsapptextcolor:{type:String,attr:"whatsapptextcolor"},whatsappurl:{state:!0}}},enumerable:!0,configurable:!0}),Object.defineProperty(t,"style",{get:function(){return"sqh-share-button-container{text-align:center;display:block;max-width:100%;padding-bottom:24px;border-bottom:1px solid #d3d3d3}sqh-share-button-container .squatch-share-btn.hidden,sqh-share-button-container .squatch-share-btn.mobile-only{display:none}\@media (max-width:499px){sqh-share-button-container .squatch-share-btn.mobile-only{display:block}sqh-share-button-container .squatch-share-btn.desktop-only{display:none}}"},enumerable:!0,configurable:!0}),t}();t.SqhShareButton=s,t.SqhShareButtonContainer=a,Object.defineProperty(t,"__esModule",{value:!0})});