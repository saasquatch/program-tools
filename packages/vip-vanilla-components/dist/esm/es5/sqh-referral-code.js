/*! Built with http://stenciljs.com */
import { h } from './widget-components.core.js';
import { a as API } from './chunk-eeb26f85.js';
import './chunk-7081a6f1.js';
var ReferralCode = /** @class */ (function () {
    function ReferralCode() {
    }
    ReferralCode.prototype.componentWillLoad = function () {
        var _this = this;
        return API.graphql.getReferralCode().then(function (res) {
            _this.referralcode = res;
        }).catch(function (e) {
            _this.onError(e);
        });
    };
    ReferralCode.prototype.onError = function (e) {
        console.log("Error loading via GraphQL.", e);
    };
    ReferralCode.prototype.render = function () {
        return (h("span", null, this.referralcode));
    };
    ;
    Object.defineProperty(ReferralCode, "is", {
        get: function () { return "sqh-referral-code"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ReferralCode, "properties", {
        get: function () {
            return {
                "referralcode": {
                    "state": true
                }
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ReferralCode, "style", {
        get: function () { return "sqh-referral-code {\n  display: inline; }\n  sqh-referral-code span {\n    font-family: inherit;\n    font-size: inherit;\n    color: inherit;\n    overflow-wrap: break-word; }"; },
        enumerable: true,
        configurable: true
    });
    return ReferralCode;
}());
export { ReferralCode as SqhReferralCode };
