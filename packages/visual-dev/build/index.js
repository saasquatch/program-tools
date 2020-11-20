'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var styled = require('styled-components');
var DefaultSelect = require('react-select');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);
var DefaultSelect__default = /*#__PURE__*/_interopDefaultLegacy(DefaultSelect);

var MyComponent = function (_a) {
    var name = _a.name;
    return (React.createElement("div", { role: 'heading', "aria-level": 1 },
        "My First Component: ",
        name));
};

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
}

var H1 = styled__default['default'].h1(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  font-family: \"Helvetica Neue\", Helvetica, sans-serif;\n  color: ", ";\n  font-size: 21px;\n  line-height: 21px;\n  margin-bottom: 13px;\n  font-weight: 600;\n"], ["\n  font-family: \"Helvetica Neue\", Helvetica, sans-serif;\n  color: ", ";\n  font-size: 21px;\n  line-height: 21px;\n  margin-bottom: 13px;\n  font-weight: 600;\n"])), function (props) { return props.color || "#575757"; });
var H2 = styled__default['default'].h2(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  font-family: \"Helvetica Neue\", Helvetica, sans-serif;\n  color: ", ";\n  font-size: 16px;\n  line-height: 16px;\n  margin-bottom: ", ";\n  font-weight: 500;\n"], ["\n  font-family: \"Helvetica Neue\", Helvetica, sans-serif;\n  color: ", ";\n  font-size: 16px;\n  line-height: 16px;\n  margin-bottom: ", ";\n  font-weight: 500;\n"])), function (props) { return props.color || "#575757"; }, function (props) { return props.marginBottom || "16px"; });
var BoldH2 = styled__default['default'](H2)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  font-weight: 700;\n"], ["\n  font-weight: 700;\n"])));
var H3 = styled__default['default'].h3(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  display: ", ";\n  font-family: \"Helvetica Neue\", Helvetica, sans-serif;\n  color: ", ";\n  line-height: 13px;\n  font-weight: 600;\n  font-size: 13px;\n  margin-bottom: 8px;\n"], ["\n  display: ", ";\n  font-family: \"Helvetica Neue\", Helvetica, sans-serif;\n  color: ", ";\n  line-height: 13px;\n  font-weight: 600;\n  font-size: 13px;\n  margin-bottom: 8px;\n"])), function (props) { return props.display || "inherit"; }, function (props) { return props.color || "#575757"; });
var P = styled__default['default'].p(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  font-family: \"Helvetica Neue\", Helvetica, sans-serif;\n  font-size: 13px;\n  color: ", ";\n  ", ";\n  ", ";\n"], ["\n  font-family: \"Helvetica Neue\", Helvetica, sans-serif;\n  font-size: 13px;\n  color: ", ";\n  ", ";\n  ", ";\n"])), function (props) { return props.color || "#575757"; }, function (_a) {
    var bold = _a.bold;
    return bold && "font-weight: bold;";
}, function (_a) {
    var noMargin = _a.noMargin;
    return noMargin && "margin: 0px;";
});
var NumberedStep = styled__default['default'].div(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  font-family: \"Helvetica Neue\", Helvetica, sans-serif;\n  color: #575757;\n  border: 1px solid #dddddd;\n  border-radius: 50%;\n  text-align: center;\n  display: inline-block;\n  margin-right: 10px;\n  width: 18px;\n  height: 18px;\n  line-height: 17px;\n"], ["\n  font-family: \"Helvetica Neue\", Helvetica, sans-serif;\n  color: #575757;\n  border: 1px solid #dddddd;\n  border-radius: 50%;\n  text-align: center;\n  display: inline-block;\n  margin-right: 10px;\n  width: 18px;\n  height: 18px;\n  line-height: 17px;\n"])));
var AttributeHeading = styled__default['default'].h3(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n  font-family: \"Helvetica Neue\", Helvetica, sans-serif;\n  color: #808080;\n  font-weight: normal\n  font-size: 12px;\n  line-height: 14px;\n  margin: 0px;\n  padding: 0px;\n"], ["\n  font-family: \"Helvetica Neue\", Helvetica, sans-serif;\n  color: #808080;\n  font-weight: normal\n  font-size: 12px;\n  line-height: 14px;\n  margin: 0px;\n  padding: 0px;\n"])));
var WidgetTitle = styled__default['default'].h2(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n  font-family: \"Helvetica Neue\", Helvetica, sans-serif;\n  color: #575757;\n  font-weight: bold;\n  font-size: 14px;\n  line-height: 16px;\n  margin: 0px;\n  padding: 0px;\n"], ["\n  font-family: \"Helvetica Neue\", Helvetica, sans-serif;\n  color: #575757;\n  font-weight: bold;\n  font-size: 14px;\n  line-height: 16px;\n  margin: 0px;\n  padding: 0px;\n"])));
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8;

