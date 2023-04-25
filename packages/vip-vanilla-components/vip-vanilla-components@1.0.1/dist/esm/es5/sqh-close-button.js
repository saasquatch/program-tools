/*! Built with http://stenciljs.com */
import { h } from './widget-components.core.js';
import { a as API, b as widgetIdent } from './chunk-eeb26f85.js';
import './chunk-7081a6f1.js';
// const API: MyAPI = window["WidgetHost"];
// const widget = window["widgetIdent"];
var TwitterShareButton = /** @class */ (function () {
    function TwitterShareButton() {
        this.text = "Close";
    }
    TwitterShareButton.prototype.handleClick = function () {
        API.ui.close();
    };
    TwitterShareButton.prototype.componentDidLoad = function () {
        var widget = widgetIdent();
        if (widget && widget.engagementMedium != "POPUP") {
            this.closeButton.setAttribute('style', 'display:none');
        }
    };
    TwitterShareButton.prototype.render = function () {
        return (h("span", { class: "close squatch-header-close", "data-close-panel": "#squatch-panel" }, this.text));
    };
    Object.defineProperty(TwitterShareButton, "is", {
        get: function () { return "sqh-close-button"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TwitterShareButton, "properties", {
        get: function () {
            return {
                "closeButton": {
                    "elementRef": true
                },
                "text": {
                    "type": String,
                    "attr": "text"
                }
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TwitterShareButton, "listeners", {
        get: function () {
            return [{
                    "name": "click",
                    "method": "handleClick"
                }];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TwitterShareButton, "style", {
        get: function () { return "sqh-close-button .squatch-header-close {\n  position: absolute;\n  top: 4px;\n  right: 6px;\n  background: transparent;\n  border: 0;\n  color: #4486e1;\n  font-size: 12px; }\n  sqh-close-button .squatch-header-close:hover {\n    text-decoration: underline; }"; },
        enumerable: true,
        configurable: true
    });
    return TwitterShareButton;
}());
export { TwitterShareButton as SqhCloseButton };
