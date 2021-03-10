import React from 'react';
import ReactDOM from "react-dom";

export default (editor, config = {}) => {
  // Get DomComponents module
  var comps = editor.DomComponents;

  // Get the model and the view from the default Component type
  var defaultType = comps.getType('default');
  var defaultModel = defaultType.model;
  var defaultView = defaultType.view;

  const textComp = comps.getType('sqh-text-component')

  comps.addType('sqm-share-button', {
    model: defaultModel.extend({
      defaults: Object.assign({}, defaultModel.prototype.defaults, {
        name: "Share Button",
        // can be dropped only inside 
        draggable: false,

        // these components can be dropped in here
        droppable: false,

        selectable: true,
        toolbar: [],
        traits: [
          { type: 'string', title: 'Button Text', name: 'label' },
          { type: 'boolean', title: 'Button Disbled', name: 'disabled' },
          { type: 'boolean', title: 'Pill Style Button', name: 'pill' },
          { type: 'string', title: 'Button Type', name: 'type' },
          { type: 'string', title: 'Button Size', name: 'size' },
          { type: 'string', title: 'Button Icon', name: 'icon' },
          { type: 'string', title: 'Button Icon Position', name: 'iconslot' },
          { type: 'string', title: 'Button Icon Label', name: 'iconlabel' },
          { type: 'string', title: 'Button Link', name: 'href' },
          { type: 'string', title: 'Button Name', name: 'name' },
          { type: 'string', title: 'Button Value', name: 'value' },
          { type: 'string', title: 'Button Target', name: 'target' },
          { type: 'string', title: 'Button Custom Styles', name: 'customstyle' },
        ],
        uiSchema: {
        }
      })
    },
      {
        isComponent: function (el) {
          if (el.tagName === 'sqm-share-button') {
            return { type: 'sqm-share-button' };
          }
        },
      }),






  // 
  // 
  // END OF PARTNER SPECIFIC EDITOR
  // 
  // 

}