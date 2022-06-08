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
    default:"Roboto",
    enum: [
      "Roboto",
      "Artifakt Element",
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
      "Roboto",
      "Artifakt Element",
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

  const poweredByUi = editor.editor.attributes.canWhitelabel ?
    { 'ui:disabled': false } :
    { 'ui:disabled': true, 'ui:help': <div>Can only be disabled on <span className="label">Pro</span> plans</div>, "ui:title": <span><span className="ico ico-lock"></span> Show Powered By</span> };

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
          { type: 'string', title: 'Background Color', name: 'background' },
          { type: 'string', title: 'Loading Color', name: 'loadingcolor' },
          { type: 'string', title: 'Font Family', name: 'fontfamily', ...fontFamilyOpts },
          { type: 'boolean', title: 'Show Powered By', name: 'poweredby' }
        ],
        uiSchema: {
          'background': { 'ui:widget': "color" },
          'loadingcolor': { 'ui:widget': "color" },
          'poweredby': poweredByUi
        }
      })
    },
      {
        isComponent: function (el) {
          if (el.tagName == 'SQH-GLOBAL-CONTAINER') {
            return { type: 'sqh-global-container' };
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
          { type: 'boolean', name: 'ishidden' },
          { type: 'boolean', title: 'Use Markdown', name: 'ismarkdown' },
          { type: 'string', title: 'Content', name: 'text' },
          { type: 'string', title: 'Font Color', name: 'color' },
          { type: 'integer', title: 'Font Size', name: 'fontsize' },
          { type: 'string', title: 'Text Align', name: 'textalign', enum: ['left', 'center', 'right'], enumNames: ['Left', 'Center', 'Right'] },
          { type: 'string', title: 'Padding Top', name: 'paddingtop' },
          { type: 'string', title: 'Padding Bottom', name: 'paddingbottom' },

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
        isComponent: function (el) {
          if (el.tagName == 'SQH-TEXT-COMPONENT') {
            return { type: 'sqh-text-component' };
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
          { type: 'boolean', name: 'ishidden' },
          { type: 'boolean', title: 'Use Markdown', name: 'ismarkdown' },
          { type: 'string', title: 'Content', name: 'text' },
          { type: 'string', title: 'Font Color', name: 'color' },
          { type: 'integer', title: 'Font Size in pixels', name: 'fontsize' },
          { type: 'string', title: 'Text Align', name: 'textalign', enum: ['left', 'center', 'right'], enumNames: ['Left', 'Center', 'Right'] },
          { type: 'string', title: 'Padding Top in pixels', name: 'paddingtop' },
          { type: 'string', title: 'Padding Bottom in pixels', name: 'paddingbottom' },
        ],
        uiSchema: {
          'ishidden': { 'ui:widget': 'hidden' },
          'text': { 'ui:widget': 'textarea' },
          'ismarkdown': markdownUi,
          'color': { 'ui:widget': 'color' },
          'fontsize': { 'ui:widget': 'updown' },
        }
      })
    },
      {
        isComponent: function (el) {
          if (el.tagName == 'SQH-TEXT-COMPONENT' && el.getAttribute('sqhheader')) {
            return { type: 'sqh-header' };
          }
        },
      }),

    view: textComp.view
  })

  comps.addType('sqh-body', {
    model: textComp.model.extend({
      defaults: Object.assign({}, textComp.model.prototype.defaults, {
        name: 'Body',
        traits: [
          { type: 'boolean', name: 'ishidden' },
          { type: 'boolean', title: 'Use Markdown', name: 'ismarkdown' },
          { type: 'string', title: 'Content', name: 'text' },
          { type: 'string', title: 'Font Color', name: 'color' },
          { type: 'integer', title: 'Font Size in pixels', name: 'fontsize' },
          { type: 'string', title: 'Text Align', name: 'textalign', enum: ['left', 'center', 'right'], enumNames: ['Left', 'Center', 'Right'] },
          { type: 'string', title: 'Padding Top in pixels', name: 'paddingtop' },
          { type: 'string', title: 'Padding Bottom in pixels', name: 'paddingbottom' },
        ],
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
        isComponent: function (el) {
          if (el.tagName == 'SQH-TEXT-COMPONENT' && el.getAttribute('sqhbody')) {
            return { type: 'sqh-body' };
          }
        },
      }),

    view: textComp.view
  })

  comps.addType('sqh-referrals-header', {
    model: textComp.model.extend({
      defaults: Object.assign({}, textComp.model.prototype.defaults, {
        name: 'Stats Header',
        traits: [
          { type: 'boolean', name: 'ishidden' },
          { type: 'boolean', title: 'Use Markdown', name: 'ismarkdown' },
          { type: 'string', title: 'Content', name: 'text' },
          { type: 'string', title: 'Font Color', name: 'color' },
          { type: 'integer', title: 'Font Size in pixels', name: 'fontsize' },
          { type: 'string', title: 'Text Align', name: 'textalign', enum: ['left', 'center', 'right'], enumNames: ['Left', 'Center', 'Right'] },
          { type: 'string', title: 'Padding Top in pixels', name: 'paddingtop' },
          { type: 'string', title: 'Padding Bottom in pixels', name: 'paddingbottom' },
        ]
      })
    },
      {
        isComponent: function (el) {
          if (el.tagName == 'SQH-TEXT-COMPONENT' && el.getAttribute('sqhreferralsheader')) {
            return { type: 'sqh-referrals-header' };
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
          { type: 'boolean', name: 'ishidden' },
          { type: 'string', title: 'Upload Image', name: 'background' /*,format: 'uri'*/ },
          { type: 'string', title: 'Height in pixels', name: 'height' },
          { type: 'string', title: 'Padding Top in pixels', name: 'paddingtop' },
          { type: 'string', title: 'Padding Bottom in pixels', name: 'paddingbottom' },
          { type: 'string', title: 'Content', name: 'text' },
          { type: 'string', title: 'Font Color in pixels', name: 'color' },
        ],
        uiSchema: {
          'ishidden': { 'ui:widget': 'hidden' },
          'color': { 'ui:widget': 'color' },
          'background': { 'ui:widget': 'ImageUpload' }
        }
      })
    },
      {
        isComponent: function (el) {
          if (el.tagName == 'SQH-TEXT-COMPONENT' && el.getAttribute('sqhbanner')) {
            return { type: 'sqh-banner' };
          }
        },
      }),

    view: textComp.view
  })

  comps.addType('sqh-copy-link-button', {
    model: defaultModel.extend({
      defaults: Object.assign({}, defaultModel.prototype.defaults, {
        name: "Share Link",
        // can be dropped only inside 
        draggable: false,

        // these components can be dropped in here
        droppable: false,

        selectable: true,
        toolbar: [],
        traits: [
          { type: 'boolean', name: 'ishidden' },
          { type: 'string', title: 'Button Text', name: 'text' },
          { type: 'string', title: 'Button Color', name: 'buttoncolor' },
          { type: 'string', title: 'Text Color', name: 'textcolor' },
        ],
        uiSchema: {
          "ui:order": ['*', 'buttoncolor'],
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
        name: "Share Buttons",

        // can drop these elements in 
        droppable: false,

        // can be dropped only inside 
        draggable: false,

        selectable: true,

        toolbar: [],

        traits: [
          { type: 'boolean', name: 'ishidden' },
          { type: 'string', name: 'emaildisplayrule' },
          { type: 'string', name: 'emailtext' },
          { type: 'string', name: 'emailtextcolor' },
          { type: 'string', name: 'emailbackgroundcolor' },
          { type: 'string', name: 'facebookdisplayrule' },
          { type: 'string', name: 'facebooktext' },
          { type: 'string', name: 'facebooktextcolor' },
          { type: 'string', name: 'facebookbackgroundcolor' },
          { type: 'string', name: 'twitterdisplayrule' },
          { type: 'string', name: 'twittertext' },
          { type: 'string', name: 'twittertextcolor' },
          { type: 'string', name: 'twitterbackgroundcolor' },
          { type: 'string', name: 'smsdisplayrule' },
          { type: 'string', name: 'smstext' },
          { type: 'string', name: 'smstextcolor' },
          { type: 'string', name: 'smsbackgroundcolor' },
          { type: 'string', name: 'whatsappdisplayrule' },
          { type: 'string', name: 'whatsapptext' },
          { type: 'string', name: 'whatsapptextcolor' },
          { type: 'string', name: 'whatsappbackgroundcolor' },
          { type: 'string', name: 'linkedindisplayrule' },
          { type: 'string', name: 'linkedintext' },
          { type: 'string', name: 'linkedintextcolor' },
          { type: 'string', name: 'linkedinbackgroundcolor' },
          { type: 'string', name: 'pinterestdisplayrule' },
          { type: 'string', name: 'pinteresttext' },
          { type: 'string', name: 'pinteresttextcolor' },
          { type: 'string', name: 'pinterestbackgroundcolor' },
          { type: 'string', name: 'messengerdisplayrule' },
          { type: 'string', name: 'messengertext' },
          { type: 'string', name: 'messengertextcolor' },
          { type: 'string', name: 'messengerbackgroundcolor' },
          { type: 'string', name: 'linedisplayrule' },
          { type: 'string', name: 'linetext' },
          { type: 'string', name: 'linetextcolor' },
          { type: 'string', name: 'linebackgroundcolor' },
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
          linetextcolor: { 'ui:widget': 'color' },
          linebackgroundcolor: { 'ui:widget': 'color' },
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
              'title': 'Select Button to Edit',
              'default': 'email',
              'enum': ['email', 'facebook', 'messenger', 'twitter', 'whatsapp', 'sms', 'linkedin', 'pinterest', 'line'],
              'enumNames': ['Email', 'Facebook', 'Messenger', 'Twitter', 'WhatsApp', 'SMS', 'LinkedIn', 'Pinterest', 'Line Messenger']
            },
          },
          'dependencies': {
            'sharemedium': {
              'oneOf': [
                {
                  'properties': {
                    'sharemedium': { 'enum': ['email'] },
                    'emaildisplayrule': displayRuleObj.default,
                    'emailtext': shareMediumTextObj,
                    'emailtextcolor': shareMediumTextColorObj,
                    'emailbackgroundcolor': shareMediumColorObj
                  }
                },
                {
                  'properties': {
                    'sharemedium': { 'enum': ['facebook'] },
                    'facebookdisplayrule': displayRuleObj.default,
                    'facebooktext': shareMediumTextObj,
                    'facebooktextcolor': shareMediumTextColorObj,
                    'facebookbackgroundcolor': shareMediumColorObj
                  }
                },
                {
                  'properties': {
                    'sharemedium': { 'enum': ['messenger'] },
                    'messengerdisplayrule': displayRuleObj.default,
                    'messengertext': shareMediumTextObj,
                    'messengertextcolor': shareMediumTextColorObj,
                    'messengerbackgroundcolor': shareMediumColorObj
                  }
                },
                {
                  'properties': {
                    'sharemedium': { 'enum': ['twitter'] },
                    'twitterdisplayrule': displayRuleObj.default,
                    'twittertext': shareMediumTextObj,
                    'twittertextcolor': shareMediumTextColorObj,
                    'twitterbackgroundcolor': shareMediumColorObj
                  }
                },
                {
                  'properties': {
                    'sharemedium': { 'enum': ['whatsapp'] },
                    'whatsappdisplayrule': displayRuleObj.mobile,
                    'whatsapptext': shareMediumTextObj,
                    'whatsapptextcolor': shareMediumTextColorObj,
                    'whatsappbackgroundcolor': shareMediumColorObj
                  }
                },
                {
                  'properties': {
                    'sharemedium': { 'enum': ['sms'] },
                    'smsdisplayrule': displayRuleObj.mobile,
                    'smstext': shareMediumTextObj,
                    'smstextcolor': shareMediumTextColorObj,
                    'smsbackgroundcolor': shareMediumColorObj
                  }
                },
                {
                  'properties': {
                    'sharemedium': { 'enum': ['linkedin'] },
                    'linkedindisplayrule': displayRuleObj.default,
                    'linkedintext': shareMediumTextObj,
                    'linkedintextcolor': shareMediumTextColorObj,
                    'linkedinbackgroundcolor': shareMediumColorObj
                  }
                },
                {
                  'properties': {
                    'sharemedium': { 'enum': ['pinterest'] },
                    'pinterestdisplayrule': displayRuleObj.default,
                    'pinteresttext': shareMediumTextObj,
                    'pinteresttextcolor': shareMediumTextColorObj,
                    'pinterestbackgroundcolor': shareMediumColorObj
                  }
                },
                {
                  'properties': {
                    'sharemedium': { 'enum': ['line'] },
                    'linedisplayrule': displayRuleObj.mobile,
                    'linetext': shareMediumTextObj,
                    'linetextcolor': shareMediumTextColorObj,
                    'linebackgroundcolor': shareMediumColorObj
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
        name: "Referral Stats",

        // can be dropped only inside 
        draggable: false,

        // these components can be dropped in here
        droppable: ['sqh-stat-component'],

        selectable: true,

        toolbar: [],

        traits: [
          { type: 'boolean', name: 'ishidden' },
          { type: 'string', title: 'Padding Top in pixels', name: 'paddingtop' },
          { type: 'string', title: 'Padding Bottom in pixels', name: 'paddingbottom' },
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

        toolbar: [{
          attributes: { class: 'fa fa-arrows' },
          command: 'tlb-move'
        }],

        traits: [
          { type: 'boolean', name: 'ishidden' },
          { type: 'string', name: 'stattype', title: 'Stat Type' },
          { type: 'string', name: 'statdescription', title: 'Stat Description' },
          { type: 'string', name: 'statcolor' },
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
        toolbar: [],
        traits: [
          { type: 'boolean', name: 'ishidden' },
          { type: 'boolean', name: 'showexpiry' },
          { type: 'boolean', name: 'shownotes' }, 
          { type: 'boolean', name: 'showreferrer' },
          { type: 'boolean', name: 'usefirstreward' },
          { type: 'string', name: 'customernotecolor' },
          { type: 'string', name: 'rewardcolor' },
          { type: 'string', name: 'pendingcolor' },
          { type: 'string', name: 'referralnamecolor' },
          { type: 'string', name: 'referraltextcolor' },
          { type: 'string', name: 'redeemedvalue', value:'Redeemed' },
          { type: 'string', name: 'pendingvalue' },
          { type: 'string', name: 'referrervalue' },
          { type: 'string', name: 'referrercontent' },
          { type: 'string', name: 'convertedcontent' },
          { type: 'string', name: 'expiredcolor' },
          { type: 'string', name: 'expiredvalue' },
          { type: 'string', name: 'expiresvalue'},
          { type: 'string', name: 'expiredcontent' },
          { type: 'string', name: 'cancelledcolor' },
          { type: 'string', name: 'cancelledvalue' },
          { type: 'string', name: 'cancelledcontent' },
          { type: 'string', name: 'pendingcontent' },
          { type: 'string', name: 'valuecontent' },
          { type: 'string', name: 'paginatemore' },
          { type: 'string', name: 'paginateless' },
          { type: 'string', name: 'unknownuser' },
          { type: 'boolean', name: 'internationalization'}
        ],
        uiSchema: {
          ishidden: { 'ui:widget': 'hidden' },
          showreferrer: { 'ui:widget': 'radio' },
          usefirstreward: { 'ui:widget': 'radio' },
          customernotecolor: { 'ui:widget': 'color' },
          rewardcolor: { 'ui:widget': 'color' },
          pendingcolor: { 'ui:widget': 'color' },
          referralnamecolor: { 'ui:widget': 'color' },
          referraltextcolor: { 'ui:widget': 'color' },
          expiredcolor: { 'ui:widget': 'color' },
          cancelledcolor: { 'ui:widget': 'color' }
        },
        schema: {
          'title': 'Grapes JS Props',
          'description': 'Some description here',
          'type': 'object',
          'properties': {
            'ishidden': { 'type': 'boolean' },


            'referraltype': {
              'type': 'string',
              'title': 'Select Area to Edit',
              'default': 'global',
              'enum': ['global', 'converted', 'pending', 'referrer', 'expired', 'cancelled'],
              'enumNames': ['Global Referral List Options', 'Converted Rewards (eg Remus)', 'Pending Rewards (eg Gellert)', 'Referrer (eg Rubeus)', 'Expired Rewards', 'Cancelled Rewards (Lavender)']
            },
          },
          'dependencies': {
            'referraltype': {
              'oneOf': [
                {
                  'properties': {
                    'referraltype': { 'enum': ['global'] },
                    'showexpiry': {
                      'title': 'Show Expiry Date',
                      'type': 'boolean'
                    },
                    'shownotes': {
                      'title': 'Show Customer Notes',
                      'type': 'boolean'
                    },
                    'customernotecolor': {
                      'title': 'Customer Note Color',
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
                    'unknownuser': {
                      'type': 'string',
                      'title': 'Label For Unknown User'
                    },
                    'internationalization':{
                      'type': 'boolean',
                      'title': 'Internationalize dates'
                    },
                    'paginatemore': {
                      'type': 'string',
                      'title': 'View More Text'
                    },
                    'paginateless': {
                      'type': 'string',
                      'title': 'Previous Text'
                    },

                  },
                  "dependencies":{
                    "showexpiry":{
                      "oneOf": [
                        {
                          "properties":{
                            "showexpiry": {"const": true},
                            "expiresvalue":{
                              "title": "Expires Description",
                              "type": "string"
                            }
                          }
                        }
                      ]
                    }
                  }
                },
                {
                  'properties': {
                    'referraltype': { 'enum': ['converted'] },
                    'rewardcolor': {
                      'title': 'Reward Color',
                      'type': 'string',
                    },
                    'redeemedvalue': {
                      'title': 'Redeemed Reward Content',
                      'type': 'string'
                    },
                    'convertedcontent': {
                      'title': 'Converted User Content',
                      'type': 'string'
                    },
                    'valuecontent': {
                      'title': 'Extra Rewards Description',
                      'type': 'string',
                    },
                    'usefirstreward': {
                      'title': 'Reward Value Displayed',
                      'type': 'boolean',
                      'enumNames': ['Newest', 'Oldest']
                    },
                  }
                },
                {
                  'properties': {
                    'referraltype': { 'enum': ['pending'] },
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
                    'referraltype': { 'enum': ['referrer'] },
                    'referrercontent': {
                      'title': 'Referring User Content',
                      'type': 'string'
                    },
                    'referrervalue': {
                      'title': 'Referrer Description - no reward',
                      'type': 'string'
                    },
                    'showreferrer': {
                      'title': ' ',
                      'type': 'boolean',
                      'enumNames': ['Show', 'Hide']
                    },
                  }
                },
                {
                  'properties': {
                    'referraltype': { 'enum': ['expired'] },
                    'expiredcolor': {
                      'title': 'Expired Color',
                      'type': 'string'
                    },
                    'expiredcontent': {
                      'title': 'Expired Description',
                      'type': 'string'
                    },
                    'expiredvalue': {
                      'title': 'Expired Reward Value',
                      'type': 'string',
                    },
                  }
                },
                {
                  'properties': {
                    'referraltype': { 'enum': ['cancelled'] },
                    'cancelledcolor': {
                      'title': 'Cancelled Color',
                      'type': 'string'
                    },
                    'cancelledcontent': {
                      'title': 'Cancelled Description',
                      'type': 'string'
                    },
                    'cancelledvalue': {
                      'title': 'Cancelled Reward Value',
                      'type': 'string',
                    },
                  }
                }
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
          { type: 'boolean', name: 'ishidden' },
          { type: 'boolean', title: 'Use Markdown', name: 'ismarkdown' },
          { type: 'string', title: 'Content', name: 'text' },
          { type: 'string', title: 'Font Color', name: 'color' },
          { type: 'integer', title: 'Font Size in pixels', name: 'fontsize' },
          { type: 'string', title: 'Text Align', name: 'textalign', enum: ['left', 'center', 'right'], enumNames: ['Left', 'Center', 'Right'] },
          { type: 'string', title: 'Padding Top in pixels', name: 'paddingtop' },
          { type: 'string', title: 'Padding Bottom in pixels', name: 'paddingbottom' },
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
        isComponent: function (el) {
          if (el.tagName == 'SQH-TEXT-COMPONENT' && el.getAttribute('sqhfooter')) {
            return { type: 'sqh-footer' };
          }
        },
      }),

    view: textComp.view
  })

  comps.addType('sqh-image-component', {
    model: defaultModel.extend({
      defaults: Object.assign({}, defaultModel.prototype.defaults, {
        name: 'Banner',
        draggable: false,
        droppable: false,
        selectable: true,
        toolbar: [],
        traits: [
          { type: 'boolean', name: 'ishidden' },
          { type: 'string', title: 'Upload Image', name: 'url' /*,format: 'uri'*/ },
          { type: 'string', title: 'Image Align', name: 'alignment', enum: ['left', 'center', 'right'], enumNames: ['Left', 'Center', 'Right'] },
          { type: 'string', title: 'Size in pixels', name: 'width' },
        ],
        uiSchema: {
          'ishidden': { 'ui:widget': 'hidden' },
          'url': { 'ui:widget': 'ImageUpload' }
        }
      })
    },
      {
        isComponent: function (el) {
          if (el.tagName == 'SQH-IMAGE-COMPONENT') {
            return { type: 'sqh-image-component' };
          }
        },
      }),

    view: defaultType.view
  })

  comps.addType('sqh-cta', {
    model: textComp.model.extend({
      defaults: Object.assign({}, textComp.model.prototype.defaults, {
        name: 'CTA',
        draggable: false,
        droppable: false,
        selectable: true,
        traits: [
          { type: 'boolean', name: 'ishidden' },
          { type: 'string', title: 'Content', name: 'text' },
          { type: 'integer', title: 'Font Size in pixels', name: 'fontsize' },
          { type: 'string', title: 'Padding Top in pixels', name: 'paddingtop' },
          { type: 'string', title: 'Padding Bottom in pixels', name: 'paddingbottom' },

        ],
        uiSchema: {
          'text': { 'ui:widget': 'textarea' },
          'ishidden': { 'ui:widget': 'hidden' },
          'color': { 'ui:widget': 'color' },
          'fontsize': { 'ui:widget': 'updown' },
          'ismarkdown': markdownUi
        }
      })
    },
      {
        isComponent: function (el) {
          if (el.tagName == 'SQH-TEXT-COMPONENT' && el.getAttribute('sqhcta')) {
            return { type: 'sqh-cta' };
          }
        },
      }),

    view: textComp.view
  })

  comps.addType('sqh-copy-button', {
    model: textComp.model.extend({
      defaults: Object.assign({}, textComp.model.prototype.defaults, {
        name: 'Copy Button',
        draggable: false,
        droppable: false,
        selectable: true,
        traits: [
          { type: 'boolean', name: 'ishidden' },
          { type: 'string', title: 'Code Color', name: 'codefontcolor' },
          { type: 'integer', title: 'Code Font Size in pixels', name: 'codefontsize' },
          { type: 'string', title: 'Button Text', name: 'text' },
          { type: 'integer', title: 'Button Font Size in pixels', name: 'fontsize' },
          { type: 'integer', title: 'Buttton Width in pixels', name: 'width' },
          { type: 'string', title: 'Button Color', name: 'backgroundcolor' },
          { type: 'string', title: 'Button Text Color', name: 'textcolor' },
          { type: 'integer', title: 'Button Border Radius', name: 'borderradius' }
        ],
        uiSchema: {
          'ishidden': { 'ui:widget': 'hidden' },
          'codefontcolor': { 'ui:widget': 'color' },
          'codefontsize': { 'ui:widget': 'updown' },
          'fontsize': { 'ui:widget': 'updown' },
          'width': { 'ui:widget': 'updown' },
          'backgroundcolor': { 'ui:widget': 'color' },
          'textcolor': { 'ui:widget': 'color' },
          'borderradius': { 'ui:widget': 'updown' }
        }
      })
    },
      {
        isComponent: function (el) {
          if (el.tagName == 'SQH-COPY-BUTTON') {
            return { type: 'sqh-copy-button' };
          }
        },
      }),
    view: defaultType.view
  })


  // 
  // 
  //  Partner specific editor
  // 
  // 

  const partnerStatsDropdown = {
    enum: [
      "/rewardBalance/CREDIT/CASH_CAD/prettyPendingCredit",
      "/rewardBalance/CREDIT/CASH_CAD/prettyValue",
      "/rewardBalance/CREDIT/CASH_CAD/prettyRedeemedCredit",
      "/rewardBalance/CREDIT/CASH_USD/prettyPendingCredit",
      "/rewardBalance/CREDIT/CASH_USD/prettyValue",
      "/rewardBalance/CREDIT/CASH_USD/prettyRedeemedCredit"
    ],
    enumNames: [
      "Pending Balance CAD",
      "Available Balance CAD",
      "Redeemed Balance CAD",
      "Pending Balance USD",
      "Available Balance USD",
      "Redeemed Balance USD"
    ]
  }

  comps.addType('sqh-partner-stat-component', {
    model: defaultModel.extend({
      defaults: Object.assign({}, defaultModel.prototype.defaults, {
        name: "Stat Component",

        // can be dropped only inside 
        draggable: ['sqh-stats-container'],

        // these components can be dropped in here
        droppable: false,

        selectable: true,

        toolbar: [{
          attributes: { class: 'fa fa-arrows' },
          command: 'tlb-move'
        }],

        traits: [
          { type: 'boolean', name: 'ishidden' },
          { type: 'string', name: 'stattype', title: 'Stat Type', ...partnerStatsDropdown },
          { type: 'string', name: 'statdescription', title: 'Stat Description' },
          { type: 'string', name: 'statcolor' },
        ],

        uiSchema: {
          ishidden: { 'ui:widget': 'hidden' },
          statcolor: { 'ui:widget': 'color' },
        }
      })
    },
      {
        isComponent: function (el) {
          if (el.tagName === 'SQH-PARTNER-STAT-COMPONENT') {
            return { type: 'sqh-partner-stat-component' };
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


  // 
  // 
  // END OF PARTNER SPECIFIC EDITOR
  // 
  // 

}