var WidgetContainer = styled__default['default'].div(templateObject_1$1 || (templateObject_1$1 = __makeTemplateObject(["\n    display: flex;\n    flex-direction: column;\n    align-items: flex-start;\n    padding: 20px;\n\n    width: 100%;\n\n    background: #FFFFFF;\n    border: 1px solid #E2E2E2;\n    box-sizing: border-box;\n    border-radius: 5px;\n"], ["\n    display: flex;\n    flex-direction: column;\n    align-items: flex-start;\n    padding: 20px;\n\n    width: 100%;\n\n    background: #FFFFFF;\n    border: 1px solid #E2E2E2;\n    box-sizing: border-box;\n    border-radius: 5px;\n"])));
var templateObject_1$1;

var ButtonDiv = styled__default['default'].div(templateObject_1$2 || (templateObject_1$2 = __makeTemplateObject(["\n  text-align: center;\n  padding: 6px 0;\n"], ["\n  text-align: center;\n  padding: 6px 0;\n"])));
var Icon = styled__default['default'].i(templateObject_2$1 || (templateObject_2$1 = __makeTemplateObject(["\n  display: inline;\n  text-decoration: none;\n  font-family: \"Helvetica Neue\", Helvetica, sans-serif;\n  color: #7c7c7c;\n  font-size: ", ";\n  margin-right: 5px;\n  font-weight: ", ";\n  position: relative;\n  top: ", ";\n"], ["\n  display: inline;\n  text-decoration: none;\n  font-family: \"Helvetica Neue\", Helvetica, sans-serif;\n  color: #7c7c7c;\n  font-size: ", ";\n  margin-right: 5px;\n  font-weight: ", ";\n  position: relative;\n  top: ", ";\n"])), function (props) { return (props.fontSize ? props.fontSize + "px" : "16px"); }, function (props) { return props.fontWeight; }, function (props) { return props.top + "px"; });
var TextLinkStyle = styled__default['default'].button(templateObject_3$1 || (templateObject_3$1 = __makeTemplateObject(["\n  font-family: \"Helvetica Neue\", Helvetica, sans-serif;\n  padding: 0;\n  border: none;\n  font-size: ", ";\n  margin: ", ";\n  background: transparent;\n  color: ", ";\n  font-weight: bold;\n  text-decoration: none;\n  ", "\n  ", " & {\n    margin: ", ";\n  }\n"], ["\n  font-family: \"Helvetica Neue\", Helvetica, sans-serif;\n  padding: 0;\n  border: none;\n  font-size: ", ";\n  margin: ", ";\n  background: transparent;\n  color: ",
    ";\n  font-weight: bold;\n  text-decoration: none;\n  ",
    "\n  ", " & {\n    margin: ", ";\n  }\n"])), function (props) { return (props.icon ? "14px" : "13px"); }, function (props) { return props.margin; }, function (props) {
    return props.disabled
        ? "#E2E2E2"
        : function (props) {
            return props.blue
                ? "#0088cc"
                : function (props) { return (props.action ? "#F5A841" : "#7C7C7C"); };
        };
}, function (props) {
    return props.inline &&
        "line-height: 13px;\n    padding: 0 5px;";
}, ButtonDiv, function (props) { return (props.disabled ? "0" : "0 8px"); });
var TextLinkWrapper = styled__default['default'].span(templateObject_4$1 || (templateObject_4$1 = __makeTemplateObject(["\n  cursor: pointer;\n  &:hover ", ", &:active ", ", &:focus ", " {\n    text-decoration: none;\n    color: ", ";\n    outline: none;\n    cursor: ", ";\n  }\n  // prettier-ignore\n  &:hover ", ", &:active ", ", &:focus ", " {\n    color: ", ";\n    text-decoration: ", ";\n    outline: none;\n    cursor: ", ";\n  }\n"], ["\n  cursor: pointer;\n  &:hover ", ", &:active ", ", &:focus ", " {\n    text-decoration: none;\n    color: ",
    ";\n    outline: none;\n    cursor: ", ";\n  }\n  // prettier-ignore\n  &:hover ", ", &:active ", ", &:focus ", " {\n    color: ",
    ";\n    text-decoration: ", ";\n    outline: none;\n    cursor: ", ";\n  }\n"])), Icon, Icon, Icon, function (props) {
    return props.disabled
        ? "#E2E2E2"
        : function (props) {
            return props.blue
                ? "#2f71a9"
                : function (props) { return (props.action ? "#F5A841" : "#606060"); };
        };
}, function (props) { return (props.disabled ? "not-allowed" : "pointer"); }, TextLinkStyle, TextLinkStyle, TextLinkStyle, function (props) {
    return props.disabled
        ? "#E2E2E2"
        : function (props) {
            return props.blue
                ? "#2f71a9"
                : function (props) { return (props.action ? "#F5A841" : "#606060"); };
        };
}, function (props) { return (props.disabled ? "none" : "underline"); }, function (props) { return (props.disabled ? "not-allowed" : "pointer"); });
var TextLink = function (_a) {
    var children = _a.children, icon = _a.icon, margin = _a.margin, blue = _a.blue, onClick = _a.onClick, fontWeight = _a.fontWeight, top = _a.top, inline = _a.inline, fontSize = _a.fontSize, customStyle = _a.customStyle, disabled = _a.disabled, action = _a.action;
    return (React.createElement(TextLinkWrapper, { onClick: onClick, blue: blue, style: customStyle, disabled: disabled, action: action },
        icon && (React.createElement(Icon, { className: icon, fontWeight: fontWeight, top: top, fontSize: fontSize })),
        React.createElement(TextLinkStyle, { type: "button", margin: margin, blue: blue, icon: icon, inline: inline, disabled: disabled, action: action }, children)));
};
var templateObject_1$2, templateObject_2$1, templateObject_3$1, templateObject_4$1;

