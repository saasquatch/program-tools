var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
/*! Built with http://stenciljs.com */
import { h } from './widget-components.core.js';
import { a as css } from './chunk-06494afc.js';
import './chunk-7081a6f1.js';
var CTAComponent = /** @class */ (function () {
    function CTAComponent() {
        this.ishidden = false;
        this.ismarkdown = false;
        this.padding = '10px 20px 15px';
    }
    CTAComponent.prototype.render = function () {
        var _this = this;
        var buttonStyle = css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n      font-family: ", ";\n      font-size: ", ";\n      font-weight: ", ";   \n      color: ", ";\n      padding-top: ", ";\n      padding-bottom: ", ";\n      width:", ";\n      overflow-wrap: break-word;\n      border-radius: ", ";\n      margin:0 auto;\n      border:none;\n      background-color: ", ";\n      &:hover {\n        cursor:pointer;\n        opacity:0.9;\n      }\n      &:focus {\n        outline:none;\n      }\n    "], ["\n      font-family: ", ";\n      font-size: ", ";\n      font-weight: ", ";   \n      color: ", ";\n      padding-top: ", ";\n      padding-bottom: ", ";\n      width:", ";\n      overflow-wrap: break-word;\n      border-radius: ", ";\n      margin:0 auto;\n      border:none;\n      background-color: ", ";\n      &:hover {\n        cursor:pointer;\n        opacity:0.9;\n      }\n      &:focus {\n        outline:none;\n      }\n    "])), this.fontfamily || 'inherit', this.fontsize ? this.fontsize + 'px' : 'inherit', this.fontweight ? this.fontweight : 'inherit', this.color || 'inherit', this.paddingtop ? this.paddingtop + 'px' : 'inherit', this.paddingbottom ? this.paddingbottom + 'px' : 'inherit', this.width ? this.width + 'px' : 'auto', this.borderradius ? this.borderradius + 'px' : '8px', this.backgroundcolor ? this.backgroundcolor : '#F5A100');
        var divStyle = css(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n      text-align: ", ";\n      background: ", ";\n      height: ", ";\n      background-size: contain;\n    "], ["\n      text-align: ", ";\n      background: ", ";\n      height: ", ";\n      background-size: contain;\n    "])), this.textalign, this.background ? this.background : 'inherit', this.height || 'inherit');
        return !this.ishidden &&
            h("div", { class: divStyle }, h("button", { class: buttonStyle, onClick: function () {
                    if (window["widgetIdent"].env === "demo")
                        return;
                    window.open(_this.url, "_blank");
                } }, this.text));
    };
    Object.defineProperty(CTAComponent, "is", {
        get: function () { return "sqh-cta-component"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CTAComponent, "properties", {
        get: function () {
            return {
                "background": {
                    "type": String,
                    "attr": "background"
                },
                "backgroundcolor": {
                    "type": String,
                    "attr": "backgroundcolor"
                },
                "borderradius": {
                    "type": String,
                    "attr": "borderradius"
                },
                "color": {
                    "type": String,
                    "attr": "color"
                },
                "fontfamily": {
                    "type": String,
                    "attr": "fontfamily"
                },
                "fontsize": {
                    "type": String,
                    "attr": "fontsize"
                },
                "fontweight": {
                    "type": String,
                    "attr": "fontweight"
                },
                "height": {
                    "type": String,
                    "attr": "height"
                },
                "ishidden": {
                    "type": Boolean,
                    "attr": "ishidden"
                },
                "ismarkdown": {
                    "type": Boolean,
                    "attr": "ismarkdown"
                },
                "padding": {
                    "type": String,
                    "attr": "padding"
                },
                "paddingbottom": {
                    "type": String,
                    "attr": "paddingbottom"
                },
                "paddingtop": {
                    "type": String,
                    "attr": "paddingtop"
                },
                "text": {
                    "type": String,
                    "attr": "text"
                },
                "textalign": {
                    "type": String,
                    "attr": "textalign"
                },
                "textEl": {
                    "elementRef": true
                },
                "url": {
                    "type": String,
                    "attr": "url"
                },
                "width": {
                    "type": String,
                    "attr": "width"
                }
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CTAComponent, "style", {
        get: function () { return "sqh-cta-component {\n  display: block; }\n  sqh-cta-component p {\n    margin: 0; }"; },
        enumerable: true,
        configurable: true
    });
    return CTAComponent;
}());
export { CTAComponent as SqhCtaComponent };
var templateObject_1, templateObject_2;
