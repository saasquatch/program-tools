var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
/*! Built with http://stenciljs.com */
import { h } from './widget-components.core.js';
import { a as css } from './chunk-06494afc.js';
import './chunk-7081a6f1.js';
var ImageComponent = /** @class */ (function () {
    function ImageComponent() {
        this.ishidden = false;
    }
    ImageComponent.prototype.render = function () {
        var imageString = this.url;
        var alignment = css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["{\n      text-align: ", ";\n    }"], ["{\n      text-align: ", ";\n    }"])), this.alignment);
        var myStyle = css(templateObject_2 || (templateObject_2 = __makeTemplateObject(["{\n      width: ", "px;\n      border-radius: ", "px;\n      ", "\n    }"], ["{\n      width: ", "px;\n      border-radius: ", "px;\n      ", "\n    }"])), this.width, this.borderradius, this.css);
        return !this.ishidden &&
            h("div", { class: alignment }, h("img", { src: imageString, class: myStyle }));
    };
    Object.defineProperty(ImageComponent, "is", {
        get: function () { return "sqh-image-component"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImageComponent, "properties", {
        get: function () {
            return {
                "alignment": {
                    "type": String,
                    "attr": "alignment"
                },
                "borderradius": {
                    "type": Number,
                    "attr": "borderradius"
                },
                "css": {
                    "type": String,
                    "attr": "css"
                },
                "ishidden": {
                    "type": Boolean,
                    "attr": "ishidden"
                },
                "url": {
                    "type": String,
                    "attr": "url"
                },
                "width": {
                    "type": Number,
                    "attr": "width"
                }
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImageComponent, "style", {
        get: function () { return "sqh-image-component {\n  display: block; }\n  sqh-image-component div {\n    position: relative; }\n  sqh-image-component img {\n    max-width: 100%;\n    height: auto; }"; },
        enumerable: true,
        configurable: true
    });
    return ImageComponent;
}());
export { ImageComponent as SqhImageComponent };
var templateObject_1, templateObject_2;