var Link = styled__default['default']("a")(templateObject_1$3 || (templateObject_1$3 = __makeTemplateObject(["\n  padding: 0px;\n  margin: 0px;\n  border: none;\n  font-family: \"Helvetica Neue\", Helvetica, sans-serif;\n  font-size: 13px;\n  background: transparent;\n  color: ", " ;\n  font-weight: ", " ;\n  text-decoration: none;\n  &:hover {\n    color: ", " ;\n  }\n  &:focus {\n    color: ", " ;\n  }\n"], ["\n  padding: 0px;\n  margin: 0px;\n  border: none;\n  font-family: \"Helvetica Neue\", Helvetica, sans-serif;\n  font-size: 13px;\n  background: transparent;\n  color: ", " ;\n  font-weight: ", " ;\n  text-decoration: none;\n  &:hover {\n    color: ", " ;\n  }\n  &:focus {\n    color: ", " ;\n  }\n"])), function (props) { return (props.blue ? '#0088cc' : '#7c7c7c'); }, function (props) { return (props.bold ? 'bold' : 'normal'); }, function (props) { return (props.blue ? '#005580' : '#606060'); }, function (props) { return (props.blue ? '#005580' : '#606060'); });
var templateObject_1$3;

var Arrow = styled__default['default'].span(templateObject_1$4 || (templateObject_1$4 = __makeTemplateObject(["\n  color: #969696;\n"], ["\n  color: #969696;\n"])));
var ArrowRenderer = function (props) {
    var isOpen = props.isOpen;
    if (isOpen)
        return React__default['default'].createElement(Arrow, { className: "icon-sqh-chevron-up" });
    return React__default['default'].createElement(Arrow, { className: "icon-sqh-chevron-down" });
};
var templateObject_1$4;

