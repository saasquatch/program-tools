import React from 'react';
import ReactDOM from "react-dom";

export default (editor, config = {}) => {
   // Get DomComponents module
   var comps = editor.DomComponents;

   // Get the model and the view from the default Component type
   var defaultType = comps.getType('default');
   var defaultModel = defaultType.model;
   var defaultView = defaultType.view;
 
   const fontFamilyOpts = {
     default: "Helvetica Neue,Helvetica,Arial,sans-serif",
     enum: [
       "Helvetica Neue,Helvetica,Arial,sans-serif",
       "Lato,sans-serif",
       "Times New Roman",
       "Arial",
       "Courier",
       "Tahoma",
       "Verdana",
       "Georgia"
     ],
     enumNames: [
       "Helvetica Neue",
       "Lato",
       "Times New Roman",
       "Arial",
       "Courier",
       "Tahoma",
       "Verdana",
       "Georgia"
     ]
   }
 
   const poweredByUi = editor.canWhitelabel ?
   {'ui:disabled': false }:
   {'ui:disabled': true, 'ui:help': <div>Can only be disabled on <span className="label">Pro</span> plans</div>, "ui:title": <span><span className="ico ico-lock"></span> Show Powered By</span> };
   
   const markdownUi = {
     'ui:widget': (props) => {
       const { schema, id, value, required, disabled, readonly, label, autofocus, onChange } = props;
         
       return (<div className={`checkbox ${disabled || readonly ? "disabled" : ""}`}>
         <label>
           <input
             type="checkbox"
             id={id}
             checked={typeof value === "undefined" ? false : value}
             required={required}
             disabled={disabled || readonly}
             autoFocus={autofocus}
             onChange={event => onChange(event.target.checked)}
           />
           <span>Use markdown. <a href="https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet" target="_blank">More Info.</a></span>
         </label>
       </div>)
     },
     'ui:title': <span></span>
   };
 
   comps.addType('sqh-global-container', {
     // Define the Model
     model: defaultModel.extend({
       // Extend default properties
       defaults: Object.assign({}, defaultModel.prototype.defaults, {
         name: 'Widget Style',
         selectable: false,
         droppable: false,
         draggable: false,
         traits: [
           {type: 'string', title: 'Background Color', name: 'background', value: '#FFFFFF'},
           {type: 'string', title: 'Font Family', name: 'fontfamily', value: 'Helvetica Neue,Helvetica,Arial,sans-serif', ...fontFamilyOpts},
           {type: 'boolean', title: 'Show Powered By', name: 'poweredby', value: true}
         ],
         uiSchema: {
           'background': { 'ui:widget': 'color' },
           'poweredby': poweredByUi
         }
       })
     },
     {
       isComponent: function(el) {
         if(el.tagName == 'SQH-GLOBAL-CONTAINER'){
           return {type: 'sqh-global-container'};
         }
       },
     }),
 
     view: defaultType.view
   })
 
   comps.addType('sqh-text-component', {
     // Define the Model
     model: defaultModel.extend({
       // Extend default properties
       defaults: Object.assign({}, defaultModel.prototype.defaults, {
         name: 'Text Component',
 
         // can be dropped only inside 
         draggable: false,
 
         // these components can be dropped in here
         droppable: false,
 
         selectable: true,
         
         toolbar: [],
 
         traits: [
           { type: 'boolean', title: 'Hidden', name: 'ishidden', value: false },
           { type: 'boolean', title: 'Use Markdown', name: 'ismarkdown', value: false },
           { type: 'string', title: 'Content', name: 'text', value: 'Give a friend $10 and receive $10 for yourself when they sign up!' },
           { type: 'string', title: 'Font Color', name: 'color', value: '#000000' },
           { type: 'integer', title: 'Font Size', name: 'fontsize', value: 16 },
           { type: 'string', title: 'Text Align', name: 'textalign', enum: ['left', 'center', 'right'], enumNames: ['Left', 'Center', 'Right'], default: 'center' },
           { type: 'string', title: 'Padding Top', name: 'paddingtop', default: '10'},
           { type: 'string', title: 'Padding Bottom', name: 'paddingbottom', default: '10'},
 
         ],
         uiSchema: {
           'ishidden': { 'ui:widget': 'hidden' },
           'color': { 'ui:widget': 'color' },
           'fontsize': { 'ui:widget': 'updown' },
           'ismarkdown': markdownUi
         }
       }),
     },
     {
       isComponent: function(el) {
         if(el.tagName == 'SQH-TEXT-COMPONENT'){
           return {type: 'sqh-text-component'};
         }
       },
     }),
 
     view: defaultType.view,
   })
 
   const textComp = comps.getType('sqh-text-component')
 
   comps.addType('sqh-header', {
     model: textComp.model.extend({
       defaults: Object.assign({}, textComp.model.prototype.defaults, {
         name: 'Header',
         traits: [
           { type: 'boolean', title: 'Hidden', name: 'ishidden', value: false },
           { type: 'boolean', title: 'Use Markdown', name: 'ismarkdown', value: false },
           { type: 'string', title: 'Content', name: 'text', value: 'Give $10 and Get $10' },
           { type: 'string', title: 'Font Color', name: 'color', value: '#4486E1' },
           { type: 'integer', title: 'Font Size', name: 'fontsize', value: 28 },
           { type: 'string', title: 'Text Align', name: 'textalign', enum: ['left', 'center', 'right'], enumNames: ['Left', 'Center', 'Right'], default: 'center' },
           { type: 'string', title: 'Padding Top', name: 'paddingtop', default: '10'},
           { type: 'string', title: 'Padding Bottom', name: 'paddingbottom', default: '10'},
         ],
         uiSchema: {
           'ishidden': { 'ui:widget': 'hidden' },
           'text': { 'ui:widget': 'textarea' },
           'ismarkdown': markdownUi
         }
       })
     },
     {
       isComponent: function(el) {
         if(el.tagName == 'SQH-TEXT-COMPONENT' && el.getAttribute('sqhheader')){
           return {type: 'sqh-header'};
         }
       },
     }),
 
     view: textComp.view
   })
 
   comps.addType('sqh-body', {
     model: textComp.model.extend({
       defaults: Object.assign({}, textComp.model.prototype.defaults, {
         name: 'Body',
         uiSchema: {
           'text': { 'ui:widget': 'textarea', 'ui:options': { rows: 8 } },
           'ishidden': { 'ui:widget': 'hidden' },
           'color': { 'ui:widget': 'color' },
           'fontsize': { 'ui:widget': 'updown' },
           'ismarkdown': markdownUi
         }
       })
     },
     {
       isComponent: function(el) {
         if(el.tagName == 'SQH-TEXT-COMPONENT' && el.getAttribute('sqhbody')){
           return {type: 'sqh-body'};
         }
       },
     }),
 
     view: textComp.view
   })
 
   comps.addType('sqh-referrals-header', {
     model: textComp.model.extend({
       defaults: Object.assign({}, textComp.model.prototype.defaults, {
         name: 'Referrals Header',
         traits: [
           { type: 'boolean', title: 'Hidden', name: 'ishidden', value: false },
           { type: 'boolean', title: 'Use Markdown', name: 'ismarkdown', value: true },
           { type: 'string', title: 'Content', name: 'text', value: '**Referrals Dashboard**' },
           { type: 'string', title: 'Font Color', name: 'color', value: '#000000' },
           { type: 'integer', title: 'Font Size', name: 'fontsize', value: 14 },
           { type: 'string', title: 'Text Align', name: 'textalign', enum: ['left', 'center', 'right'], enumNames: ['Left', 'Center', 'Right'], default: 'center' },
           { type: 'string', title: 'Padding Top', name: 'paddingtop', default: '10'},
           { type: 'string', title: 'Padding Bottom', name: 'paddingbottom', default: '10'},
         ]
       })
     },
     {
       isComponent: function(el) {
         if(el.tagName == 'SQH-TEXT-COMPONENT' && el.getAttribute('sqhreferralsheader')){
           return {type: 'sqh-referrals-header'};
         }
       },
     }),
 
     view: textComp.view
   })
 
   comps.addType('sqh-banner', {
     model: textComp.model.extend({
       defaults: Object.assign({}, textComp.model.prototype.defaults, {
         name: 'Banner',
         traits: [
           { type: 'boolean', title: 'Hidden', name: 'ishidden', value: true },
           { type: 'string', title: 'Image URL', name: 'background', value: 'http://res.cloudinary.com/saasquatch/image/upload/v1517426138/Optimalprint_FB_OG_default_jky5tu.jpg', format: 'uri' },
           { type: 'string', title: 'Height', name: 'height', value: 'auto' },
           { type: 'string', title: 'Padding Top', name: 'paddingtop', default: '10'},
           { type: 'string', title: 'Padding Bottom', name: 'paddingbottom', default: '10'},
           { type: 'string', title: 'Content', name: 'text', value: 'Text in banner' },
           { type: 'string', title: 'Font Color', name: 'color', value: '#000000' },
         ],
         uiSchema: {
           'ishidden': { 'ui:widget': 'hidden' },
           'color': { 'ui:widget': 'color' }
         }
       })
     },
     {
       isComponent: function(el) {
         if(el.tagName == 'SQH-TEXT-COMPONENT' && el.getAttribute('sqhbanner')){
           return {type: 'sqh-banner'};
         }
       },
     }),
 
     view: textComp.view
   })
 
   comps.addType('sqh-copy-link-button', {
     model: defaultModel.extend({
         defaults: Object.assign({}, defaultModel.prototype.defaults, {
           name: "Reward Link",
           // can be dropped only inside 
           draggable: false,
 
           // these components can be dropped in here
           droppable: false,
 
           selectable: true,
           toolbar: [],
           traits: [
             { type: 'boolean', title: 'Hidden', name: 'ishidden', value: false },
             { type: 'string', title: 'Button Text', name: 'text', value: 'Copy' },
             { type: 'string', title: 'Button Color', name: 'buttoncolor', value: '#5C6164' },
             { type: 'string', title: 'Text Color', name: 'textcolor', value: '#FFFFFF' },
           ],
           uiSchema: {
             'ishidden': { 'ui:widget': 'hidden' },
             'buttoncolor': { 'ui:widget': 'color' },
             'textcolor': { 'ui:widget': 'color' },
           }
         })
       },
       {
         isComponent: function (el) {
           if (el.tagName === 'SQH-COPY-LINK-BUTTON') {
             return { type: 'sqh-copy-link-button' };
           }
         },
       }),
 
     view: defaultType.view.extend({
       render: function () {
         defaultType.view.prototype.render.apply(this, arguments);
         return this;
       },
     }),
   });
 
   const displayOpts = {
     enum: [
       'mobile-and-desktop',
       'mobile-only',
       'desktop-only',
       'hidden'
     ],
     enumNames: [
       'Mobile and Desktop',
       'Mobile Only',
       'Desktop Only',
       'Hide'
     ],
   }
 
   const mobileOnlyDisplayOpts = {
     enum: [
       'mobile-only',
       'hidden'
     ],
     enumNames: [
       'Mobile Only',
       'Hide'
     ]
   }
 
   const displayRuleObj = {
     default: {
       'title': 'Display Rule',
       'type': 'string',
       ...displayOpts,
       'default': 'mobile-and-desktop'
     },
     mobile: {
       'title': 'Display Rule',
       'type': 'string',
       ...mobileOnlyDisplayOpts,
       'default': 'mobile-only'
     }
   }
 
   const shareMediumTextObj = {
     'title': 'Button Text',
     'type': 'string',
   }
 
   const shareMediumTextColorObj = {
     'title': 'Text Color',
     'type': 'string',
   }
 
   const shareMediumColorObj = {
     'title': 'Button Color',
     'type': 'string',
   }
 
   comps.addType('sqh-share-button-container', {
     model: defaultModel.extend({
         defaults: Object.assign({}, defaultModel.prototype.defaults, {
           name: "Share Button Container",
 
           // can drop these elements in 
           droppable: false,
 
           // can be dropped only inside 
           draggable: false,
 
           selectable: true,
 
           toolbar: [],
 
           traits: [
             { type: 'boolean', name: 'ishidden', value: false },
             { type: 'string', name: 'emaildisplayrule', value: 'mobile-and-desktop' },
             { type: 'string', name: 'emailtext', value: 'Email' },
             { type: 'string', name: 'emailtextcolor', value: '#ffffff' },
             { type: 'string', name: 'emailbackgroundcolor', value: '#373a3d' },
             { type: 'string', name: 'facebookdisplayrule', value: 'mobile-and-desktop' },
             { type: 'string', name: 'facebooktext', value: 'Facebook' },
             { type: 'string', name: 'facebooktextcolor', value: '#ffffff' },
             { type: 'string', name: 'facebookbackgroundcolor', value: '#234079' },
             { type: 'string', name: 'twitterdisplayrule', value: 'mobile-and-desktop' },
             { type: 'string', name: 'twittertext', value: 'Twitter' },
             { type: 'string', name: 'twittertextcolor', value: '#ffffff' },
             { type: 'string', name: 'twitterbackgroundcolor', value: '#4797d2' },
             { type: 'string', name: 'smsdisplayrule', value: 'mobile-only' },
             { type: 'string', name: 'smstext', value: 'SMS' },
             { type: 'string', name: 'smstextcolor', value: '#ffffff' },
             { type: 'string', name: 'smsbackgroundcolor', value: '#7bbf38' },
             { type: 'string', name: 'whatsappdisplayrule', value: 'mobile-only' },
             { type: 'string', name: 'whatsapptext', value: 'WhatsApp' },
             { type: 'string', name: 'whatsapptextcolor', value: '#ffffff' },
             { type: 'string', name: 'whatsappbackgroundcolor', value: '#25D366' },
             { type: 'string', name: 'linkedindisplayrule', value: 'hidden' },
             { type: 'string', name: 'linkedintext', value: 'LinkedIn' },
             { type: 'string', name: 'linkedintextcolor', value: '#ffffff' },
             { type: 'string', name: 'linkedinbackgroundcolor', value: '#0084b9' },
             { type: 'string', name: 'pinterestdisplayrule', value: 'hidden' },
             { type: 'string', name: 'pinteresttext', value: 'Pinterest' },
             { type: 'string', name: 'pinteresttextcolor', value: '#ffffff' },
             { type: 'string', name: 'pinterestbackgroundcolor', value: '#cb2027' },
             { type: 'string', name: 'messengerisplayrule', value: 'hidden' },
             { type: 'string', name: 'messengerext', value: 'Messenger' },
             { type: 'string', name: 'messengerextcolor', value: '#ffffff' },
             { type: 'string', name: 'messengerackgroundcolor', value: '#0084ff' },
           ],
           uiSchema: {
             ishidden: { 'ui:widget': 'hidden' },
             twittertextcolor: { 'ui:widget': 'color' },
             twitterbackgroundcolor: { 'ui:widget': 'color' },
             emailtextcolor: { 'ui:widget': 'color' },
             emailbackgroundcolor: { 'ui:widget': 'color' },
             facebooktextcolor: { 'ui:widget': 'color' },
             facebookbackgroundcolor: { 'ui:widget': 'color' },
             whatsapptextcolor: { 'ui:widget': 'color' },
             whatsappbackgroundcolor: { 'ui:widget': 'color' },
             smstextcolor: { 'ui:widget': 'color' },
             smsbackgroundcolor: { 'ui:widget': 'color' },
             linkedintextcolor: { 'ui:widget': 'color' },
             linkedinbackgroundcolor: { 'ui:widget': 'color' },
             pinteresttextcolor: { 'ui:widget': 'color' },
             pinterestbackgroundcolor: { 'ui:widget': 'color' },
             messengertextcolor: { 'ui:widget': 'color' },
             messengerbackgroundcolor: { 'ui:widget': 'color' },
           },
           required: [
             'sharemedium'
           ],
           schema: {
             'title': 'Grapes JS Props',
             'description': 'Some description here',
             'type': 'object',
             'properties': {
               'ishidden': { 'type': 'boolean', 'title': 'Hidden' },
               'sharemedium': {
                 'type': 'string',
                 'title': 'Share Medium',
                 'default': 'email',
                 'enum': [ 'email', 'facebook', 'messenger', 'twitter', 'whatsapp', 'sms', 'linkedin', 'pinterest' ],
                 'enumNames': [ 'Email', 'Facebook', 'Messenger', 'Twitter', 'WhatsApp', 'SMS', 'LinkedIn', 'Pinterest' ] 
               },
             },
             'dependencies': {
               'sharemedium': {
                 'oneOf': [
                   {
                     'properties': {
                       'sharemedium': { 'enum': [ 'email' ] },
                       'emaildisplayrule': displayRuleObj.default,
                       'emailtext': shareMediumTextObj,
                       'emailtextcolor': shareMediumTextColorObj,
                       'emailbackgroundcolor': shareMediumColorObj
                     }
                   },
                   {
                     'properties': {
                       'sharemedium': { 'enum': [ 'facebook' ] },
                       'facebookdisplayrule': displayRuleObj.default,
                       'facebooktext': shareMediumTextObj,
                       'facebooktextcolor': shareMediumTextColorObj,
                       'facebookbackgroundcolor': shareMediumColorObj
                     }
                   },
                   {
                     'properties': {
                       'sharemedium': { 'enum': [ 'messenger' ] },
                       'messengerdisplayrule': displayRuleObj.default,
                       'messengertext': shareMediumTextObj,
                       'messengertextcolor': shareMediumTextColorObj,
                       'messengerbackgroundcolor': shareMediumColorObj
                     }
                   },
                   {
                     'properties': {
                       'sharemedium': { 'enum': [ 'twitter' ] },
                       'twitterdisplayrule': displayRuleObj.default,
                       'twittertextcolor': shareMediumTextColorObj,
                       'twitterbcakgroundcolor': shareMediumColorObj
                     }
                   },
                   {
                     'properties': {
                       'sharemedium': { 'enum': [ 'whatsapp' ] },
                       'whatsappdisplayrule': displayRuleObj.mobile,
                       'whatsapptext': shareMediumTextObj,
                       'whatsapptextcolor': shareMediumTextColorObj,
                       'whatsappbackgroundcolor': shareMediumColorObj
                     }
                   },
                   {
                     'properties': {
                       'sharemedium': { 'enum': [ 'sms' ] },
                       'smsdisplayrule': displayRuleObj.mobile,
                       'smstext': shareMediumTextObj,
                       'smstextcolor': shareMediumTextColorObj,
                       'smsbackgroundcolor': shareMediumColorObj
                     }
                   },
                   {
                     'properties': {
                       'sharemedium': { 'enum': [ 'linkedin' ] },
                       'linkedindisplayrule': displayRuleObj.default,
                       'linkedintext': shareMediumTextObj,
                       'linkedintextcolor': shareMediumTextColorObj,
                       'linkedinbackgroundcolor': shareMediumColorObj
                     }
                   },
                   {
                     'properties': {
                       'sharemedium': { 'enum': [ 'pinterest' ] },
                       'pinterestdisplayrule': displayRuleObj.default,
                       'pinteresttext': shareMediumTextObj,
                       'pinteresttextcolor': shareMediumTextColorObj,
                       'pinterestbackgroundcolor': shareMediumColorObj
                     }
                   },
                 ]
               }
             }
           }
         })
       },
       {
         isComponent: function (el) {
           if (el.tagName === 'SQH-SHARE-BUTTON-CONTAINER') {
             return { type: 'sqh-share-button-container' };
           }
         },
       }),
 
     view: defaultType.view.extend({
       render: function () {
         defaultType.view.prototype.render.apply(this, arguments);
         return this;
       },
     }),
   });
 
   comps.addType('sqh-stats-container', {
     model: defaultModel.extend({
         defaults: Object.assign({}, defaultModel.prototype.defaults, {
           name: "Stats Container",
 
           // can be dropped only inside 
           draggable: false,
 
           // these components can be dropped in here
           droppable: ['sqh-stat-component'],
 
           selectable: true,
 
           toolbar: [],
           
           traits: [
             { type: 'boolean', name: 'ishidden', value: false },
             { type: 'string', title: 'Padding Top', name: 'paddingtop', default: '10'},
             { type: 'string', title: 'Padding Bottom', name: 'paddingbottom', default: '10'},
           ],
 
           uiSchema: {
             ishidden: { 'ui:widget': 'hidden' }
           }
         })
       },
       {
         isComponent: function (el) {
           if (el.tagName === 'SQH-STATS-CONTAINER') {
             return { type: 'sqh-stats-container' };
           }
         },
       }),
 
     view: defaultType.view.extend({
       render: function () {
         defaultType.view.prototype.render.apply(this, arguments);
         return this;
       },
     }),
   });
 
   comps.addType('sqh-stat-component', {
     model: defaultModel.extend({
         defaults: Object.assign({}, defaultModel.prototype.defaults, {
           name: "Stat Component",
 
           // can be dropped only inside 
           draggable: ['sqh-stats-container'],
 
           // these components can be dropped in here
           droppable: false,
 
           selectable: true,
 
           // toolbar: [],
           
           traits: [
             { type: 'boolean', name: 'ishidden', value: false },
             { type: 'string', name: 'stattype', title: 'Stat Type', value: '' },
             { type: 'string', name: 'statdescription', title: 'Stat Description',value: '' },
             { type: 'string', name: 'statcolor', value: '' },
           ],
 
           uiSchema: {
             ishidden: { 'ui:widget': 'hidden' },
             statcolor: { 'ui:widget': 'color' },
             stattype: {
               "ui:widget": "StatTypeSelectWidget",
             }
           }
         })
       },
       {
         isComponent: function (el) {
           if (el.tagName === 'SQH-STAT-COMPONENT') {
             return { type: 'sqh-stat-component' };
           }
         },
       }),
 
     view: defaultType.view.extend({
       render: function () {
         defaultType.view.prototype.render.apply(this, arguments);
         return this;
       },
     }),
   });
 
   comps.addType('sqh-referral-list', {
     model: defaultModel.extend({
         defaults: Object.assign({}, defaultModel.prototype.defaults, {
           name: "Referral List",
 
           // can be dropped only inside 
           draggable: false,
 
           // these components can be dropped in here
           droppable: false,
 
           selectable: true,
           traits: [
             { type: 'boolean', name: 'ishidden', value: false },
             { type: 'boolean', name: 'showreferrer', value: true },
             { type: 'boolean', name: 'usefirstreward', value: false },
             { type: 'string', name: 'rewardcolor', value: "#4BB543" },
             { type: 'string', name: 'pendingcolor', value: "#DDDDDD" },
             { type: 'string', name: 'referralnamecolor', value: '' },
             { type: 'string', name: 'referraltextcolor', value: ''},
             { type: 'string', name: 'pendingvalue', value: "Reward Pending" },
             { type: 'string', name: 'referrercontent', value: "Referred You {date}" },
             { type: 'string', name: 'convertedcontent', value: "Paid User, signed up {date}" },
             { type: 'string', name: 'pendingcontent', value: "Trial User, signed up {date}" },
             { type: 'string', name: 'valuecontent', value: "and {extrarewards} more {extrarewards, plural, one {reward} other {rewards}}" },
             { type: 'string', name: 'paginatemore', value: "View More" },
             { type: 'string', name: 'paginateless', value: "Previous" },
           ],
           uiSchema: {
             ishidden: { 'ui:widget': 'hidden' },
             showreferrer: { 'ui:widget': 'radio' },
             usefirstreward: { 'ui:widget': 'radio' },
             rewardcolor: { 'ui:widget': 'color' },
             pendingcolor: { 'ui:widget': 'color' },
             referralnamecolor: { 'ui:widget': 'color' },
             referraltextcolor: { 'ui:widget': 'color' },
           },
           schema: {
             'title': 'Grapes JS Props',
             'description': 'Some description here',
             'type': 'object',
             'properties': {
               'ishidden': { 'type': 'boolean', 'title': 'Hidden' },
               'paginatemore': { 'type': 'string', 'title': 'View More Text' },
               'paginateless': { 'type': 'string', 'title': 'Previous Text' },
               'referraltype': {
                 'type': 'string',
                 'title': 'Referral Type to Edit',
                 'default': 'converted',
                 'enum': [ 'converted', 'pending', 'referrer' ],
                 'enumNames': [ 'Converted', 'Pending', 'Referrer' ]
               },
             },
             'dependencies': {
               'referraltype': {
                 'oneOf': [
                   {
                     'properties': {
                       'referraltype': { 'enum': [ 'converted' ] },
                       'usefirstreward': {
                         'title': 'Reward Value Displayed',
                         'type': 'boolean',
                         'enumNames': [ 'Newest', 'Oldest' ]
                       },
                       'rewardcolor': {
                         'title': 'Reward Color',
                         'type': 'string',
                       },
                       'convertedcontent': {
                         'title': 'Converted User Content',
                         'type': 'string'
                       },
                       'referralnamecolor': {
                         'title': 'Referral Name Color',
                         'type': 'string'
                       },
                       'referraltextcolor': {
                         'title': 'Referral Text Color',
                         'type': 'string'
                       },
                       'valuecontent': {
                         'title': 'Extra Rewards Description',
                         'type': 'string'
                       }
                     }
                   },
                   {
                     'properties': {
                       'referraltype': { 'enum': [ 'pending' ] },
                       'pendingcolor': {
                         'title': 'Pending Reward Color',
                         'type': 'string',
                       },
                       'pendingcontent': {
                         'title': 'Pending User Content',
                         'type': 'string'
                       },
                       'pendingvalue': {
                         'title': 'Pending Reward Description',
                         'type': 'string'
                       }
                     }
                   },
                   {
                     'properties': {
                       'referraltype': { 'enum': [ 'referrer' ] },
                       'showreferrer': {
                         'title': 'Pending User Content',
                         'type': 'boolean',
                         'enumNames': [ 'Show', 'Hide' ]
                       },
                       'referrercontent': {
                         'title': 'Referring User Content',
                         'type': 'string'
                       }
                     }
                   },
                 ]
               }
             }
           }
         })
       },
       {
         isComponent: function (el) {
           if (el.tagName === 'SQH-REFERRAL-LIST') {
             return { type: 'sqh-referral-list' };
           }
         },
       }),
 
     view: defaultType.view.extend({
       render: function () {
         defaultType.view.prototype.render.apply(this, arguments);
         return this;
       },
     }),
   });
 
   comps.addType('sqh-footer', {
     model: textComp.model.extend({
       defaults: Object.assign({}, textComp.model.prototype.defaults, {
         name: 'Footer',
         traits: [
           { type: 'boolean', title: 'Hidden', name: 'ishidden', value: false },
           { type: 'boolean', title: 'Use Markdown', name: 'ismarkdown', value: false },
           { type: 'string', title: 'Content', name: 'text', value: 'Footer text' },
           { type: 'string', title: 'Font Color', name: 'color', value: '#000000' },
           { type: 'integer', title: 'Font Size', name: 'fontsize', value: 16 },
           { type: 'string', title: 'Text Align', name: 'textalign', enum: ['left', 'center', 'right'], enumNames: ['Left', 'Center', 'Right'], default: 'center' },
           { type: 'string', title: 'Padding Top', name: 'paddingtop', default: '10'},
           { type: 'string', title: 'Padding Bottom', name: 'paddingbottom', default: '10'},
         ],
         uiSchema: {
           'ishidden': { 'ui:widget': 'hidden' },
           'color': { 'ui:widget': 'color' },
           'fontsize': { 'ui:widget': 'updown' },
           'ismarkdown': markdownUi
         }
       })
     },
     {
       isComponent: function(el) {
         if(el.tagName == 'SQH-TEXT-COMPONENT' && el.getAttribute('sqhfooter')){
           return {type: 'sqh-footer'};
         }
       },
     }),
 
     view: textComp.view
   })
}
