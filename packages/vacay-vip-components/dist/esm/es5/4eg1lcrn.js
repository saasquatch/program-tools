/*! Built with http://stenciljs.com */
import{h}from"./widget-components.core.js";import{a as API,b as widgetIdent}from"./chunk-eeb26f85.js";import"./chunk-7081a6f1.js";var TwitterShareButton=function(){function e(){this.text="Close"}return e.prototype.handleClick=function(){API.ui.close()},e.prototype.componentDidLoad=function(){var e=widgetIdent();e&&"POPUP"!=e.engagementMedium&&this.closeButton.setAttribute("style","display:none")},e.prototype.render=function(){return h("span",{class:"close squatch-header-close","data-close-panel":"#squatch-panel"},this.text)},Object.defineProperty(e,"is",{get:function(){return"sqh-close-button"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"properties",{get:function(){return{closeButton:{elementRef:!0},text:{type:String,attr:"text"}}},enumerable:!0,configurable:!0}),Object.defineProperty(e,"listeners",{get:function(){return[{name:"click",method:"handleClick"}]},enumerable:!0,configurable:!0}),Object.defineProperty(e,"style",{get:function(){return"sqh-close-button .squatch-header-close{position:absolute;top:4px;right:6px;background:0 0;border:0;color:#4486e1;font-size:12px}sqh-close-button .squatch-header-close:hover{text-decoration:underline}"},enumerable:!0,configurable:!0}),e}();export{TwitterShareButton as SqhCloseButton};