var Select = function (props) { return (React.createElement(DefaultSelect__default['default'], __assign({ arrowRenderer: ArrowRenderer }, props))); };

//@ts-check
var rotate = styled.keyframes(templateObject_1$5 || (templateObject_1$5 = __makeTemplateObject(["\n   from {      \n     transform: rotate(0deg);    \n    }    \n    to {      \n      transform: rotate(360deg);    \n    }\n"], ["\n   from {      \n     transform: rotate(0deg);    \n    }    \n    to {      \n      transform: rotate(360deg);    \n    }\n"])));
var RingDefault = styled__default['default'].div(templateObject_2$2 || (templateObject_2$2 = __makeTemplateObject(["\n  display: inline-block;\n\n  div {\n    box-sizing: border-box;\n    display: block;\n    position: absolute;\n    border-radius: 50%;\n    animation: ", " 1.7s cubic-bezier(0.5, 0, 0.5, 1) infinite;\n  }\n\n  div:nth-child(1) {\n    animation-delay: -0.45s;\n  }\n\n  div:nth-child(2) {\n    animation-delay: -0.3s;\n  }\n\n  div:nth-child(3) {\n    animation-delay: -0.15s;\n  }\n"], ["\n  display: inline-block;\n\n  div {\n    box-sizing: border-box;\n    display: block;\n    position: absolute;\n    border-radius: 50%;\n    animation: ", " 1.7s cubic-bezier(0.5, 0, 0.5, 1) infinite;\n  }\n\n  div:nth-child(1) {\n    animation-delay: -0.45s;\n  }\n\n  div:nth-child(2) {\n    animation-delay: -0.3s;\n  }\n\n  div:nth-child(3) {\n    animation-delay: -0.15s;\n  }\n"])), rotate);
// SMALL LOADING SPINNER FOR INSIDE OF BUTTONS while loading
var RingSmall = styled__default['default'](RingDefault)(templateObject_3$2 || (templateObject_3$2 = __makeTemplateObject(["\n  position: relative;\n  bottom: ", ";\n  right: ", ";\n  left: ", ";\n  padding-right: ", "\n    div {\n    width: 14px;\n    height: 14px;\n    margin: 3px;\n    border: 2px solid #f5a623;\n    border-color: #f5a623 transparent transparent transparent;\n  }\n"], ["\n  position: relative;\n  bottom: ",
    ";\n  right: ",
    ";\n  left: ",
    ";\n  padding-right: ",
    "\n    div {\n    width: 14px;\n    height: 14px;\n    margin: 3px;\n    border: 2px solid #f5a623;\n    border-color: #f5a623 transparent transparent transparent;\n  }\n"])), function (props) {
    // @ts-ignore
    return props.bottom || "14px";
}, function (props) {
    // @ts-ignore
    return props.right || "2px";
}, function (props) {
    // @ts-ignore
    return props.left || "unset";
}, function (props) {
    // @ts-ignore
    return props.paddingRight || "unset";
});
var LoadingSpinner = function (_a) {
    var props = __rest(_a, []);
    var bottom = props.bottom, right = props.right, left = props.left, paddingRight = props.paddingRight;
    // @ts-ignore
    return (React__default['default'].createElement(RingSmall
    // @ts-expect-error - bad typing
    , { 
        // @ts-expect-error - bad typing
        bottom: bottom, right: right, left: left, paddingRight: paddingRight },
        React__default['default'].createElement("div", null),
        React__default['default'].createElement("div", null),
        React__default['default'].createElement("div", null),
        React__default['default'].createElement("div", null)));
};
// LARGE SPINNER FOR METRICS CARD
var RingLarge = styled__default['default'](RingDefault)(templateObject_4$2 || (templateObject_4$2 = __makeTemplateObject(["\n  margin: 55px calc(50% - 25px);\n  opacity: 0.5;\n\n  div {\n    width: 55px;\n    height: 55px;\n    border: 6px solid #f5a623;\n    border-color: #f5a623 transparent transparent transparent;\n  }\n"], ["\n  margin: 55px calc(50% - 25px);\n  opacity: 0.5;\n\n  div {\n    width: 55px;\n    height: 55px;\n    border: 6px solid #f5a623;\n    border-color: #f5a623 transparent transparent transparent;\n  }\n"])));
var LoadingSpinnerLarge = function () {
    return (React__default['default'].createElement(RingLarge, null,
        React__default['default'].createElement("div", null),
        React__default['default'].createElement("div", null),
        React__default['default'].createElement("div", null),
        React__default['default'].createElement("div", null)));
};
// TODO: center this spinner based on the height of the parent container... you know, with magic.
var TableSpinnerStyle = styled__default['default'](RingDefault)(templateObject_5$1 || (templateObject_5$1 = __makeTemplateObject(["\n  position: absolute;\n  top: 0;\n  left: 0;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  background-color: rgb(255, 255, 255, 0.5);\n  width: 100%;\n  height: 100%;\n  z-index: 4;\n\n  div {\n    width: 55px;\n    height: 55px;\n    border: 6px solid #f5a623;\n    border-color: #f5a623 transparent transparent transparent;\n  }\n"], ["\n  position: absolute;\n  top: 0;\n  left: 0;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  background-color: rgb(255, 255, 255, 0.5);\n  width: 100%;\n  height: 100%;\n  z-index: 4;\n\n  div {\n    width: 55px;\n    height: 55px;\n    border: 6px solid #f5a623;\n    border-color: #f5a623 transparent transparent transparent;\n  }\n"])));
var TableInitialSpinnerStyle = styled__default['default'](RingDefault)(templateObject_6$1 || (templateObject_6$1 = __makeTemplateObject(["\n  height: 160px;\n  background: transparent;\n  position: absolute;\n  left: 0;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  width: 100%;\n  z-index: 4;\n\n  div {\n    width: 55px;\n    height: 55px;\n    border: 6px solid #f5a623;\n    border-color: #f5a623 transparent transparent transparent;\n  }\n"], ["\n  height: 160px;\n  background: transparent;\n  position: absolute;\n  left: 0;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  width: 100%;\n  z-index: 4;\n\n  div {\n    width: 55px;\n    height: 55px;\n    border: 6px solid #f5a623;\n    border-color: #f5a623 transparent transparent transparent;\n  }\n"])));
var templateObject_1$5, templateObject_2$2, templateObject_3$2, templateObject_4$2, templateObject_5$1, templateObject_6$1;

