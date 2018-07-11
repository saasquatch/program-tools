export default (editor, config = {}) => {
  // Get DomComponents module
  var comps = editor.DomComponents;

  // edit
  
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

  comps.addType('sqh-global-container', {
    // Define the Model
    model: defaultModel.extend({
      // Extend default properties
      defaults: Object.assign({}, defaultModel.prototype.defaults, {
        name: 'Widget Container',
        draggable: false,
        droppable: false,
        selectable: true,
        toolbar: [],
        traits: [
          {type: 'string', title: 'Background Color', name: 'background', value: '#FFFFFF'},
          {type: 'string', title: 'Font Family', name: 'fontfamily', value: 'Helvetica Neue,Helvetica,Arial,sans-serif', ...fontFamilyOpts},
        ],
        uiSchema: {
          'background': { 'ui:widget': 'color' },
        }
      }),
    },
    {
      isComponent: function(el) {
        if(el.tagName == 'SQH-GLOBAL-CONTAINER'){
          return {type: 'sqh-global-container'};
        }
      },
    }),

    view: defaultType.view,
  })

  comps.addType('sqh-text-component', {
    // Define the Model
    model: defaultModel.extend({
      // Extend default properties
      defaults: Object.assign({}, defaultModel.prototype.defaults, {
        name: 'Text Component',
        draggable: false,
        droppable: false,
        selectable: true,
        toolbar: [],
        traits: [
          { type: 'boolean', title: 'Hidden', name: 'hidden', value: false },
          { type: 'boolean', title: 'Use Markdown', name: 'ismarkdown', value: false },
          { type: 'string', title: 'Content', name: 'text', value: 'Give a friend $10 and receive $10 for yourself when they sign up!' },
          { type: 'string', title: 'Font Color', name: 'color', value: '#000000' },
          { type: 'integer', title: 'Font Size', name: 'fontsize', value: 16 },
          { type: 'string', title: 'Text Align', name: 'textalign', enum: ['left', 'center', 'right'], enumNames: ['Left', 'Center', 'Right'], default: 'center' },
        ],
        uiSchema: {
          'hidden': { 'ui:widget': 'hidden' },
          'color': { 'ui:widget': 'color' },
          'fontsize': { 'ui:widget': 'updown' },
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
          { type: 'boolean', title: 'Hidden', name: 'hidden', value: false },
          { type: 'boolean', title: 'Use Markdown', name: 'ismarkdown', value: false },
          { type: 'string', title: 'Content', name: 'text', value: 'Give $10 and Get $10' },
          { type: 'string', title: 'Font Color', name: 'color', value: '#000000' },
          { type: 'integer', title: 'Font Size', name: 'fontsize', value: 28 },
          { type: 'string', title: 'Text Align', name: 'textalign', enum: ['left', 'center', 'right'], enumNames: ['Left', 'Center', 'Right'], default: 'center' },
        ]
      })
    },
    {
      isComponent: function(el) {
        if(el.tagName == 'SQH-TEXT-COMPONENT' && el.getAttribute('type') === 'header'){
          return {type: 'sqh-header'};
        }
      },
    }),

    view: textComp.view
  })

  comps.addType('sqh-body', {
    model: textComp.model.extend({
      defaults: Object.assign({}, textComp.model.prototype.defaults, {
        name: 'Body'
      })
    },
    {
      isComponent: function(el) {
        if(el.tagName == 'SQH-TEXT-COMPONENT' && el.getAttribute('type') === 'body'){
          return {type: 'sqh-body'};
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
          { type: 'boolean', title: 'Hidden', name: 'hidden', value: true },
          { type: 'string', title: 'Image URL', name: 'background', format: 'uri' },
          { type: 'integer', title: 'Height', name: 'height' },
        ],
        uiSchema: {
          'hidden': { 'ui:widget': 'hidden' },
          'height': { 'ui:widget': 'updown' },
        }
      })
    },
    {
      isComponent: function(el) {
        if(el.tagName == 'SQH-TEXT-COMPONENT' && el.getAttribute('type') === 'banner'){
          return {type: 'sqh-banner'};
        }
      },
    }),

    view: textComp.view
  })

  comps.addType('sqh-copy-link-button', {
    model: defaultModel.extend({
        defaults: Object.assign({}, defaultModel.prototype.defaults, {
          name: "Copy Link",
          draggable: false,
          droppable: false,
          selectable: true,
          toolbar: [],
          traits: [
            { type: 'boolean', title: 'Hidden', name: 'hidden', value: false },
            { type: 'string', title: 'Button Color', name: 'buttoncolor', value: '#5C6164' },
            { type: 'string', title: 'Text Color', name: 'textcolor', value: '#FFFFFF' },
          ],
          uiSchema: {
            'hidden': { 'ui:widget': 'hidden' },
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

  const shareMediumColorObj = {
    'title': 'Button Color',
    'type': 'string',
  }

  comps.addType('sqh-share-button-container', {
    model: defaultModel.extend({
        defaults: Object.assign({}, defaultModel.prototype.defaults, {
          name: "Share Button Container",
          draggable: false,
          droppable: false,
          selectable: true,
          toolbar: [],
          traits: [
            { type: 'boolean', name: 'hidden', value: false },
            { type: 'string', name: 'twitterdisplayrule', value: 'mobile-and-desktop' },
            { type: 'string', name: 'twittertext', value: 'Twitter' },
            { type: 'string', name: 'twittercolor', value: '#4797d2' },
            { type: 'string', name: 'emaildisplayrule', value: 'mobile-and-desktop' },
            { type: 'string', name: 'emailtext', value: 'Email' },
            { type: 'string', name: 'emailcolor', value: '#373a3d' },
            { type: 'string', name: 'facebookdisplayrule', value: 'mobile-and-desktop' },
            { type: 'string', name: 'facebooktext', value: 'Facebook' },
            { type: 'string', name: 'facebookcolor', value: '#234079' },
            { type: 'string', name: 'whatsappdisplayrule', value: 'mobile-only' },
            { type: 'string', name: 'whatsapptext', value: 'WhatsApp' },
            { type: 'string', name: 'whatsappcolor', value: '#25D366' },
            { type: 'string', name: 'smsdisplayrule', value: 'mobile-only' },
            { type: 'string', name: 'smstext', value: 'SMS' },
            { type: 'string', name: 'smscolor', value: '#7bbf38' },
          ],
          uiSchema: {
            hidden: { 'ui:widget': 'hidden' },
            twittercolor: { 'ui:widget': 'color' },
            emailcolor: { 'ui:widget': 'color' },
            facebookcolor: { 'ui:widget': 'color' },
            whatsappcolor: { 'ui:widget': 'color' },
            smscolor: { 'ui:widget': 'color' },
          },
          required: [
            'sharemedium'
          ],
          schema: {
            'title': 'Grapes JS Props',
            'description': 'Some description here',
            'type': 'object',
            'properties': {
              'hidden': { 'type': 'boolean', 'title': 'Hidden' },
              'sharemedium': {
                'type': 'string',
                'title': 'Share Medium',
                'default': 'email',
                'enum': [ 'email', 'facebook', 'twitter', 'whatsapp', 'sms' ],
                'enumNames': [ 'Email', 'Facebook', 'Twitter', 'WhatsApp', 'SMS' ] 
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
                      'emailcolor': shareMediumColorObj
                    }
                  },
                  {
                    'properties': {
                      'sharemedium': { 'enum': [ 'facebook' ] },
                      'facebookdisplayrule': displayRuleObj.default,
                      'facebooktext': shareMediumTextObj,
                      'facebookcolor': shareMediumColorObj
                    }
                  },
                  {
                    'properties': {
                      'sharemedium': { 'enum': [ 'twitter' ] },
                      'twitterdisplayrule': displayRuleObj.default,
                      'twittertext': shareMediumTextObj,
                      'twittercolor': shareMediumColorObj
                    }
                  },
                  {
                    'properties': {
                      'sharemedium': { 'enum': [ 'whatsapp' ] },
                      'whatsappdisplayrule': displayRuleObj.mobile,
                      'whatsapptext': shareMediumTextObj,
                      'whatsappcolor': shareMediumColorObj
                    }
                  },
                  {
                    'properties': {
                      'sharemedium': { 'enum': [ 'sms' ] },
                      'smsdisplayrule': displayRuleObj.mobile,
                      'smstext': shareMediumTextObj,
                      'smscolor': shareMediumColorObj
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

  comps.addType('sqh-stats-component', {
    model: defaultModel.extend({
        defaults: Object.assign({}, defaultModel.prototype.defaults, {
          name: "Stats Component",
          draggable: false,
          droppable: false,
          selectable: true,
          traits: [
            { type: 'string', title: 'Referred', name: 'friendsreferred', value: 'Referred' },
            { type: 'string', title: 'Earned', name: 'rewardsearned', value: 'Earned' },
            { type: 'string', title: 'Pending', name: 'rewardspending', value: 'Pending' }
          ],
          toolbar: []
        })
      },
      {
        isComponent: function (el) {
          if (el.tagName === 'SQH-STATS-COMPONENT') {
            return { type: 'sqh-stats-component' };
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

  comps.addType('sqh-rewards-list', {
    model: defaultModel.extend({
        defaults: Object.assign({}, defaultModel.prototype.defaults, {
          name: "Rewards List",
          draggable: false,
          droppable: false,
          selectable: true,
          traits: [
            // { type: 'boolean', title: 'Show Referrer', name: 'showReferrer' }
          ],
          toolbar: []
        })
      },
      {
        isComponent: function (el) {
          if (el.tagName === 'SQH-REWARDS-LIST') {
            return { type: 'sqh-rewards-list' };
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
          { type: 'boolean', title: 'Hidden', name: 'hidden', value: false },
          { type: 'boolean', title: 'Use Markdown', name: 'ismarkdown', value: false },
          { type: 'string', title: 'Content', name: 'text', value: 'Footer text' },
          { type: 'string', title: 'Font Color', name: 'color', value: '#000000' },
          { type: 'integer', title: 'Font Size', name: 'fontsize', value: 16 },
          { type: 'string', title: 'Text Align', name: 'textalign', enum: ['left', 'center', 'right'], enumNames: ['Left', 'Center', 'Right'], default: 'center' },
        ],
        uiSchema: {
          'hidden': { 'ui:widget': 'hidden' },
          'color': { 'ui:widget': 'color' },
          'fontsize': { 'ui:widget': 'updown' },
        }
      })
    },
    {
      isComponent: function(el) {
        if(el.tagName == 'SQH-TEXT-COMPONENT' && el.getAttribute('type') === 'footer'){
          return {type: 'sqh-footer'};
        }
      },
    }),

    view: textComp.view
  })
}