var StandardizedRadioStyles = styled__default['default'].div(templateObject_1$6 || (templateObject_1$6 = __makeTemplateObject(["\n  input[type=\"radio\"] {\n    /**\n * handles the default elements\n */\n    float: left;\n    clear: both;\n    margin: 0;\n    outline: none;\n    -webkit-appearance: none;\n  }\n\n  /**\n   * Styles the label\n   */\n  input[type=\"radio\"] + label {\n    display: inline-block;\n    color: #575757;\n    font-size: 13px;\n    align-content: flex-start;\n    position: relative;\n    margin-left: 32px;\n    padding-top: 1px;\n  }\n\n  /**\n * builds the radio button\n */\n  input[type=\"radio\"] + label:before {\n    content: \"\";\n    position: absolute;\n    top: 2px;\n    left: -32px;\n    cursor: pointer;\n    display: inline-block;\n    box-sizing: border-box;\n    width: 16px;\n    height: 16px;\n    font-weight: 900;\n    font-family: \"icomoon\";\n    padding: 0.125em;\n    margin-right: 0.125em;\n    color: transparent;\n    border: 1px solid #ccc;\n    background-color: #fff;\n    vertical-align: middle;\n    padding-top: 0px;\n  }\n\n  /**\n * styles the radio button\n */\n  input[type=\"radio\"] + label:before {\n    content: \"\";\n    border-radius: 50%;\n  }\n\n  /**\n * support focused on firefox\n */\n  @-moz-document url-prefix() {\n    input[type=\"radio\"]:focus + label:before,\n    input[type=\"checkbox\"]:focus + label:before {\n      outline: 1px auto Highlight;\n    }\n  }\n\n  /**\n * handles ie 10+\n */\n  @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {\n    input[type=\"radio\"] + label {\n      padding: 3px;\n    }\n\n    input[type=\"radio\"] + label:before {\n      padding: 0.15em;\n    }\n  }\n\n  /**\n * handles checked\n */\n  input[type=\"radio\"]:checked + label:before {\n    border-radius: 50%;\n    border-color: #f5a841;\n    background: radial-gradient(circle at center, #f5a841 40%, white 0);\n  }\n\n  /**\n * handles focused\n */\n  input[type=\"radio\"]:focus + label:before {\n    outline: none;\n  }\n\n  /**\n * handles disabled\n */\n  input[type=\"radio\"]:disabled + label,\n  input[type=\"radio\"]:disabled + label:before,\n  input[type=\"radio\"]:disabled:checked + label:before {\n    cursor: default;\n  }\n\n  input[type=\"radio\"]:disabled + label,\n  input[type=\"radio\"]:disabled:checked + label:before {\n    color: #bbbbbb;\n  }\n"], ["\n  input[type=\"radio\"] {\n    /**\n * handles the default elements\n */\n    float: left;\n    clear: both;\n    margin: 0;\n    outline: none;\n    -webkit-appearance: none;\n  }\n\n  /**\n   * Styles the label\n   */\n  input[type=\"radio\"] + label {\n    display: inline-block;\n    color: #575757;\n    font-size: 13px;\n    align-content: flex-start;\n    position: relative;\n    margin-left: 32px;\n    padding-top: 1px;\n  }\n\n  /**\n * builds the radio button\n */\n  input[type=\"radio\"] + label:before {\n    content: \"\";\n    position: absolute;\n    top: 2px;\n    left: -32px;\n    cursor: pointer;\n    display: inline-block;\n    box-sizing: border-box;\n    width: 16px;\n    height: 16px;\n    font-weight: 900;\n    font-family: \"icomoon\";\n    padding: 0.125em;\n    margin-right: 0.125em;\n    color: transparent;\n    border: 1px solid #ccc;\n    background-color: #fff;\n    vertical-align: middle;\n    padding-top: 0px;\n  }\n\n  /**\n * styles the radio button\n */\n  input[type=\"radio\"] + label:before {\n    content: \"\";\n    border-radius: 50%;\n  }\n\n  /**\n * support focused on firefox\n */\n  @-moz-document url-prefix() {\n    input[type=\"radio\"]:focus + label:before,\n    input[type=\"checkbox\"]:focus + label:before {\n      outline: 1px auto Highlight;\n    }\n  }\n\n  /**\n * handles ie 10+\n */\n  @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {\n    input[type=\"radio\"] + label {\n      padding: 3px;\n    }\n\n    input[type=\"radio\"] + label:before {\n      padding: 0.15em;\n    }\n  }\n\n  /**\n * handles checked\n */\n  input[type=\"radio\"]:checked + label:before {\n    border-radius: 50%;\n    border-color: #f5a841;\n    background: radial-gradient(circle at center, #f5a841 40%, white 0);\n  }\n\n  /**\n * handles focused\n */\n  input[type=\"radio\"]:focus + label:before {\n    outline: none;\n  }\n\n  /**\n * handles disabled\n */\n  input[type=\"radio\"]:disabled + label,\n  input[type=\"radio\"]:disabled + label:before,\n  input[type=\"radio\"]:disabled:checked + label:before {\n    cursor: default;\n  }\n\n  input[type=\"radio\"]:disabled + label,\n  input[type=\"radio\"]:disabled:checked + label:before {\n    color: #bbbbbb;\n  }\n"])));
var Label = styled__default['default'].div(templateObject_2$3 || (templateObject_2$3 = __makeTemplateObject(["\n  font-family: \"Helvetica Neue\", Helvetica, sans-serif;\n  padding-bottom: 8px;\n"], ["\n  font-family: \"Helvetica Neue\", Helvetica, sans-serif;\n  padding-bottom: 8px;\n"])));
var Description = styled__default['default'].div(templateObject_3$3 || (templateObject_3$3 = __makeTemplateObject(["\n  font-family: \"Helvetica Neue\", Helvetica, sans-serif;\n  color: #999;\n  font-weight: normal;\n  word-wrap: break-word;\n  width: auto;\n  margin-bottom: 16px;\n  line-height: 16px;\n  font-size: 12px;\n"], ["\n  font-family: \"Helvetica Neue\", Helvetica, sans-serif;\n  color: #999;\n  font-weight: normal;\n  word-wrap: break-word;\n  width: auto;\n  margin-bottom: 16px;\n  line-height: 16px;\n  font-size: 12px;\n"])));
var DetailedRadio = function (_a) {
    var checked = _a.checked, onChange = _a.onChange, label = _a.label, id = _a.id, name = _a.name, description = _a.description, _b = _a.disabled, disabled = _b === void 0 ? false : _b;
    return (React__default['default'].createElement(React__default['default'].Fragment, null,
        React__default['default'].createElement(StandardizedRadioStyles, null,
            React__default['default'].createElement("input", { id: id, readOnly // since using onClick
                : true, name: name, type: "radio", onClick: function () { return onChange(id); }, checked: checked, disabled: disabled }),
            React__default['default'].createElement("label", { htmlFor: id },
                React__default['default'].createElement(Label, null, label),
                React__default['default'].createElement(Description, null, description)))));
};
var templateObject_1$6, templateObject_2$3, templateObject_3$3;

var InfoWrapper = styled__default['default'].div(templateObject_1$7 || (templateObject_1$7 = __makeTemplateObject(["\n  margin-bottom: 32px;\n  padding-left: 32px;\n  & * {\n    color: #999;\n  }\n  & b {\n    color: #575757;\n  }\n"], ["\n  margin-bottom: 32px;\n  padding-left: 32px;\n  & * {\n    color: #999;\n  }\n  & b {\n    color: #575757;\n  }\n"])));
var CardFormatWrapper = styled__default['default'].div(templateObject_2$4 || (templateObject_2$4 = __makeTemplateObject(["\n  display: grid;\n  grid-template-columns: 49% 49%;\n  grid-column-gap: 16px;\n  grid-template-rows: repeat(auto-fill);\n  grid-row-gap: 0px;\n  grid-auto-flow: row;\n"], ["\n  display: grid;\n  grid-template-columns: 49% 49%;\n  grid-column-gap: 16px;\n  grid-template-rows: repeat(auto-fill);\n  grid-row-gap: 0px;\n  grid-auto-flow: row;\n"])));
var CardFormat = styled__default['default'].div(templateObject_3$4 || (templateObject_3$4 = __makeTemplateObject(["\n  padding: 16px;\n  padding-bottom: 0;\n  background: ", ";\n  border-radius: 4px;\n"], ["\n  padding: 16px;\n  padding-bottom: 0;\n  background: ", ";\n  border-radius: 4px;\n"])), function (_a) {
    var checked = _a.checked;
    return (checked ? "#f9f9f9" : "none");
});
var RadioCards = function (props) {
    var cardFormat = props.options.cardFormat;
    var Wrapper = cardFormat ? CardFormatWrapper : React.Fragment;
    var Card = cardFormat ? CardFormat : React.Fragment;
    return (React.createElement(Wrapper, null, props.options.radioOptions.map(function (option) {
        var key = option.key, primaryInfo = option.primaryInfo, options = __rest(option, ["key", "primaryInfo"]);
        return (React.createElement(Card, { key: key, checked: props.value === key },
            React.createElement(DetailedRadio, __assign({ checked: props.value === key, onChange: props.onChange, id: key }, options)),
            key === "setAsPrimary" && props.value === key && primaryInfo && (React.createElement(InfoWrapper, null, primaryInfo.map(function (info) { return info; })))));
    })));
};
var templateObject_1$7, templateObject_2$4, templateObject_3$4;

exports.AttributeHeading = AttributeHeading;
exports.H1 = H1;
exports.H2 = H2;
exports.H3 = H3;
exports.Link = Link;
exports.LoadingSpinner = LoadingSpinner;
exports.LoadingSpinnerLarge = LoadingSpinnerLarge;
exports.MyComponent = MyComponent;
exports.P = P;
exports.RadioCards = RadioCards;
exports.Select = Select;
exports.TextButton = TextLink;
exports.WidgetContainer = WidgetContainer;
exports.WidgetTitle = WidgetTitle;
//# sourceMappingURL=index.js.map
