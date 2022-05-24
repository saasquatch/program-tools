import React__default, { createElement, forwardRef, Fragment, useRef, useState, Children, useContext, createContext } from 'react';
import styled, { keyframes, css, createGlobalStyle } from 'styled-components';
import root$1 from 'react-shadow/styled-components';
import { useSelect } from 'downshift';

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _taggedTemplateLiteralLoose(strings, raw) {
  if (!raw) {
    raw = strings.slice(0);
  }

  strings.raw = raw;
  return strings;
}

var _templateObject, _templateObject2, _templateObject3, _templateObject4;
var rotate = /*#__PURE__*/keyframes(_templateObject || (_templateObject = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n   from {      \n     transform: rotate(0deg);    \n    }    \n    to {      \n      transform: rotate(360deg);    \n    }\n"])));
var RingDefault = /*#__PURE__*/styled.div(_templateObject2 || (_templateObject2 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  display: inline-block;\n\n  div {\n    box-sizing: border-box;\n    display: block;\n    position: absolute;\n    border-radius: 50%;\n    animation: ", " 1.7s cubic-bezier(0.5, 0, 0.5, 1) infinite;\n  }\n\n  div:nth-child(1) {\n    animation-delay: -0.45s;\n  }\n\n  div:nth-child(2) {\n    animation-delay: -0.3s;\n  }\n\n  div:nth-child(3) {\n    animation-delay: -0.15s;\n  }\n"])), rotate); // SMALL LOADING SPINNER FOR INSIDE OF BUTTONS while loading

var RingSmall = /*#__PURE__*/styled(RingDefault)(_templateObject3 || (_templateObject3 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  position: relative;\n  bottom: ", ";\n  right: ", ";\n  left: ", ";\n  padding-right: ", ";\n  div {\n    width: 14px;\n    height: 14px;\n    margin: 3px;\n    border: 2px solid ", ";\n    border-color: ", " transparent transparent\n      transparent;\n  }\n"])), function (props) {
  return props.bottom || "14px";
}, function (props) {
  return props.right || "2px";
}, function (props) {
  return props.left || "unset";
}, function (props) {
  return props.paddingRight || "unset";
}, function (props) {
  return props.color || "#f5a623";
}, function (props) {
  return props.color || "#f5a623";
});
var LoadingSpinner = function LoadingSpinner(_ref) {
  var props = _extends({}, _ref);

  var bottom = props.bottom,
      right = props.right,
      left = props.left,
      paddingRight = props.paddingRight,
      color = props.color;
  return React__default.createElement(RingSmall, {
    bottom: bottom,
    right: right,
    left: left,
    paddingRight: paddingRight,
    color: color
  }, React__default.createElement("div", null), React__default.createElement("div", null), React__default.createElement("div", null), React__default.createElement("div", null));
}; // LARGE SPINNER FOR METRICS CARD

var RingLarge = /*#__PURE__*/styled(RingDefault)(_templateObject4 || (_templateObject4 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  margin: 55px calc(50% - 25px);\n  opacity: 0.5;\n\n  bottom: ", ";\n  right: ", ";\n  left: ", ";\n  padding-right: ", ";\n\n  div {\n    width: 55px;\n    height: 55px;\n    border: 6px solid ", ";\n    border-color: ", " transparent transparent\n      transparent;\n  }\n"])), function (props) {
  return props.bottom || "14px";
}, function (props) {
  return props.right || "2px";
}, function (props) {
  return props.left || "unset";
}, function (props) {
  return props.paddingRight || "unset";
}, function (props) {
  return props.color || "#f5a623";
}, function (props) {
  return props.color || "#f5a623";
});
var LoadingSpinnerLarge = function LoadingSpinnerLarge(_ref2) {
  var props = _extends({}, _ref2);

  var color = props.color;
  return React__default.createElement(RingLarge, {
    color: color
  }, React__default.createElement("div", null), React__default.createElement("div", null), React__default.createElement("div", null), React__default.createElement("div", null));
}; // TODO: center this spinner based on the height of the parent container... you know, with magic.

var _templateObject$1;
var base = /*#__PURE__*/css(_templateObject$1 || (_templateObject$1 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  position: relative;\n  vertical-align: text-top;\n  display: inline-flex;\n  justify-content: center;\n  align-items: center;\n"])));

var placeholder = /*#__PURE__*/createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor"
}, /*#__PURE__*/createElement("path", {
  d: "M16.05 10.2C16.01 10.23 15.97 10.27 15.91 10.31C15.8 10.31 15.66 10.31 15.51 10.31C15.51 10.35 15.5 10.37 15.49 10.43C15.36 10.47 15.22 10.52 15.08 10.55C14.92 10.59 14.78 10.48 14.62 10.49C14.59 10.42 14.52 10.38 14.49 10.29C14.46 10.15 14.37 10.07 14.25 10.01C14.13 9.96 14.03 9.87 13.91 9.84C13.78 9.82 13.7 9.72 13.59 9.68C13.52 9.65 13.44 9.66 13.38 9.63C13.25 9.58 13.09 9.56 12.99 9.47C12.88 9.38 12.72 9.35 12.67 9.18C12.48 9.19 12.45 8.95 12.28 8.88C12.17 8.86 12.01 8.73 11.87 8.86C11.78 8.85 11.7 8.82 11.62 8.81C11.51 8.95 11.48 9.15 11.31 9.19C11.27 9.31 11.22 9.45 11.17 9.57C11.12 9.71 11.16 9.84 11.22 9.97C11.28 10.09 11.32 10.21 11.36 10.35C11.39 10.49 11.46 10.63 11.56 10.73C11.61 10.78 11.66 10.86 11.68 10.94C11.7 11.04 11.72 11.12 11.79 11.19C11.8 11.21 11.79 11.27 11.8 11.31C11.91 11.46 12.05 11.6 12.12 11.78C12.18 11.95 12.27 12.1 12.35 12.3C12.33 12.45 12.39 12.59 12.47 12.75C12.57 12.93 12.62 13.14 12.75 13.3C12.74 13.42 12.86 13.44 12.89 13.53C12.87 13.83 12.98 14.12 12.95 14.43C12.95 14.5 12.97 14.59 13 14.67C13.07 14.84 13.01 15.06 13.14 15.21C13.11 15.38 13.27 15.54 13.14 15.72C13.16 15.87 13.1 16.03 13.19 16.18C13.21 16.23 13.19 16.3 13.19 16.36C13.19 16.65 13.19 16.94 13.19 17.23C13.19 17.38 13.18 17.53 13.27 17.67C13.3 17.71 13.29 17.8 13.3 17.89C13.46 18.01 13.63 18.13 13.82 18.25C13.94 18.25 14.08 18.25 14.21 18.25C14.28 18.25 14.36 18.22 14.42 18.31C14.44 18.33 14.52 18.29 14.62 18.27C14.65 18.28 14.74 18.31 14.81 18.33C14.87 18.4 14.93 18.46 15.01 18.54C14.92 18.67 14.84 18.78 14.73 18.86C14.65 18.92 14.58 19.02 14.5 19.08C14.41 19.17 14.28 19.2 14.17 19.27C14.09 19.33 13.99 19.38 13.86 19.45C13.66 19.45 13.41 19.45 13.16 19.45C12.97 19.45 12.88 19.48 12.66 19.64C12.39 19.6 12.1 19.7 11.82 19.57C11.75 19.38 11.65 19.21 11.62 18.98C11.61 18.92 11.59 18.85 11.59 18.79C11.59 18.52 11.59 18.25 11.59 17.98C11.6 17.77 11.56 17.57 11.49 17.37C11.46 17.27 11.46 17.15 11.44 17.03C11.39 16.84 11.32 16.67 11.22 16.51C11.11 16.34 10.98 16.18 10.92 15.97C10.89 15.88 10.87 15.78 10.84 15.68C10.83 15.64 10.82 15.61 10.78 15.58C10.78 15.23 10.78 14.89 10.78 14.54C10.78 14.53 10.76 14.51 10.74 14.5C10.91 14.41 10.66 14.25 10.78 14.15C10.73 13.88 10.49 13.82 10.37 13.63C10.32 13.63 10.28 13.63 10.25 13.63C10.19 13.71 10.13 13.78 10.05 13.88C10.04 13.94 10.01 14.06 9.99 14.16C9.94 14.17 9.92 14.18 9.9 14.18C9.9 14.27 9.9 14.35 9.9 14.4C9.82 14.53 9.72 14.63 9.7 14.75C9.68 14.93 9.58 15.04 9.5 15.14C9.48 15.4 9.28 15.52 9.24 15.77C9.18 15.8 9.11 15.83 8.99 15.88C8.94 15.94 8.84 16.01 8.74 16.1C8.63 16.19 8.51 16.3 8.4 16.41C8.34 16.47 8.26 16.53 8.19 16.6C8.09 16.7 7.97 16.8 7.88 16.92C7.76 17.1 7.58 17.18 7.44 17.31C7.32 17.41 7.27 17.55 7.2 17.67C7.18 17.7 7.16 17.72 7.15 17.74C7.15 17.84 7.15 17.94 7.15 18.04C7.34 18.25 7.61 18.26 7.82 18.41C7.94 18.44 8.07 18.47 8.18 18.49C8.27 18.61 8.32 18.74 8.28 18.9C8.19 18.96 8.1 19.02 8.02 19.07C7.82 19.1 7.63 19.12 7.44 19.14C7.42 19.14 7.41 19.16 7.39 19.16C7.24 19.28 7.08 19.26 6.91 19.26C6.8 19.26 6.69 19.26 6.6 19.26C6.28 19.11 5.98 18.96 5.69 18.67C5.51 18.72 5.4 18.47 5.21 18.42C5.16 18.31 5.1 18.21 5.04 18.09C5.04 17.98 5.04 17.86 5.04 17.74C5.04 17.68 5.04 17.61 5.05 17.54C5.05 17.5 5.07 17.45 5.09 17.44C5.18 17.41 5.19 17.25 5.26 17.24C5.38 17.22 5.36 17.02 5.48 17.03C5.58 16.85 5.67 16.64 5.8 16.5C5.93 16.35 5.99 16.17 6.11 16.02C6.24 15.86 6.32 15.65 6.39 15.44C6.43 15.31 6.5 15.21 6.58 15.12C6.74 14.96 6.86 14.76 7.03 14.62C7.14 14.53 7.25 14.51 7.36 14.48C7.57 14.43 7.76 14.35 7.9 14.14C7.9 14.05 7.9 13.97 7.83 13.88C7.78 13.8 7.76 13.67 7.75 13.57C7.73 13.42 7.74 13.28 7.7 13.14C7.66 12.99 7.66 12.82 7.65 12.66C7.64 12.5 7.64 12.34 7.65 12.18C7.65 12.14 7.67 12.1 7.69 12.05C7.67 12 7.65 11.93 7.61 11.89C7.5 11.78 7.38 11.68 7.25 11.57C7.18 11.38 7.1 11.17 6.99 10.89C6.96 10.78 6.97 10.58 6.91 10.39C6.98 10.18 6.93 9.97 6.95 9.76C6.96 9.56 6.98 9.35 6.98 9.15C6.93 9.31 6.72 9.32 6.74 9.54C6.66 9.63 6.58 9.73 6.53 9.78C6.45 9.98 6.39 10.14 6.31 10.32C6.17 10.44 6 10.58 5.85 10.74C5.76 10.83 5.66 10.91 5.55 10.97C5.4 11.04 5.24 11.13 5.09 11.22C4.85 11.34 4.72 11.34 4.51 11.18C4.4 11.09 4.3 10.97 4.23 10.91C4.14 10.64 4.07 10.42 4 10.22C4.02 10.09 4.04 9.97 4.07 9.83C4.11 9.78 4.17 9.71 4.25 9.62C4.31 9.63 4.4 9.65 4.52 9.67C4.62 9.61 4.75 9.56 4.87 9.47C5.04 9.34 5.12 9.15 5.19 8.96C5.27 8.73 5.35 8.48 5.44 8.25C5.48 8.16 5.54 8.1 5.57 8.04C5.71 7.66 5.91 7.33 5.89 6.91C5.99 6.75 6.12 6.61 6.21 6.41C6.29 6.23 6.45 6.08 6.64 6.02C6.71 6 6.73 5.89 6.8 5.86C6.85 5.84 6.93 5.84 6.95 5.8C7.02 5.64 7.18 5.6 7.24 5.44C7.3 5.31 7.38 5.2 7.45 5.09C7.47 5.06 7.48 5.02 7.49 4.99C7.51 4.78 7.64 4.63 7.77 4.54C7.9 4.45 7.93 4.34 7.94 4.19C7.94 4.18 7.94 4.15 7.94 4.13C7.94 4.13 7.95 4.12 7.96 4.11C7.98 4.08 8 4.06 8.04 4.01C8.04 3.94 8.04 3.85 8.04 3.79C8.12 3.63 8.19 3.49 8.3 3.39C8.43 3.27 8.55 3.16 8.71 3.21C8.8 3.01 9 2.96 9.05 2.75C9.15 2.68 9.26 2.62 9.38 2.55C9.47 2.55 9.59 2.55 9.7 2.55C9.77 2.48 9.83 2.42 9.89 2.37C9.96 2.31 10.03 2.26 10.04 2.15C10.1 2.12 10.16 2.08 10.23 2.05C10.23 2.01 10.24 1.98 10.24 1.94C10.37 1.71 10.54 1.51 10.66 1.25C10.74 1.08 10.9 0.96 11.02 0.81C11.06 0.77 11.09 0.72 11.13 0.69C11.18 0.65 11.23 0.59 11.28 0.59C11.36 0.59 11.4 0.53 11.45 0.47C11.52 0.41 11.63 0.54 11.68 0.4C11.75 0.4 11.82 0.4 11.88 0.4C11.9 0.42 11.92 0.45 11.95 0.46C12.01 0.48 12.08 0.47 12.13 0.5C12.38 0.63 12.51 0.9 12.63 1.17C12.65 1.23 12.63 1.33 12.66 1.36C12.75 1.44 12.75 1.57 12.77 1.67C12.79 1.77 12.85 1.8 12.87 1.88C12.9 1.99 12.83 2.12 12.92 2.22C12.94 2.45 12.95 2.67 12.8 2.81C12.77 3.02 12.75 3.2 12.72 3.38C12.69 3.41 12.66 3.45 12.63 3.49C12.63 3.66 12.63 3.86 12.63 4.04C12.57 4.08 12.53 4.11 12.48 4.14C12.48 4.2 12.48 4.26 12.48 4.36C12.52 4.4 12.58 4.46 12.64 4.51C12.64 4.58 12.64 4.64 12.64 4.69C12.67 4.73 12.7 4.77 12.73 4.8C12.73 5.06 12.73 5.32 12.73 5.58C12.72 5.73 12.75 5.85 12.83 5.96C12.9 6.05 13 6.14 13.02 6.25C13.07 6.48 13.2 6.69 13.19 6.94C13.27 6.98 13.36 6.99 13.39 7.05C13.45 7.16 13.55 7.22 13.62 7.31C13.71 7.41 13.82 7.5 13.92 7.58C14.03 7.79 14.19 7.94 14.34 8.12C14.49 8.3 14.65 8.46 14.8 8.61C14.93 8.64 15.04 8.67 15.17 8.7C15.24 8.76 15.31 8.85 15.39 8.9C15.5 8.95 15.54 9.07 15.59 9.16C15.65 9.27 15.73 9.34 15.82 9.4C15.83 9.59 15.92 9.74 16.03 9.88C16.05 9.96 16.05 10.08 16.05 10.2L16.05 10.2Z"
}));
var close = /*#__PURE__*/createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor"
}, /*#__PURE__*/createElement("path", {
  d: "M15.7143 5.71429L11.4286 10L15.7143 14.2857L14.2857 15.7143L10 11.4286L5.71429 15.7143L4.28571 14.2857L8.57143 10L4.28571 5.71429L5.71429 4.28571L10 8.57143L14.2857 4.28571L15.7143 5.71429Z"
}));
var add = /*#__PURE__*/createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor"
}, /*#__PURE__*/createElement("path", {
  d: "M17 11.5H11.5V17H8.5V11.5H3V8.5H8.5V3H11.5V8.5H17V11.5Z"
}));
var chevron_down = /*#__PURE__*/createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor"
}, /*#__PURE__*/createElement("path", {
  fillRule: "evenodd",
  clipRule: "evenodd",
  d: "M0.292892 6.20711L2.5 4L10 11.5L17.5 4L19.7071 6.20711L10 15.9142L0.292892 6.20711Z"
}));
var chevron_up = /*#__PURE__*/createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor"
}, /*#__PURE__*/createElement("path", {
  fillRule: "evenodd",
  clipRule: "evenodd",
  d: "M0 13.7263L2.2737 16L10 8.2737L17.7263 16L20 13.7263L10 3.7263L0 13.7263Z"
}));
var arrow_down = /*#__PURE__*/createElement("svg", {
  width: 10,
  height: 6,
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, /*#__PURE__*/createElement("path", {
  fillRule: "evenodd",
  clipRule: "evenodd",
  d: "M.146 1.483L1.25.6 5 3.6l3.75-3 1.104.883L5 5.366.146 1.483z",
  fill: "#858585"
}));
var calendar = /*#__PURE__*/createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor"
}, /*#__PURE__*/createElement("path", {
  d: "M7.5 9.16666H5.83333V10.8333H7.5V9.16666ZM10.8333 9.16666H9.16667V10.8333H10.8333V9.16666ZM14.1667 9.16666H12.5V10.8333H14.1667V9.16666ZM15.8333 3.33333H15V1.66666H13.3333V3.33333H6.66667V1.66666H5L5 3.33333H4.16667C3.24167 3.33333 2.50833 4.08333 2.50833 5L2.5 16.6667C2.5 17.5833 3.24167 18.3333 4.16667 18.3333H15.8333C16.75 18.3333 17.5 17.5833 17.5 16.6667V5C17.5 4.08333 16.75 3.33333 15.8333 3.33333ZM15.8333 16.6667H4.16667V7.5H15.8333V16.6667Z"
}), /*#__PURE__*/createElement("path", {
  d: "M7.5 12.9167H5.83333V14.5833H7.5V12.9167ZM10.8333 12.9167H9.16667V14.5833H10.8333V12.9167ZM14.1667 12.9167H12.5V14.5833H14.1667V12.9167Z"
}));
var block = /*#__PURE__*/createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor"
}, /*#__PURE__*/createElement("path", {
  fillRule: "evenodd",
  clipRule: "evenodd",
  d: "M16 10C16 13.3137 13.3137 16 10 16C8.77379 16 7.63349 15.6322 6.68343 15.0008L15.0008 6.68343C15.6322 7.63349 16 8.77379 16 10ZM5.22378 13.632L13.632 5.22378C12.6238 4.45591 11.3651 4 10 4C6.68629 4 4 6.68629 4 10C4 11.3651 4.45591 12.6238 5.22378 13.632ZM18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10Z"
}));
var edit = /*#__PURE__*/createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor"
}, /*#__PURE__*/createElement("path", {
  d: "M12.7888 4.6621L15.3384 7.21167C16.4136 6.1119 16.4538 5.14014 15.6571 4.3434C14.8604 3.54666 13.9584 3.45508 12.7888 4.6621Z"
}), /*#__PURE__*/createElement("path", {
  fillRule: "evenodd",
  clipRule: "evenodd",
  d: "M11.8328 5.61819L14.3823 8.16775L7.21166 15.3384L4.3434 15.6571L4.6621 12.7888L11.8328 5.61819ZM12.9482 8.00841L11.9921 7.05232L5.93688 13.1075L6.89297 14.0636L12.9482 8.00841Z"
}), /*#__PURE__*/createElement("path", {
  d: "M12.7888 4.6621L15.3384 7.21167C16.4136 6.1119 16.4538 5.14014 15.6571 4.3434C14.8604 3.54666 13.9584 3.45508 12.7888 4.6621Z"
}), /*#__PURE__*/createElement("path", {
  fillRule: "evenodd",
  clipRule: "evenodd",
  d: "M11.8328 5.61819L14.3823 8.16775L7.21166 15.3384L4.3434 15.6571L4.6621 12.7888L11.8328 5.61819ZM12.9482 8.00841L11.9921 7.05232L5.93688 13.1075L6.89297 14.0636L12.9482 8.00841Z"
}));
var checkmark = /*#__PURE__*/createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor"
}, /*#__PURE__*/createElement("path", {
  fillRule: "evenodd",
  clipRule: "evenodd",
  d: "M15.115 5.64007C15.5505 5.97974 15.6282 6.60813 15.2885 7.0436L9.71707 14.1865C9.54081 14.4124 9.27607 14.5519 8.99002 14.5695C8.70397 14.5872 8.42411 14.4812 8.22146 14.2785L4.79289 10.85C4.40237 10.4594 4.40237 9.82628 4.79289 9.43575C5.18342 9.04523 5.81658 9.04523 6.20711 9.43575L8.8358 12.0644L13.7115 5.81354C14.0512 5.37806 14.6796 5.3004 15.115 5.64007Z"
}));
var checkmark_circle = /*#__PURE__*/createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor"
}, /*#__PURE__*/createElement("path", {
  fillRule: "evenodd",
  clipRule: "evenodd",
  d: "M15.115 5.64007C15.5505 5.97974 15.6282 6.60813 15.2885 7.0436L9.71707 14.1865C9.54081 14.4124 9.27607 14.5519 8.99002 14.5695C8.70397 14.5872 8.42411 14.4812 8.22146 14.2785L4.79289 10.85C4.40237 10.4594 4.40237 9.82628 4.79289 9.43575C5.18342 9.04523 5.81658 9.04523 6.20711 9.43575L8.8358 12.0644L13.7115 5.81354C14.0512 5.37806 14.6796 5.3004 15.115 5.64007Z"
}), /*#__PURE__*/createElement("path", {
  fillRule: "evenodd",
  clipRule: "evenodd",
  d: "M10.5 2.75C6.77208 2.75 3.75 5.77208 3.75 9.5C3.75 13.2279 6.77208 16.25 10.5 16.25C14.2279 16.25 17.25 13.2279 17.25 9.5C17.25 5.77208 14.2279 2.75 10.5 2.75ZM2.25 9.5C2.25 4.94365 5.94365 1.25 10.5 1.25C15.0563 1.25 18.75 4.94365 18.75 9.5C18.75 14.0563 15.0563 17.75 10.5 17.75C5.94365 17.75 2.25 14.0563 2.25 9.5Z"
}));
var actions = /*#__PURE__*/createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor"
}, /*#__PURE__*/createElement("path", {
  fillRule: "evenodd",
  clipRule: "evenodd",
  d: "M6 9.5C6 10.3284 5.32843 11 4.5 11C3.67157 11 3 10.3284 3 9.5C3 8.67157 3.67157 8 4.5 8C5.32843 8 6 8.67157 6 9.5ZM11 9.5C11 10.3284 10.3284 11 9.5 11C8.67157 11 8 10.3284 8 9.5C8 8.67157 8.67157 8 9.5 8C10.3284 8 11 8.67157 11 9.5ZM14.5 11C15.3284 11 16 10.3284 16 9.5C16 8.67157 15.3284 8 14.5 8C13.6716 8 13 8.67157 13 9.5C13 10.3284 13.6716 11 14.5 11Z"
}));
var chevron_left = /*#__PURE__*/createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor"
}, /*#__PURE__*/createElement("path", {
  fillRule: "evenodd",
  clipRule: "evenodd",
  d: "M13.3598 17.4349L14.6402 15.8984L7.56205 10L14.6402 4.10155L13.3598 2.56511L4.43795 10L13.3598 17.4349Z"
}));
var chevron_right = /*#__PURE__*/createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor"
}, /*#__PURE__*/createElement("path", {
  fillRule: "evenodd",
  clipRule: "evenodd",
  d: "M6.64019 17.4349L5.35982 15.8984L12.438 10L5.35982 4.10155L6.64019 2.56511L15.5621 10L6.64019 17.4349Z"
}));
var mail = /*#__PURE__*/createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor"
}, /*#__PURE__*/createElement("path", {
  fillRule: "evenodd",
  clipRule: "evenodd",
  d: "M10 1.87263L12.2514 3.57895H16.3333V6.75021L18 8.19252V18H2V8.19252L3.66667 6.75021V3.57895H7.7486L10 1.87263ZM9.40418 3.57895H10.5958L10 3.12738L9.40418 3.57895ZM3.66667 8.07267L3.2618 8.42303L3.66667 8.77708V8.07267ZM4.66667 9.65157L8.10445 12.6579H11.8955L15.3333 9.65157V4.57895H4.66667V9.65157ZM16.3333 8.77708L16.7382 8.42303L16.3333 8.07267V8.77708ZM17 9.52252L12.8619 13.1412L17 16.4584V9.52252ZM16.0769 17L11.9077 13.6579H8.09233L3.92314 17H16.0769ZM3 16.4584V9.52252L7.13806 13.1412L3 16.4584ZM13.75 5.94737V6.94737H6.25V5.94737H13.75ZM6.25 8.52632V7.52632H13.75V8.52632H6.25ZM13.75 9.10527V10.1053H6.25V9.10527H13.75Z"
}));
var action = /*#__PURE__*/createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor"
}, /*#__PURE__*/createElement("path", {
  d: "M11.5 1L11 8H15L8.5 19L9 11.5H5L11.5 1Z"
}));
var arrow_dropdown = /*#__PURE__*/createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "-3 -6 20 20",
  fill: "currentColor"
}, /*#__PURE__*/createElement("path", {
  d: "M.5.5h13L7 7.5.5.5z"
}));
var help = /*#__PURE__*/createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor"
}, /*#__PURE__*/createElement("path", {
  d: "M9.1 15.4H10.9V13.6H9.1V15.4ZM10 1C5.032 1 1 5.032 1 10C1 14.968 5.032 19 10 19C14.968 19 19 14.968 19 10C19 5.032 14.968 1 10 1ZM10 17.2C6.031 17.2 2.8 13.969 2.8 10C2.8 6.031 6.031 2.8 10 2.8C13.969 2.8 17.2 6.031 17.2 10C17.2 13.969 13.969 17.2 10 17.2ZM10 4.6C8.011 4.6 6.4 6.211 6.4 8.2H8.2C8.2 7.21 9.01 6.4 10 6.4C10.99 6.4 11.8 7.21 11.8 8.2C11.8 10 9.1 9.775 9.1 12.7H10.9C10.9 10.675 13.6 10.45 13.6 8.2C13.6 6.211 11.989 4.6 10 4.6Z"
}));
var loading = /*#__PURE__*/createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor"
}, /*#__PURE__*/createElement("path", {
  d: "M10 1C11.78 1 13.5201 1.52784 15.0001 2.51677C16.4802 3.50571 17.6337 4.91131 18.3149 6.55585C18.9961 8.20038 19.1743 10.01 18.8271 11.7558C18.4798 13.5016 17.6226 15.1053 16.364 16.364C15.1053 17.6226 13.5016 18.4798 11.7558 18.8271C10.01 19.1743 8.20039 18.9961 6.55585 18.3149C4.91132 17.6337 3.50571 16.4802 2.51678 15.0001C1.52784 13.5201 1 11.78 1 10L4.05828 10C4.05828 11.1752 4.40676 12.3239 5.05964 13.301C5.71253 14.2782 6.6405 15.0397 7.72621 15.4894C8.81191 15.9391 10.0066 16.0568 11.1592 15.8275C12.3118 15.5983 13.3705 15.0324 14.2014 14.2014C15.0324 13.3705 15.5983 12.3118 15.8276 11.1592C16.0568 10.0066 15.9391 8.81191 15.4894 7.7262C15.0397 6.64049 14.2782 5.71253 13.301 5.05964C12.3239 4.40676 11.1752 4.05828 10 4.05828V1Z"
}));
var gift = /*#__PURE__*/createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor"
}, /*#__PURE__*/createElement("path", {
  fillRule: "evenodd",
  clipRule: "evenodd",
  d: "M13.0013 3.54434C13.483 3.18548 13.9087 3.17853 14.1522 3.29163C14.3661 3.39091 14.6755 3.69684 14.6755 4.52787C14.6755 5.14692 14.2496 5.62574 13.6107 5.99945C13.306 6.1777 12.9947 6.30502 12.7559 6.38801C12.6377 6.42906 12.5404 6.45817 12.4747 6.47655L12.4383 6.48653L11.0813 6.56611C11.6928 4.89337 12.1013 4.21474 13.0013 3.54434ZM11.5 8.1308V9.80075H14.9947L15.2685 9.80075L15.7447 9.80075H16.2713V8.1308H11.5ZM8.50001 9.80075H5.00532L4.73155 9.80075L4.25532 9.80075H3.72873V8.1308H8.50001V9.80075ZM8.50001 11.3007V16.7746H5.00532V11.3007H8.50001ZM11.5 16.7746V11.3007H14.9947V16.7746H11.5ZM16.1755 4.52787C16.1755 5.44445 15.7589 6.13236 15.2496 6.6308H17.0213H17.7713V7.3808V10.5508V11.3008H17.0213H16.4947V17.5246V18.2746H15.7447H4.25532H3.50532V17.5246V11.3008H2.97873H2.22873V10.5508V7.3808V6.6308H2.97873H5.61594C4.90803 6.21424 4.14362 5.49588 4.14362 4.33262C4.14362 3.199 4.62092 2.30117 5.48903 1.91365C6.31861 1.54333 7.27645 1.74639 8.0337 2.28872C9.04474 3.01282 9.57295 3.80374 10.0813 5.00882C10.5806 3.8562 11.1278 3.06953 12.1051 2.34143C12.9 1.7493 13.9105 1.52557 14.7839 1.93113C15.6871 2.3505 16.1755 3.31257 16.1755 4.52787ZM6.10047 3.28337C6.32221 3.18439 6.71605 3.19005 7.1603 3.50822C7.9527 4.07573 8.33303 4.64467 8.86116 5.99498L7.87365 5.85486L7.87198 5.8546L7.85597 5.85203C7.84042 5.84946 7.81544 5.84516 7.78239 5.83888C7.71612 5.82631 7.61838 5.80601 7.49987 5.77624C7.25987 5.71596 6.94926 5.62045 6.64662 5.4794C5.99243 5.17452 5.64362 4.79682 5.64362 4.33262C5.64362 3.61464 5.91727 3.36515 6.10047 3.28337Z"
}));
var copy = /*#__PURE__*/createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor"
}, /*#__PURE__*/createElement("path", {
  d: "M4.5 6C4.5 4.89543 5.39543 4 6.5 4H10.5C11.6046 4 12.5 4.89543 12.5 6V11C12.5 12.1046 11.6046 13 10.5 13H6.5C5.39543 13 4.5 12.1046 4.5 11V6Z",
  fill: "white"
}), /*#__PURE__*/createElement("path", {
  fillRule: "evenodd",
  clipRule: "evenodd",
  d: "M10.5 5.2H6.5C6.05817 5.2 5.7 5.55817 5.7 6V11C5.7 11.4418 6.05817 11.8 6.5 11.8H10.5C10.9418 11.8 11.3 11.4418 11.3 11V6C11.3 5.55817 10.9418 5.2 10.5 5.2ZM6.5 4C5.39543 4 4.5 4.89543 4.5 6V11C4.5 12.1046 5.39543 13 6.5 13H10.5C11.6046 13 12.5 12.1046 12.5 11V6C12.5 4.89543 11.6046 4 10.5 4H6.5Z"
}), /*#__PURE__*/createElement("g", {
  filter: "url(#filter0_d)"
}, /*#__PURE__*/createElement("path", {
  d: "M7.5 9C7.5 7.89543 8.39543 7 9.5 7H13.5C14.6046 7 15.5 7.89543 15.5 9V14C15.5 15.1046 14.6046 16 13.5 16H9.5C8.39543 16 7.5 15.1046 7.5 14V9Z",
  fill: "white"
})), /*#__PURE__*/createElement("g", {
  filter: "url(#filter1_d)"
}, /*#__PURE__*/createElement("path", {
  fillRule: "evenodd",
  clipRule: "evenodd",
  d: "M13.5 8.2H9.5C9.05817 8.2 8.7 8.55817 8.7 9V14C8.7 14.4418 9.05817 14.8 9.5 14.8H13.5C13.9418 14.8 14.3 14.4418 14.3 14V9C14.3 8.55817 13.9418 8.2 13.5 8.2ZM9.5 7C8.39543 7 7.5 7.89543 7.5 9V14C7.5 15.1046 8.39543 16 9.5 16H13.5C14.6046 16 15.5 15.1046 15.5 14V9C15.5 7.89543 14.6046 7 13.5 7H9.5Z"
})), /*#__PURE__*/createElement("defs", null, /*#__PURE__*/createElement("filter", {
  id: "filter0_d",
  x: "6.5",
  y: "6",
  width: "9",
  height: "10",
  filterUnits: "userSpaceOnUse",
  colorInterpolationFilters: "sRGB"
}, /*#__PURE__*/createElement("feFlood", {
  floodOpacity: "0",
  result: "BackgroundImageFix"
}), /*#__PURE__*/createElement("feColorMatrix", {
  "in": "SourceAlpha",
  type: "matrix",
  values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0",
  result: "hardAlpha"
}), /*#__PURE__*/createElement("feOffset", {
  dx: "-1",
  dy: "-1"
}), /*#__PURE__*/createElement("feComposite", {
  in2: "hardAlpha",
  operator: "out"
}), /*#__PURE__*/createElement("feColorMatrix", {
  type: "matrix",
  values: "0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"
}), /*#__PURE__*/createElement("feBlend", {
  mode: "normal",
  in2: "BackgroundImageFix",
  result: "effect1_dropShadow"
}), /*#__PURE__*/createElement("feBlend", {
  mode: "normal",
  "in": "SourceGraphic",
  in2: "effect1_dropShadow",
  result: "shape"
})), /*#__PURE__*/createElement("filter", {
  id: "filter1_d",
  x: "6.5",
  y: "6",
  width: "9",
  height: "10",
  filterUnits: "userSpaceOnUse",
  colorInterpolationFilters: "sRGB"
}, /*#__PURE__*/createElement("feFlood", {
  floodOpacity: "0",
  result: "BackgroundImageFix"
}), /*#__PURE__*/createElement("feColorMatrix", {
  "in": "SourceAlpha",
  type: "matrix",
  values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0",
  result: "hardAlpha"
}), /*#__PURE__*/createElement("feOffset", {
  dx: "-1",
  dy: "-1"
}), /*#__PURE__*/createElement("feComposite", {
  in2: "hardAlpha",
  operator: "out"
}), /*#__PURE__*/createElement("feColorMatrix", {
  type: "matrix",
  values: "0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"
}), /*#__PURE__*/createElement("feBlend", {
  mode: "normal",
  in2: "BackgroundImageFix",
  result: "effect1_dropShadow"
}), /*#__PURE__*/createElement("feBlend", {
  mode: "normal",
  "in": "SourceGraphic",
  in2: "effect1_dropShadow",
  result: "shape"
}))));
var alert = /*#__PURE__*/createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor"
}, /*#__PURE__*/createElement("path", {
  d: "M9.1 12.7H10.9V14.5H9.1V12.7ZM9.1 5.5H10.9V10.9H9.1V5.5ZM9.991 1C5.023 1 1 5.032 1 10C1 14.968 5.023 19 9.991 19C14.968 19 19 14.968 19 10C19 5.032 14.968 1 9.991 1ZM10 17.2C6.022 17.2 2.8 13.978 2.8 10C2.8 6.022 6.022 2.8 10 2.8C13.978 2.8 17.2 6.022 17.2 10C17.2 13.978 13.978 17.2 10 17.2Z"
}));
var search = /*#__PURE__*/createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor"
}, /*#__PURE__*/createElement("path", {
  fillRule: "evenodd",
  clipRule: "evenodd",
  d: "M12.4368 14.2523C11.2327 15.1877 9.70753 15.7466 8.04847 15.7466C4.15571 15.7466 1 12.6693 1 8.87331C1 5.07729 4.15571 2 8.04847 2C11.9412 2 15.0969 5.07729 15.0969 8.87331C15.0969 10.2065 14.7077 11.4511 14.0339 12.5049L19 17.3475L17.3054 19L12.4368 14.2523ZM12.7005 8.87331C12.7005 11.3787 10.6177 13.4097 8.04847 13.4097C5.47924 13.4097 3.39648 11.3787 3.39648 8.87331C3.39648 6.36794 5.47924 4.33693 8.04847 4.33693C10.6177 4.33693 12.7005 6.36794 12.7005 8.87331Z"
}));
var filter = /*#__PURE__*/createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor"
}, /*#__PURE__*/createElement("path", {
  fillRule: "evenodd",
  clipRule: "evenodd",
  d: "M1.09105 1.57584C1.24975 1.22446 1.59014 1 1.9643 1H18.0357C18.4099 1 18.7502 1.22446 18.9089 1.57584C19.0677 1.92723 19.016 2.3421 18.7765 2.64018L12.5714 10.3621V18C12.5714 18.3603 12.3846 18.6927 12.0822 18.8702C11.7799 19.0477 11.4089 19.0429 11.111 18.8575L7.89674 16.8575C7.60629 16.6768 7.42857 16.3513 7.42857 16V10.3621L1.22351 2.64018C0.983981 2.3421 0.932349 1.92723 1.09105 1.57584ZM4.02308 3L9.13364 9.35982C9.27806 9.53953 9.35714 9.76606 9.35714 10V15.4338L10.6429 16.2338V10C10.6429 9.76606 10.7219 9.53953 10.8664 9.35982L15.9769 3H4.02308Z"
}));
var trash = /*#__PURE__*/createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor"
}, /*#__PURE__*/createElement("path", {
  fillRule: "evenodd",
  clipRule: "evenodd",
  d: "M10.0062 1L10.0195 1.00032C11.1598 1.02766 12.2369 1.17939 12.9702 1.93223C13.5511 2.52858 13.7903 3.37149 13.8646 4.39629H18V6.03265H16.3538V16.5455C16.3538 17.9011 15.2587 19 13.9077 19H6.09231C4.74133 19 3.64615 17.9011 3.64615 16.5455V6.03265H2V4.39629H6.13398C6.20369 3.39764 6.42785 2.55695 6.99072 1.9545C7.71754 1.17656 8.80295 1.01038 9.99299 1.00011L10.0062 1ZM7.77037 4.39629H12.228C12.1584 3.62569 11.9894 3.26637 11.804 3.07602C11.568 2.83373 11.1117 2.66458 9.99378 2.63653C8.85434 2.64775 8.40555 2.83271 8.18043 3.07366C7.99526 3.27185 7.83594 3.63859 7.77037 4.39629ZM5.27692 6.03265V16.5455C5.27692 16.9973 5.64198 17.3636 6.09231 17.3636H13.9077C14.358 17.3636 14.7231 16.9973 14.7231 16.5455V6.03265H5.27692Z"
}));
var info = /*#__PURE__*/createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor"
}, /*#__PURE__*/createElement("path", {
  fillRule: "evenodd",
  clipRule: "evenodd",
  d: "M10 19C14.9706 19 19 14.9706 19 10C19 5.02944 14.9706 1 10 1C5.02944 1 1 5.02944 1 10C1 14.9706 5.02944 19 10 19ZM11.6667 6C11.6667 6.92048 10.9205 7.66667 9.99999 7.66667C9.07951 7.66667 8.33332 6.92048 8.33332 6C8.33332 5.07953 9.07951 4.33333 9.99999 4.33333C10.9205 4.33333 11.6667 5.07953 11.6667 6ZM7.66667 8.66667V9.33334H8.33334C8.66667 9.33334 8.99946 9.62276 9 10.3333V14.3333C9 14.6667 8.66667 14.6667 8.33334 14.6667H7.66667V15.3333H13V14.6667H12.3333C12 14.6667 11.6667 14.6667 11.6667 14.3333V8.33334L7.66667 8.66667Z"
}));
var settings = /*#__PURE__*/createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor"
}, /*#__PURE__*/createElement("path", {
  fillRule: "evenodd",
  clipRule: "evenodd",
  d: "M8.04593 3.36044C8.03608 3.42609 8.05095 3.48904 8.08303 3.54061C7.62837 3.67395 7.19347 3.85351 6.78375 4.07385C6.76912 4.01697 6.73563 3.96431 6.68405 3.92618L4.94928 2.64397C4.84313 2.56551 4.69555 2.57651 4.60221 2.66985L2.66424 4.60782C2.57091 4.70116 2.5599 4.84873 2.63836 4.95488L3.92058 6.68965C3.95333 6.73396 3.9968 6.76492 4.04446 6.78204C3.81981 7.18849 3.63557 7.62038 3.49714 8.0723C3.45531 8.05589 3.4086 8.04982 3.36045 8.05704L1.22711 8.37704C1.09657 8.39662 1 8.50876 1 8.64076V11.3815C1 11.5135 1.09657 11.6256 1.22711 11.6452L3.36045 11.9652C3.39732 11.9707 3.43334 11.9684 3.46697 11.9597C3.59709 12.4096 3.77241 12.8402 3.9877 13.2464C3.96254 13.2631 3.93973 13.2844 3.92059 13.3103L2.63837 15.0451C2.55991 15.1513 2.57091 15.2988 2.66425 15.3922L4.60222 17.3301C4.69556 17.4235 4.84314 17.4345 4.94929 17.356L6.68406 16.0738C6.70155 16.0609 6.71697 16.0463 6.73027 16.0304C7.14375 16.2576 7.5834 16.443 8.04357 16.581C8.04224 16.6001 8.04295 16.6197 8.04593 16.6396L8.36593 18.7729C8.38551 18.9034 8.49765 19 8.62965 19H11.3704C11.5024 19 11.6145 18.9034 11.6341 18.7729L11.9541 16.6396C11.957 16.6197 11.9578 16.6001 11.9564 16.581C12.4166 16.443 12.8562 16.2576 13.2697 16.0304C13.283 16.0463 13.2984 16.0609 13.3159 16.0738L15.0507 17.356C15.1568 17.4345 15.3044 17.4235 15.3978 17.3301L17.3357 15.3922C17.4291 15.2988 17.4401 15.1513 17.3616 15.0451L16.0794 13.3103C16.0603 13.2845 16.0375 13.2631 16.0123 13.2464C16.2309 12.834 16.4083 12.3963 16.539 11.939C16.5709 11.9465 16.6049 11.9482 16.6396 11.943L18.7729 11.623C18.9034 11.6034 19 11.4912 19 11.3592V8.61855C19 8.48655 18.9034 8.37441 18.7729 8.35483L16.6396 8.03483C16.5891 8.02725 16.5401 8.0343 16.4968 8.05257C16.3591 7.6078 16.1769 7.18257 15.9555 6.78204C16.0032 6.76491 16.0467 6.73396 16.0794 6.68965L17.3616 4.95488C17.4401 4.84873 17.4291 4.70116 17.3357 4.60782L15.3978 2.66985C15.3044 2.57651 15.1569 2.56551 15.0507 2.64397L13.3159 3.92618C13.2644 3.96431 13.2309 4.01697 13.2162 4.07384C12.8065 3.8535 12.3716 3.67395 11.917 3.54061C11.9491 3.48904 11.9639 3.42609 11.9541 3.36044L11.6341 1.22711C11.6145 1.09657 11.5024 1 11.3704 1H8.62965C8.49765 1 8.38551 1.09657 8.36593 1.22711L8.04593 3.36044ZM10 13.1333C11.6937 13.1333 13.0667 11.7603 13.0667 10.0667C13.0667 8.37299 11.6937 7 10 7C8.30632 7 6.93333 8.37299 6.93333 10.0667C6.93333 11.7603 8.30632 13.1333 10 13.1333Z"
}));
var leftward_arrow = /*#__PURE__*/createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor"
}, /*#__PURE__*/createElement("path", {
  fillRule: "evenodd",
  clipRule: "evenodd",
  d: "M9.265 2.344a1.174 1.174 0 010 1.66L5.008 8.261h12.818a1.174 1.174 0 010 2.348H5.008l4.648 4.648a1.174 1.174 0 11-1.66 1.66l-6.652-6.652a1.174 1.174 0 010-1.66l6.26-6.261a1.174 1.174 0 011.66 0z"
}));
var avatar = /*#__PURE__*/createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 38 38",
  fill: "none"
}, /*#__PURE__*/createElement("mask", {
  id: "prefix__a",
  style: {
    maskType: "alpha"
  },
  maskUnits: "userSpaceOnUse",
  x: 3,
  y: 3,
  width: 32,
  height: 32
}, /*#__PURE__*/createElement("circle", {
  cx: 19,
  cy: 19,
  r: 16,
  fill: "#C4C4C4"
})), /*#__PURE__*/createElement("g", {
  mask: "url(#prefix__a)"
}, /*#__PURE__*/createElement("path", {
  fill: "url(#prefix__pattern0)",
  d: "M2 2h34v34H2z"
})), /*#__PURE__*/createElement("circle", {
  cx: 19,
  cy: 19,
  r: 16.5,
  stroke: "#003B45"
}), /*#__PURE__*/createElement("circle", {
  cx: 19,
  cy: 19,
  r: 18,
  stroke: "#E2E2E2",
  strokeWidth: 2
}), /*#__PURE__*/createElement("defs", null, /*#__PURE__*/createElement("pattern", {
  id: "prefix__pattern0",
  patternContentUnits: "objectBoundingBox",
  width: 1,
  height: 1
}, /*#__PURE__*/createElement("use", {
  xlinkHref: "#prefix__image0",
  transform: "scale(.00472)"
})), /*#__PURE__*/createElement("image", {
  id: "prefix__image0",
  width: 212,
  height: 212,
  xlinkHref: "data:image/png;base64,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"
})));
var visibility = /*#__PURE__*/createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "currentColor"
}, /*#__PURE__*/createElement("path", {
  d: "M0 0h24v24H0V0z",
  fill: "none"
}), /*#__PURE__*/createElement("path", {
  d: "M12 6c3.79 0 7.17 2.13 8.82 5.5C19.17 14.87 15.79 17 12 17s-7.17-2.13-8.82-5.5C4.83 8.13 8.21 6 12 6m0-2C7 4 2.73 7.11 1 11.5 2.73 15.89 7 19 12 19s9.27-3.11 11-7.5C21.27 7.11 17 4 12 4zm0 5c1.38 0 2.5 1.12 2.5 2.5S13.38 14 12 14s-2.5-1.12-2.5-2.5S10.62 9 12 9m0-2c-2.48 0-4.5 2.02-4.5 4.5S9.52 16 12 16s4.5-2.02 4.5-4.5S14.48 7 12 7z"
}));
var visibility_alt = /*#__PURE__*/createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 26 18",
  fill: "none"
}, /*#__PURE__*/createElement("path", {
  d: "M12.9993 0.25C7.16602 0.25 2.18435 3.87833 0.166016 9C2.18435 14.1217 7.16602 17.75 12.9993 17.75C18.8327 17.75 23.8143 14.1217 25.8327 9C23.8143 3.87833 18.8327 0.25 12.9993 0.25ZM12.9993 14.8333C9.77935 14.8333 7.16602 12.22 7.16602 9C7.16602 5.78 9.77935 3.16667 12.9993 3.16667C16.2193 3.16667 18.8327 5.78 18.8327 9C18.8327 12.22 16.2193 14.8333 12.9993 14.8333ZM12.9993 5.5C11.0627 5.5 9.49935 7.06333 9.49935 9C9.49935 10.9367 11.0627 12.5 12.9993 12.5C14.936 12.5 16.4993 10.9367 16.4993 9C16.4993 7.06333 14.936 5.5 12.9993 5.5Z",
  fill: "currentColor"
}));
var layers = /*#__PURE__*/createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 30 30",
  fill: "currentColor"
}, /*#__PURE__*/createElement("path", {
  d: "M5.96349 12.95L2.5 14.5333L14.9688 20.2333L27.4375 14.5333L23.974 12.95L14.9688 17.0667L5.96349 12.95Z",
  fill: "currentColor"
}), /*#__PURE__*/createElement("path", {
  d: "M5.96349 18.9667L2.5 20.55L14.9688 26.25L27.4375 20.55L23.974 18.9667L14.9688 23.0834L5.96349 18.9667Z",
  fill: "currentColor"
}), /*#__PURE__*/createElement("path", {
  d: "M14.9686 2.5L27.4371 8.1295L14.9686 13.759L2.5 8.1295L14.9686 2.5Z",
  fill: "currentColor"
}));
var layers_with_errors = /*#__PURE__*/createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 28 27",
  fill: "currentColor"
}, /*#__PURE__*/createElement("path", {
  d: "M4.77079 13.36L2 14.6266L11.975 19.1866L21.95 14.6266L19.1792 13.36L11.975 16.6533L4.77079 13.36Z",
  fill: "currentColor"
}), /*#__PURE__*/createElement("path", {
  d: "M4.77079 18.1734L2 19.44L11.975 24L21.95 19.44L19.1792 18.1734L11.975 21.4667L4.77079 18.1734Z",
  fill: "currentColor"
}), /*#__PURE__*/createElement("path", {
  d: "M11.9748 5L21.9497 9.5036L11.9748 14.0072L2 9.5036L11.9748 5Z",
  fill: "currentColor"
}), /*#__PURE__*/createElement("rect", {
  x: "15",
  width: "13",
  height: "13",
  rx: "6.5",
  fill: "white"
}), /*#__PURE__*/createElement("path", {
  fillRule: "evenodd",
  clipRule: "evenodd",
  d: "M21.4935 0C17.9055 0 15 2.912 15 6.5C15 10.088 17.9055 13 21.4935 13C25.088 13 28 10.088 28 6.5C28 2.912 25.088 0 21.4935 0ZM22.15 8.45H20.85V9.75H22.15V8.45ZM22.15 3.25H20.85V7.15H22.15V3.25Z",
  fill: "#C71D06"
}));
var double_chevron_left = /*#__PURE__*/createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "currentColor"
}, /*#__PURE__*/createElement("path", {
  d: "M9.5 5H12L7 12L12 19H9.5L4.5 12L9.5 5Z",
  fill: "#575757"
}), /*#__PURE__*/createElement("path", {
  d: "M16.5 5H19L14 12L19 19H16.5L11.5 12L16.5 5Z",
  fill: "#575757"
}));
var double_chevron_right = /*#__PURE__*/createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "currentColor"
}, /*#__PURE__*/createElement("path", {
  d: "M14.5 5H12L17 12L12 19H14.5L19.5 12L14.5 5Z",
  fill: "#575757"
}), /*#__PURE__*/createElement("path", {
  d: "M7.5 5H5L10 12L5 19H7.5L12.5 12L7.5 5Z",
  fill: "#575757"
}));
var undo = /*#__PURE__*/createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 28 28",
  fill: "none"
}, /*#__PURE__*/createElement("path", {
  d: "M14.5835 9.33341C11.4918 9.33341 8.69183 10.4884 6.5335 12.3667L2.3335 8.16675V18.6667H12.8335L8.61016 14.4434C10.2318 13.0901 12.2968 12.2501 14.5835 12.2501C18.7135 12.2501 22.2252 14.9451 23.4502 18.6667L26.2152 17.7568C24.5935 12.8684 20.0085 9.33341 14.5835 9.33341Z",
  fill: "currentColor"
}));
var redo = /*#__PURE__*/createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 28 28",
  fill: "none"
}, /*#__PURE__*/createElement("path", {
  d: "M21.4669 12.3665C19.3085 10.4882 16.5085 9.33317 13.4169 9.33317C7.99187 9.33317 3.40687 12.8682 1.79688 17.7565L4.55021 18.6665C5.77521 14.9448 9.27521 12.2498 13.4169 12.2498C15.6919 12.2498 17.7685 13.0898 19.3902 14.4432L15.1669 18.6665H25.6669V8.1665L21.4669 12.3665Z",
  fill: "currentColor"
}));
var outline = /*#__PURE__*/createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 28 28",
  fill: "none"
}, /*#__PURE__*/createElement("path", {
  d: "M3.5 5.83333V9.91667H5.83333V5.83333H9.91667V3.5H5.83333C4.55 3.5 3.5 4.55 3.5 5.83333ZM5.83333 18.0833H3.5V22.1667C3.5 23.45 4.55 24.5 5.83333 24.5H9.91667V22.1667H5.83333V18.0833ZM22.1667 22.1667H18.0833V24.5H22.1667C23.45 24.5 24.5 23.45 24.5 22.1667V18.0833H22.1667V22.1667ZM22.1667 3.5H18.0833V5.83333H22.1667V9.91667H24.5V5.83333C24.5 4.55 23.45 3.5 22.1667 3.5Z",
  fill: "currentColor"
}), /*#__PURE__*/createElement("path", {
  d: "M5.83333 11.6667H3.5V16.3333H5.83333V11.6667Z",
  fill: "currentColor"
}), /*#__PURE__*/createElement("path", {
  d: "M11.6667 5.83333H16.3333V3.5H11.6667V5.83333Z",
  fill: "currentColor"
}), /*#__PURE__*/createElement("path", {
  d: "M22.1667 11.6667H24.5V16.3333H22.1667V11.6667Z",
  fill: "currentColor"
}), /*#__PURE__*/createElement("path", {
  d: "M16.3333 22.1667H11.6667V24.5H16.3333V22.1667Z",
  fill: "currentColor"
}));
var outline_cancelled = /*#__PURE__*/createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 28 28",
  fill: "none"
}, /*#__PURE__*/createElement("path", {
  fillRule: "evenodd",
  clipRule: "evenodd",
  d: "M24.5 21.9191V18.0833H22.1667V19.5858L24.5 21.9191ZM8.41421 5.83333H9.91667V3.5H6.08088L8.41421 5.83333ZM4.06623 4.31378L5.83333 6.08088V9.91667H3.5V5.83333C3.5 5.25431 3.71375 4.72279 4.06623 4.31378ZM21.9191 22.1667L23.6862 23.9338C23.2772 24.2863 22.7457 24.5 22.1667 24.5H18.0833V22.1667H21.9191ZM5.83333 18.0833H3.5V22.1667C3.5 23.45 4.55 24.5 5.83333 24.5H9.91667V22.1667H5.83333V18.0833ZM22.1667 3.5H18.0833V5.83333H22.1667V9.91667H24.5V5.83333C24.5 4.55 23.45 3.5 22.1667 3.5ZM5.83333 11.6667H3.5V16.3333H5.83333V11.6667ZM16.3333 5.83333H11.6667V3.5H16.3333V5.83333ZM22.1667 11.6667H24.5V16.3333H22.1667V11.6667ZM11.6667 22.1667H16.3333V24.5H11.6667V22.1667Z",
  fill: "currentColor"
}), /*#__PURE__*/createElement("path", {
  d: "M1.16797 2.33331L25.668 26.8333",
  stroke: "currentColor",
  strokeWidth: "2"
}));
var code = /*#__PURE__*/createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 28 28",
  fill: "none"
}, /*#__PURE__*/createElement("g", {
  clipPath: "url(#clip0_1346_20808)"
}, /*#__PURE__*/createElement("path", {
  d: "M10.6916 21.1271L4.83707 15.2726L10.6916 9.41805L8.9098 7.63623L1.27344 15.2726L8.9098 22.909L10.6916 21.1271ZM17.3098 21.1271L23.1643 15.2726L17.3098 9.41805L19.0916 7.63623L26.728 15.2726L19.0916 22.909L17.3098 21.1271V21.1271Z",
  fill: "currentColor"
})), /*#__PURE__*/createElement("defs", null, /*#__PURE__*/createElement("clipPath", {
  id: "clip0_1346_20808"
}, /*#__PURE__*/createElement("rect", {
  width: "28",
  height: "28",
  fill: "white"
}))));
var visibility_cancelled = /*#__PURE__*/createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 28 28",
  fill: "none"
}, /*#__PURE__*/createElement("path", {
  fillRule: "evenodd",
  clipRule: "evenodd",
  d: "M22.4398 19.8596C24.3845 18.349 25.9149 16.3289 26.8327 14C24.8143 8.87833 19.8327 5.25 13.9993 5.25C12.172 5.25 10.4281 5.60607 8.83281 6.25258L11.3716 8.79133C12.1614 8.3918 13.0542 8.16667 13.9993 8.16667C17.2193 8.16667 19.8327 10.78 19.8327 14C19.8327 14.9451 19.6075 15.8379 19.208 16.6278L22.4398 19.8596ZM17.4027 14.8224C17.4659 14.5588 17.4993 14.2834 17.4993 14C17.4993 12.0633 15.936 10.5 13.9993 10.5C13.716 10.5 13.4406 10.5335 13.1769 10.5967L17.4027 14.8224ZM11.4024 11.6506L16.3487 16.5969C15.7282 17.1585 14.9045 17.5 13.9993 17.5C12.0627 17.5 10.4993 15.9367 10.4993 14C10.4993 13.0948 10.8409 12.2712 11.4024 11.6506ZM9.75325 10.0015C8.76928 11.0459 8.16602 12.4529 8.16602 14C8.16602 17.22 10.7793 19.8333 13.9993 19.8333C15.5464 19.8333 16.9535 19.2301 17.9979 18.2461L20.7407 20.9889C18.748 22.1103 16.4487 22.75 13.9993 22.75C8.16602 22.75 3.18435 19.1217 1.16602 14C2.29208 11.1425 4.34054 8.74991 6.94468 7.19288L9.75325 10.0015Z",
  fill: "currentColor"
}), /*#__PURE__*/createElement("path", {
  d: "M1.16602 2.33331L25.666 26.8333",
  stroke: "currentColor",
  strokeWidth: "2"
}));
var duplicate = /*#__PURE__*/createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "none"
}, /*#__PURE__*/createElement("path", {
  fillRule: "evenodd",
  clipRule: "evenodd",
  d: "M4.58125 1.81836C3.05427 1.81836 1.81641 3.05622 1.81641 4.5832V12.4828C1.81641 13.5515 2.29261 14.3613 3.18004 14.8215V13.6365V5.73699C3.18004 4.21001 4.20806 3.182 5.73504 3.182H13.6346H14.9057C14.4454 2.29456 13.5495 1.81836 12.4808 1.81836H4.58125ZM4.75081 7.31305C4.75081 5.45472 5.73504 4.54821 7.51565 4.54821H15.4152C17.271 4.54821 18.18 5.73699 18.18 7.31305V15.2126C18.18 17.0456 17.271 17.9774 15.4152 17.9774H7.51565C5.67729 17.9774 4.75081 17.08 4.75081 15.2126V7.31305ZM11.4703 7.70808C11.852 7.70808 12.1615 8.01755 12.1615 8.39929V10.4926H14.3308C14.7125 10.4926 15.022 10.8021 15.022 11.1838C15.022 11.5656 14.7125 11.875 14.3308 11.875H12.1615V14.1265C12.1615 14.5082 11.852 14.8177 11.4703 14.8177C11.0885 14.8177 10.7791 14.5082 10.7791 14.1265V11.875H8.60361C8.22187 11.875 7.9124 11.5656 7.9124 11.1838C7.9124 10.8021 8.22187 10.4926 8.60361 10.4926L10.7791 10.4926V8.39929C10.7791 8.01755 11.0885 7.70808 11.4703 7.70808Z",
  fill: "currentColor"
}));
var move = /*#__PURE__*/createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "none"
}, /*#__PURE__*/createElement("path", {
  d: "M8.33203 7.50016H11.6654V5.00016H14.1654L9.9987 0.833496L5.83203 5.00016H8.33203V7.50016ZM7.4987 8.3335H4.9987V5.8335L0.832031 10.0002L4.9987 14.1668V11.6668H7.4987V8.3335ZM19.1654 10.0002L14.9987 5.8335V8.3335H12.4987V11.6668H14.9987V14.1668L19.1654 10.0002ZM11.6654 12.5002H8.33203V15.0002H5.83203L9.9987 19.1668L14.1654 15.0002H11.6654V12.5002Z",
  fill: "currentColor"
}));
var empty_package_logo = /*#__PURE__*/createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 37 36",
  fill: "none"
}, /*#__PURE__*/createElement("path", {
  d: "M31.351 6.79476V8.02359H32.5799H35.3932V33.8614H1.47102V8.02359H4.2844H5.51323V6.79476V4.77365C5.51323 4.0275 5.80964 3.31191 6.33725 2.7843C6.86486 2.25669 7.58045 1.96028 8.32661 1.96028H12.3688C13.115 1.96028 13.8306 2.25669 14.3582 2.7843C14.8858 3.31191 15.1822 4.0275 15.1822 4.77365V6.79476V8.02359H16.411H20.4532H21.6821V6.79476V4.77365C21.6821 4.0275 21.9785 3.31191 22.5061 2.7843C23.0337 2.25669 23.7493 1.96028 24.4954 1.96028H28.5377C29.2838 1.96028 29.9994 2.25669 30.527 2.7843C31.0546 3.31191 31.351 4.0275 31.351 4.77365V6.79476Z",
  fill: "white",
  stroke: "currentColor",
  strokeWidth: "2.45766"
}));
var vanilla_package_logo = /*#__PURE__*/createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "38",
  height: "36",
  viewBox: "0 0 38 36",
  fill: "none"
}, /*#__PURE__*/createElement("g", {
  clipPath: "url(#clip0_1389_84932)"
}, /*#__PURE__*/createElement("path", {
  d: "M32.2202 6.30562V7.53446H33.449H36.2624V33.3723H2.34016V7.53446H5.15354H6.38237V6.30562V4.28452C6.38237 3.53836 6.67878 2.82277 7.20639 2.29516C7.734 1.76755 8.44959 1.47114 9.19575 1.47114H13.238C13.9841 1.47114 14.6997 1.76755 15.2273 2.29516C15.7549 2.82277 16.0513 3.53837 16.0513 4.28452V6.30562V7.53446H17.2802H21.3224H22.5512V6.30562V4.28452C22.5512 3.53836 22.8476 2.82277 23.3752 2.29516C23.9028 1.76755 24.6184 1.47114 25.3646 1.47114H29.4068C30.1529 1.47114 30.8685 1.76755 31.3962 2.29516C31.9238 2.82277 32.2202 3.53837 32.2202 4.28452V6.30562Z",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2.45766"
}), /*#__PURE__*/createElement("g", {
  clipPath: "url(#clip1_1389_84932)"
}, /*#__PURE__*/createElement("path", {
  fillRule: "evenodd",
  clipRule: "evenodd",
  d: "M15.0508 21.7739L19.359 29.7516L23.5685 21.7739H15.0508Z",
  fill: "#439B76"
}), /*#__PURE__*/createElement("path", {
  fillRule: "evenodd",
  clipRule: "evenodd",
  d: "M15.0474 20.7886C14.4189 20.7539 13.8275 20.4796 13.3947 20.0222C12.962 19.5647 12.7208 18.9589 12.7207 18.329C12.721 17.7431 12.9295 17.1765 13.3091 16.7304C13.6887 16.2843 14.2146 15.9879 14.7926 15.8941C14.9817 13.5744 16.9302 11.7483 19.2981 11.7483C21.6659 11.7483 23.6145 13.5744 23.8036 15.8941C24.3816 15.9879 24.9074 16.2843 25.287 16.7304C25.6666 17.1765 25.8752 17.7431 25.8754 18.329C25.8754 19.6369 24.8559 20.7145 23.5651 20.7886L18.9135 20.7805L15.0474 20.7886Z",
  fill: "#65BD60"
}))), /*#__PURE__*/createElement("defs", null, /*#__PURE__*/createElement("clipPath", {
  id: "clip0_1389_84932"
}, /*#__PURE__*/createElement("rect", {
  width: "36.865",
  height: "35.0217",
  fill: "currentColor",
  transform: "translate(0.865234)"
})), /*#__PURE__*/createElement("clipPath", {
  id: "clip1_1389_84932"
}, /*#__PURE__*/createElement("rect", {
  width: "13.1755",
  height: "18.3593",
  fill: "white",
  transform: "translate(12.6992 11.5756)"
}))));
var mint_package_logo = /*#__PURE__*/createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 37 36",
  fill: "none"
}, /*#__PURE__*/createElement("g", {
  clipPath: "url(#clip0_1419_47343)"
}, /*#__PURE__*/createElement("path", {
  d: "M31.351 6.79476V8.02359H32.5799H35.3932V33.8614H1.47102V8.02359H4.2844H5.51323V6.79476V4.77365C5.51323 4.0275 5.80964 3.31191 6.33725 2.7843C6.86486 2.25669 7.58045 1.96028 8.32661 1.96028H12.3688C13.115 1.96028 13.8306 2.25669 14.3582 2.7843C14.8858 3.31191 15.1822 4.0275 15.1822 4.77365V6.79476V8.02359H16.411H20.4532H21.6821V6.79476V4.77365C21.6821 4.0275 21.9785 3.31191 22.5061 2.7843C23.0337 2.25669 23.7493 1.96028 24.4954 1.96028H28.5377C29.2838 1.96028 29.9994 2.25669 30.527 2.7843C31.0546 3.31191 31.351 4.0275 31.351 4.77365V6.79476Z",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2.45766"
}), /*#__PURE__*/createElement("path", {
  d: "M26.4559 15.26C24.672 13.9082 21.9261 13.1008 19.11 13.1008C15.6278 13.1008 12.7901 14.3165 11.3259 16.4365C10.6381 17.4316 10.2576 18.6112 10.1947 19.9404C10.139 21.1241 10.338 22.4337 10.7855 23.8423C12.3137 19.2598 16.5827 15.6725 21.5043 15.6725C21.5043 15.6725 16.8992 16.8841 14.0038 20.6385C13.3431 21.4898 12.8128 22.4347 12.4302 23.4422C11.6125 25.3896 11.1918 27.4808 11.1928 29.593H13.2551C13.2551 29.593 12.9417 27.6235 13.4861 25.3591C14.2913 25.474 15.1032 25.5349 15.9165 25.5416C17.8128 25.5416 19.1605 25.1312 20.1597 24.2506C21.0548 23.4618 21.5487 22.4007 22.0715 21.2788C22.8696 19.564 23.7739 17.6213 26.4002 16.121C26.4743 16.0787 26.5368 16.0188 26.582 15.9464C26.6272 15.8741 26.6538 15.7916 26.6593 15.7065C26.6648 15.6214 26.6491 15.5362 26.6136 15.4587C26.5781 15.3811 26.5239 15.3135 26.4559 15.2621V15.26Z",
  fill: "#439B76"
}), /*#__PURE__*/createElement("path", {
  d: "M26.4564 15.2601C25.5357 14.5925 21.5049 15.6725 21.5049 15.6725C21.5049 15.6725 16.8997 16.8841 14.0043 20.6385C13.3436 21.4899 12.8133 22.4348 12.4307 23.4422C11.613 25.3897 11.1923 27.4809 11.1934 29.5931H13.2557C13.2557 29.5931 12.9422 27.6236 13.4866 25.3592C14.2918 25.474 15.1038 25.535 15.9171 25.5417C17.8133 25.5417 19.1611 25.1313 20.1602 24.2507C21.0553 23.4618 21.5492 22.4008 22.072 21.2789C22.8701 19.5641 23.7744 17.6214 26.4008 16.1211C26.4749 16.0788 26.5373 16.0188 26.5825 15.9465C26.6277 15.8741 26.6543 15.7917 26.6598 15.7066C26.6653 15.6215 26.6496 15.5363 26.6141 15.4587C26.5786 15.3812 26.5245 15.3136 26.4564 15.2621V15.2601Z",
  fill: "#65BD60"
})), /*#__PURE__*/createElement("defs", null, /*#__PURE__*/createElement("clipPath", {
  id: "clip0_1419_47343"
}, /*#__PURE__*/createElement("rect", {
  width: "36.865",
  height: "35.0217",
  fill: "white",
  transform: "translate(0 0.489136)"
}))));
var bedrock_package_logo = /*#__PURE__*/createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 37 36",
  fill: "none"
}, /*#__PURE__*/createElement("g", {
  clipPath: "url(#clip0_1389_84927)"
}, /*#__PURE__*/createElement("path", {
  d: "M31.353 6.30562V7.53445H32.5818H35.3952V33.3723H1.47297V7.53445H4.28635H5.51518V6.30562V4.28452C5.51518 3.53836 5.81159 2.82277 6.3392 2.29516C6.86681 1.76755 7.58241 1.47114 8.32856 1.47114H12.3708C13.1169 1.47114 13.8325 1.76755 14.3601 2.29516C14.8877 2.82277 15.1841 3.53837 15.1841 4.28452V6.30562V7.53445H16.413H20.4552H21.684V6.30562V4.28452C21.684 3.53836 21.9804 2.82277 22.508 2.29516C23.0357 1.76755 23.7512 1.47114 24.4974 1.47114H28.5396C29.2858 1.47114 30.0014 1.76755 30.529 2.29516C31.0566 2.82277 31.353 3.53836 31.353 4.28452V6.30562Z",
  fill: "white",
  stroke: "currentColor",
  strokeWidth: "2.45766"
}), /*#__PURE__*/createElement("g", {
  clipPath: "url(#clip1_1389_84927)"
}, /*#__PURE__*/createElement("path", {
  d: "M17.9658 19.5288L10.4629 16.1351V26.0222L17.9658 29.4158V19.5288Z",
  fill: "#65BD60"
}), /*#__PURE__*/createElement("path", {
  d: "M18.898 19.5288V29.4158L26.401 26.0222V16.1351L18.898 19.5288Z",
  fill: "#65BD60"
}), /*#__PURE__*/createElement("path", {
  d: "M25.6731 15.3088L18.4361 12.0354L11.1992 15.3088L18.4361 18.5822L25.6731 15.3088Z",
  fill: "#439B76"
}))), /*#__PURE__*/createElement("defs", null, /*#__PURE__*/createElement("clipPath", {
  id: "clip0_1389_84927"
}, /*#__PURE__*/createElement("rect", {
  width: "36.865",
  height: "35.0217",
  fill: "white"
})), /*#__PURE__*/createElement("clipPath", {
  id: "clip1_1389_84927"
}, /*#__PURE__*/createElement("rect", {
  width: "16.4922",
  height: "17.9474",
  fill: "white",
  transform: "translate(10.1836 11.6415)"
}))));
var default_package_logo = /*#__PURE__*/createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 42 41",
  fill: "none"
}, /*#__PURE__*/createElement("path", {
  d: "M35.8502 8.00431V9.37468H37.2206H40.358V38.1885H2.52857V9.37468H5.666H7.03637V8.00431V5.75041C7.03637 4.91831 7.36692 4.1203 7.9553 3.53192C8.54368 2.94353 9.3417 2.61299 10.1738 2.61299H14.6816C15.5137 2.61299 16.3117 2.94353 16.9001 3.53192C17.4885 4.1203 17.819 4.91832 17.819 5.75041V8.00431V9.37468H19.1894H23.6972H25.0676V8.00431V5.75041C25.0676 4.91832 25.3981 4.1203 25.9865 3.53192C26.5749 2.94353 27.3729 2.61299 28.205 2.61299H32.7128C33.5449 2.61299 34.3429 2.94353 34.9313 3.53192C35.5197 4.1203 35.8502 4.91832 35.8502 5.75041V8.00431Z",
  fill: "white",
  stroke: "currentColor",
  strokeWidth: "2.74074"
}), /*#__PURE__*/createElement("path", {
  d: "M12.836 21.6468L14.1442 22.8036C14.1144 23.0665 14.0996 23.0003 14.0996 23.2644H17.7688C17.7688 22.3182 18.1557 21.7411 18.8444 21.0721C19.5331 20.403 20.4672 20.0272 21.4411 20.0272C22.4151 20.0272 23.3492 20.403 24.0378 21.0721C24.7265 21.7411 25.1134 22.3182 25.1134 23.2644H28.79C28.7899 23.0015 28.775 23.0689 28.7454 22.8072L30.0536 21.6477C30.3704 21.365 30.4438 20.9057 30.2308 20.5427L28.5599 17.7306C28.4552 17.5545 28.2918 17.4184 28.0966 17.3449C27.9014 17.2714 27.6862 17.265 27.4867 17.3266L25.7993 17.8483C25.3603 17.5359 24.8878 17.2706 24.39 17.0572L24.0117 15.3778C23.9672 15.1791 23.854 15.0012 23.691 14.8735C23.528 14.7458 23.3251 14.6761 23.1157 14.6759H19.7739C19.5645 14.6761 19.3615 14.7458 19.1986 14.8735C19.0356 15.0012 18.9224 15.1791 18.8778 15.3778L18.5033 17.0563C18.2591 17.1589 18.0204 17.2739 17.7881 17.4006C17.5475 17.5362 17.3144 17.686 17.0903 17.8465L15.4038 17.3248C15.2042 17.2629 14.9888 17.2693 14.7934 17.3428C14.598 17.4163 14.4344 17.5525 14.3297 17.7288L12.6588 20.5409C12.5549 20.7175 12.5159 20.9231 12.5481 21.124C12.5803 21.3249 12.6818 21.5093 12.836 21.6468Z",
  fill: "#439B76"
}), /*#__PURE__*/createElement("path", {
  d: "M12.836 25.8729L14.1442 24.7161C14.1144 24.4532 14.0996 24.5194 14.0996 24.2554H17.7688C17.7688 25.2015 18.1557 25.7786 18.8444 26.4476C19.5331 27.1167 20.4672 27.4925 21.4411 27.4925C22.4151 27.4925 23.3492 27.1167 24.0378 26.4476C24.7265 25.7786 25.1134 25.2015 25.1134 24.2554H28.79C28.7899 24.5183 28.775 24.4508 28.7454 24.7126L30.0536 25.872C30.3704 26.1547 30.4438 26.614 30.2308 26.977L28.5599 29.7891C28.4552 29.9652 28.2918 30.1013 28.0966 30.1748C27.9014 30.2483 27.6862 30.2548 27.4867 30.1931L25.7993 29.6714C25.3603 29.9838 24.8878 30.2491 24.39 30.4625L24.0117 32.1419C23.9672 32.3406 23.854 32.5186 23.691 32.6462C23.528 32.7739 23.3251 32.8436 23.1157 32.8438H19.7739C19.5645 32.8436 19.3615 32.7739 19.1986 32.6462C19.0356 32.5186 18.9224 32.3406 18.8778 32.1419L18.5033 30.4634C18.2591 30.3608 18.0204 30.2458 17.7881 30.1191C17.5475 29.9836 17.3144 29.8337 17.0903 29.6732L15.4038 30.1949C15.2042 30.2568 14.9888 30.2504 14.7934 30.1769C14.598 30.1034 14.4344 29.9672 14.3297 29.7909L12.6588 26.9788C12.5549 26.8023 12.5159 26.5967 12.5481 26.3957C12.5803 26.1948 12.6818 26.0104 12.836 25.8729Z",
  fill: "#65BD60"
}));
var npm_logo = /*#__PURE__*/createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 28 14",
  fill: "none"
}, /*#__PURE__*/createElement("g", {
  clipPath: "url(#clip0_1419_46997)"
}, /*#__PURE__*/createElement("path", {
  d: "M7.77778 11.4H0.4V2.59995H27.6V11.4H14H13.6V11.8V13H8.17778V11.8V11.4H7.77778ZM8.17778 3.79995V3.39995H7.77778H1.55556H1.15556V3.79995V10.2V10.6H1.55556H4.66667H5.06667V10.2V5.79995H5.82222V10.2V10.6H6.22222H7.77778H8.17778V10.2V3.79995ZM15.9556 3.79995V3.39995H15.5556H9.33333H8.93333V3.79995V11.8V12.2H9.33333H12.4444H12.8444V11.8V10.6H15.5556H15.9556V10.2V3.79995ZM26.8444 3.79995V3.39995H26.4444H17.1111H16.7111V3.79995V10.2V10.6H17.1111H20.2222H20.6222V10.2V5.79995H21.3778V10.2V10.6H21.7778H23.3333H23.7333V10.2V5.79995H24.4889V10.2V10.6H24.8889H26.4444H26.8444V10.2V3.79995ZM13.6 8.19995H12.8444V5.79995H13.6V8.19995Z",
  fill: "black",
  stroke: "currentColor",
  strokeWidth: "0.8"
})), /*#__PURE__*/createElement("defs", null, /*#__PURE__*/createElement("clipPath", {
  id: "clip0_1419_46997"
}, /*#__PURE__*/createElement("rect", {
  width: "28",
  height: "12.8",
  fill: "white",
  transform: "translate(0 0.599976)"
}))));
var new_copy = /*#__PURE__*/createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 28 28",
  fill: "none"
}, /*#__PURE__*/createElement("path", {
  d: "M18.4224 2.33325H6.63288C5.55218 2.33325 4.66797 3.2878 4.66797 4.45446V19.3029H6.63288V4.45446H18.4224V2.33325ZM21.3697 6.57568H10.5627C9.482 6.57568 8.59779 7.53022 8.59779 8.69689V23.5454C8.59779 24.712 9.482 25.6666 10.5627 25.6666H21.3697C22.4504 25.6666 23.3346 24.712 23.3346 23.5454V8.69689C23.3346 7.53022 22.4504 6.57568 21.3697 6.57568ZM21.3697 23.5454H10.5627V8.69689H21.3697V23.5454Z",
  fill: "currentColor"
}));
var desktop = /*#__PURE__*/createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 28 28",
  fill: "none"
}, /*#__PURE__*/createElement("g", {
  clipPath: "url(#clip0_1513_58011)"
}, /*#__PURE__*/createElement("path", {
  fillRule: "evenodd",
  clipRule: "evenodd",
  d: "M2 1.16663C0.895431 1.16663 0 2.06206 0 3.16663V19.1666C0 20.2712 0.895431 21.1666 2 21.1666H26C27.1046 21.1666 28 20.2712 28 19.1666V3.16663C28 2.06206 27.1046 1.16663 26 1.16663H2ZM25.5 3.66663H2.5V17.6666H25.5V3.66663Z",
  fill: "currentColor"
}), /*#__PURE__*/createElement("path", {
  d: "M13 21.1666H15V26.1666H13V21.1666Z",
  fill: "currentColor"
}), /*#__PURE__*/createElement("path", {
  d: "M9 27.1666H19V25.1666H9V27.1666Z",
  fill: "currentColor"
})), /*#__PURE__*/createElement("defs", null, /*#__PURE__*/createElement("clipPath", {
  id: "clip0_1513_58011"
}, /*#__PURE__*/createElement("rect", {
  width: "28",
  height: "28",
  fill: "white"
}))));
var tablet = /*#__PURE__*/createElement("svg", {
  viewBox: "0 0 28 28",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, /*#__PURE__*/createElement("path", {
  fillRule: "evenodd",
  clipRule: "evenodd",
  d: "M2.68359 2.15385C2.68359 0.96431 3.6479 0 4.83744 0H23.1451C24.3347 0 25.299 0.96431 25.299 2.15385V25.8462C25.299 27.0357 24.3347 28 23.1451 28H4.83744C3.6479 28 2.68359 27.0357 2.68359 25.8462V2.15385ZM5.51052 2.69231H22.4721V23.1538H5.51052V2.69231ZM13.9366 26.6538C13.3418 26.6538 12.8597 26.1717 12.8597 25.5769C12.8597 24.9822 13.3418 24.5 13.9366 24.5H14.0443C14.6391 24.5 15.1212 24.9822 15.1212 25.5769C15.1212 26.1717 14.6391 26.6538 14.0443 26.6538H13.9366Z",
  fill: "currentColor"
}));
var mobile = /*#__PURE__*/createElement("svg", {
  viewBox: "0 0 28 28",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, /*#__PURE__*/createElement("g", {
  clipPath: "url(#clip0_1763_12440)"
}, /*#__PURE__*/createElement("path", {
  fillRule: "evenodd",
  clipRule: "evenodd",
  d: "M5.36719 2.15385C5.36719 0.96431 6.3315 0 7.52103 0H20.4441C21.6336 0 22.598 0.96431 22.598 2.15385V25.8462C22.598 27.0357 21.6336 28 20.4441 28H7.52103C6.3315 28 5.36719 27.0357 5.36719 25.8462V2.15385ZM17.7518 2.69231H19.9056V25.3077H8.0595V2.69231H10.2133C10.2133 3.58446 10.9366 4.30769 11.8287 4.30769H16.1364C17.0286 4.30769 17.7518 3.58446 17.7518 2.69231Z",
  fill: "currentColor"
})), /*#__PURE__*/createElement("defs", null, /*#__PURE__*/createElement("clipPath", {
  id: "clip0_1763_12440"
}, /*#__PURE__*/createElement("rect", {
  width: "28",
  height: "28",
  fill: "white"
}))));
var bold_text = /*#__PURE__*/createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "-1 0 12 15",
  fill: "none"
}, /*#__PURE__*/createElement("path", {
  d: "M7.99967 5.99165C8.80801 5.43331 9.37467 4.51665 9.37467 3.66665C9.37467 1.78331 7.91634 0.333313 6.04134 0.333313H0.833008V12H6.69967C8.44134 12 9.79134 10.5833 9.79134 8.84165C9.79134 7.57498 9.07467 6.49165 7.99967 5.99165ZM3.33301 2.41665H5.83301C6.52467 2.41665 7.08301 2.97498 7.08301 3.66665C7.08301 4.35831 6.52467 4.91665 5.83301 4.91665H3.33301V2.41665ZM6.24967 9.91665H3.33301V7.41665H6.24967C6.94134 7.41665 7.49967 7.97498 7.49967 8.66665C7.49967 9.35831 6.94134 9.91665 6.24967 9.91665Z",
  fill: "currentColor"
}));
var italic_text = /*#__PURE__*/createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "-1 0 12 15",
  fill: "none"
}, /*#__PURE__*/createElement("path", {
  d: "M3.33333 0.333313V2.83331H5.175L2.325 9.49998H0V12H6.66667V9.49998H4.825L7.675 2.83331H10V0.333313H3.33333Z",
  fill: "currentColor"
}));
var underline_text = /*#__PURE__*/createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 12 16",
  fill: "none"
}, /*#__PURE__*/createElement("path", {
  d: "M6.00033 12.1667C8.75866 12.1667 11.0003 9.925 11.0003 7.16667V0.5H8.91699V7.16667C8.91699 8.775 7.60866 10.0833 6.00033 10.0833C4.39199 10.0833 3.08366 8.775 3.08366 7.16667V0.5H1.00033V7.16667C1.00033 9.925 3.24199 12.1667 6.00033 12.1667ZM0.166992 13.8333V15.5H11.8337V13.8333H0.166992Z",
  fill: "currentColor"
}));
var strikethrough_text = /*#__PURE__*/createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 16 14",
  fill: "none"
}, /*#__PURE__*/createElement("path", {
  d: "M3.70833 3.9C3.70833 1.64167 5.875 0.5 8.2 0.5C9.56667 0.5 10.7 0.908334 11.45 1.56667C12.0917 2.10833 12.6667 3.00833 12.6667 4.26667H10.1583C10.1583 4.00833 10.1167 3.775 10.0333 3.55833C9.79167 2.84167 9.03333 2.49167 8.15833 2.49167C6.60833 2.49167 6.20833 3.34167 6.20833 3.90833C6.20833 4.30833 6.41667 4.64167 6.825 4.91667C7.14167 5.125 7.46667 5.31667 8 5.5H4.15833C3.98333 5.21667 3.70833 4.75833 3.70833 3.9ZM15.5 8V6.33333H0.5V8H8.51667C9.475 8.375 10.15 8.625 10.15 9.64167C10.15 10.475 9.475 11.0333 8.25 11.0333C6.96667 11.0333 5.80833 10.5833 5.80833 8.94167H3.33333C3.33333 9.4 3.4 9.88333 3.53333 10.2583C4.20833 12.1667 6.275 13.0083 8.25833 13.0083C10.15 13.0083 12.675 12.2667 12.675 9.63333C12.675 9.38333 12.6667 8.66667 12.275 8.01667H15.5V8Z",
  fill: "currentColor"
}));
var link_text = /*#__PURE__*/createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 18 10",
  fill: "none"
}, /*#__PURE__*/createElement("path", {
  d: "M2.25033 4.99998C2.25033 3.57498 3.40866 2.41665 4.83366 2.41665H8.16699V0.833313H4.83366C2.53366 0.833313 0.666992 2.69998 0.666992 4.99998C0.666992 7.29998 2.53366 9.16665 4.83366 9.16665H8.16699V7.58331H4.83366C3.40866 7.58331 2.25033 6.42498 2.25033 4.99998ZM5.66699 5.83331H12.3337V4.16665H5.66699V5.83331ZM13.167 0.833313H9.83366V2.41665H13.167C14.592 2.41665 15.7503 3.57498 15.7503 4.99998C15.7503 6.42498 14.592 7.58331 13.167 7.58331H9.83366V9.16665H13.167C15.467 9.16665 17.3337 7.29998 17.3337 4.99998C17.3337 2.69998 15.467 0.833313 13.167 0.833313Z",
  fill: "currentColor"
}));
var break_link = /*#__PURE__*/createElement("svg", {
  viewBox: "0 0 16 16",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, /*#__PURE__*/createElement("path", {
  fillRule: "evenodd",
  clipRule: "evenodd",
  d: "M2.32822 1.68506L1.33203 2.68909L3.51524 4.8708C2.2414 5.33955 1.33203 6.5643 1.33203 8.00015C1.33203 9.84015 2.82536 11.3335 4.66536 11.3335H7.33203V10.0668H4.66536C3.52536 10.0668 2.5987 9.14015 2.5987 8.00015C2.5987 6.88862 3.47966 5.9799 4.58037 5.9352L5.97961 7.33348H5.33203V8.66682H7.31385L8.71481 10.0668H8.66536V11.3335H9.98235L12.9844 14.3335L13.9987 13.3192L13.6654 12.9859L13.6511 13.0001L2.32822 1.68506ZM13.34 10.6605C14.1449 10.0518 14.6654 9.08638 14.6654 8.00015C14.6654 6.16015 13.172 4.66682 11.332 4.66682H8.66536V5.93348H11.332C12.472 5.93348 13.3987 6.86015 13.3987 8.00015C13.3987 8.73692 13.0116 9.38458 12.4301 9.75057L13.34 10.6605ZM10.6654 7.98586L10.013 7.33348H10.6654V7.98586Z",
  fill: "currentColor"
}));
var trash_alt = /*#__PURE__*/createElement("svg", {
  viewBox: "0 0 20 20",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, /*#__PURE__*/createElement("path", {
  d: "M5.0013 15.8333C5.0013 16.75 5.7513 17.5 6.66797 17.5H13.3346C14.2513 17.5 15.0013 16.75 15.0013 15.8333V5.83333H5.0013V15.8333ZM15.8346 3.33333H12.918L12.0846 2.5H7.91797L7.08464 3.33333H4.16797V5H15.8346V3.33333Z",
  fill: "currentColor"
}));
var paintbrush = /*#__PURE__*/createElement("svg", {
  viewBox: "0 0 28 28",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, /*#__PURE__*/createElement("path", {
  d: "M15.0195 3.5H19.6133C20.7002 3.5 21.582 4.38143 21.582 5.46875V14H5.83203V5.46875C5.83203 4.38143 6.71346 3.5 7.80078 3.5H8.45703L9.76953 6.125L11.082 3.5H12.3945L13.707 6.125L15.0195 3.5ZM21.582 15.3125V16.625C21.582 18.0729 20.4049 19.25 18.957 19.25H16.332V21.875C16.332 23.3229 15.1549 24.5 13.707 24.5C12.2592 24.5 11.082 23.3229 11.082 21.875V19.25H8.45703C7.00713 19.25 5.83203 18.0729 5.83203 16.625V15.3125H21.582ZM13.707 22.5312C14.068 22.5312 14.3633 22.2359 14.3633 21.875C14.3633 21.5141 14.068 21.2188 13.707 21.2188C13.3461 21.2188 13.0508 21.5141 13.0508 21.875C13.0508 22.2359 13.3461 22.5312 13.707 22.5312Z",
  fill: "currentColor"
}));
var alert_alt = /*#__PURE__*/createElement("svg", {
  viewBox: "-1 -1 15 15",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, /*#__PURE__*/createElement("rect", {
  width: "13",
  height: "13",
  rx: "6.5",
  fill: "transparent"
}), /*#__PURE__*/createElement("path", {
  fillRule: "evenodd",
  clipRule: "evenodd",
  d: "M6.4935 0C2.9055 0 0 2.912 0 6.5C0 10.088 2.9055 13 6.4935 13C10.088 13 13 10.088 13 6.5C13 2.912 10.088 0 6.4935 0ZM7.15 8.45H5.85V9.75H7.15V8.45ZM7.15 3.25H5.85V7.15H7.15V3.25Z",
  fill: "currentColor"
}));
var templates = /*#__PURE__*/createElement("svg", {
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, /*#__PURE__*/createElement("path", {
  fillRule: "evenodd",
  clipRule: "evenodd",
  d: "M3.5 4.5C3.5 3.94771 3.94772 3.5 4.5 3.5H19.5C20.0523 3.5 20.5 3.94772 20.5 4.5V7.86842C20.5 8.42071 20.0523 8.86842 19.5 8.86842H4.5C3.94772 8.86842 3.5 8.42071 3.5 7.86842V4.5ZM3.5 11.6578C3.5 11.1055 3.94772 10.6578 4.5 10.6578H12.3421C12.8944 10.6578 13.3421 11.1055 13.3421 11.6578V19.4999C13.3421 20.0522 12.8944 20.4999 12.3421 20.4999H4.5C3.94772 20.4999 3.5 20.0522 3.5 19.4999V11.6578ZM16.1309 10.6577C15.5786 10.6577 15.1309 11.1054 15.1309 11.6577V19.4998C15.1309 20.0521 15.5786 20.4998 16.1309 20.4998H19.4993C20.0516 20.4998 20.4993 20.0521 20.4993 19.4998V11.6577C20.4993 11.1054 20.0516 10.6577 19.4993 10.6577H16.1309Z",
  fill: "currentColor"
}));

var SVGs = {
  __proto__: null,
  placeholder: placeholder,
  close: close,
  add: add,
  chevron_down: chevron_down,
  chevron_up: chevron_up,
  arrow_down: arrow_down,
  calendar: calendar,
  block: block,
  edit: edit,
  checkmark: checkmark,
  checkmark_circle: checkmark_circle,
  actions: actions,
  chevron_left: chevron_left,
  chevron_right: chevron_right,
  mail: mail,
  action: action,
  arrow_dropdown: arrow_dropdown,
  help: help,
  loading: loading,
  gift: gift,
  copy: copy,
  alert: alert,
  search: search,
  filter: filter,
  trash: trash,
  info: info,
  settings: settings,
  leftward_arrow: leftward_arrow,
  avatar: avatar,
  visibility: visibility,
  visibility_alt: visibility_alt,
  layers: layers,
  layers_with_errors: layers_with_errors,
  double_chevron_left: double_chevron_left,
  double_chevron_right: double_chevron_right,
  undo: undo,
  redo: redo,
  outline: outline,
  outline_cancelled: outline_cancelled,
  code: code,
  visibility_cancelled: visibility_cancelled,
  duplicate: duplicate,
  move: move,
  empty_package_logo: empty_package_logo,
  vanilla_package_logo: vanilla_package_logo,
  mint_package_logo: mint_package_logo,
  bedrock_package_logo: bedrock_package_logo,
  default_package_logo: default_package_logo,
  npm_logo: npm_logo,
  new_copy: new_copy,
  desktop: desktop,
  tablet: tablet,
  mobile: mobile,
  bold_text: bold_text,
  italic_text: italic_text,
  underline_text: underline_text,
  strikethrough_text: strikethrough_text,
  link_text: link_text,
  break_link: break_link,
  trash_alt: trash_alt,
  paintbrush: paintbrush,
  alert_alt: alert_alt,
  templates: templates
};

var _excluded = ["icon", "color", "size", "customCSS"];

var _templateObject$2;
var default_size = {
  small: "var(--sq-icon-size-small)",
  medium: "var(--sq-icon-size-medium)",
  large: "var(--sq-icon-size-large)",
  badge: "var(--sq-icon-size-badge)"
};
var SVGStyleSpan = /*#__PURE__*/styled.span(_templateObject$2 || (_templateObject$2 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  ", "\n  color: ", ";\n  width: ", ";\n  height: ", ";\n  ", "\n"])), base, function (props) {
  return props.color;
}, function (props) {
  return default_size.hasOwnProperty(props.size) ? default_size[props.size] : props.size;
}, function (props) {
  return default_size.hasOwnProperty(props.size) ? default_size[props.size] : props.size;
}, function (props) {
  return props.customCSS;
});
var IconView = /*#__PURE__*/forwardRef(function (props, forwardedRef) {
  var icon = props.icon,
      _props$color = props.color,
      color = _props$color === void 0 ? "inherit" : _props$color,
      _props$size = props.size,
      size = _props$size === void 0 ? "medium" : _props$size,
      _props$customCSS = props.customCSS,
      customCSS = _props$customCSS === void 0 ? {} : _props$customCSS,
      rest = _objectWithoutPropertiesLoose(props, _excluded);

  return createElement(SVGStyleSpan, Object.assign({}, rest, {
    size: size,
    color: color,
    ref: forwardedRef,
    customCSS: customCSS
  }), Object.keys(SVGs).includes(icon) ? SVGs[icon] : placeholder);
});
/**
 * @deprecated use {@link IconView} instead
 */

var Icon = IconView;

var _templateObject$3, _templateObject2$1, _templateObject3$1, _templateObject4$1, _templateObject5;
var AlertDiv = /*#__PURE__*/css(_templateObject$3 || (_templateObject$3 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  display: flex;\n  flex-direction: row;\n  align-items: flex-start;\n  padding: var(--sq-spacing-medium);\n  border: 1px solid;\n  border-radius: 5px;\n  box-sizing: border-box;\n  color: var(--sq-text);\n  font-family: var(--sq-font-family-sans);\n  font-weight: var(--sq-font-weight-regular);\n  font-size: var(--sq-font-size-regular);\n  line-height: var(--sq-line-height-regular);\n  & > :first-child {\n    margin-right: var(--sq-spacing-medium);\n  }\n"])));
var critical = /*#__PURE__*/css(_templateObject2$1 || (_templateObject2$1 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  background-color: var(--sq-surface-critical-subdued);\n  border-color: var(--sq-border-critical);\n"])));
var warning = /*#__PURE__*/css(_templateObject3$1 || (_templateObject3$1 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  background-color: var(--sq-surface-warning-subdued);\n  border-color: var(--sq-border-warning);\n"])));
var success = /*#__PURE__*/css(_templateObject4$1 || (_templateObject4$1 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  background-color: var(--sq-surface-success-subdued);\n  border-color: var(--sq-border-success);\n"])));
var info$1 = /*#__PURE__*/css(_templateObject5 || (_templateObject5 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  background-color: var(--sq-background);\n  border-color: var(--sq-border);\n"])));

var Styles = {
  __proto__: null,
  AlertDiv: AlertDiv,
  critical: critical,
  warning: warning,
  success: success,
  info: info$1
};

var _excluded$1 = ["type", "title", "children", "customCSS"];

var _templateObject$4;
var AlertDiv$1 = /*#__PURE__*/styled.div(_templateObject$4 || (_templateObject$4 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  ", "\n  ", "\n  ", "\n"])), AlertDiv, function (props) {
  return Styles[props.type];
}, function (props) {
  return props.customCSS;
});
var icons = {
  critical: /*#__PURE__*/createElement(IconView, {
    icon: "alert",
    color: "var(--sq-surface-critical)",
    size: "23px"
  }),
  warning: /*#__PURE__*/createElement(IconView, {
    icon: "alert",
    color: "var(--sq-surface-warning)",
    size: "23px"
  }),
  success: /*#__PURE__*/createElement(IconView, {
    icon: "checkmark_circle",
    color: "var(--sq-surface-success)",
    size: "23px"
  }),
  info: /*#__PURE__*/createElement(IconView, {
    icon: "help",
    color: "var(--sq-text)",
    size: "23px"
  })
};
var AlertView = /*#__PURE__*/forwardRef(function (props, forwardedRef) {
  var variant = props.type,
      title = props.title,
      children = props.children,
      _props$customCSS = props.customCSS,
      customCSS = _props$customCSS === void 0 ? {} : _props$customCSS,
      rest = _objectWithoutPropertiesLoose(props, _excluded$1);

  return createElement(AlertDiv$1, Object.assign({}, rest, {
    type: variant,
    ref: forwardedRef,
    customCSS: customCSS
  }), icons[variant], createElement("div", null, createElement("strong", null, title), createElement("div", null, children)));
});
/**
 * @deprecated use {@link AlertView} instead
 */

var Alert = AlertView;

var _templateObject$5, _templateObject2$2, _templateObject3$2, _templateObject4$2, _templateObject5$1;
var AvatarCircleStyle = /*#__PURE__*/css(_templateObject$5 || (_templateObject$5 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  background-color: var(--sq-background);\n  border-radius: 50%;\n  width: var(--sq-icon-size-avatar);\n  height: var(--sq-icon-size-avatar);\n  text-align: center;\n  border: 1px solid var(--sq-border);\n  box-sizing: border-box;\n  border-radius: 50px;\n"])));
var AvatarCircleStyleLarge = /*#__PURE__*/css(_templateObject2$2 || (_templateObject2$2 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  background-color: var(--sq-background);\n  border-radius: 50%;\n  width: var(--sq-icon-size-avatar-large);\n  height: var(--sq-icon-size-avatar-large);\n  text-align: center;\n  border-radius: 50px;\n"])));
var AvatarTextStyle = /*#__PURE__*/css(_templateObject3$2 || (_templateObject3$2 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  position: relative;\n  top: 7px;\n  color: var(--sq-text);\n  font-family: var(--sq-font-family-sans);\n  font-weight: var(--sq-font-weight-bold);\n  font-size: var(--sq-font-size-regular);\n  line-height: var(--sq-line-height-regular);\n"])));
var AvatarTextStyleLarge = /*#__PURE__*/css(_templateObject4$2 || (_templateObject4$2 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  position: relative;\n  top: 15px;\n  color: var(--sq-surface);\n  font-family: var(--sq-font-family-sans);\n  font-weight: var(--sq-font-weight-regular);\n  font-size: var(--sq-font-size-avatar);\n  line-height: var(--sq-line-height-regular);\n"])));
var AvatarDiv = /*#__PURE__*/css(_templateObject5$1 || (_templateObject5$1 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  display: inline-block;\n"])));

var _excluded$2 = ["firstName", "large", "lastName", "customCSS"];

var _templateObject$6, _templateObject2$3, _templateObject3$3;
var AvatarDiv$1 = /*#__PURE__*/styled.div(_templateObject$6 || (_templateObject$6 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  ", "\n  ", "\n"])), AvatarDiv, function (props) {
  return props.customCSS;
});
var AvatarCircle = /*#__PURE__*/styled.div(_templateObject2$3 || (_templateObject2$3 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  ", ";\n  ", ";\n"])), function (props) {
  return props.large ? AvatarCircleStyleLarge : AvatarCircleStyle;
}, function (props) {
  return props.large ? "background-color: " + props.color : "";
});
var AvatarSpan = /*#__PURE__*/styled.span(_templateObject3$3 || (_templateObject3$3 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  ", ";\n  ", ";\n"])), function (props) {
  return props.large ? AvatarTextStyleLarge : AvatarTextStyle;
}, function (props) {
  return props.large ? "" : "color: " + props.color;
});
var AvatarView = /*#__PURE__*/forwardRef(function (props, forwardedRef) {
  var _props$firstName = props.firstName,
      firstName = _props$firstName === void 0 ? "" : _props$firstName,
      _props$large = props.large,
      large = _props$large === void 0 ? false : _props$large,
      _props$lastName = props.lastName,
      lastName = _props$lastName === void 0 ? "" : _props$lastName,
      _props$customCSS = props.customCSS,
      customCSS = _props$customCSS === void 0 ? {} : _props$customCSS,
      rest = _objectWithoutPropertiesLoose(props, _excluded$2);

  var initials = "";

  if (firstName || lastName) {
    initials = firstName.charAt(0) + lastName.charAt(0);
  }

  var colors = ["#023B44", "#0FA177", "#00C75F", "#0092AD", "#44BFD5", "#F5A624"];
  var random = initials.charCodeAt(0) % 6;
  return createElement(AvatarDiv$1, Object.assign({}, rest, {
    ref: forwardedRef,
    customCSS: customCSS
  }), !(firstName || lastName) ? createElement(IconView, {
    icon: "avatar",
    size: large ? "var(--sq-icon-size-avatar-large)" : "var(--sq-icon-size-avatar)"
  }) : createElement(AvatarCircle, {
    large: large,
    color: colors[random]
  }, createElement(AvatarSpan, {
    large: large,
    color: colors[random]
  }, initials)));
});
/**
 * @deprecated use {@link AvatarView} instead
 */

var Avatar = AvatarView;

var _templateObject$7, _templateObject2$4, _templateObject3$4, _templateObject4$3, _templateObject5$2, _templateObject6, _templateObject7;
var base$1 = /*#__PURE__*/css(_templateObject$7 || (_templateObject$7 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  padding: var(--sq-spacing-xx-small) var(--sq-spacing-large);\n  color: var(--sq-text);\n  font-family: \"Helvetica Neue\", Helvetica, sans-serif;\n  font-weight: var(--sq-font-weight-bold);\n  font-size: var(--sq-font-size-regular);\n  line-height: var(--sq-line-height-regular);\n  width: max-content;\n"])));
var pill_false = /*#__PURE__*/css(_templateObject2$4 || (_templateObject2$4 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  border-radius: 4px;\n"])));
var pill_true = /*#__PURE__*/css(_templateObject3$4 || (_templateObject3$4 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  border-radius: 50px;\n"])));
var info$2 = /*#__PURE__*/css(_templateObject4$3 || (_templateObject4$3 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  background-color: var(--sq-border);\n  border-color: var(--sq-border);\n  color: var(--sq-text);\n"])));
var success$1 = /*#__PURE__*/css(_templateObject5$2 || (_templateObject5$2 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  background-color: var(--sq-surface-success);\n  border-color: var(--sq-border-success);\n  color: var(--sq-surface);\n"])));
var critical$1 = /*#__PURE__*/css(_templateObject6 || (_templateObject6 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  background-color: var(--sq-surface-critical);\n  border-color: var(--sq-surface-critical);\n  color: var(--sq-surface);\n"])));
var warning$1 = /*#__PURE__*/css(_templateObject7 || (_templateObject7 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  background-color: var(--sq-border-warning);\n  border-color: var(--sq-border-warning);\n  color: var(--sq-surface);\n"])));

var Styles$1 = {
  __proto__: null,
  base: base$1,
  pill_false: pill_false,
  pill_true: pill_true,
  info: info$2,
  success: success$1,
  critical: critical$1,
  warning: warning$1
};

var _excluded$3 = ["status", "pill", "icon", "children", "customCSS"];

var _templateObject$8;
var BadgeDiv = /*#__PURE__*/styled.div(_templateObject$8 || (_templateObject$8 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  ", "\n  ", "\n  padding: ", ";\n  border-radius: ", ";\n  ", "\n"])), base$1, function (props) {
  return Styles$1[props.status];
}, function (props) {
  return props.pill ? "var(--sq-spacing-xx-small) var(--sq-spacing-large)" : "var(--sq-spacing-xx-small) 12px";
}, function (props) {
  return props.pill ? "var(--sq-spacing-xxx-large)" : "var(--sq-spacing-xx-small)";
}, function (props) {
  return props.customCSS;
});
var BadgeView = /*#__PURE__*/forwardRef(function (props, forwardedRef) {
  var status = props.status,
      _props$pill = props.pill,
      pill = _props$pill === void 0 ? false : _props$pill,
      icon = props.icon,
      children = props.children,
      _props$customCSS = props.customCSS,
      customCSS = _props$customCSS === void 0 ? {} : _props$customCSS,
      rest = _objectWithoutPropertiesLoose(props, _excluded$3);

  return createElement(BadgeDiv, Object.assign({}, rest, {
    status: status,
    pill: pill,
    ref: forwardedRef,
    customCSS: customCSS
  }), icon && createElement(IconView, {
    icon: icon,
    color: "inherit",
    size: "var(--sq-icon-size-badge)",
    style: {
      margin: -2
    },
    customCSS: "+ span { margin-left: 5px; }"
  }), children && createElement("span", null, children));
});
/**
 * @deprecated use {@link BadgeView} instead
 */

var Badge = BadgeView;

var _templateObject$9, _templateObject3$5, _templateObject4$4, _templateObject5$3, _templateObject6$1, _templateObject7$1;
var base$2 = /*#__PURE__*/css(_templateObject$9 || (_templateObject$9 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  position: absolute;\n  width: 40px;\n  height: 20px;\n  border: 3px solid var(--sq-border);\n  border-radius: 100px;\n  background: var(--sq-surface-input-disabled);\n  cursor: pointer;\n  transform: translateX(-100%);\n  box-sizing: border-box;\n  &::after {\n    content: \"\";\n    display: block;\n    border-radius: 50%;\n    width: 20px;\n    height: 20px;\n    margin: -3px;\n    background: var(--sq-surface);\n    border: 3px solid var(--sq-border);\n    transition: 0.1s;\n    box-sizing: border-box;\n  }\n"])));
var success$2 = /*#__PURE__*/css(_templateObject3$5 || (_templateObject3$5 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  background: var(--sq-border-success);\n  transition: 0.15s ease-out;\n"])));
var critical$2 = /*#__PURE__*/css(_templateObject4$4 || (_templateObject4$4 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  background: var(--sq-border-critical);\n  transition: 0.15s ease-out;\n"])));
var off = /*#__PURE__*/css(_templateObject5$3 || (_templateObject5$3 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  opacity: 0;\n  z-index: 1;\n  border-radius: 15px;\n  width: 40px;\n  height: 20px;\n  margin: 0;\n"])));
var on = /*#__PURE__*/css(_templateObject6$1 || (_templateObject6$1 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  &::after {\n    content: \"\";\n    display: block;\n    border-radius: 50%;\n    width: 20px;\n    height: 20px;\n    margin-left: 17px;\n    transition: 0.1s ease-out;\n  }\n"])));
var wrapper = /*#__PURE__*/css(_templateObject7$1 || (_templateObject7$1 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  position: relative;\n  display: inline-block;\n  height: 20px;\n"])));

var _excluded$4 = ["id", "color", "value", "checked", "customCSS", "onChange"];

var _templateObject$a, _templateObject2$5, _templateObject3$6, _templateObject4$5;
var SwitchContainerDiv = /*#__PURE__*/styled.div(_templateObject$a || (_templateObject$a = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  ", "\n  ", "\n"])), wrapper, function (props) {
  return props.customCSS;
});
var SwitchButtonLabel = /*#__PURE__*/styled.label(_templateObject2$5 || (_templateObject2$5 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  ", "\n"])), base$2);
var SwitchBackgroundInput = /*#__PURE__*/styled.input(_templateObject3$6 || (_templateObject3$6 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  ", "\n  &:checked + ", " {\n    ", "\n    ", "\n  }\n"])), off, SwitchButtonLabel, function (props) {
  return props.color === "critical" ? critical$2 : success$2;
}, on);
var ShadowDom = /*#__PURE__*/styled(root$1.div)(_templateObject4$5 || (_templateObject4$5 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  display: contents;\n"])));
var SwitchView = /*#__PURE__*/forwardRef(function (props, forwardedRef) {
  var id = props.id,
      _props$color = props.color,
      color = _props$color === void 0 ? "success" : _props$color,
      value = props.value,
      checked = props.checked,
      _props$customCSS = props.customCSS,
      customCSS = _props$customCSS === void 0 ? {} : _props$customCSS,
      onChange = props.onChange,
      rest = _objectWithoutPropertiesLoose(props, _excluded$4);

  return createElement(ShadowDom, null, createElement(SwitchContainerDiv, {
    customCSS: customCSS
  }, createElement(SwitchBackgroundInput, Object.assign({}, rest, {
    color: color,
    checked: value || checked,
    type: "checkbox",
    id: id,
    ref: forwardedRef,
    onChange: onChange
  })), createElement(SwitchButtonLabel, {
    htmlFor: id
  })));
});
/**
 * @deprecated use {@link SwitchView} instead
 */

var Switch = SwitchView;

var _templateObject$b, _templateObject2$6, _templateObject3$7;
var base$3 = /*#__PURE__*/css(_templateObject$b || (_templateObject$b = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  display: flex;\n  flex-direction: row;\n  background: var(--sq-background);\n  box-sizing: border-box;\n  align-items: center;\n  width: max-content;\n  border: 1px solid var(--sq-border);\n  border-radius: 2px;\n"])));
var textSegment = /*#__PURE__*/css(_templateObject2$6 || (_templateObject2$6 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  box-sizing: border-box;\n  border-left: 1px solid var(--sq-border);\n  padding: 3px 7px;\n  font-weight: 400;\n  font-size: 14px;\n  font-style: normal;\n  line-height: 20px;\n  font-family: \"Helvetica Neue\", Helvetica, sans-serif;\n  color: var(--sq-text-dark);\n"])));
var iconSegment = /*#__PURE__*/css(_templateObject3$7 || (_templateObject3$7 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n  align-items: center;\n  box-sizing: border-box;\n  padding: 3px 7px;\n  width: 28px;\n  height: 26px;\n  fill: var(--sq-text-subdued);\n  &:hover {\n    background: #f4f4f4;\n    fill: var(--sq-text-dark);\n    cursor: pointer;\n  }\n"])));

var _excluded$5 = ["onClickClose", "children", "customCSS"];

var _templateObject$c, _templateObject2$7, _templateObject3$8;
var TagDiv = /*#__PURE__*/styled.div(_templateObject$c || (_templateObject$c = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  ", "\n  ", "\n"])), base$3, function (props) {
  return props.customCSS;
});
var IconSegmentDiv = /*#__PURE__*/styled.div(_templateObject2$7 || (_templateObject2$7 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  ", "\n"])), iconSegment);
var TextSegmentDiv = /*#__PURE__*/styled.div(_templateObject3$8 || (_templateObject3$8 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  ", "\n"])), textSegment);
var TagView = /*#__PURE__*/forwardRef(function (props, forwardedRef) {
  var onClickClose = props.onClickClose,
      children = props.children,
      _props$customCSS = props.customCSS,
      customCSS = _props$customCSS === void 0 ? {} : _props$customCSS,
      rest = _objectWithoutPropertiesLoose(props, _excluded$5);

  return createElement(TagDiv, Object.assign({}, rest, {
    ref: forwardedRef,
    customCSS: customCSS
  }), createElement(IconSegmentDiv, {
    onClick: onClickClose
  }, createElement(IconView, {
    size: "10px",
    icon: "close"
  })), createElement(TextSegmentDiv, null, children));
});
/**
 * @deprecated use {@link TagView} instead
 */

var Tag = TagView;

var _templateObject$d, _templateObject2$8, _templateObject3$9;
var base$4 = /*#__PURE__*/css(_templateObject$d || (_templateObject$d = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  display: inline-block;\n  position: relative;\n"])));
var fadeIn = /*#__PURE__*/keyframes(_templateObject2$8 || (_templateObject2$8 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n"])));
var tooltip = /*#__PURE__*/css(_templateObject3$9 || (_templateObject3$9 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  user-select: none;\n  position: absolute;\n  padding: var(--sq-spacing-small);\n  border-radius: 4px;\n  width: max-content;\n  min-height: 20px;\n  color: var(--sq-surface);\n  background: rgba(35, 35, 35, 0.9);\n  font-family: var(--sq-font-family-sans);\n  font-size: var(--sq-font-size-regular);\n  line-height: 20px;\n  animation: ", " 0.2s;\n\n  &::before {\n    content: \" \";\n    border: solid transparent;\n    left: 50%;\n    height: 0;\n    width: 0;\n    position: absolute;\n    border-width: 5px;\n    margin-left: calc(5px * -1);\n  }\n\n  &.right {\n    right: auto;\n    left: calc(100% + 10px);\n    top: 50%;\n    transform: translateX(0) translateY(-50%);\n  }\n\n  &.right::before {\n    left: calc(5px * -1);\n    top: 50%;\n    transform: translateX(0) translateY(-50%);\n    border-right-color: rgba(35, 35, 35, 0.9);\n  }\n\n  &.left {\n    left: auto;\n    right: calc(100% + 10px);\n    top: 50%;\n    transform: translateX(0) translateY(-50%);\n  }\n\n  &.left::before {\n    left: auto;\n    right: calc(5px * -2);\n    top: 50%;\n    transform: translateX(0%) translateY(-50%);\n    border-left-color: rgba(35, 35, 35, 0.9);\n  }\n\n  &.top {\n    bottom: calc(100% + 10px);\n    left: 50%;\n    transform: translateX(-50%);\n  }\n\n  &.top::before {\n    top: 100%;\n    transform: translateX(5%);\n    border-top-color: rgba(35, 35, 35, 0.9);\n  }\n\n  &.bottom {\n    top: calc(100% + 10px);\n    left: 50%;\n    transform: translateX(-50%);\n  }\n\n  &.bottom::before {\n    bottom: calc(100%);\n    left: 50%;\n    transform: translateX(5%);\n    border-bottom-color: rgba(35, 35, 35, 0.9);\n  }\n"])), fadeIn);

var _excluded$6 = ["text", "direction", "showTooltip", "children", "maxWidth", "customCSS"];

var _templateObject$e, _templateObject2$9;
var WrapperDiv = /*#__PURE__*/styled.div(_templateObject$e || (_templateObject$e = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  ", "\n"])), base$4);
var TooltipDiv = /*#__PURE__*/styled.div(_templateObject2$9 || (_templateObject2$9 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  ", ";\n\n  max-width: ", ";\n\n  ", "\n"])), tooltip, function (props) {
  return props.maxWidth ? props.maxWidth : "144px";
}, function (props) {
  return props.customCSS;
});
var TooltipView = /*#__PURE__*/React__default.forwardRef(function (props, forwardedRef) {
  var _props$text = props.text,
      text = _props$text === void 0 ? "" : _props$text,
      _props$direction = props.direction,
      direction = _props$direction === void 0 ? "top" : _props$direction,
      _props$showTooltip = props.showTooltip,
      showTooltip = _props$showTooltip === void 0 ? false : _props$showTooltip,
      children = props.children,
      _props$maxWidth = props.maxWidth,
      maxWidth = _props$maxWidth === void 0 ? "" : _props$maxWidth,
      _props$customCSS = props.customCSS,
      customCSS = _props$customCSS === void 0 ? {} : _props$customCSS,
      rest = _objectWithoutPropertiesLoose(props, _excluded$6);

  return React__default.createElement(WrapperDiv, Object.assign({}, rest, {
    ref: forwardedRef
  }), children, showTooltip && React__default.createElement(TooltipDiv, {
    maxWidth: maxWidth,
    customCSS: customCSS,
    className: direction
  }, text));
});
/**
 * @deprecated use {@link TooltipView} instead
 */

var Tooltip = TooltipView;

var _templateObject$f, _templateObject2$a, _templateObject3$a, _templateObject4$6, _templateObject5$4;
var CSSVariables = /*#__PURE__*/createGlobalStyle(_templateObject$f || (_templateObject$f = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n:root {\n  /* font-size: 16px; */\n\n  /* ~~~ Colors ~~~ */\n\n  /* Surface */\n  --sq-surface: #ffffff;\n  --sq-surface-subdued: #f6f6f6;\n  --sq-background: #f9f9f9;\n\n  /* On Surface */\n  --sq-text: #575757;\n  --sq-text-dark: #232323;\n  --sq-text-subdued: #858585;\n  --sq-border: #e2e2e2;\n\n  /* Top Nav Bar */\n  --sq-nav-surface-primary: #003b45;\n  --sq-nav-text-on-primary: #ffffff;\n  --sq-nav-text-on-primary-subdued: #999999;\n  --sq-nav-surface-secondary: #ffffff;\n  --sq-nav-text-on-secondary: #003b45;\n  --sq-nav-text-on-secondary-subdued: #7c7c7c;\n\n  /* Primary */\n  --sq-action-primary: #f49c20;\n  --sq-action-primary-hovered: #dc8f32;\n  --sq-text-on-primary: #ffffff;\n  --sq-action-primary-disabled: #e2e2e2;\n\n  /* Secondary */\n  --sq-action-secondary: #ffffff;\n  --sq-action-secondary-hovered: #a6b9bd;\n  --sq-action-secondary-border: #a6b9bd;\n  --sq-text-on-secondary: #575757;\n  --sq-text-on-secondary-hovered: #ffffff;\n  --sq-placeholder-text-on-secondary: #bdbdbd;\n\n  /* Success */\n  --sq-surface-success: #57ac59;\n  --sq-surface-success-hovered: #479449;\n  --sq-surface-success-subdued: #e4fce3;\n  --sq-border-success: #57ac59;\n\n  /* Warning */\n  --sq-surface-warning: #f1c359;\n  --sq-surface-warning-subdued: #fcf8e3;\n  --sq-border-warning: #f1c359;\n\n  /* Critical */\n  --sq-surface-critical: #fe6666;\n  --sq-surface-critical-hovered: #cb0000;\n  --sq-surface-critical-subdued: #faf2ee;\n  --sq-border-critical: #d14040;\n  --sq-on-surface-critical: #c71d06;\n\n  /* Interactive */\n  --sq-text-interactive: #0088cc;\n  --sq-text-interactive-hovered: #005580;\n  --sq-text-interactive-visited: #310A8F;\n  --sq-focused: #458edf;\n  --sq-icon-interactive: #0275fb;\n  --sq-surface-hover: #eef6ff;\n\n  /* Typography */\n  --sq-font-family-sans: \"Helvetica Neue\", Helvetica, sans-serif;\n  --sq-font-family-monospace: monospace;\n\n  --sq-font-weight-regular: 400;\n  --sq-font-weight-semibold: 600;\n  --sq-font-weight-bold: 700;\n\n  --sq-font-size-header-one: 26px;\n  --sq-font-size-header-two: 22px;\n  --sq-font-size-header-three: 18px;\n  --sq-font-size-regular: 14px;\n  --sq-font-size-small: 12px;\n  --sq-font-size-caption: 16px;\n\n  --sq-line-height-header-one: 28px;\n  --sq-line-height-header-two: 28px;\n  --sq-line-height-header-three: 20px;\n  --sq-line-height-regular: 20px;\n  --sq-line-height-caption: 16px;\n\n  /* Button */\n  --sq-font-size-button-small: 12px;\n  --sq-font-size-button-medium: 14px;\n  --sq-font-size-button-large: 18px;\n  --sq-line-height-button-small: 16px;\n  --sq-line-height-button-medium: 16px;\n  --sq-line-height-button-large: 18px;\n\n  /* Icon Sizes */\n  --sq-icon-size-small: 12px;\n  --sq-icon-size-medium: 20px;\n  --sq-icon-size-large: 36px;\n  --sq-icon-size-badge: 18px;\n\n  /* Avatar Sizes */\n  --sq-icon-size-avatar: 36px;\n  --sq-icon-size-avatar-large: 50px;\n  --sq-font-size-avatar: 24px;\n\n  /* Modal */\n  --sq-surface-modal-banner: #12c8d7;\n\n  /* Input */\n  --sq-surface-input-disabled: #ebebeb;\n  --sq-text-input-disabled: #bdbdbd;\n\n  /* Spacing */\n  --sq-spacing-xxx-small: 2px;\n  --sq-spacing-xx-small: 4px;\n  --sq-spacing-x-small: 8px;\n  --sq-spacing-small: 12px;\n  --sq-spacing-medium: 16px;\n  --sq-spacing-large: 20px;\n  --sq-spacing-x-large: 24px;\n  --sq-spacing-xx-large: 32px;\n  --sq-spacing-xxx-large: 48px;\n  --sq-spacing-xxxx-large: 64px;\n}\n"])));
var TextRules = /*#__PURE__*/createGlobalStyle(_templateObject2$a || (_templateObject2$a = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n*, *::before, *::after {\n  box-sizing: border-box;\n}\n\nbody{\n  line-height: var(--sq-line-height-regular);\n  font-family: var(--sq-font-family-sans);\n  color: var(--sq-text);\n  margin: 0;\n}\n\nh1{\n  font-size: var(--sq-font-size-header-one);\n  line-height: var(--sq-line-height-header-one);\n  font-weight: var(--sq-font-weight-bold);\n  font-family: var(--sq-font-family-sans);\n  color: var(--sq-text);\n}\n\nh2{\n  font-size: var(--sq-font-size-header-two);\n  line-height: var(--sq-line-height-header-two);\n  font-weight: var(--sq-font-weight-bold);\n  font-family: var(--sq-font-family-sans);\n  color: var(--sq-text);\n}\n\nh3{\n  font-size: var(--sq-font-size-header-three);\n  line-height: var(--sq-line-height-header-three);\n  font-weight: var(--sq-font-weight-bold);\n  font-family: var(--sq-font-family-sans);\n  color: var(--sq-text);\n}\n\np{\n  font-size: var(--sq-font-size-regular);\n  line-height: var(--sq-line-height-regular);\n  font-weight: var(--sq-font-weight-regular);\n  font-family: var(--sq-font-family-sans);\n  color: var(--sq-text);\n}\n\npre{\n  font-size: var(--sq-font-size-regular);\n  line-height: var(--sq-line-height-regular);\n  font-weight: var(--sq-font-weight-regular);\n  font-family: var(--sq-font-family-monospace);\n  color: var(--sq-text);\n}\n\na{\n  font-size: var(--sq-font-size-regular);\n  line-height: var(--sq-line-height-regular);\n  font-weight: var(--sq-font-weight-regular);\n  font-family: var(--sq-font-family-sans);\n  color: var(--sq-text-interactive);\n  text-decoration: none;\n  \n  &:visited{\n    color: var(--sq-text-interactive-visited)\n  }\n\n  &:hover{\n    color: var(--sq-text-interactive-hovered);\n  }\n}\n"])));
var LayoutRules = /*#__PURE__*/createGlobalStyle(_templateObject3$a || (_templateObject3$a = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  hr{\n    border: none;\n    border-top: 1px solid var(--sq-border);\n    margin: var(--sq-spacing-xx-large) 0;\n  }\n"])));
var ListRules = /*#__PURE__*/createGlobalStyle(_templateObject4$6 || (_templateObject4$6 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  ul, li {\n    color: var(--sq-text);\n    font-family: var(--sq-font-family-sans);\n    font-weight: var(--sq-font-weight-regular);\n    font-size: var(--sq-font-size-regular);\n    line-height: var(--sq-line-height-regular);\n  }\n"])));
var TableRules = /*#__PURE__*/createGlobalStyle(_templateObject5$4 || (_templateObject5$4 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  table {\n    color: var(--sq-text);\n    font-family: var(--sq-font-family-sans);\n    font-weight: var(--sq-font-weight-regular);\n    font-size: var(--sq-font-size-regular);\n    line-height: var(--sq-line-height-regular);\n  }\n"])));
var GlobalStyle = function GlobalStyle() {
  return React__default.createElement(React__default.Fragment, null, React__default.createElement(CSSVariables, null), React__default.createElement(TextRules, null), React__default.createElement(ListRules, null), React__default.createElement(LayoutRules, null), React__default.createElement(TableRules, null));
};

var _templateObject2$b, _templateObject3$b, _templateObject4$7, _templateObject5$5;
var CheckMark = /*#__PURE__*/styled.svg(_templateObject2$b || (_templateObject2$b = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  overflow: unset;\n  display: inline-block;\n  position: relative;\n  //   top: 1px;\n  //   left: 2px;\n  width: ", ";\n  height: ", ";\n  margin: -2px;\n  margin-left: 0.5px;\n  margin-right: 0.5px;\n  //   margin-right: 0px;\n\n  .path {\n    stroke-dasharray: 1000;\n    stroke-dashoffset: 0;\n    &.circle {\n      -webkit-animation: dash 0.9s ease-in-out;\n      animation: dash 0.9s ease-in-out;\n    }\n    &.line {\n      stroke-dashoffset: 1000;\n      -webkit-animation: dash 0.9s 0.35s ease-in-out forwards;\n      animation: dash 0.9s 0.35s ease-in-out forwards;\n    }\n    &.check {\n      stroke-dashoffset: -100;\n      -webkit-animation: dash-check 0.9s 0.35s ease-in-out forwards;\n      animation: dash-check 0.9s 0.35s ease-in-out forwards;\n    }\n  }\n\n  p {\n    text-align: center;\n    margin: 20px 0 60px;\n    font-size: 1.25em;\n    &.success {\n      color: #73af55;\n    }\n    &.error {\n      color: #d06079;\n    }\n  }\n\n  @-webkit-keyframes dash {\n    0% {\n      stroke-dashoffset: 1000;\n    }\n    100% {\n      stroke-dashoffset: 0;\n    }\n  }\n\n  @keyframes dash {\n    0% {\n      stroke-dashoffset: 1000;\n    }\n    100% {\n      stroke-dashoffset: 0;\n    }\n  }\n\n  @-webkit-keyframes dash-check {\n    0% {\n      stroke-dashoffset: -100;\n    }\n    100% {\n      stroke-dashoffset: 900;\n    }\n  }\n\n  @keyframes dash-check {\n    0% {\n      stroke-dashoffset: -100;\n    }\n    100% {\n      stroke-dashoffset: 900;\n    }\n  }\n"])), function (props) {
  return props.size;
}, function (props) {
  return props.size;
});
var rotate$1 = /*#__PURE__*/keyframes(_templateObject3$b || (_templateObject3$b = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n   from {      \n     transform: rotate(0deg);    \n    }    \n    to {      \n      transform: rotate(360deg);    \n    }\n"])));
var RingDefault$1 = /*#__PURE__*/styled.div(_templateObject4$7 || (_templateObject4$7 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  display: inline-block;\n\n  div {\n    box-sizing: border-box;\n    display: block;\n    position: absolute;\n    border-radius: 50%;\n    animation: ", " 1.7s cubic-bezier(0.5, 0, 0.5, 1) infinite;\n  }\n\n  div:nth-child(1) {\n    animation-delay: -0.45s;\n  }\n\n  div:nth-child(2) {\n    animation-delay: -0.3s;\n  }\n\n  div:nth-child(3) {\n    animation-delay: -0.15s;\n  }\n"])), rotate$1);
var ButtonSpinnerStyle = /*#__PURE__*/styled(RingDefault$1)(_templateObject5$5 || (_templateObject5$5 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  position: relative;\n\n  top: 2px;\n\n  ", "\n  ", "\n  ", "\n\n  div {\n    width: ", ";\n    height: ", ";\n    bottom: 50%;\n    border: 2px solid ", ";\n    border-color: ", " transparent transparent transparent;\n  }\n"])), function (props) {
  return props.size == "12px" ? "margin-right: 13px;" : "";
}, function (props) {
  return props.size == "13px" ? "margin-right: 14px;" : "";
}, function (props) {
  return props.size == "18px" ? "margin-right: 18px;" : "";
}, function (props) {
  return props.size;
}, function (props) {
  return props.size;
}, function (props) {
  return props.color;
}, function (props) {
  return props.color;
});
var loadingAnimation = function loadingAnimation(size, color) {
  return React__default.createElement(ButtonSpinnerStyle, {
    size: size,
    color: color
  }, React__default.createElement("div", null), React__default.createElement("div", null), React__default.createElement("div", null), React__default.createElement("div", null));
};
var successAnimation = function successAnimation(size) {
  return React__default.createElement(CheckMark, {
    version: "1.1",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 130.2 130.2",
    size: size
  }, React__default.createElement("circle", {
    className: "path circle",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "14",
    "stroke-miterlimit": "10",
    cx: "65.1",
    cy: "65.1",
    r: "62.1"
  }), React__default.createElement("polyline", {
    className: "path check",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "14",
    "stroke-linecap": "round",
    "stroke-miterlimit": "10",
    points: "100.2,40.2 51.5,88.8 29.8,67.5 "
  }));
};

var _templateObject$g, _templateObject2$c, _templateObject3$c, _templateObject4$8, _templateObject5$6, _templateObject6$2, _templateObject7$2, _templateObject8, _templateObject9, _templateObject10, _templateObject11, _templateObject12, _templateObject13, _templateObject14, _templateObject15, _templateObject16, _templateObject17, _templateObject18, _templateObject19, _templateObject20, _templateObject21, _templateObject22, _templateObject23;
var icon_size = {
  mini: "5px",
  small: "14px",
  medium: "16px",
  large: "22px"
};
var icon_only_size = {
  small: "var(--sq-icon-size-small)",
  medium: "var(--sq-icon-size-medium)",
  large: "var(--sq-icon-size-large)",
  mini: "var(--sq-icon-size-badge)"
};
var checkmark_anim = {
  small: "12px",
  medium: "13px",
  large: "18px"
};
var loading_anim = {
  small: "12px",
  medium: "13px",
  large: "18px"
};
var anim_padding = {
  small: 2,
  medium: 3,
  large: 4
}; // BASE BUTTON STYLING

var universal_base = /*#__PURE__*/css(_templateObject$g || (_templateObject$g = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  cursor: pointer;\n\n  border: none;\n  border-radius: 4px;\n\n  font-family: \"Helvetica Neue\", Helvetica, sans-serif;\n  font-weight: var(--sq-font-weight-bold);\n"]))); // PILL VARIANTS

var pill = /*#__PURE__*/css(_templateObject2$c || (_templateObject2$c = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  border-radius: 100px;\n"]))); // SIZE VARIANTS

var small = /*#__PURE__*/css(_templateObject3$c || (_templateObject3$c = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  padding: 3px 10.5px 2px;\n  font-size: var(--sq-font-size-button-small);\n  line-height: var(--sq-line-height-button-small);\n"])));
var medium = /*#__PURE__*/css(_templateObject4$8 || (_templateObject4$8 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  padding: 5px 16px;\n  font-size: var(--sq-font-size-button-medium);\n  line-height: var(--sq-line-height-button-medium);\n"])));
var large = /*#__PURE__*/css(_templateObject5$6 || (_templateObject5$6 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  padding: 7.5px 21px;\n  font-size: var(--sq-font-size-button-large);\n  line-height: var(--sq-line-height-button-large);\n"]))); // BUTTON PRIMARY VARIANTS

var primary = {
  base: /*#__PURE__*/css(_templateObject6$2 || (_templateObject6$2 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n    color: var(--sq-surface);\n    background: var(--sq-action-primary);\n    box-shadow: none;\n    border: none;\n\n    &:hover {\n      background: var(--sq-action-primary-hovered);\n    }\n\n    &:disabled {\n      cursor: not-allowed;\n      background: var(--sq-action-primary-disabled);\n      &:hover {\n        background: var(--sq-action-primary-disabled);\n      }\n    }\n  "]))),
  critical: /*#__PURE__*/css(_templateObject7$2 || (_templateObject7$2 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n    background: var(--sq-surface-critical);\n    &:hover {\n      background: var(--sq-surface-critical-hovered);\n    }\n  "]))),
  success: /*#__PURE__*/css(_templateObject8 || (_templateObject8 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n    background: var(--sq-surface-success);\n    &:hover {\n      background: var(--sq-surface-success-hovered);\n    }\n  "]))),
  loading: /*#__PURE__*/css(_templateObject9 || (_templateObject9 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n    cursor: wait;\n    background: var(--sq-action-primary-disabled);\n    &:hover {\n      background: var(--sq-action-primary-disabled);\n    }\n  "])))
}; // BUTTON SECONDARY VARIANTS

var secondary = {
  base: /*#__PURE__*/css(_templateObject10 || (_templateObject10 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n    box-shadow: inset 0 0 0 1px var(--sq-action-secondary-border);\n\n    color: var(--sq-text-on-secondary);\n    background: var(--sq-action-secondary);\n\n    &:hover {\n      color: var(--sq-text-on-secondary-hovered);\n      background: var(--sq-action-secondary-hovered);\n    }\n\n    &:disabled {\n      cursor: not-allowed;\n      color: var(--sq-action-primary-disabled);\n      box-shadow: inset 0 0 0 1px var(--sq-action-primary-disabled);\n      &:hover {\n        color: var(--sq-action-primary-disabled);\n        background: var(--sq-action-secondary);\n      }\n    }\n  "]))),
  critical: /*#__PURE__*/css(_templateObject11 || (_templateObject11 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n    color: var(--sq-surface-critical-hovered);\n    box-shadow: inset 0 0 0 1px var(--sq-surface-critical-hovered);\n    &:hover {\n      color: var(--sq-text-on-secondary-hovered);\n      background: var(--sq-surface-critical-hovered);\n    }\n  "]))),
  success: /*#__PURE__*/css(_templateObject12 || (_templateObject12 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n    color: var(--sq-surface-success-hovered);\n    box-shadow: inset 0 0 0 1px var(--sq-surface-success-hovered);\n    &:hover {\n      color: var(--sq-text-on-secondary-hovered);\n      background: var(--sq-surface-success-hovered);\n    }\n  "]))),
  loading: /*#__PURE__*/css(_templateObject13 || (_templateObject13 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n    cursor: wait;\n    color: var(--sq-action-primary-disabled);\n    box-shadow: inset 0 0 0 1px var(--sq-action-primary-disabled);\n    &:hover {\n      color: var(--sq-action-primary-disabled);\n      background: var(--sq-action-secondary);\n    }\n  "])))
}; // BUTTON TEXT VARIANTS

var text = {
  base: /*#__PURE__*/css(_templateObject14 || (_templateObject14 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n    border: none;\n    color: var(--sq-text);\n    background: none;\n\n    &:hover {\n      text-decoration: underline;\n    }\n\n    &:disabled {\n      cursor: not-allowed;\n      color: var(--sq-action-primary-disabled);\n      border-color: var(--sq-action-primary-disabled);\n      &:hover {\n        text-decoration: none;\n      }\n    }\n  "]))),
  critical: /*#__PURE__*/css(_templateObject15 || (_templateObject15 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n    color: var(--sq-surface-critical-hovered);\n  "]))),
  success: /*#__PURE__*/css(_templateObject16 || (_templateObject16 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n    color: var(--sq-surface-success-hovered);\n  "])))
}; // export const text_small = css`
//   font-size: var(--sq-font-size-button-small);
//   line-height: var(--sq-line-height-button-small);
// `;
// export const text_medium = css`
//   font-size: var(--sq-font-size-button-medium);
//   line-height: var(--sq-line-height-button-medium);
// `;
// export const text_large = css`
//   font-size: var(--sq-font-size-button-large);
//   line-height: var(--sq-line-height-button-large);
// `;
// BUTTON ICON VARIANTS

var icon = {
  base: /*#__PURE__*/css(_templateObject17 || (_templateObject17 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n    cursor: pointer;\n\n    padding: 0;\n\n    border: none;\n    border-radius: 4px;\n    border: 1px solid var(--sq-action-secondary-border);\n\n    color: var(--sq-text-on-secondary);\n    background: var(--sq-action-secondary);\n\n    &:hover {\n      color: var(--sq-text-on-secondary-hovered);\n      background: var(--sq-action-secondary-hovered);\n    }\n\n    &:disabled {\n      cursor: not-allowed;\n      color: var(--sq-action-primary-disabled);\n      border-color: var(--sq-action-primary-disabled);\n      &:hover {\n        color: var(--sq-action-primary-disabled);\n        background: var(--sq-action-secondary);\n      }\n    }\n  "]))),
  mini: /*#__PURE__*/css(_templateObject18 || (_templateObject18 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n    width: 20px;\n    height: 20px;\n  "]))),
  small: /*#__PURE__*/css(_templateObject19 || (_templateObject19 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n    width: 36px;\n    height: 36px;\n  "]))),
  medium: /*#__PURE__*/css(_templateObject20 || (_templateObject20 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n    width: 44px;\n    height: 44px;\n  "]))),
  large: /*#__PURE__*/css(_templateObject21 || (_templateObject21 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n    width: 76px;\n    height: 76px;\n  "]))),
  circle: /*#__PURE__*/css(_templateObject22 || (_templateObject22 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n    border-radius: 100px;\n  "]))),
  borderless: /*#__PURE__*/css(_templateObject23 || (_templateObject23 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n    border: none;\n    background: transparent;\n    &:hover {\n      color: var(--sq-action-secondary-border);\n      background: var(--sq-action-secondary);\n    }\n    &:disabled:hover {\n      background: transparent;\n    }\n  "])))
};

var Styles$2 = {
  __proto__: null,
  icon_size: icon_size,
  icon_only_size: icon_only_size,
  checkmark_anim: checkmark_anim,
  loading_anim: loading_anim,
  anim_padding: anim_padding,
  universal_base: universal_base,
  pill: pill,
  small: small,
  medium: medium,
  large: large,
  primary: primary,
  secondary: secondary,
  text: text,
  icon: icon
};

var _excluded$7 = ["buttonType", "pill", "loading", "critical", "success", "icon", "iconLocation", "size", "children", "customCSS"];

var _templateObject$h;
var StyledButton = /*#__PURE__*/styled.button(_templateObject$h || (_templateObject$h = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  ", "\n  ", "\n  ", "\n  ", "\n  ", "\n  ", "\n  ", "\n  ", "\n  ", "\n  ", "\n"])), universal_base, function (props) {
  return Styles$2[props.buttonType].base;
}, function (props) {
  return props.pill && pill;
}, function (props) {
  return props.size == "small" && small;
}, function (props) {
  return props.size == "medium" && medium;
}, function (props) {
  return props.size == "large" && large;
}, function (props) {
  return props.critical && Styles$2[props.buttonType].critical;
}, function (props) {
  return props.success && Styles$2[props.buttonType].success;
}, function (props) {
  return props.isLoading && props.buttonType != "text" && Styles$2[props.buttonType].loading;
}, function (props) {
  return props.customCSS;
});
var ButtonView = /*#__PURE__*/forwardRef(function (props, forwardedRef) {
  var _props$buttonType = props.buttonType,
      buttontype = _props$buttonType === void 0 ? "primary" : _props$buttonType,
      _props$pill = props.pill,
      pill = _props$pill === void 0 ? false : _props$pill,
      _props$loading = props.loading,
      loading = _props$loading === void 0 ? false : _props$loading,
      _props$critical = props.critical,
      critical = _props$critical === void 0 ? false : _props$critical,
      _props$success = props.success,
      success = _props$success === void 0 ? false : _props$success,
      icon = props.icon,
      _props$iconLocation = props.iconLocation,
      iconLocation = _props$iconLocation === void 0 ? "left" : _props$iconLocation,
      _props$size = props.size,
      size = _props$size === void 0 ? "medium" : _props$size,
      children = props.children,
      _props$customCSS = props.customCSS,
      customCSS = _props$customCSS === void 0 ? {} : _props$customCSS,
      rest = _objectWithoutPropertiesLoose(props, _excluded$7);

  return createElement(StyledButton, Object.assign({}, rest, {
    buttonType: buttontype,
    pill: pill,
    isLoading: loading,
    critical: critical,
    success: success,
    size: size,
    ref: forwardedRef,
    customCSS: customCSS
  }), iconLocation == "left" && icon && createElement(IconView, {
    icon: icon,
    size: icon_size[size]
  }), createElement("span", null, " ", children, " "), iconLocation == "right" && icon && createElement(IconView, {
    icon: icon,
    size: icon_size[size]
  }), loading && props.buttonType != "text" && createElement(Fragment, null, children && createElement("span", {
    style: {
      padding: anim_padding[size]
    }
  }), loadingAnimation(loading_anim[size], buttontype == "primary" ? "var(--sq-action-primary)" : "var(--sq-action-secondary-border)")), buttontype == "primary" && success && createElement(Fragment, null, children && createElement("span", {
    style: {
      padding: anim_padding[size]
    }
  }), successAnimation(checkmark_anim[size])));
});
/**
 * @deprecated use {@link ButtonView} instead
 */

var Button = ButtonView;

var _excluded$8 = ["icon", "borderless", "primary", "circle", "size", "children", "icon_css", "customCSS"];

var _templateObject$i;
var StyledButton$1 = /*#__PURE__*/styled.button(_templateObject$i || (_templateObject$i = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  ", "\n  ", "\n  ", "\n  ", "\n  ", "\n  ", "\n"])), icon.base, function (props) {
  return props.borderless && icon.borderless;
}, function (props) {
  return props.circle && icon.circle;
}, function (props) {
  return props.primary && primary.base;
}, function (props) {
  return props.size == "mini" && icon[props.size];
}, function (props) {
  return props.customCSS;
});
var IconButtonView = /*#__PURE__*/forwardRef(function (props, forwardedRef) {
  var icon = props.icon,
      _props$borderless = props.borderless,
      borderless = _props$borderless === void 0 ? false : _props$borderless,
      _props$primary = props.primary,
      primary = _props$primary === void 0 ? false : _props$primary,
      _props$circle = props.circle,
      circle = _props$circle === void 0 ? false : _props$circle,
      _props$size = props.size,
      size = _props$size === void 0 ? "medium" : _props$size,
      _props$icon_css = props.icon_css,
      icon_css = _props$icon_css === void 0 ? {} : _props$icon_css,
      _props$customCSS = props.customCSS,
      customCSS = _props$customCSS === void 0 ? {} : _props$customCSS,
      rest = _objectWithoutPropertiesLoose(props, _excluded$8);

  return createElement(StyledButton$1, Object.assign({}, rest, {
    circle: circle,
    primary: primary,
    borderless: borderless,
    size: size,
    ref: forwardedRef,
    customCSS: customCSS
  }), createElement(IconView, {
    icon: icon,
    size: icon_only_size[size],
    customCSS: icon_css
  }));
});
/**
 * @deprecated use {@link IconButtonView} instead
 */

var IconButton = IconButtonView;

var _templateObject$j, _templateObject2$d, _templateObject3$d, _templateObject4$9, _templateObject5$7, _templateObject6$3, _templateObject7$3, _templateObject8$1;
var disabled_color = /*#__PURE__*/css(_templateObject$j || (_templateObject$j = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  user-select: none;\n  cursor: not-allowed;\n  pointer-events: none;\n  color: var(--sq-text-subdued);\n"])));
var disabled_bg = /*#__PURE__*/css(_templateObject2$d || (_templateObject2$d = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  user-select: none;\n  cursor: not-allowed;\n  pointer-events: none;\n  background: var(--sq-surface-input-disabled);\n  box-shadow: 0 0 0 1px var(--sq-border);\n"])));
var CheckboxLabelStyle = /*#__PURE__*/css(_templateObject3$d || (_templateObject3$d = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  user-select: none;\n  display: inline-flex;\n  align-items: center;\n  cursor: pointer;\n  color: var(--sq-text);\n  font-family: \"Helvetica Neue\", Helvetica, sans-serif;\n  font-size: var(--sq-font-size-regular);\n  font-weight: var(--sq-font-weight-regular);\n  line-height: var(--sq-line-height-regular);\n"])));
var CheckboxTickStyle = /*#__PURE__*/css(_templateObject4$9 || (_templateObject4$9 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  position: absolute;\n  color: inherit;\n  width: 20px;\n  height: 20px;\n  transition: transform 0.1s;\n  transform: scale(0);\n"])));
var CheckboxInputStyle = /*#__PURE__*/css(_templateObject5$7 || (_templateObject5$7 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  display: none;\n\n  &:checked + div > div {\n    transform: scale(1);\n  }\n"])));
var CheckboxStyle = /*#__PURE__*/css(_templateObject6$3 || (_templateObject6$3 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  display: flex;\n  width: 16px;\n  height: 16px;\n  align-items: center;\n  justify-content: center;\n  box-shadow: 0 0 0 1px var(--sq-text);\n  margin-right: 18px;\n  flex-shrink: 0;\n  border-radius: 2px;\n\n  &:hover {\n    box-shadow: 0 0 0 2px var(--sq-text);\n  }\n"])));
var checked_border = /*#__PURE__*/css(_templateObject7$3 || (_templateObject7$3 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  &:checked + div {\n    box-shadow: 0 0 0 2px var(--sq-text);\n  }\n"])));
var checked_disabled = /*#__PURE__*/css(_templateObject8$1 || (_templateObject8$1 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  &:checked + div {\n    box-shadow: 0 0 0 2px var(--sq-text-subdued);\n  }\n"])));

var _excluded$9 = ["id", "value", "onChange", "label", "disabled", "name"];

var _templateObject$k, _templateObject2$e, _templateObject3$e, _templateObject4$a, _templateObject5$8;
var ShadowDom$1 = /*#__PURE__*/styled(root$1.div)(_templateObject$k || (_templateObject$k = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  display: contents;\n"])));
var CheckboxLabel = /*#__PURE__*/styled.label(_templateObject2$e || (_templateObject2$e = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  ", "\n  ", "\n"])), CheckboxLabelStyle, function (props) {
  return props.isDisabled && disabled_color;
});
var CheckboxTick = /*#__PURE__*/css(_templateObject3$e || (_templateObject3$e = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  ", "\n"])), CheckboxTickStyle);
var CheckboxInput = /*#__PURE__*/styled.input(_templateObject4$a || (_templateObject4$a = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  ", "\n  ", "\n"])), CheckboxInputStyle, function (props) {
  return props.isDisabled == true ? checked_disabled : checked_border;
});
var CheckboxDiv = /*#__PURE__*/styled.div(_templateObject5$8 || (_templateObject5$8 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  ", "\n  ", "\n"])), CheckboxStyle, function (props) {
  return props.isDisabled && disabled_bg;
});
var CheckboxView = /*#__PURE__*/forwardRef(function (props, forwardedRef) {
  var id = props.id,
      value = props.value,
      onChange = props.onChange,
      _props$label = props.label,
      label = _props$label === void 0 ? "" : _props$label,
      disabled = props.disabled,
      rest = _objectWithoutPropertiesLoose(props, _excluded$9);

  return createElement(ShadowDom$1, null, createElement(CheckboxLabel, {
    htmlFor: id,
    isDisabled: disabled
  }, createElement(CheckboxInput, Object.assign({}, rest, {
    checked: value,
    type: "checkbox",
    isDisabled: disabled,
    id: id,
    ref: forwardedRef,
    onChange: onChange
  })), createElement(CheckboxDiv, {
    isDisabled: disabled
  }, createElement(IconView, {
    icon: "checkmark",
    customCSS: CheckboxTick
  })), label ? label : ""));
});
/**
 * @deprecated use {@link CheckboxView} instead
 */

var Checkbox = CheckboxView;

function RJSFCheckbox(props) {
  var options = props.options;
  return React__default.createElement(CheckboxView, Object.assign({
    id: props.id
  }, options, {
    value: props.value,
    required: props.required,
    onChange: function onChange(e) {
      return props.onChange(e.target.checked);
    },
    disabled: props.disabled,
    label: props.label
  }));
}

var _templateObject$l, _templateObject2$f, _templateObject3$f;
var RadioLabelStyle = /*#__PURE__*/css(_templateObject$l || (_templateObject$l = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  display: flex;\n  flex-direction: row;\n  align-items: flex-start;\n  margin-right: 10px;\n  user-select: none;\n  cursor: pointer;\n  color: var(--sq-text);\n  font-family: \"Helvetica Neue\", Helvetica, sans-serif;\n  font-weight: var(--sq-font-weight-regular);\n  font-size: var(--sq-font-size-regular);\n  line-height: var(--sq-line-height-regular);\n"])));
var RadioInputStyle = /*#__PURE__*/css(_templateObject2$f || (_templateObject2$f = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  display: none;\n\n  &:checked + div {\n    border-color: var(--sq-action-primary);\n  }\n\n  &:checked + div::after {\n    transform: scale(1);\n  }\n"])));
var RadioButtonStyle = /*#__PURE__*/css(_templateObject3$f || (_templateObject3$f = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  margin-top: 2.5px;\n  width: 14px;\n  height: 14px;\n  border: 1.5px solid var(--sq-text);\n  border-radius: 50%;\n  margin-right: 20px;\n  box-sizing: border-box;\n  padding: 1.5px;\n  flex-shrink: 0;\n\n  &::after {\n    content: \"\";\n    width: 8px;\n    height: 8px;\n    display: block;\n    background: var(--sq-action-primary);\n    border-radius: 100%;\n    transform: scale(0);\n    transition: transform 0.15s;\n  }\n"])));

var _excluded$a = ["value", "onChange", "label", "customLabelCSS"];

var _templateObject2$g, _templateObject3$g, _templateObject4$b;
var RadioLabel = /*#__PURE__*/styled.label(_templateObject2$g || (_templateObject2$g = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  ", "\n  ", "\n"])), RadioLabelStyle, function (props) {
  return props.customLabelCSS;
});
var RadioInput = /*#__PURE__*/styled.input(_templateObject3$g || (_templateObject3$g = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  ", "\n"])), RadioInputStyle);
var RadioButtonDiv = /*#__PURE__*/styled.div(_templateObject4$b || (_templateObject4$b = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  ", "\n"])), RadioButtonStyle);
var RadioView = /*#__PURE__*/forwardRef(function (props, forwardRef) {
  var value = props.value,
      onChange = props.onChange,
      label = props.label,
      _props$customLabelCSS = props.customLabelCSS,
      customLabelCSS = _props$customLabelCSS === void 0 ? {} : _props$customLabelCSS,
      rest = _objectWithoutPropertiesLoose(props, _excluded$a);

  return createElement(RadioLabel, {
    customLabelCSS: customLabelCSS,
    htmlFor: rest.id
  }, createElement(RadioInput, Object.assign({}, rest, {
    type: "radio",
    checked: value,
    onChange: onChange,
    ref: forwardRef
  })), createElement(RadioButtonDiv, null), label ? label : "");
});
/**
 * @deprecated use {@link RadioView} instead
 */

var Radio = RadioView;

function isEnumOption(option) {
  return typeof option === "object" && option !== null && option.hasOwnProperty("label") && option.hasOwnProperty("value");
}

function isEnumArray(options) {
  return Array.isArray(options);
}

var RJSFRadio = function RJSFRadio(props) {
  var _props$options;

  var valueOptions = props == null ? void 0 : (_props$options = props.options) == null ? void 0 : _props$options.enumOptions;

  if (!isEnumArray(valueOptions)) {
    return React__default.createElement(React__default.Fragment, null);
  }

  var dummyRef = useRef(null);
  return React__default.createElement("div", {
    id: props.id
  }, valueOptions == null ? void 0 : valueOptions.map(function (option) {
    if (!isEnumOption(option)) {
      return React__default.createElement(React__default.Fragment, null);
    }

    return React__default.createElement(RadioView, {
      ref: dummyRef,
      key: props.id + option.value,
      label: option.label,
      name: props.id,
      required: props.required,
      value: props.value == option.value,
      disabled: props.disabled,
      onChange: function onChange() {
        return props.onChange(option.value);
      }
    });
  }));
};

var _templateObject$m, _templateObject2$h, _templateObject3$h, _templateObject4$c;
var InputBoxStyle = /*#__PURE__*/css(_templateObject$m || (_templateObject$m = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  position: relative;\n  width: 100%;\n  box-sizing: border-box;\n  height: 36px;\n  text-indent: 6px;\n  color: var(--sq-text);\n  background: var(--sq-surface);\n  font-family: \"Helvetica Neue\", Helvetica, sans-serif;\n  font-size: var(--sq-font-size-regular);\n  font-weight: var(--sq-font-weight-regular);\n  line-height: var(--sq-line-height-regular);\n\n  border: 2px solid var(--sq-border);\n  border-radius: 4px;\n\n  &::placeholder {\n    color: var(--sq-text-input-disabled);\n  }\n\n  &:focus {\n    outline: none;\n    border-color: var(--sq-focused);\n  }\n\n  &:disabled {\n    user-select: none;\n    color: var(--sq-text-input-disabled);\n    background-color: var(--sq-surface-input-disabled);\n  }\n\n  &::-webkit-inner-spin-button {\n    opacity: 1;\n    margin-right: 10px;\n    padding: 10px 1px 10px 1px;\n  }\n"])));
var ExtrasDiv = /*#__PURE__*/css(_templateObject2$h || (_templateObject2$h = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  position: absolute;\n  top: 8px;\n  display: inline-flex;\n"])));
var invalid = /*#__PURE__*/css(_templateObject3$h || (_templateObject3$h = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  background: var(--sq-surface-critical-subdued);\n  border: 2px solid var(--sq-border-critical);\n  border-radius: 4px;\n\n  &:focus {\n    outline: none;\n    border-color: var(--sq-border-critical);\n  }\n"])));
var Container = /*#__PURE__*/css(_templateObject4$c || (_templateObject4$c = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  display: inline-block;\n  width: 100%;\n  position: relative;\n  height: auto;\n"])));

var _excluded$b = ["icon", "position", "type", "buttons", "errors", "customCSS", "customContainerCSS", "limitWidth", "required"];

var _templateObject$n, _templateObject2$i, _templateObject3$i, _templateObject4$d;
var ShadowDom$2 = /*#__PURE__*/styled(root$1.div)(_templateObject$n || (_templateObject$n = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  display: contents;\n"])));
var StyledInput = /*#__PURE__*/styled.input(_templateObject2$i || (_templateObject2$i = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  ", "\n  ", "\n  ", "\n  ", "\n  ", "\n"])), InputBoxStyle, function (props) {
  return props.isInvalid ? invalid : "";
}, function (props) {
  return props.hasIcon && "padding-right: var(--sq-spacing-xxx-large);";
}, function (props) {
  return props.position == "left" ? "text-indent: 40px;" : "";
}, function (props) {
  return props.customCSS;
});
var ExtrasDiv$1 = /*#__PURE__*/styled.div(_templateObject3$i || (_templateObject3$i = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  ", "\n  ", "\n"])), ExtrasDiv, function (props) {
  return props.position == "left" ? "left: 1px;" : "right: 10px;";
});
var ContainerDiv = /*#__PURE__*/styled.div(_templateObject4$d || (_templateObject4$d = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  ", "\n  ", "\n  ", "\n"])), Container, function (props) {
  return props.limitWidth ? typeof props.limitWidth === "string" ? "max-width: " + props.limitWidth + ";" : "max-width: 300px;" : "max-width: 100%;";
}, function (props) {
  return props.customContainerCSS;
});
var InputView = /*#__PURE__*/React__default.forwardRef(function (props, forwardedRef) {
  var icon = props.icon,
      _props$position = props.position,
      position = _props$position === void 0 ? "right" : _props$position,
      _props$type = props.type,
      type = _props$type === void 0 ? "text" : _props$type,
      _props$buttons = props.buttons,
      buttons = _props$buttons === void 0 ? false : _props$buttons,
      rawErrors = props.errors,
      _props$customCSS = props.customCSS,
      customCSS = _props$customCSS === void 0 ? {} : _props$customCSS,
      _props$customContaine = props.customContainerCSS,
      customContainerCSS = _props$customContaine === void 0 ? {} : _props$customContaine,
      _props$limitWidth = props.limitWidth,
      limitWidth = _props$limitWidth === void 0 ? true : _props$limitWidth,
      _props$required = props.required,
      required = _props$required === void 0 ? false : _props$required,
      rest = _objectWithoutPropertiesLoose(props, _excluded$b);

  return React__default.createElement(ShadowDom$2, null, React__default.createElement(ContainerDiv, {
    customContainerCSS: customContainerCSS,
    limitWidth: limitWidth
  }, React__default.createElement(StyledInput, Object.assign({}, rest, {
    type: type,
    position: position,
    ref: forwardedRef,
    isInvalid: rawErrors,
    customCSS: customCSS,
    hasIcon: icon || buttons ? true : false,
    required: required
  })), icon && React__default.createElement(ExtrasDiv$1, {
    position: position
  }, React__default.createElement(IconView, {
    icon: icon,
    size: "22px",
    color: "var(--sq-text-subdued)"
  })), React__default.createElement(ExtrasDiv$1, {
    position: position
  }, buttons)));
});
/**
 * @deprecated use {@link InputView} instead
 */

var Input = InputView;

function RJSFInput(props) {
  var options = props.options;
  return React__default.createElement(InputView, Object.assign({
    id: props.id
  }, options, {
    value: props.value,
    onChange: function onChange(e) {
      return props.onChange(e.target.value);
    },
    disabled: props.disabled,
    errors: props.rawErrors && !!props.rawErrors.length,
    required: props.required
  }));
}
function RJSFNumericalInput(props) {
  var options = props.options;
  return React__default.createElement(InputView, Object.assign({
    id: props.id
  }, options, {
    value: props.value,
    type: "number",
    onChange: function onChange(e) {
      return props.onChange(e.target.value);
    },
    disabled: props.disabled,
    errors: props.rawErrors && !!props.rawErrors.length,
    required: props.required
  }));
}
function RJSFPasswordInput(props) {
  var _useState = useState("password"),
      type = _useState[0],
      setType = _useState[1];

  var options = props.options;
  return React__default.createElement(InputView, Object.assign({
    id: props.id
  }, options, {
    type: type,
    value: props.value,
    onChange: function onChange(e) {
      return props.onChange(e.target.value);
    },
    errors: props.rawErrors && !!props.rawErrors.length,
    disabled: props.disabled,
    required: props.required,
    buttons: React__default.createElement(IconButton, {
      icon: "visibility",
      size: "mini",
      icon_css: "height: 20px; width: 20px",
      borderless: true,
      onClick: function onClick() {
        setType(type == "text" ? "password" : "text");
      }
    })
  }));
}
function RJSFLockableInput(props) {
  var _useState2 = useState(props.disabled),
      locked = _useState2[0],
      setLocked = _useState2[1];

  var options = props.options;
  return React__default.createElement(InputView, Object.assign({
    id: props.id
  }, options, {
    value: props.value,
    onChange: function onChange(e) {
      return props.onChange(e.target.value);
    },
    disabled: locked,
    errors: props.rawErrors && !!props.rawErrors.length,
    required: props.required,
    buttons: React__default.createElement(IconButton, {
      icon: "edit",
      size: "mini",
      icon_css: "height: 20px; width: 20px",
      borderless: true,
      onClick: function onClick() {
        setLocked(!locked);
      }
    })
  }));
}
function RJSFClearableInput(props) {
  var options = props.options;
  return React__default.createElement(InputView, Object.assign({
    id: props.id
  }, options, {
    value: props.value,
    onChange: function onChange(e) {
      return props.onChange(e.target.value);
    },
    disabled: props.disabled,
    errors: props.rawErrors && !!props.rawErrors.length,
    required: props.required,
    buttons: React__default.createElement(IconButton, {
      disabled: props.disabled,
      icon: "close",
      size: "mini",
      icon_css: "height: 20px; width: 20px",
      borderless: true,
      onClick: function onClick() {
        props.onChange("");
      }
    })
  }));
}
function RJSFCancellableInput(props) {
  var _useState3 = useState(props.value),
      oldValue = _useState3[0],
      setOldValue = _useState3[1];

  var _useState4 = useState(props.disabled),
      locked = _useState4[0],
      setLocked = _useState4[1];

  var options = props.options;
  return React__default.createElement(InputView, Object.assign({
    id: props.id
  }, options, {
    value: props.value,
    onChange: function onChange(e) {
      return props.onChange(e.target.value);
    },
    disabled: locked,
    errors: props.rawErrors && !!props.rawErrors.length,
    required: props.required,
    buttons: locked == true ? React__default.createElement(IconButton, {
      icon: "edit",
      size: "mini",
      primary: true,
      onClick: function onClick() {
        setLocked(false);
      }
    }) : React__default.createElement(React__default.Fragment, null, React__default.createElement(IconButton, {
      icon: "checkmark",
      size: "mini",
      css: "margin-right: 4px;",
      primary: true,
      onClick: function onClick() {
        setOldValue(props.value);
        setLocked(true);
      }
    }), React__default.createElement(IconButton, {
      icon: "close",
      size: "mini",
      icon_css: "color: #858585;",
      onClick: function onClick() {
        props.onChange(oldValue);
        setLocked(true);
      }
    }))
  }));
}

var _templateObject$o, _templateObject2$j, _templateObject3$j, _templateObject4$e, _templateObject5$9, _templateObject6$4, _templateObject7$4, _templateObject8$2;
var Item = /*#__PURE__*/css(_templateObject$o || (_templateObject$o = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  padding: var(--sq-spacing-x-small);\n  cursor: pointer;\n  color: var(--sq-text);\n  font-family: var(--sq-font-family-sans);\n  font-size: var(--sq-font-size-regular);\n  font-weight: var(--sq-font-weight-regular);\n  line-height: var(--sq-line-height-regular);\n  border-radius: inherit;\n  &:hover {\n    background: var(--sq-surface-hover);\n  }\n"])));
var ItemContainer = /*#__PURE__*/css(_templateObject2$j || (_templateObject2$j = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  position: absolute;\n  z-index: 100;\n  box-sizing: border-box;\n  list-style-type: none;\n  width: 100%;\n  padding: 0;\n  margin: 0;\n  background: var(--sq-surface);\n  border: 2px solid var(--sq-focused);\n  border-radius: 0 0 4px 4px;\n  border-top: none;\n  top: 33px;\n  outline: none;\n  overflow-y: auto;\n\n  &:empty {\n    border: none;\n  }\n"])));
var ButtonContainer = /*#__PURE__*/css(_templateObject3$j || (_templateObject3$j = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  position: absolute;\n  right: 100%;\n  display: flex;\n  align-items: center;\n  text-indent: 0px;\n  padding-right: var(--sq-spacing-small);\n  right: 4px;\n  top: 10px;\n  & > :not(:last-child) {\n    margin-right: var(--sq-spacing-x-small);\n  }\n"])));
var ItemDescription = /*#__PURE__*/css(_templateObject4$e || (_templateObject4$e = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  color: var(--sq-text-subdued);\n  font-size: var(--sq-font-size-small);\n"])));
var Container$1 = /*#__PURE__*/css(_templateObject5$9 || (_templateObject5$9 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  display: inline-block;\n  width: 100%;\n  position: relative;\n"])));
var SelectInputStyle = /*#__PURE__*/css(_templateObject6$4 || (_templateObject6$4 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  cursor: pointer;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  width: 100%;\n  height: 36px;\n  box-sizing: border-box;\n  text-indent: 6px;\n  color: var(--sq-text);\n  background: var(--sq-surface);\n  font-family: \"Helvetica Neue\", Helvetica, sans-serif;\n  font-size: var(--sq-font-size-regular);\n  font-weight: var(--sq-font-weight-regular);\n  line-height: var(--sq-line-height-regular);\n  border: 2px solid var(--sq-border);\n  border-radius: 4px;\n  padding: 1px 8px;\n\n  &:focus {\n    border-color: var(--sq-focused);\n  }\n"])));
var SelectedValue = /*#__PURE__*/css(_templateObject7$4 || (_templateObject7$4 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  padding-top: var(--sq-spacing-xxx-small);\n  margin: auto 0;\n  text-indent: 0px;\n  text-overflow: ellipsis;\n  overflow: hidden;\n  white-space: nowrap;\n"])));
var ButtonDiv = /*#__PURE__*/css(_templateObject8$2 || (_templateObject8$2 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  display: flex;\n  align-items: center;\n  text-indent: 0px;\n  padding: 2px 4px 0px;\n  margin: auto 0;\n\n  & > :not(:last-child) {\n    margin-right: var(--sq-spacing-xx-small);\n  }\n"])));

var _excluded$c = ["customCSS", "customContainerCSS", "disabled", "errors", "clearable", "loading", "placeholder", "limitWidth", "limitHeight", "functional", "items", "itemToString", "itemToNode"];

var _templateObject$p, _templateObject2$k, _templateObject3$k, _templateObject4$f, _templateObject5$a, _templateObject6$5, _templateObject7$5, _templateObject8$3;

function isComplexItem(item) {
  return typeof item === "object" && item !== null;
}

var ItemContainerList = /*#__PURE__*/styled.ul(_templateObject$p || (_templateObject$p = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  ", "\n  ", "\n  ", "\n  ", "\n"])), ItemContainer, function (props) {
  return props.errors && "border-color: var(--sq-border-critical); background-color: var(--sq-surface-critical-subdued);";
}, function (props) {
  return props.limitWidth ? typeof props.limitWidth === "string" ? "max-width: " + props.limitWidth + ";" : "max-width: 300px;" : "max-width: 100%;";
}, function (props) {
  return props.limitHeight ? typeof props.limitHeight === "string" ? "max-height: " + props.limitHeight + ";" : "max-height: 200px;" : "max-height: auto;";
});
var ListItem = /*#__PURE__*/styled("li")(_templateObject2$k || (_templateObject2$k = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  ", "\n"])), Item);
var ButtonContainerDiv = /*#__PURE__*/styled.div(_templateObject3$k || (_templateObject3$k = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  ", "\n"])), ButtonContainer);
var ItemDescriptionSpan = /*#__PURE__*/styled("span")(_templateObject4$f || (_templateObject4$f = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  ", "\n"])), ItemDescription);
var ContainerDiv$1 = /*#__PURE__*/styled("div")(_templateObject5$a || (_templateObject5$a = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  ", "\n  ", "\n  ", "\n"])), Container$1, function (props) {
  return props.limitWidth ? typeof props.limitWidth === "string" ? "max-width: " + props.limitWidth + ";" : "max-width: 300px;" : "max-width: 100%;";
}, function (props) {
  return props.customContainerCSS;
});
var SelectInputDiv = /*#__PURE__*/styled.div(_templateObject6$5 || (_templateObject6$5 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  ", "\n  ", "\n  ", "\n  ", "\n\n  ", "\n\n  ", "\n\n  ", "\n"])), SelectInputStyle, function (props) {
  return props.disabled && "background: var(--sq-surface-input-disabled); cursor: default;";
}, function (props) {
  return props.isOpen && !props.disabled && "border-color: var(--sq-focused);";
}, function (props) {
  return !props.isOpen && !props.disabled && "&:hover{\n    border-color: " + (props.errors ? "var(--sq-surface-critical-hovered)" : "var(--sq-action-secondary-border)") + " ;\n  }";
}, function (props) {
  return !props.disabled && "&:focus {\n    border-color: var(--sq-focused);\n  }";
}, function (props) {
  return props.errors && "border-color: var(--sq-border-critical); background: var(--sq-surface-critical-subdued);";
}, function (props) {
  return props.customCSS;
});
var SelectedValueSpan = /*#__PURE__*/styled.span(_templateObject7$5 || (_templateObject7$5 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  ", "\n  ", "\n"])), SelectedValue, function (props) {
  return props.subdued && "color: var(--sq-text-subdued)";
});
var ButtonDiv$1 = /*#__PURE__*/styled.div(_templateObject8$3 || (_templateObject8$3 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  ", "\n"])), ButtonDiv);

var SelectInnerView = function SelectInnerView(props, ref) {
  var _props$customCSS = props.customCSS,
      customCSS = _props$customCSS === void 0 ? "" : _props$customCSS,
      _props$customContaine = props.customContainerCSS,
      customContainerCSS = _props$customContaine === void 0 ? "" : _props$customContaine,
      _props$disabled = props.disabled,
      disabled = _props$disabled === void 0 ? false : _props$disabled,
      _props$errors = props.errors,
      errors = _props$errors === void 0 ? false : _props$errors,
      _props$clearable = props.clearable,
      clearable = _props$clearable === void 0 ? false : _props$clearable,
      _props$loading = props.loading,
      loading = _props$loading === void 0 ? false : _props$loading,
      _props$placeholder = props.placeholder,
      placeholder = _props$placeholder === void 0 ? "" : _props$placeholder,
      _props$limitWidth = props.limitWidth,
      limitWidth = _props$limitWidth === void 0 ? true : _props$limitWidth,
      _props$limitHeight = props.limitHeight,
      limitHeight = _props$limitHeight === void 0 ? false : _props$limitHeight,
      functional = props.functional,
      items = props.items,
      _props$itemToString = props.itemToString,
      itemToString = _props$itemToString === void 0 ? function (item) {
    return item;
  } : _props$itemToString,
      _props$itemToNode = props.itemToNode,
      itemToNode = _props$itemToNode === void 0 ? function (item) {
    if (isComplexItem(item)) {
      return React__default.createElement(React__default.Fragment, null, React__default.createElement("span", null, itemToString(item)), item.description && React__default.createElement(React__default.Fragment, null, React__default.createElement("br", null), React__default.createElement(ItemDescriptionSpan, null, item.description)));
    } else {
      return React__default.createElement("span", null, itemToString(item));
    }
  } : _props$itemToNode,
      rest = _objectWithoutPropertiesLoose(props, _excluded$c);

  var showClear = clearable ? "inline-flex" : "none";
  var arrowColor = errors ? "var(--sq-border-critical)" : disabled ? "var(--sq-border)" : "var(--sq-text)";

  function isCombobox(hook) {
    return hook.getComboboxProps !== undefined;
  }

  var isOpen = disabled || loading ? false : functional.isOpen;
  return React__default.createElement(ContainerDiv$1, {
    customContainerCSS: customContainerCSS,
    limitWidth: limitWidth
  }, !isCombobox(functional) ? React__default.createElement(SelectInputDiv, Object.assign({}, rest, {
    isOpen: functional.isOpen,
    disabled: disabled || loading,
    ref: ref,
    errors: errors,
    customCSS: customCSS,
    role: "button"
  }, functional.getToggleButtonProps()), React__default.createElement(SelectedValueSpan, {
    subdued: functional.selectedItem ? false : true
  }, functional.selectedItem ? itemToString(functional.selectedItem) : placeholder), React__default.createElement(ButtonDiv$1, null, React__default.createElement(IconButton, {
    disabled: disabled,
    icon: "close",
    borderless: true,
    size: "mini",
    customCSS: {
      display: showClear
    },
    icon_css: {
      color: arrowColor,
      margin: "auto",
      height: "12px",
      width: "12px"
    },
    color: errors ? "var(--sq-border-critical)" : "var(--sq-text-subdued)",
    onClick: function onClick(e) {
      e.stopPropagation();
      functional.selectItem(null);
    }
  }), loading ? React__default.createElement(LoadingSpinner, {
    color: arrowColor,
    right: "14px",
    bottom: "12px"
  }) : isOpen ? React__default.createElement(IconView, {
    icon: "chevron_up",
    size: "small",
    customCSS: "padding: 8px; box-sizing: content-box;",
    color: arrowColor
  }) : React__default.createElement(IconView, {
    icon: "chevron_down",
    size: "small",
    customCSS: "padding: 8px; box-sizing: content-box;",
    color: arrowColor
  }))) : React__default.createElement("div", Object.assign({}, functional.getComboboxProps()), React__default.createElement(InputView, Object.assign({}, rest, {
    placeholder: placeholder,
    type: "text",
    ref: ref,
    errors: errors,
    limitWidth: limitWidth,
    customCSS: "\n              " + customCSS + ";\n              " + (isOpen && "border: 2px solid var(--sq-focused)") + ";\n              " + (clearable ? "padding-right: var(--sq-spacing-xxxx-large)" : "padding-right: var(--sq-spacing-xxx-large)") + ";\n            ",
    disabled: disabled || loading
  }, functional.getInputProps())), React__default.createElement(ButtonContainerDiv, null, React__default.createElement(IconButton, {
    disabled: disabled,
    icon: "close",
    borderless: true,
    size: "mini",
    customCSS: {
      display: showClear
    },
    icon_css: {
      margin: "auto",
      color: arrowColor,
      height: "12px",
      width: "12px"
    },
    color: errors ? "var(--sq-border-critical)" : "var(--sq-text-subdued)",
    onClick: function onClick(e) {
      e.stopPropagation();
      functional.selectItem(null);
    }
  }), loading ? React__default.createElement(LoadingSpinner, {
    color: arrowColor,
    right: "16px",
    bottom: "3px"
  }) : isOpen ? React__default.createElement(IconButton, Object.assign({
    disabled: disabled,
    icon: "chevron_up",
    borderless: true,
    size: "mini",
    icon_css: {
      color: arrowColor,
      height: "12px",
      width: "12px"
    },
    color: errors ? "var(--sq-border-critical)" : "var(--sq-text-subdued)"
  }, functional.getToggleButtonProps())) : React__default.createElement(IconButton, Object.assign({
    disabled: disabled,
    icon: "chevron_down",
    borderless: true,
    size: "mini",
    icon_css: {
      color: arrowColor,
      height: "12px",
      width: "12px"
    },
    color: errors ? "var(--sq-border-critical)" : "var(--sq-text-subdued)"
  }, functional.getToggleButtonProps())))), React__default.createElement(ItemContainerList, Object.assign({
    limitWidth: limitWidth,
    limitHeight: limitHeight,
    errors: errors
  }, functional.getMenuProps()), isOpen && items.map(function (item, index) {
    return React__default.createElement(ListItem, Object.assign({
      style: functional.highlightedIndex === index ? {
        backgroundColor: "var(--sq-surface-hover)"
      } : {},
      key: itemToString(item) + "-" + index
    }, functional.getItemProps({
      item: item,
      index: index
    })), itemToNode(item));
  })));
}; // export const SelectView = React.forwardRef(SelectInnerView);

/**
 * @deprecated use {@link SelectView} instead
 */


var Select = /*#__PURE__*/React__default.forwardRef(SelectInnerView);

var _excluded$d = ["customCSS", "disabled", "errors", "clearable", "loading", "placeholder", "limitWidth", "limitHeight", "functional", "items", "itemToString", "itemToNode"];

var _templateObject$q, _templateObject2$l, _templateObject3$l, _templateObject4$g, _templateObject5$b, _templateObject6$6, _templateObject7$6, _templateObject8$4;

function isComplexItem$1(item) {
  return typeof item === "object" && item !== null;
}

var ItemContainerList$1 = /*#__PURE__*/styled.ul(_templateObject$q || (_templateObject$q = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  ", "\n  ", "\n  ", "\n  ", "\n"])), ItemContainer, function (props) {
  return props.errors && "border-color: var(--sq-border-critical); background-color: var(--sq-surface-critical-subdued);";
}, function (props) {
  return props.limitWidth ? typeof props.limitWidth === "string" ? "max-width: " + props.limitWidth + ";" : "max-width: 300px;" : "max-width: 100%;";
}, function (props) {
  return props.limitHeight ? typeof props.limitHeight === "string" ? "max-height: " + props.limitHeight + ";" : "max-height: 200px;" : "max-height: auto;";
});
var ListItem$1 = /*#__PURE__*/styled("li")(_templateObject2$l || (_templateObject2$l = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  ", "\n"])), Item);
var ButtonContainerDiv$1 = /*#__PURE__*/styled.div(_templateObject3$l || (_templateObject3$l = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  ", "\n"])), ButtonContainer);
var ItemDescriptionSpan$1 = /*#__PURE__*/styled("span")(_templateObject4$g || (_templateObject4$g = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  ", "\n"])), ItemDescription);
var ContainerDiv$2 = /*#__PURE__*/styled("div")(_templateObject5$b || (_templateObject5$b = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  ", "\n  ", "\n  ", "\n"])), Container$1, function (props) {
  return props.limitWidth ? typeof props.limitWidth === "string" ? "max-width: " + props.limitWidth + ";" : "max-width: 300px;" : "max-width: 100%;";
}, function (props) {
  return props.customContainerCSS;
});
var SelectInputDiv$1 = /*#__PURE__*/styled.div(_templateObject6$6 || (_templateObject6$6 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  ", "\n  ", "\n  ", "\n  ", "\n\n  ", "\n\n  ", "\n\n  ", "\n"])), SelectInputStyle, function (props) {
  return props.disabled && "background: var(--sq-surface-input-disabled); cursor: default;";
}, function (props) {
  return props.isOpen && !props.disabled && "border-color: var(--sq-focused);";
}, function (props) {
  return !props.isOpen && !props.disabled && "&:hover{\n    border-color: " + (props.errors ? "var(--sq-surface-critical-hovered)" : "var(--sq-action-secondary-border)") + " ;\n  }";
}, function (props) {
  return !props.disabled && "&:focus {\n    border-color: var(--sq-focused);\n  }";
}, function (props) {
  return props.errors && "border-color: var(--sq-border-critical); background: var(--sq-surface-critical-subdued);";
}, function (props) {
  return props.customCSS;
});
var SelectedValueSpan$1 = /*#__PURE__*/styled.span(_templateObject7$6 || (_templateObject7$6 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  ", "\n  ", "\n"])), SelectedValue, function (props) {
  return props.subdued && "color: var(--sq-text-subdued)";
});
var ButtonDiv$2 = /*#__PURE__*/styled.div(_templateObject8$4 || (_templateObject8$4 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  ", "\n"])), ButtonDiv);

var SelectContainerView = function SelectContainerView(props) {
  var _props$limitWidth = props.limitWidth,
      limitWidth = _props$limitWidth === void 0 ? true : _props$limitWidth,
      _props$customContaine = props.customContainerCSS,
      customContainerCSS = _props$customContaine === void 0 ? "" : _props$customContaine,
      children = props.children;
  return React__default.createElement(ContainerDiv$2, {
    customContainerCSS: customContainerCSS,
    limitWidth: limitWidth
  }, children);
};

var SelectHandleInnerView = function SelectHandleInnerView(props, ref) {
  var _props$customCSS = props.customCSS,
      customCSS = _props$customCSS === void 0 ? "" : _props$customCSS,
      _props$disabled = props.disabled,
      disabled = _props$disabled === void 0 ? false : _props$disabled,
      _props$errors = props.errors,
      errors = _props$errors === void 0 ? false : _props$errors,
      _props$clearable = props.clearable,
      clearable = _props$clearable === void 0 ? false : _props$clearable,
      _props$loading = props.loading,
      loading = _props$loading === void 0 ? false : _props$loading,
      _props$placeholder = props.placeholder,
      placeholder = _props$placeholder === void 0 ? "" : _props$placeholder,
      _props$limitWidth2 = props.limitWidth,
      limitWidth = _props$limitWidth2 === void 0 ? true : _props$limitWidth2,
      functional = props.functional,
      _props$itemToString = props.itemToString,
      itemToString = _props$itemToString === void 0 ? function (item) {
    return item;
  } : _props$itemToString,
      rest = _objectWithoutPropertiesLoose(props, _excluded$d);

  var showClear = clearable ? "inline-flex" : "none";
  var arrowColor = errors ? "var(--sq-border-critical)" : disabled ? "var(--sq-border)" : "var(--sq-text)";

  function isCombobox(hook) {
    return hook.getComboboxProps !== undefined;
  }

  var isOpen = disabled || loading ? false : functional.isOpen;
  return !isCombobox(functional) ? React__default.createElement(SelectInputDiv$1, Object.assign({}, rest, {
    isOpen: functional.isOpen,
    disabled: disabled || loading,
    ref: ref,
    errors: errors,
    customCSS: customCSS,
    role: "button"
  }, functional.getToggleButtonProps()), React__default.createElement(SelectedValueSpan$1, {
    subdued: functional.selectedItem ? false : true
  }, functional.selectedItem ? itemToString(functional.selectedItem) : placeholder), React__default.createElement(ButtonDiv$2, null, React__default.createElement(IconButton, {
    disabled: disabled,
    icon: "close",
    borderless: true,
    size: "mini",
    customCSS: {
      display: showClear
    },
    icon_css: {
      color: arrowColor,
      margin: "auto",
      height: "12px",
      width: "12px"
    },
    color: errors ? "var(--sq-border-critical)" : "var(--sq-text-subdued)",
    onClick: function onClick(e) {
      e.stopPropagation();
      functional.selectItem(null);
    }
  }), loading ? React__default.createElement(LoadingSpinner, {
    color: arrowColor,
    right: "14px",
    bottom: "12px"
  }) : isOpen ? React__default.createElement(IconView, {
    icon: "chevron_up",
    size: "small",
    customCSS: "padding: 8px; box-sizing: content-box;",
    color: arrowColor
  }) : React__default.createElement(IconView, {
    icon: "chevron_down",
    size: "small",
    customCSS: "padding: 8px; box-sizing: content-box;",
    color: arrowColor
  }))) : React__default.createElement("div", Object.assign({}, functional.getComboboxProps()), React__default.createElement(InputView, Object.assign({}, rest, {
    placeholder: placeholder,
    type: "text",
    ref: ref,
    errors: errors,
    limitWidth: limitWidth,
    customCSS: "\n              " + customCSS + ";\n              " + (isOpen && "border: 2px solid var(--sq-focused)") + ";\n              " + (clearable ? "padding-right: var(--sq-spacing-xxxx-large)" : "padding-right: var(--sq-spacing-xxx-large)") + ";\n            ",
    disabled: disabled || loading
  }, functional.getInputProps())), React__default.createElement(ButtonContainerDiv$1, null, React__default.createElement(IconButton, {
    disabled: disabled,
    icon: "close",
    borderless: true,
    size: "mini",
    customCSS: {
      display: showClear
    },
    icon_css: {
      margin: "auto",
      color: arrowColor,
      height: "12px",
      width: "12px"
    },
    color: errors ? "var(--sq-border-critical)" : "var(--sq-text-subdued)",
    onClick: function onClick(e) {
      e.stopPropagation();
      functional.selectItem(null);
    }
  }), loading ? React__default.createElement(LoadingSpinner, {
    color: arrowColor,
    right: "16px",
    bottom: "3px"
  }) : isOpen ? React__default.createElement(IconButton, Object.assign({
    disabled: disabled,
    icon: "chevron_up",
    borderless: true,
    size: "mini",
    icon_css: {
      color: arrowColor,
      height: "12px",
      width: "12px"
    },
    color: errors ? "var(--sq-border-critical)" : "var(--sq-text-subdued)"
  }, functional.getToggleButtonProps())) : React__default.createElement(IconButton, Object.assign({
    disabled: disabled,
    icon: "chevron_down",
    borderless: true,
    size: "mini",
    icon_css: {
      color: arrowColor,
      height: "12px",
      width: "12px"
    },
    color: errors ? "var(--sq-border-critical)" : "var(--sq-text-subdued)"
  }, functional.getToggleButtonProps()))));
};

var SelectInnerListView = function SelectInnerListView(props, ref) {
  var _props$errors2 = props.errors,
      errors = _props$errors2 === void 0 ? false : _props$errors2,
      _props$limitWidth3 = props.limitWidth,
      limitWidth = _props$limitWidth3 === void 0 ? true : _props$limitWidth3,
      _props$limitHeight2 = props.limitHeight,
      limitHeight = _props$limitHeight2 === void 0 ? false : _props$limitHeight2,
      _props$disabled2 = props.disabled,
      disabled = _props$disabled2 === void 0 ? false : _props$disabled2,
      _props$loading2 = props.loading,
      loading = _props$loading2 === void 0 ? false : _props$loading2,
      functional = props.functional,
      items = props.items,
      _props$itemToString2 = props.itemToString,
      itemToString = _props$itemToString2 === void 0 ? function (item) {
    return item;
  } : _props$itemToString2,
      _props$itemToNode2 = props.itemToNode,
      itemToNode = _props$itemToNode2 === void 0 ? function (item) {
    if (isComplexItem$1(item)) {
      return React__default.createElement(React__default.Fragment, null, React__default.createElement("span", null, itemToString(item)), item.description && React__default.createElement(React__default.Fragment, null, React__default.createElement("br", null), React__default.createElement(ItemDescriptionSpan$1, null, item.description)));
    } else {
      return React__default.createElement("span", null, itemToString(item));
    }
  } : _props$itemToNode2;
  var isOpen = disabled || loading ? false : functional.isOpen;
  return React__default.createElement(ItemContainerList$1, Object.assign({
    limitWidth: limitWidth,
    limitHeight: limitHeight,
    errors: errors,
    ref: ref
  }, functional.getMenuProps()), isOpen ? items.map(function (item, index) {
    return React__default.createElement(ListItem$1, Object.assign({
      style: functional.highlightedIndex === index ? {
        backgroundColor: "var(--sq-surface-hover)"
      } : {},
      key: itemToString(item) + "-" + index
    }, functional.getItemProps({
      item: item,
      index: index
    })), itemToNode(item));
  }) : React__default.createElement(React__default.Fragment, null));
};

var SelectView = {
  HandleView: /*#__PURE__*/React__default.forwardRef(SelectHandleInnerView),
  ListView: /*#__PURE__*/React__default.forwardRef(SelectInnerListView),
  ContainerView: SelectContainerView
};

var _templateObject$r, _templateObject2$m, _templateObject3$m, _templateObject4$h, _templateObject5$c, _templateObject6$7, _templateObject7$7;
var Container$2 = /*#__PURE__*/css(_templateObject$r || (_templateObject$r = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  font-size: var(--sq-font-size-regular);\n  font-weight: var(--sq-font-weight-regular);\n  line-height: var(--sq-line-height-button-medium);\n  font-family: var(--sq-font-family-sans);\n"])));
var Label = /*#__PURE__*/css(_templateObject2$m || (_templateObject2$m = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  font-weight: var(--sq-font-weight-semibold);\n  display: block;\n  color: var(--sq-text);\n  margin: 0 0 var(--sq-spacing-small);\n"])));
var Description = /*#__PURE__*/css(_templateObject3$m || (_templateObject3$m = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  display: contents;\n  & > p {\n    color: var(--sq-text-subdued) !important;\n    margin: var(--sq-spacing-xx-small) 0 0;\n  }\n"])));
var RequiredLabel = /*#__PURE__*/css(_templateObject4$h || (_templateObject4$h = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  color: var(--sq-placeholder-text-on-secondary);\n"])));
var HelpText = /*#__PURE__*/css(_templateObject5$c || (_templateObject5$c = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  display: contents;\n  & > p {\n    color: var(--sq-text-subdued) !important;\n    margin: var(--sq-spacing-small) 0 0;\n  }\n"])));
var Errors = /*#__PURE__*/css(_templateObject6$7 || (_templateObject6$7 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  margin: var(--sq-spacing-small) 0;\n  padding-left: 0;\n  list-style-type: none;\n  & > * {\n    color: var(--sq-on-surface-critical);\n    margin: var(--sq-spacing-small) 0 0 !important;\n  }\n"])));
var ErrorItem = /*#__PURE__*/css(_templateObject7$7 || (_templateObject7$7 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  & > span {\n    margin-left: var(--sq-spacing-x-small);\n  }\n"])));

var _templateObject$s, _templateObject2$n, _templateObject3$n, _templateObject4$i, _templateObject5$d, _templateObject6$8, _templateObject7$8;
var Label$1 = /*#__PURE__*/styled.label(_templateObject$s || (_templateObject$s = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  ", "\n"])), Label);
var Description$1 = /*#__PURE__*/styled.div(_templateObject2$n || (_templateObject2$n = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  ", "\n"])), Description);
var HelpText$1 = /*#__PURE__*/styled.div(_templateObject3$n || (_templateObject3$n = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  ", "\n"])), HelpText);
var Errors$1 = /*#__PURE__*/styled.ul(_templateObject4$i || (_templateObject4$i = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  ", "\n"])), Errors);
var RequiredLabel$1 = /*#__PURE__*/styled.span(_templateObject5$d || (_templateObject5$d = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  ", "\n"])), RequiredLabel);
var Container$3 = /*#__PURE__*/styled.div(_templateObject6$8 || (_templateObject6$8 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  ", "\n"])), Container$2);
var ErrorItem$1 = /*#__PURE__*/styled.li(_templateObject7$8 || (_templateObject7$8 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  ", "\n"])), ErrorItem);
var FieldTemplate = function FieldTemplate(props) {
  var id = props.id,
      classNames = props.classNames,
      label = props.label,
      help = props.help,
      required = props.required,
      description = props.description,
      children = props.children,
      schema = props.schema,
      rawErrors = props.rawErrors;
  var isCollection = schema.type === "object" || schema.type === "array";
  return React__default.createElement(Container$3, {
    className: classNames,
    id: id
  }, !isCollection && label && React__default.createElement(Label$1, {
    htmlFor: id,
    id: id + "-title"
  }, label, required && React__default.createElement(RequiredLabel$1, null, " (required)")), children, !isCollection && React__default.createElement(React__default.Fragment, null, React__default.createElement(Description$1, {
    id: id + "-description"
  }, description), React__default.createElement(HelpText$1, {
    id: id + "-help"
  }, help), (rawErrors == null ? void 0 : rawErrors.length) > 0 && React__default.createElement(Errors$1, {
    id: id + "-errors"
  }, rawErrors.map(function (error) {
    return React__default.createElement(ErrorItem$1, {
      key: error
    }, React__default.createElement(IconView, {
      icon: "info",
      size: "15px"
    }), React__default.createElement("span", null, error));
  }))));
};
FieldTemplate.Label = Label$1;
FieldTemplate.Description = Description$1;
FieldTemplate.HelpText = HelpText$1;
FieldTemplate.Errors = Errors$1;
FieldTemplate.Container = Container$3;
FieldTemplate.ErrorItem = ErrorItem$1;
FieldTemplate.RequiredLabel = RequiredLabel$1;

var _templateObject$t, _templateObject2$o, _templateObject3$o, _templateObject4$j, _templateObject5$e, _templateObject6$9;
var Container$4 = /*#__PURE__*/css(_templateObject$t || (_templateObject$t = /*#__PURE__*/_taggedTemplateLiteralLoose([""])));
var FieldContainer = /*#__PURE__*/css(_templateObject2$o || (_templateObject2$o = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  margin: 0 0 var(--sq-spacing-xx-large);\n"])));
var FrontMatterContainer = /*#__PURE__*/css(_templateObject3$o || (_templateObject3$o = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  margin: 0 0 var(--sq-spacing-xx-large);\n  font-size: var(--sq-font-size-regular);\n  font-weight: var(--sq-font-weight-regular);\n  line-height: var(--sq-line-height-button-medium);\n  font-family: var(--sq-font-family-sans);\n"])));
var Title = /*#__PURE__*/css(_templateObject4$j || (_templateObject4$j = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  color: var(--sq-text);\n  font-weight: var(--sq-font-weight-semibold);\n  font-size: var(--sq-font-size-caption);\n"])));
var Description$2 = /*#__PURE__*/css(_templateObject5$e || (_templateObject5$e = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  color: var(--sq-text-subdued) !important;\n  margin: var(--sq-spacing-small) 0 0;\n"])));
var RequiredLabel$2 = /*#__PURE__*/css(_templateObject6$9 || (_templateObject6$9 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  color: var(--sq-placeholder-text-on-secondary);\n"])));

var _templateObject$u, _templateObject2$p, _templateObject3$p, _templateObject4$k, _templateObject5$f, _templateObject6$a;
var Container$5 = /*#__PURE__*/styled.div(_templateObject$u || (_templateObject$u = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  ", "\n"])), Container$4);
var FieldContainer$1 = /*#__PURE__*/styled.div(_templateObject2$p || (_templateObject2$p = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  ", "\n"])), FieldContainer);
var Title$1 = /*#__PURE__*/styled.label(_templateObject3$p || (_templateObject3$p = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  ", "\n"])), Title);
var Description$3 = /*#__PURE__*/styled.p(_templateObject4$k || (_templateObject4$k = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  ", "\n"])), Description$2);
var FrontMatterContainer$1 = /*#__PURE__*/styled.div(_templateObject5$f || (_templateObject5$f = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  ", "\n"])), FrontMatterContainer);
var RequiredLabel$3 = /*#__PURE__*/styled.span(_templateObject6$a || (_templateObject6$a = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  ", "\n"])), RequiredLabel$2);
var ObjectFieldTemplate = function ObjectFieldTemplate(props) {
  var idSchema = props.idSchema,
      title = props.title,
      description = props.description,
      properties = props.properties,
      required = props.required;
  return React__default.createElement(Container$5, null, (title || description) && React__default.createElement(FrontMatterContainer$1, null, title && React__default.createElement(Title$1, {
    id: idSchema.$id + "-title"
  }, title, required && React__default.createElement(RequiredLabel$3, null, " (required)")), description && React__default.createElement(Description$3, {
    id: idSchema.$id + "-description"
  }, description)), properties.map(function (element, index) {
    return React__default.createElement(FieldContainer$1, {
      className: "property-wrapper",
      key: index
    }, element.content);
  }));
};

var _templateObject$v, _templateObject3$q, _templateObject4$l, _templateObject5$g, _templateObject6$b, _templateObject7$9, _templateObject8$5, _templateObject9$1, _templateObject10$1;
var Container$6 = /*#__PURE__*/css(_templateObject$v || (_templateObject$v = /*#__PURE__*/_taggedTemplateLiteralLoose([""])));
var FrontMatterContainer$2 = /*#__PURE__*/css(_templateObject3$q || (_templateObject3$q = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  margin: 0 0 var(--sq-spacing-xx-large);\n  font-size: var(--sq-font-size-regular);\n  font-weight: var(--sq-font-weight-regular);\n  line-height: var(--sq-line-height-button-medium);\n  font-family: var(--sq-font-family-sans);\n"])));
var Title$2 = /*#__PURE__*/css(_templateObject4$l || (_templateObject4$l = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  color: var(--sq-text);\n  font-weight: var(--sq-font-weight-semibold);\n  font-size: var(--sq-font-size-caption);\n"])));
var Description$4 = /*#__PURE__*/css(_templateObject5$g || (_templateObject5$g = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  color: var(--sq-text-subdued);\n  margin: var(--sq-spacing-small) 0 0;\n"])));
var RequiredLabel$4 = /*#__PURE__*/css(_templateObject6$b || (_templateObject6$b = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  color: var(--sq-placeholder-text-on-secondary);\n"])));
var ItemContainer$1 = /*#__PURE__*/css(_templateObject7$9 || (_templateObject7$9 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  display: flex;\n  justify-content: space-between;\n  margin: var(--sq-spacing-large) 0;\n"])));
var ItemContent = /*#__PURE__*/css(_templateObject8$5 || (_templateObject8$5 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  flex: 1;\n"])));
var ItemButtons = /*#__PURE__*/css(_templateObject9$1 || (_templateObject9$1 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  height: 36px;\n  display: flex;\n  align-items: center;\n  & > * {\n    margin-left: var(--sq-spacing-medium);\n  }\n"])));
var ArrayContainer = /*#__PURE__*/css(_templateObject10$1 || (_templateObject10$1 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  display: flex;\n  flex-direction: column;\n"])));

var _templateObject$w, _templateObject3$r, _templateObject4$m, _templateObject5$h, _templateObject6$c, _templateObject7$a, _templateObject8$6, _templateObject9$2, _templateObject10$2;
var Container$7 = /*#__PURE__*/styled.div(_templateObject$w || (_templateObject$w = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  ", "\n"])), Container$6);
var Title$3 = /*#__PURE__*/styled.label(_templateObject3$r || (_templateObject3$r = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  ", "\n"])), Title$2);
var Description$5 = /*#__PURE__*/styled.p(_templateObject4$m || (_templateObject4$m = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  ", "\n"])), Description$4);
var FrontMatterContainer$3 = /*#__PURE__*/styled.div(_templateObject5$h || (_templateObject5$h = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  ", "\n"])), FrontMatterContainer$2);
var RequiredLabel$5 = /*#__PURE__*/styled.span(_templateObject6$c || (_templateObject6$c = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  ", "\n"])), RequiredLabel$4);
var ItemContainer$2 = /*#__PURE__*/styled.div(_templateObject7$a || (_templateObject7$a = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  ", "\n"])), ItemContainer$1);
var ItemContent$1 = /*#__PURE__*/styled.div(_templateObject8$6 || (_templateObject8$6 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  ", "\n"])), ItemContent);
var ItemButtons$1 = /*#__PURE__*/styled.div(_templateObject9$2 || (_templateObject9$2 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  ", "\n"])), ItemButtons);
var ArrayContainer$1 = /*#__PURE__*/styled.div(_templateObject10$2 || (_templateObject10$2 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  ", "\n"])), ArrayContainer); // Used in the two templates

var DefaultArrayItem = function DefaultArrayItem(props) {
  var key = props.key,
      children = props.children,
      hasToolbar = props.hasToolbar,
      hasMoveDown = props.hasMoveDown,
      hasMoveUp = props.hasMoveUp,
      hasRemove = props.hasRemove,
      disabled = props.disabled,
      readonly = props.readonly,
      index = props.index,
      onReorderClick = props.onReorderClick,
      onDropIndexClick = props.onDropIndexClick;
  return React__default.createElement(ItemContainer$2, {
    key: key
  }, React__default.createElement(ItemContent$1, null, children), React__default.createElement(ItemButtons$1, null, hasToolbar && React__default.createElement(React__default.Fragment, null, (hasMoveUp || hasMoveDown) && React__default.createElement(IconButton, {
    size: "mini",
    borderless: true,
    icon: "chevron_up",
    disabled: disabled || readonly || !hasMoveUp,
    onClick: onReorderClick(index, index - 1)
  }), (hasMoveUp || hasMoveDown) && React__default.createElement(IconButton, {
    size: "mini",
    borderless: true,
    icon: "chevron_down",
    disabled: disabled || readonly || !hasMoveDown,
    onClick: onReorderClick(index, index + 1)
  }), hasRemove && React__default.createElement(IconButton, {
    size: "mini",
    borderless: true,
    icon: "trash",
    icon_css: {
      color: "var(--sq-on-surface-critical)"
    },
    disabled: disabled || readonly,
    onClick: onDropIndexClick(index)
  }))));
};

var ArrayFieldTemplate = function ArrayFieldTemplate(props) {
  var title = props.title,
      required = props.required,
      idSchema = props.idSchema,
      items = props.items,
      canAdd = props.canAdd,
      disabled = props.disabled,
      readonly = props.readonly,
      onAddClick = props.onAddClick,
      uiSchema = props.uiSchema,
      schema = props.schema;
  return React__default.createElement(Container$7, null, (title || uiSchema["ui:description"] || schema.description) && React__default.createElement(FrontMatterContainer$3, null, title && React__default.createElement(Title$3, {
    key: "array-field-title-" + idSchema.$id
  }, title, required && React__default.createElement(RequiredLabel$5, null, " (required)")), (uiSchema["ui:description"] || schema.description) && React__default.createElement(Description$5, {
    key: "array-field-description-" + idSchema.$id
  }, uiSchema["ui:description"] || schema.description)), React__default.createElement(ArrayContainer$1, {
    key: "array-item-list-" + idSchema.$id
  }, items && items.map(function (p) {
    return DefaultArrayItem(p);
  }), canAdd && React__default.createElement(IconButton, {
    icon: "add",
    size: "mini",
    borderless: true,
    onClick: onAddClick,
    disabled: disabled || readonly,
    customCSS: "align-self: end;"
  })));
};

var _templateObject$x, _templateObject2$q, _templateObject3$s;
var Container$8 = /*#__PURE__*/css(_templateObject$x || (_templateObject$x = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  font-size: var(--sq-font-size-regular);\n  font-weight: var(--sq-font-weight-regular);\n  line-height: var(--sq-line-height-button-medium);\n  font-family: var(--sq-font-family-sans);\n  margin: 0 0 var(--sq-spacing-xx-large);\n"])));
var Errors$2 = /*#__PURE__*/css(_templateObject2$q || (_templateObject2$q = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  margin: var(--sq-spacing-small) 0;\n  padding-left: var(--sq-spacing-medium);\n  & > * {\n    margin: var(--sq-spacing-small) 0 0 !important;\n  }\n"])));
var ErrorItem$2 = /*#__PURE__*/css(_templateObject3$s || (_templateObject3$s = /*#__PURE__*/_taggedTemplateLiteralLoose([""])));

var _templateObject$y, _templateObject2$r, _templateObject3$t;
var Errors$3 = /*#__PURE__*/styled.ul(_templateObject$y || (_templateObject$y = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  ", "\n"])), Errors$2);
var Container$9 = /*#__PURE__*/styled.div(_templateObject2$r || (_templateObject2$r = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  ", "\n"])), Container$8);
var ErrorItem$3 = /*#__PURE__*/styled.li(_templateObject3$t || (_templateObject3$t = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  ", "\n"])), ErrorItem$2);
var ErrorListTemplate = function ErrorListTemplate(props) {
  var errors = props.errors;
  return React__default.createElement(Container$9, null, React__default.createElement(AlertView, {
    type: "critical",
    title: "Error List"
  }, React__default.createElement(Errors$3, null, errors.map(function (error) {
    return React__default.createElement(ErrorItem$3, {
      key: error.stack
    }, error.stack);
  }))));
};
ErrorListTemplate.Container = Container$9;
ErrorListTemplate.List = Errors$3;
ErrorListTemplate.Item = ErrorItem$3;

var _templateObject$z, _templateObject2$s, _templateObject3$u, _templateObject5$i, _templateObject6$d, _templateObject7$b;
var RadioLabelStyle$1 = /*#__PURE__*/css(_templateObject$z || (_templateObject$z = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  display: flex;\n  flex-direction: row;\n  //   width: 85%;\n  min-height: 138px;\n  border: 2px solid var(--sq-border);\n  border-radius: 4px;\n  align-items: center;\n  //   margin: 10px;\n  user-select: none;\n  cursor: pointer;\n  color: var(--sq-text);\n  font-family: var(--sq-font-family-sans);\n  font-weight: var(--sq-font-weight-regular);\n  font-size: var(--sq-font-size-regular);\n  line-height: var(--sq-line-height-regular);\n"])));
var RadioGridStyle = /*#__PURE__*/css(_templateObject2$s || (_templateObject2$s = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  gap: 20px;\n"])));
var RadioInputStyle$1 = /*#__PURE__*/css(_templateObject3$u || (_templateObject3$u = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  display: none;\n\n  &:checked + div {\n    border-color: var(--sq-action-primary);\n  }\n\n  &:checked + div::after {\n    transform: scale(1);\n  }\n"])));
var RadioTextStyle = /*#__PURE__*/css(_templateObject5$i || (_templateObject5$i = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  flex-direction: column;\n  padding: var(--sq-spacing-large);\n"])));
var RightSegmentStyle = /*#__PURE__*/css(_templateObject6$d || (_templateObject6$d = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  width: auto;\n  align-self: stretch;\n  float: right;\n  border-left: 2px solid var(--sq-surface-input-disabled);\n"])));
var LeftSegmentStyle = /*#__PURE__*/css(_templateObject7$b || (_templateObject7$b = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  float: left;\n  min-width: 117px;\n  height: 100%;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n"])));

var _excluded$e = ["value", "optionValue", "title", "description", "icon"];

var _templateObject$A, _templateObject2$t, _templateObject3$v, _templateObject4$n, _templateObject5$j, _templateObject6$e, _templateObject7$c;
var ShadowDom$3 = /*#__PURE__*/styled(root$1.div)(_templateObject$A || (_templateObject$A = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  display: contents;\n"])));
var RadioLabel$1 = /*#__PURE__*/styled.label(_templateObject2$t || (_templateObject2$t = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  ", "\n  ", "\n"])), RadioLabelStyle$1, function (props) {
  return props.isChecked ? "border: 2px solid var(--sq-action-primary-hovered);" : "&:hover {border: 2px solid var(--sq-text-subdued);}";
});
var RadioInput$1 = /*#__PURE__*/styled.input(_templateObject3$v || (_templateObject3$v = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  ", "\n"])), RadioInputStyle$1);
var RightSegmentDiv = /*#__PURE__*/styled.div(_templateObject4$n || (_templateObject4$n = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  ", "\n"])), RightSegmentStyle);
var RadioTextDiv = /*#__PURE__*/styled.div(_templateObject5$j || (_templateObject5$j = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  ", "\n"])), RadioTextStyle);
var LeftSegmentDiv = /*#__PURE__*/styled.div(_templateObject6$e || (_templateObject6$e = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  ", "\n  ", "\n"])), LeftSegmentStyle, function (props) {
  return props.isChecked ? "color: var(--sq-action-primary-hovered);" : "";
});
var RadioGridDiv = /*#__PURE__*/styled.div(_templateObject7$c || (_templateObject7$c = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  ", "\n"])), RadioGridStyle);
var RadioCardView = /*#__PURE__*/forwardRef(function (props, forwardedRef) {
  var value = props.value,
      optionValue = props.optionValue,
      title = props.title,
      description = props.description,
      _props$icon = props.icon,
      icon = _props$icon === void 0 ? "" : _props$icon,
      rest = _objectWithoutPropertiesLoose(props, _excluded$e);

  var selected = value === optionValue;
  var icon_color = selected ? "var(--sq-action-primary-hovered)" : "";
  return createElement(RadioLabel$1, {
    htmlFor: rest.id,
    isChecked: selected
  }, createElement(RadioInput$1, Object.assign({}, rest, {
    type: "radio",
    checked: selected,
    readOnly: true,
    ref: forwardedRef
  })), createElement(LeftSegmentDiv, {
    isChecked: selected
  }, icon && createElement(IconView, {
    icon: icon,
    size: "40px",
    color: icon_color
  })), createElement(RightSegmentDiv, null, createElement(RadioTextDiv, null, title ? createElement("div", {
    style: {
      fontWeight: "bold",
      marginBottom: 4
    }
  }, title) : "", description ? createElement("div", {
    style: {
      color: "var(--sq-text-subdued)"
    }
  }, description) : "")));
});
var RadioCardGroupView = function RadioCardGroupView(props) {
  var children = props.children;
  return createElement(ShadowDom$3, null, createElement(RadioGridDiv, null, children));
};
/**
 * @deprecated use {@link RadioCardView} instead
 */

var RadioCard = RadioCardView;

function isEnumValue(option) {
  return typeof option === "object" && option !== null && option.hasOwnProperty("label") && option.hasOwnProperty("value");
}
function isCardOption(card) {
  return typeof card === "object" && card !== null && card.hasOwnProperty("value") && card.hasOwnProperty("icon") && card.hasOwnProperty("title") && card.hasOwnProperty("description");
}
function isEnumArray$1(options) {
  return Array.isArray(options);
}
function RJSFRadioCardWidget(props) {
  var _props$options, _props$options2;

  var valueOptions = props == null ? void 0 : (_props$options = props.options) == null ? void 0 : _props$options.enumOptions;
  var cardOptions = props == null ? void 0 : (_props$options2 = props.options) == null ? void 0 : _props$options2.ruleOptions;

  if (!isEnumArray$1(valueOptions) || !isEnumArray$1(cardOptions)) {
    return React__default.createElement(React__default.Fragment, null);
  }

  return React__default.createElement(RadioCardGroupView, {
    id: props.id
  }, valueOptions == null ? void 0 : valueOptions.map(function (option) {
    if (!isEnumValue(option)) {
      return React__default.createElement(React__default.Fragment, null);
    }

    var card = cardOptions.filter(function (card) {
      return card.value === (option == null ? void 0 : option.value);
    })[0];

    if (!card || !isCardOption(card)) {
      return React__default.createElement(React__default.Fragment, null);
    }

    return React__default.createElement(RadioCardView, {
      required: props.required,
      id: props.id + option.value.toString(),
      name: props.id + option.value.toString(),
      key: option.value,
      title: card.title,
      description: card.description,
      icon: card.icon,
      optionValue: option.value,
      value: props.value,
      onClick: function onClick(e) {
        e.preventDefault();
        props.onChange(option.value);
      }
    });
  }));
}

var _templateObject$B, _templateObject2$u, _templateObject3$w;
var TextareaBoxStyle = /*#__PURE__*/css(_templateObject$B || (_templateObject$B = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  position: relative;\n  width: 100%;\n  box-sizing: border-box;\n  height: 100%;\n  color: var(--sq-text);\n  background: var(--sq-surface);\n  font-family: \"Helvetica Neue\", Helvetica, sans-serif;\n  font-size: var(--sq-font-size-regular);\n  font-weight: var(--sq-font-weight-regular);\n  line-height: var(--sq-line-height-regular);\n\n  border: 2px solid var(--sq-border);\n  border-radius: 4px;\n\n  &::placeholder {\n    color: var(--sq-text-input-disabled);\n  }\n\n  &:focus {\n    outline: none;\n    border-color: var(--sq-focused);\n  }\n\n  &:disabled {\n    user-select: none;\n    color: var(--sq-text-input-disabled);\n    background-color: var(--sq-surface-input-disabled);\n  }\n\n  &::-webkit-inner-spin-button {\n    opacity: 1;\n    margin-right: 10px;\n    padding: 10px 1px 10px 1px;\n  }\n"])));
var invalid$1 = /*#__PURE__*/css(_templateObject2$u || (_templateObject2$u = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  background: var(--sq-surface-critical-subdued);\n  border: 2px solid var(--sq-border-critical);\n  border-radius: 4px;\n\n  &:focus {\n    outline: none;\n    border-color: var(--sq-border-critical);\n  }\n"])));
var Container$a = /*#__PURE__*/css(_templateObject3$w || (_templateObject3$w = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  display: inline-block;\n  width: 100%;\n  position: relative;\n  height: 100%;\n"])));

var _excluded$f = ["errors", "customCSS", "limitWidth", "height", "required"];

var _templateObject$C, _templateObject2$v, _templateObject3$x;
var ShadowDom$4 = /*#__PURE__*/styled(root$1.div)(_templateObject$C || (_templateObject$C = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  display: contents;\n"])));
var StyledTextarea = /*#__PURE__*/styled.textarea(_templateObject2$v || (_templateObject2$v = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  ", "\n  ", "\n  ", "\n"])), TextareaBoxStyle, function (props) {
  return props.isInvalid ? invalid$1 : "";
}, function (props) {
  return props.customCSS;
});
var ContainerDiv$3 = /*#__PURE__*/styled.div(_templateObject3$x || (_templateObject3$x = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  ", "\n  ", "\n  ", "\n"])), Container$a, function (props) {
  return props.limitWidth ? typeof props.limitWidth === "string" ? "max-width: " + props.limitWidth + ";" : "max-width: 300px;" : "max-width: 100%;";
}, function (props) {
  return "height: " + props.height;
});
var TextareaView = /*#__PURE__*/React__default.forwardRef(function (props, forwardedRef) {
  var rawErrors = props.errors,
      _props$customCSS = props.customCSS,
      customCSS = _props$customCSS === void 0 ? {} : _props$customCSS,
      _props$limitWidth = props.limitWidth,
      limitWidth = _props$limitWidth === void 0 ? true : _props$limitWidth,
      _props$height = props.height,
      height = _props$height === void 0 ? "48px" : _props$height,
      _props$required = props.required,
      required = _props$required === void 0 ? false : _props$required,
      rest = _objectWithoutPropertiesLoose(props, _excluded$f);

  return React__default.createElement(ShadowDom$4, null, React__default.createElement(ContainerDiv$3, {
    height: height,
    limitWidth: limitWidth
  }, React__default.createElement(StyledTextarea, Object.assign({}, rest, {
    ref: forwardedRef,
    isInvalid: rawErrors,
    customCSS: customCSS,
    required: required
  }))));
});
/**
 * @deprecated use {@link TextareaView} instead
 */

var Textarea = TextareaView;

function RJSFTextarea(props) {
  var options = props.options;
  return React__default.createElement(TextareaView, Object.assign({
    id: props.id
  }, options, {
    value: props.value,
    onChange: function onChange(e) {
      return props.onChange(e.target.value);
    },
    disabled: props.disabled,
    errors: props.rawErrors && !!props.rawErrors.length,
    required: props.required
  }));
}

function useRJSFSelect(props) {
  var _props$options, _props$options2;

  var items = props == null ? void 0 : (_props$options = props.options) == null ? void 0 : _props$options.enumOptions;
  var disabled = props != null && (_props$options2 = props.options) != null && _props$options2.enumDisabled ? true : false;

  if (!isEnumArray$1(items)) {
    return null;
  }

  var selectedItem = items.find(function (item) {
    return item.value === props.value;
  }) || null;

  var itemToString = function itemToString(item) {
    return item != null && item.label ? item.label : "";
  };

  var onSelectedItemChange = function onSelectedItemChange(_ref) {
    var selectedItem = _ref.selectedItem;
    props.onChange((selectedItem == null ? void 0 : selectedItem.value) || "");
  };

  var functional = useSelect({
    items: items,
    itemToString: itemToString,
    selectedItem: selectedItem,
    onSelectedItemChange: onSelectedItemChange
  });
  return {
    disabled: disabled,
    items: items,
    functional: functional,
    itemToString: itemToString
  };
}

function RJSFSelect(props) {
  var hook = useRJSFSelect(props);

  if (hook === null) {
    return React__default.createElement(React__default.Fragment, null);
  }

  var viewProps = _extends({}, props.options, hook);

  return React__default.createElement(Select, Object.assign({
    id: props.id
  }, viewProps));
}

var _templateObject$D, _templateObject2$w, _templateObject3$y, _templateObject4$o, _templateObject5$k;
var RadioLabelStyle$2 = /*#__PURE__*/css(_templateObject$D || (_templateObject$D = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  display: flex;\n  flex-direction: row;\n  align-items: flex-start;\n  padding: var(--sq-spacing-large);\n  user-select: none;\n  cursor: pointer;\n  color: var(--sq-text);\n  font-family: var(--sq-font-family-sans);\n  font-weight: var(--sq-font-weight-regular);\n  font-size: var(--sq-font-size-regular);\n  line-height: var(--sq-line-height-regular);\n"])));
var RadioInputStyle$2 = /*#__PURE__*/css(_templateObject2$w || (_templateObject2$w = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  display: none;\n\n  &:checked + div {\n    border-color: var(--sq-action-primary);\n  }\n\n  &:checked + div::after {\n    transform: scale(1);\n  }\n"])));
var RadioButtonStyle$1 = /*#__PURE__*/css(_templateObject3$y || (_templateObject3$y = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  margin-top: 2.5px;\n  width: 14px;\n  height: 14px;\n  border: 1.5px solid var(--sq-text);\n  border-radius: 50%;\n  margin-right: var(--sq-spacing-large);\n  box-sizing: border-box;\n  padding: 1.5px;\n  flex-shrink: 0;\n\n  &::after {\n    content: \"\";\n    width: 8px;\n    height: 8px;\n    display: block;\n    background: var(--sq-action-primary);\n    border-radius: 100%;\n    transform: scale(0);\n    transition: transform 0.15s;\n  }\n"])));
var RadioTextStyle$1 = /*#__PURE__*/css(_templateObject4$o || (_templateObject4$o = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  flex-direction: column;\n"])));
var RadioTwoColumn = /*#__PURE__*/css(_templateObject5$k || (_templateObject5$k = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  display: grid;\n  width: 100%;\n  display: grid;\n  grid-template-columns: 50% 50%;\n  grid-gap: var(--sq-spacing-small);\n"])));

var _excluded$g = ["value", "optionValue", "onChange", "title", "description"];

var _templateObject$E, _templateObject2$x, _templateObject3$z, _templateObject4$p, _templateObject5$l, _templateObject6$f;
var ShadowDom$5 = /*#__PURE__*/styled(root$1.div)(_templateObject$E || (_templateObject$E = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  display: contents;\n"])));
var ContainerDiv$4 = /*#__PURE__*/styled.div(_templateObject2$x || (_templateObject2$x = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  display: contents;\n  ", "\n"])), function (props) {
  return props.twoColumns && RadioTwoColumn;
});
var RadioLabel$2 = /*#__PURE__*/styled.label(_templateObject3$z || (_templateObject3$z = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  ", "\n  ", "\n"])), RadioLabelStyle$2, function (props) {
  return props.isChecked ? "background: var(--sq-background);" : "";
});
var RadioInput$2 = /*#__PURE__*/styled.input(_templateObject4$p || (_templateObject4$p = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  ", "\n"])), RadioInputStyle$2);
var RadioButtonDiv$1 = /*#__PURE__*/styled.div(_templateObject5$l || (_templateObject5$l = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  ", "\n"])), RadioButtonStyle$1);
var RadioTextDiv$1 = /*#__PURE__*/styled.div(_templateObject6$f || (_templateObject6$f = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  ", "\n"])), RadioTextStyle$1);
var RadioActionView = /*#__PURE__*/forwardRef(function (props, forwardedRef) {
  var value = props.value,
      optionValue = props.optionValue,
      title = props.title,
      description = props.description,
      rest = _objectWithoutPropertiesLoose(props, _excluded$g);

  var selected = value === optionValue;
  console.log(selected);
  return createElement(RadioLabel$2, {
    htmlFor: rest.id,
    isChecked: selected
  }, createElement(RadioInput$2, Object.assign({}, rest, {
    type: "radio",
    checked: selected,
    readOnly: true,
    ref: forwardedRef
  })), createElement(RadioButtonDiv$1, null), createElement(RadioTextDiv$1, null, title ? createElement("div", null, " ", title, " ") : "", description ? createElement("div", {
    style: {
      color: "var(--sq-text-subdued)",
      marginTop: 4
    }
  }, " ", description, " ") : ""));
});
var RadioActionGroupView = function RadioActionGroupView(props) {
  var _props$twoColumns = props.twoColumns,
      twoColumns = _props$twoColumns === void 0 ? false : _props$twoColumns,
      children = props.children;
  return createElement(ShadowDom$5, null, createElement(ContainerDiv$4, {
    twoColumns: twoColumns
  }, children));
};
/**
 * @deprecated use {@link RadioActionView} instead
 */

var RadioAction = RadioActionView;

function isActionOption(option) {
  return typeof option === "object" && option !== null && option.hasOwnProperty("value") && option.hasOwnProperty("title") && option.hasOwnProperty("description");
}

function RJSFRadioActionWidget(props) {
  var _props$options, _props$options2, _props$uiSchema$uiOp;

  var valueOptions = props == null ? void 0 : (_props$options = props.options) == null ? void 0 : _props$options.enumOptions;
  var actionOptions = props == null ? void 0 : (_props$options2 = props.options) == null ? void 0 : _props$options2.ruleOptions;
  var twoColumns = props != null && (_props$uiSchema$uiOp = props.uiSchema["ui:options"]) != null && _props$uiSchema$uiOp.twoColumns ? true : false;

  if (!isEnumArray$1(valueOptions) || !isEnumArray$1(actionOptions)) {
    return React__default.createElement(React__default.Fragment, null);
  }

  return React__default.createElement(RadioActionGroupView, {
    id: props.id,
    twoColumns: twoColumns
  }, valueOptions == null ? void 0 : valueOptions.map(function (option) {
    if (!isEnumValue(option)) {
      return React__default.createElement(React__default.Fragment, null);
    }

    var action = actionOptions.filter(function (action) {
      return action.value === (option == null ? void 0 : option.value);
    })[0];

    if (!action || !isActionOption(action)) {
      return React__default.createElement(React__default.Fragment, null);
    }

    return React__default.createElement(RadioActionView, {
      required: props.required,
      id: props.id + action.value.toString(),
      name: props.id + action.value.toString(),
      key: action.value,
      title: action.title,
      description: action.description,
      optionValue: option.value,
      value: props.value,
      onClick: function onClick() {
        props.onChange(option.value);
      }
    });
  }));
}

var _templateObject$F;
var ListStyles = /*#__PURE__*/css(_templateObject$F || (_templateObject$F = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  color: var(--sq-text);\n  font-family: \"Helvetica Neue\", Helvetica, sans-serif;\n  font-weight: var(--sq-font-weight-regular);\n  font-size: var(--sq-font-size-regular);\n  line-height: var(--sq-line-height-regular);\n"])));

var _templateObject$G, _templateObject2$y;
var ItemView = /*#__PURE__*/styled.li(_templateObject$G || (_templateObject$G = /*#__PURE__*/_taggedTemplateLiteralLoose([""])));
var StyledList = /*#__PURE__*/styled.ul(_templateObject2$y || (_templateObject2$y = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  ", "\n  ", "\n"])), ListStyles, function (props) {
  return props.customCSS;
});

var ListView = function ListView(_ref) {
  var _ref$customCSS = _ref.customCSS,
      customCSS = _ref$customCSS === void 0 ? {} : _ref$customCSS,
      children = _ref.children,
      _ref$type = _ref.type,
      type = _ref$type === void 0 ? "bullet" : _ref$type;
  var ListElement = type == "bullet" ? "ul" : "ol";
  return createElement(StyledList, {
    customCSS: customCSS,
    as: ListElement
  }, children);
};

var ListNamespace = /*#__PURE__*/Object.assign(ListView, {
  ItemView: ItemView
});
/**
 * @deprecated use {@link ListView} instead
 */

var ListNamespaceDeprecated = /*#__PURE__*/Object.assign(ListView, {
  Item: ItemView
});

var _templateObject$H, _templateObject2$z, _templateObject3$A, _templateObject4$q, _templateObject5$m, _templateObject6$g;
var MainDiv = /*#__PURE__*/css(_templateObject$H || (_templateObject$H = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  margin-top: var(--sq-spacing-xx-large);\n"])));
var HeadDiv = /*#__PURE__*/css(_templateObject2$z || (_templateObject2$z = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  cursor: pointer;\n"])));
var AccordionDiv = /*#__PURE__*/css(_templateObject3$A || (_templateObject3$A = /*#__PURE__*/_taggedTemplateLiteralLoose([""])));
var TitleH2 = /*#__PURE__*/css(_templateObject4$q || (_templateObject4$q = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  font-size: var(--sq-font-size-caption);\n  flex: 1;\n  margin: 0;\n"])));
var DescriptionP = /*#__PURE__*/css(_templateObject5$m || (_templateObject5$m = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  color: var(--sq-text-subdued);\n  margin: var(--sq-spacing-xx-small) 0 0;\n"])));
var CollapsibleDiv = /*#__PURE__*/css(_templateObject6$g || (_templateObject6$g = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  overflow: hidden;\n  max-height: 0;\n  transition: max-height 0.5s cubic-bezier(0, 1, 0, 1);\n"])));

var _excluded$h = ["heading", "description", "children", "customCSS"];

var _templateObject$I, _templateObject2$A, _templateObject3$B, _templateObject4$r, _templateObject5$n, _templateObject6$h, _templateObject7$d;
var AccordionDiv$1 = /*#__PURE__*/styled.div(_templateObject$I || (_templateObject$I = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  ", "\n  ", "\n"])), AccordionDiv, function (props) {
  return props.customCSS;
});
var HeadDiv$1 = /*#__PURE__*/styled.div(_templateObject2$A || (_templateObject2$A = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  ", "\n"])), HeadDiv);
var MainDiv$1 = /*#__PURE__*/styled.div(_templateObject3$B || (_templateObject3$B = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  ", "\n"])), MainDiv);
var CollapsibleDiv$1 = /*#__PURE__*/styled.div(_templateObject4$r || (_templateObject4$r = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  ", "\n\n  ", "\n"])), CollapsibleDiv, function (props) {
  return props.expanded && "max-height: 1000px; transition: max-height 1s ease-in-out;";
});
var TitleH2$1 = /*#__PURE__*/styled.h2(_templateObject5$n || (_templateObject5$n = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  ", "\n"])), TitleH2);
var DescriptionP$1 = /*#__PURE__*/styled.p(_templateObject6$h || (_templateObject6$h = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  ", "\n"])), DescriptionP);
var IconDiv = /*#__PURE__*/styled.div(_templateObject7$d || (_templateObject7$d = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  ", "\n  ", "\n"])), function (props) {
  return props.expanded && "transform: rotate( -180deg ); transition: transform 400ms ease;";
}, function (props) {
  return !props.expanded && "transform: rotate( 0deg ); transition: transform 400ms ease;";
});
var AccordionView = /*#__PURE__*/forwardRef(function (props, forwardedRef) {
  var title = props.heading,
      _props$description = props.description,
      description = _props$description === void 0 ? "" : _props$description,
      children = props.children,
      _props$customCSS = props.customCSS,
      customCSS = _props$customCSS === void 0 ? {} : _props$customCSS,
      rest = _objectWithoutPropertiesLoose(props, _excluded$h);

  var _useState = useState(false),
      expanded = _useState[0],
      setExpanded = _useState[1];

  return createElement(AccordionDiv$1, Object.assign({}, rest, {
    ref: forwardedRef,
    customCSS: customCSS
  }), createElement(HeadDiv$1, {
    onClick: function onClick() {
      setExpanded(!expanded);
    }
  }, createElement(TitleH2$1, null, title), createElement(IconDiv, {
    expanded: expanded
  }, createElement(IconView, {
    icon: "chevron_down",
    color: "var(--sq-text-subdued)"
  }))), createElement(CollapsibleDiv$1, {
    expanded: expanded
  }, createElement(DescriptionP$1, null, description), createElement(MainDiv$1, null, children)));
});
/**
 * @deprecated use {@link AccordionView} instead
 */

var Accordion = AccordionView;

var DataGraphic = /*#__PURE__*/React__default.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  xmlnsXlink: "http://www.w3.org/1999/xlink",
  width: "126",
  height: "91",
  fill: "none",
  viewBox: "0 0 126 91"
}, /*#__PURE__*/React__default.createElement("path", {
  fill: "url(#pattern0)",
  d: "M0 0H126V91H0z"
}), /*#__PURE__*/React__default.createElement("defs", null, /*#__PURE__*/React__default.createElement("pattern", {
  id: "pattern0",
  width: "1",
  height: "1",
  patternContentUnits: "objectBoundingBox"
}, /*#__PURE__*/React__default.createElement("use", {
  transform: "matrix(.00401 0 0 .00556 -.002 0)",
  xlinkHref: "#image0_120:653"
})), /*#__PURE__*/React__default.createElement("image", {
  id: "image0_120:653",
  width: "250",
  height: "180",
  xlinkHref: "data:image/png;base64,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"
})));

var _templateObject3$C, _templateObject4$s, _templateObject5$o, _templateObject6$i, _templateObject7$e, _templateObject8$7, _templateObject9$3, _templateObject10$3, _templateObject11$1, _templateObject15$1, _templateObject16$1, _templateObject17$1;
var RowBase = /*#__PURE__*/css(_templateObject3$C || (_templateObject3$C = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  display: flex;\n  padding: 20px;\n  justify-content: space-between;\n  align-items: center;\n  font-family: var(--sq-font-family-sans);\n  font-style: normal;\n  font-size: var(--sq-font-size-regular);\n  line-height: var(--sq-line-height-regular);\n  color: var(--sq-text-dark);\n"])));
var DataTableDiv = /*#__PURE__*/css(_templateObject4$s || (_templateObject4$s = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  & > :first-child {\n    border-radius: 6px 6px 0px 0px;\n  }\n  & > :last-child {\n    border-radius: 0px 0px 6px 6px;\n  }\n"])));
var Row = {
  row: /*#__PURE__*/css(_templateObject5$o || (_templateObject5$o = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n    background: var(--sq-surface);\n    border: 2px solid var(--sq-border);\n    border-top: 0px;\n    box-sizing: border-box;\n  "]))),
  header: /*#__PURE__*/css(_templateObject6$i || (_templateObject6$i = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n    font-weight: var(--sq-font-weight-bold);\n    background: var(--sq-background);\n    border: 2px solid var(--sq-border);\n    box-sizing: border-box;\n  "]))),
  extra: /*#__PURE__*/css(_templateObject7$e || (_templateObject7$e = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n    background: var(--sq-background);\n    border: 2px solid var(--sq-border);\n    box-sizing: border-box;\n  "])))
};
var BannerDiv = /*#__PURE__*/css(_templateObject8$7 || (_templateObject8$7 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  display: flex;\n  align-items: center;\n  padding: 0 var(--sq-spacing-large);\n  height: 74px;\n  color: var(--sq-surface);\n  background: var(--sq-nav-surface-primary);\n  box-sizing: border-box;\n"])));
var DataDiv = /*#__PURE__*/css(_templateObject9$3 || (_templateObject9$3 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  width: 100%;\n  text-align: center;\n"])));
var ContentDiv = /*#__PURE__*/css(_templateObject10$3 || (_templateObject10$3 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n\n  /* Body/Body Regular (14) */\n\n  font-family: var(--sq-font-family-sans);\n  font-weight: var(--sq-font-weight-regular);\n  font-size: var(--sq-font-size-regular);\n  line-height: var(--sq-line-height-regular);\n  /* identical to box height, or 143% */\n\n  /* On Surface/Text Dark */\n\n  color: var(--sq-text-dark);\n"])));
var SkeletonDiv = /*#__PURE__*/css(_templateObject11$1 || (_templateObject11$1 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  float: left;\n  margin-right: var(--sq-spacing-x-small);\n  border-radius: 50px;\n"])));
var PaginationDiv = /*#__PURE__*/css(_templateObject15$1 || (_templateObject15$1 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  display: flex;\n  padding: var(--sq-spacing-large);\n  align-items: center;\n  background: var(--sq-background);\n  border: 2px solid var(--sq-border);\n  border-top: 0px;\n  box-sizing: border-box;\n  font-family: var(--sq-font-family-sans);\n  font-weight: var(--sq-font-weight-regular);\n  font-size: var(--sq-font-size-regular);\n  line-height: var(--sq-line-height-regular);\n"])));
var PaginationText = /*#__PURE__*/css(_templateObject16$1 || (_templateObject16$1 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  padding: 6px;\n  color: var(--sq-text-interactive);\n  cursor: pointer;\n  font-family: var(--sq-font-family-sans);\n  font-size: var(--sq-font-size-regular);\n  line-height: var(--sq-line-height-regular);\n"])));
var PaginationContainer = /*#__PURE__*/css(_templateObject17$1 || (_templateObject17$1 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  display: flex;\n  align-items: center;\n  margin-left: auto;\n"])));

var _excluded$i = ["children", "customCSS"];

var _templateObject$J;
var BannerDiv$1 = /*#__PURE__*/styled.div(_templateObject$J || (_templateObject$J = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  ", "\n\n  ", "\n"])), BannerDiv, function (props) {
  return props.customCSS;
});
var BannerView = /*#__PURE__*/React__default.forwardRef(function (props, forwardedRef) {
  var children = props.children,
      _props$customCSS = props.customCSS,
      customCSS = _props$customCSS === void 0 ? "" : _props$customCSS,
      rest = _objectWithoutPropertiesLoose(props, _excluded$i);

  return React__default.createElement(BannerDiv$1, Object.assign({}, rest, {
    ref: forwardedRef,
    customCSS: customCSS
  }), children);
});

var _excluded$j = ["children", "customCSS"];

var _templateObject$K;
var MenusDiv = /*#__PURE__*/styled.div(_templateObject$K || (_templateObject$K = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  div + div {\n    margin-left: var(--sq-spacing-x-small);\n  }\n  margin-bottom: var(--sq-spacing-large);\n\n  ", "\n"])), function (props) {
  return props.customCSS;
});
var FilterView = /*#__PURE__*/React__default.forwardRef(function (props, forwardedRef) {
  var children = props.children,
      _props$customCSS = props.customCSS,
      customCSS = _props$customCSS === void 0 ? "" : _props$customCSS,
      rest = _objectWithoutPropertiesLoose(props, _excluded$j);

  return React__default.createElement(MenusDiv, Object.assign({}, rest, {
    ref: forwardedRef,
    customCSS: customCSS
  }), children);
});

var _templateObject$L, _templateObject2$B, _templateObject3$D, _templateObject4$t, _templateObject5$p, _templateObject6$j, _templateObject7$f, _templateObject8$8;
var DropdownDiv = /*#__PURE__*/css(_templateObject$L || (_templateObject$L = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  position: relative;\n  min-width: 191px;\n  display: inline-block;\n"])));
var SublistDiv = /*#__PURE__*/css(_templateObject2$B || (_templateObject2$B = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  border-radius: inherit;\n"])));
var subitem = /*#__PURE__*/css(_templateObject3$D || (_templateObject3$D = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  text-indent: 15px;\n  border-radius: inherit;\n"])));
var DropdownSublistDiv = /*#__PURE__*/css(_templateObject4$t || (_templateObject4$t = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  padding: 15px;\n  border-radius: inherit;\n  user-select: none;\n  color: var(--sq-text);\n  font-family: \"Helvetica Neue\", Helvetica, sans-serif;\n  font-weight: var(--sq-font-weight-regular);\n  font-size: var(--sq-font-size-regular);\n  line-height: var(--sq-line-height-regular);\n"])));
var arrow = /*#__PURE__*/css(_templateObject5$p || (_templateObject5$p = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  margin-left: auto;\n  svg {\n    width: 12px;\n    height: auto;\n  }\n"])));
var ButtonDiv$3 = /*#__PURE__*/css(_templateObject6$j || (_templateObject6$j = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  display: flex;\n  user-select: none;\n  padding: 7px 12px;\n  border: 1px solid var(--sq-action-secondary-border);\n  color: var(--sq-text);\n  font-family: \"Helvetica Neue\", Helvetica, sans-serif;\n  font-weight: var(--sq-font-weight-regular);\n  font-size: var(--sq-font-size-regular);\n  line-height: var(--sq-line-height-regular);\n"])));
var ContentDiv$1 = /*#__PURE__*/css(_templateObject7$f || (_templateObject7$f = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  position: absolute;\n  width: max-content;\n  min-width: inherit;\n  z-index: 100;\n  background: #ffffff;\n  border: 1px solid var(--sq-action-secondary-border);\n  box-sizing: border-box;\n  &:empty {\n    border: none;\n  }\n"])));
var ItemDiv = /*#__PURE__*/css(_templateObject8$8 || (_templateObject8$8 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  padding: 15px;\n  cursor: pointer;\n  color: var(--sq-text);\n  font-family: \"Helvetica Neue\", Helvetica, sans-serif;\n  font-weight: var(--sq-font-weight-regular);\n  font-size: var(--sq-font-size-regular);\n  line-height: var(--sq-line-height-regular);\n  border-radius: inherit;\n  &:hover {\n    background: var(--sq-surface-hover);\n  }\n"])));

var _excluded$k = ["text", "showMenu", "pill", "center", "narrow", "disabled", "popUpwards", "icon", "onClickDropdown", "children", "customCSS"],
    _excluded2 = ["onClick", "children", "customCSS"],
    _excluded3 = ["name", "children", "customCSS"];

var _templateObject$M, _templateObject2$C, _templateObject3$E, _templateObject4$u, _templateObject5$q, _templateObject6$k, _templateObject7$g, _templateObject8$9;
var DropdownDiv$1 = /*#__PURE__*/styled("div")(_templateObject$M || (_templateObject$M = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  ", "\n  ", "\n"])), DropdownDiv, function (props) {
  return props.customCSS;
});
var DropdownButtonDiv = /*#__PURE__*/styled("div")(_templateObject2$C || (_templateObject2$C = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  ", "\n  border-radius: ", ";\n  text-align: ", ";\n  line-height: ", ";\n  color: ", ";\n  background: ", ";\n  &:hover {\n    ", "\n    ", ";\n  }\n"])), ButtonDiv$3, function (props) {
  return props.pill ? "100px" : "4px";
}, function (props) {
  return props.center ? "center" : "left";
}, function (props) {
  return props.narrow ? "10px" : "16px";
}, function (props) {
  return props.disabled ? "var(--sq-action-secondary-border)" : "var(--sq-text-on-secondary)";
}, function (props) {
  return props.disabled ? "var(--sq-surface-subdued)" : "var(--sq-surface)";
}, function (props) {
  return !props.disabled && "box-shadow: inset 0 0 0 1px var(--sq-action-secondary-hovered);";
}, function (props) {
  return props.disabled && "cursor: not-allowed;";
});
var DropdownContentDiv = /*#__PURE__*/styled("div")(_templateObject3$E || (_templateObject3$E = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  ", "\n  border-radius: ", ";\n\n  ", "\n"])), ContentDiv$1, function (props) {
  return props.pill ? "20px" : "4px";
}, function (props) {
  return props.popUpwards ? "margin-bottom: var(--sq-spacing-x-small); top: 0; transform: translateY(-100%) translateY(calc(var(--sq-spacing-x-small) * -1)); ;" : "margin-top: var(--sq-spacing-x-small);";
});
var DropdownItemDiv = /*#__PURE__*/styled("div")(_templateObject4$u || (_templateObject4$u = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  ", "\n  ", "\n"])), ItemDiv, function (props) {
  return props.customCSS;
});
var SublistDiv$1 = /*#__PURE__*/styled("div")(_templateObject5$q || (_templateObject5$q = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  ", "\n  ", "\n"])), SublistDiv, function (props) {
  return props.customCSS;
});
var DropdownSubItemDiv = /*#__PURE__*/styled("div")(_templateObject6$k || (_templateObject6$k = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  ", "\n"])), subitem);
var DropdownSublistDiv$1 = /*#__PURE__*/styled("div")(_templateObject7$g || (_templateObject7$g = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  ", "\n"])), DropdownSublistDiv);
var ArrowStyleSpan = /*#__PURE__*/styled("span")(_templateObject8$9 || (_templateObject8$9 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  ", "\n"])), arrow);
var DropdownView = /*#__PURE__*/forwardRef(function (props, forwardedRef) {
  var _props$text = props.text,
      text = _props$text === void 0 ? "" : _props$text,
      _props$showMenu = props.showMenu,
      showMenu = _props$showMenu === void 0 ? false : _props$showMenu,
      _props$pill = props.pill,
      pill = _props$pill === void 0 ? false : _props$pill,
      _props$center = props.center,
      center = _props$center === void 0 ? false : _props$center,
      _props$narrow = props.narrow,
      narrow = _props$narrow === void 0 ? false : _props$narrow,
      _props$disabled = props.disabled,
      disabled = _props$disabled === void 0 ? false : _props$disabled,
      _props$popUpwards = props.popUpwards,
      popUpwards = _props$popUpwards === void 0 ? false : _props$popUpwards,
      icon = props.icon,
      onClickDropdown = props.onClickDropdown,
      children = props.children,
      _props$customCSS = props.customCSS,
      customCSS = _props$customCSS === void 0 ? {} : _props$customCSS,
      rest = _objectWithoutPropertiesLoose(props, _excluded$k);

  return createElement(DropdownDiv$1, Object.assign({}, rest, {
    ref: forwardedRef,
    customCSS: customCSS
  }), createElement(DropdownButtonDiv, {
    pill: pill,
    center: center,
    narrow: narrow,
    disabled: disabled,
    onClick: onClickDropdown
  }, icon && createElement(IconView, {
    color: "inherit",
    size: "16px",
    icon: icon,
    style: {
      margin: -3,
      top: 2.5,
      marginRight: "8px"
    }
  }), text, " ", createElement(ArrowStyleSpan, null, showMenu ? chevron_up : chevron_down)), showMenu && createElement(DropdownContentDiv, {
    pill: pill,
    popUpwards: popUpwards
  }, children));
});
var ItemView$1 = /*#__PURE__*/forwardRef(function (props, forwardedRef) {
  var onClick = props.onClick,
      children = props.children,
      _props$customCSS2 = props.customCSS,
      customCSS = _props$customCSS2 === void 0 ? {} : _props$customCSS2,
      rest = _objectWithoutPropertiesLoose(props, _excluded2);

  return createElement(DropdownItemDiv, Object.assign({
    onClick: onClick
  }, rest, {
    ref: forwardedRef,
    customCSS: customCSS
  }), children);
});
var SublistView = /*#__PURE__*/forwardRef(function (props, forwardedRef) {
  var name = props.name,
      children = props.children,
      _props$customCSS3 = props.customCSS,
      customCSS = _props$customCSS3 === void 0 ? {} : _props$customCSS3,
      rest = _objectWithoutPropertiesLoose(props, _excluded3);

  return createElement(SublistDiv$1, Object.assign({}, rest, {
    ref: forwardedRef,
    customCSS: customCSS
  }), createElement(DropdownSublistDiv$1, null, name), createElement(DropdownSubItemDiv, null, children));
});
var DropdownNamespace = /*#__PURE__*/Object.assign(DropdownView, {
  SublistView: SublistView,
  ItemView: ItemView$1
});
/**
 * @deprecated use {@link DropdownView} instead
 */

var DropdownNamespaceDeprecated = /*#__PURE__*/Object.assign(DropdownView, {
  Sublist: SublistView,
  Item: ItemView$1
});

var _excluded$l = ["offset", "limit", "updatePagination", "total", "hasNext", "customCSS"];

var _templateObject$N, _templateObject2$D, _templateObject3$F;
var PaginationDiv$1 = /*#__PURE__*/styled.div(_templateObject$N || (_templateObject$N = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  ", "\n\n  ", "\n"])), PaginationDiv, function (props) {
  return props.customCSS;
});
var TextDiv = /*#__PURE__*/styled.div(_templateObject2$D || (_templateObject2$D = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  ", "\n  ", "\n"])), PaginationText, function (props) {
  return props.selected ? "font-weight: var(--sq-font-weight-bold);" : "font-weight: var(--sq-font-weight-regular);";
});
var ContainerDiv$5 = /*#__PURE__*/styled.div(_templateObject3$F || (_templateObject3$F = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  ", "\n"])), PaginationContainer);
var PaginationView = /*#__PURE__*/forwardRef(function (props, forwardedRef) {
  var offset = props.offset,
      limit = props.limit,
      updatePagination = props.updatePagination,
      _props$total = props.total,
      total = _props$total === void 0 ? null : _props$total,
      _props$hasNext = props.hasNext,
      hasNext = _props$hasNext === void 0 ? false : _props$hasNext,
      _props$customCSS = props.customCSS,
      customCSS = _props$customCSS === void 0 ? {} : _props$customCSS,
      rest = _objectWithoutPropertiesLoose(props, _excluded$l);

  var current_page = Math.floor((offset + 1) / limit);
  var pages = total ? Array.from(Array(Math.ceil(total / limit)).keys()) : [current_page];
  var total_pages = pages[pages.length - 1];
  var filteredPages = pages.filter(function (page) {
    return Math.abs(page - current_page) < 3 || Math.abs(page - total_pages) < 3 || Math.abs(page) < 3;
  });

  var _React$useState = useState(false),
      dropdown = _React$useState[0],
      setDropdown = _React$useState[1];

  return createElement(PaginationDiv$1, Object.assign({}, rest, {
    ref: forwardedRef,
    customCSS: customCSS
  }), total && offset + 1 + " - " + Math.min(offset + limit, total) + " of " + total, createElement(ContainerDiv$5, null, createElement(IconButton, {
    borderless: true,
    size: "mini",
    icon: "chevron_left",
    customCSS: "margin: -3px; &:hover{background: none;}",
    disabled: offset == 0,
    onClick: function onClick() {
      updatePagination(limit, Math.max(offset - limit, 0));
    }
  }), filteredPages.map(function (p, i) {
    return createElement(Fragment, {
      key: "page-" + i
    }, i != 0 && filteredPages[i - 1] + 1 != p && createElement(TextDiv, {
      style: {
        cursor: "default"
      }
    }, "..."), createElement(TextDiv, {
      selected: current_page === p,
      onClick: function onClick() {
        updatePagination(limit, Math.max(limit * p, 0));
      }
    }, p + 1));
  }), createElement(IconButton, {
    size: "mini",
    icon: "chevron_right",
    borderless: true,
    customCSS: "margin: -3px; margin-right: var(--sq-spacing-x-large); &:hover{background: none;}",
    disabled: total != null ? offset + limit >= total : !hasNext,
    onClick: function onClick() {
      updatePagination(limit, offset + limit);
    }
  }), createElement(DropdownNamespaceDeprecated, {
    onClickDropdown: function onClickDropdown() {
      return setDropdown(!dropdown);
    },
    showMenu: dropdown,
    pill: true,
    center: true,
    popUpwards: true,
    text: limit + " Per Page",
    customCSS: "min-width: 165px; width: 165px; display: inline-block"
  }, createElement(DropdownNamespaceDeprecated.Item, {
    onClick: function onClick() {
      updatePagination(10, 0);
      setDropdown(false);
    }
  }, "10 Per Page"), createElement(DropdownNamespaceDeprecated.Item, {
    onClick: function onClick() {
      updatePagination(25, 0);
      setDropdown(false);
    }
  }, "25 Per Page"), createElement(DropdownNamespaceDeprecated.Item, {
    onClick: function onClick() {
      updatePagination(50, 0);
      setDropdown(false);
    }
  }, "50 Per Page"))));
});

var _excluded$m = ["variant", "children", "customCSS"];

var _templateObject$O, _templateObject2$E;
var RowDiv = /*#__PURE__*/styled.div(_templateObject$O || (_templateObject$O = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  ", "\n\n  ", "\n\n  ", "\n"])), RowBase, function (props) {
  return Row[props.variant];
}, function (props) {
  return props.customCSS;
});
var ContentDiv$2 = /*#__PURE__*/styled.div(_templateObject2$E || (_templateObject2$E = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  ", "\n  ", "\n  flex-grow: ", ";\n  width: ", ";\n"])), ContentDiv, function (props) {
  return props.center ? "text-align: center;" : "";
}, function (props) {
  return props.flex;
}, function (props) {
  return props.width;
});
var RowView = /*#__PURE__*/forwardRef(function (props, forwardedRef) {
  var _props$variant = props.variant,
      variant = _props$variant === void 0 ? "row" : _props$variant,
      children = props.children,
      _props$customCSS = props.customCSS,
      customCSS = _props$customCSS === void 0 ? {} : _props$customCSS,
      rest = _objectWithoutPropertiesLoose(props, _excluded$m);

  return createElement(RowDiv, Object.assign({
    variant: variant
  }, rest, {
    ref: forwardedRef,
    customCSS: customCSS
  }), children && children.map(function (cell, i) {
    return createElement(ContentDiv$2, {
      flex: cell.flex ? cell.flex : "1",
      center: cell.center,
      width: cell.width ? cell.width : "100px",
      key: i
    }, cell.text);
  }));
});

var _excluded$n = ["width", "children", "customCSS", "empty", "emptyFilter", "emptyContent", "emptyFilterContent", "headerSlot", "footerSlot"];

var _templateObject$P, _templateObject2$F, _templateObject3$G;
var DataDiv$1 = /*#__PURE__*/styled.div(_templateObject$P || (_templateObject$P = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  ", "\n"])), DataDiv);
var RowDiv$1 = /*#__PURE__*/styled.div(_templateObject2$F || (_templateObject2$F = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  ", "\n  ", "\n"])), RowBase, Row.row);
var DataTableDiv$1 = /*#__PURE__*/styled.div(_templateObject3$G || (_templateObject3$G = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  ", "\n  width: ", ";\n  ", "\n"])), DataTableDiv, function (props) {
  return props.width;
}, function (props) {
  return props.customCSS;
});
var DataTableView = /*#__PURE__*/forwardRef(function (props, forwardedRef) {
  var _props$width = props.width,
      width = _props$width === void 0 ? "100%" : _props$width,
      children = props.children,
      _props$customCSS = props.customCSS,
      customCSS = _props$customCSS === void 0 ? {} : _props$customCSS,
      _props$empty = props.empty,
      empty = _props$empty === void 0 ? false : _props$empty,
      _props$emptyFilter = props.emptyFilter,
      emptyFilter = _props$emptyFilter === void 0 ? false : _props$emptyFilter,
      _props$emptyContent = props.emptyContent,
      emptyContent = _props$emptyContent === void 0 ? "No submission found" : _props$emptyContent,
      _props$emptyFilterCon = props.emptyFilterContent,
      emptyFilterContent = _props$emptyFilterCon === void 0 ? "No submissions that meet your filter criteria" : _props$emptyFilterCon,
      _props$headerSlot = props.headerSlot,
      headerContent = _props$headerSlot === void 0 ? createElement(Fragment, null) : _props$headerSlot,
      _props$footerSlot = props.footerSlot,
      footerContent = _props$footerSlot === void 0 ? createElement(Fragment, null) : _props$footerSlot,
      rest = _objectWithoutPropertiesLoose(props, _excluded$n);

  return createElement(DataTableDiv$1, Object.assign({}, rest, {
    width: width,
    ref: forwardedRef,
    customCSS: customCSS
  }), headerContent, empty && createElement(RowDiv$1, null, createElement(DataDiv$1, null, DataGraphic, createElement("br", null), emptyContent)), !empty && emptyFilter && createElement(RowDiv$1, null, createElement(DataDiv$1, null, DataGraphic, createElement("br", null), emptyFilterContent)), !empty && !emptyFilter && children, footerContent);
});

var _excluded$o = ["circle", "size", "color", "children", "customCSS"];

var _templateObject$Q;
var SkeletonDiv$1 = /*#__PURE__*/styled.div(_templateObject$Q || (_templateObject$Q = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  ", "\n  background: ", ";\n\n  height: ", ";\n  width: ", ";\n\n  ", ";\n"])), SkeletonDiv, function (props) {
  return props.color ? props.color : "var(--sq-border)";
}, function (props) {
  return props.circle ? props.size ? props.size : "15px" : "15px";
}, function (props) {
  return props.circle ? props.size ? props.size : "15px" : props.size ? props.size : "100%";
}, function (props) {
  return props.customCSS;
});
var SkeletonView = /*#__PURE__*/forwardRef(function (props, forwardedRef) {
  var _props$circle = props.circle,
      circle = _props$circle === void 0 ? false : _props$circle,
      size = props.size,
      color = props.color,
      children = props.children,
      _props$customCSS = props.customCSS,
      customCSS = _props$customCSS === void 0 ? {} : _props$customCSS,
      rest = _objectWithoutPropertiesLoose(props, _excluded$o);

  return createElement(SkeletonDiv$1, Object.assign({}, rest, {
    circle: circle,
    size: size,
    color: color,
    ref: forwardedRef,
    customCSS: customCSS
  }), children);
});

var DataTableNamespace = /*#__PURE__*/Object.assign(DataTableView, {
  RowView: RowView,
  PaginationView: PaginationView,
  BannerView: BannerView,
  FilterView: FilterView,
  SkeletonView: SkeletonView
});
/**
 * @deprecated use {@link DataTableView} instead
 */

var DataTableNamespaceDeprecated = /*#__PURE__*/Object.assign(DataTableView, {
  Row: RowView,
  Pagination: PaginationView,
  Banner: BannerView,
  Filter: FilterView,
  Skeleton: SkeletonView
});

var _templateObject$R, _templateObject2$G, _templateObject3$H;
var StyledSection = /*#__PURE__*/css(_templateObject$R || (_templateObject$R = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  box-sizing: border-box;\n  padding: 12px 24px;\n  overflow-wrap: break-word;\n  word-wrap: break-word;\n\n  &:not(:last-child) {\n    border-bottom: 1px solid var(--sq-border);\n  }\n"])));
var StyledAction = /*#__PURE__*/css(_templateObject2$G || (_templateObject2$G = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  padding: 0px;\n  box-sizing: border-box;\n  font-size: var(--sq-font-size-small);\n  text-decoration: none;\n  color: var(--sq-action-primary);\n  overflow-wrap: break-word;\n  word-wrap: break-word;\n  max-width: 100%;\n"])));
var StyledContainer = /*#__PURE__*/css(_templateObject3$H || (_templateObject3$H = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  position: absolute;\n  z-index: 999;\n  background: var(--sq-surface);\n  max-width: 300px;\n  width: fit-content;\n  box-sizing: border-box;\n  border-radius: 10px;\n  border: 1px solid var(--sq-border);\n  color: var(--sq-text);\n  font-size: var(--sq-font-size-small);\n  line-height: var(--sq-line-height-regular);\n  font-family: var(--sq-font-family-sans);\n  box-shadow: 3px 3px 7px 0px #00000014;\n"])));

var _excluded$p = ["children"];

var _templateObject$S, _templateObject2$H, _templateObject3$I;
var StyledSectionDiv = /*#__PURE__*/styled.div(_templateObject$S || (_templateObject$S = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  ", "\n"])), StyledSection);

var SectionView = function SectionView(_ref) {
  var children = _ref.children;
  return createElement(StyledSectionDiv, null, children);
};

var StyledActionButton = /*#__PURE__*/styled(Button)(_templateObject2$H || (_templateObject2$H = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  ", "\n"])), StyledAction);

var ActionView = function ActionView(_ref2) {
  var children = _ref2.children,
      rest = _objectWithoutPropertiesLoose(_ref2, _excluded$p);

  return createElement(StyledActionButton, Object.assign({
    buttonType: "text"
  }, rest), children);
};

var StyledContainerDiv = /*#__PURE__*/styled.div(_templateObject3$I || (_templateObject3$I = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  display: ", ";\n\n  transform: translate(\n    ", ",\n    ", "\n  );\n\n  ", "\n"])), function (_ref3) {
  var show = _ref3.show;
  return show ? "block" : "none";
}, function (_ref4) {
  var relativeX = _ref4.relativeX;
  return relativeX;
}, function (_ref5) {
  var relativeY = _ref5.relativeY;
  return relativeY;
}, StyledContainer);

var PopoverView = function PopoverView(_ref6) {
  var _ref6$show = _ref6.show,
      show = _ref6$show === void 0 ? true : _ref6$show,
      _ref6$relativeY = _ref6.relativeY,
      relativeY = _ref6$relativeY === void 0 ? "0px" : _ref6$relativeY,
      _ref6$relativeX = _ref6.relativeX,
      relativeX = _ref6$relativeX === void 0 ? "0px" : _ref6$relativeX,
      children = _ref6.children;

  if (Children.count(children) > 1) {
    return createElement(StyledContainerDiv, {
      show: show,
      relativeX: relativeX,
      relativeY: relativeY
    }, children);
  } else {
    return createElement(StyledContainerDiv, {
      show: show,
      relativeX: relativeX,
      relativeY: relativeY
    }, createElement(StyledSectionDiv, {
      style: {
        padding: "8px 16px"
      }
    }, children));
  }
};

var PopoverNamespace = /*#__PURE__*/Object.assign(PopoverView, {
  SectionView: SectionView,
  ActionView: ActionView
});
/**
 * @deprecated use {@link ListView} instead
 */

var PopoverNamespaceDeprecated = /*#__PURE__*/Object.assign(PopoverView, {
  Section: SectionView,
  Action: ActionView
});

var HoverPopover = function HoverPopover(_ref) {
  var handle = _ref.handle,
      children = _ref.children;

  var _useState = useState(false),
      show = _useState[0],
      setShow = _useState[1];

  return React__default.createElement("span", {
    onMouseOver: function onMouseOver() {
      setShow(true);
    },
    onMouseLeave: function onMouseLeave() {
      setShow(false);
    },
    style: {
      position: "relative",
      display: "contents"
    }
  }, handle, show && children);
};

var _excluded$q = ["copyContent", "copyCallback", "children"];

var _templateObject$T;
var ContainerDiv$6 = /*#__PURE__*/styled.div(_templateObject$T || (_templateObject$T = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  display: contents;\n"])));
var CopyWrapperView = /*#__PURE__*/React__default.forwardRef(function (props, forwardedRef) {
  var copyContent = props.copyContent,
      copyCallback = props.copyCallback,
      children = props.children,
      rest = _objectWithoutPropertiesLoose(props, _excluded$q);

  var writeToClipboard = function writeToClipboard() {
    navigator.clipboard.writeText(copyContent).then(function () {
      copyCallback(true);
    }, function () {
      copyCallback(true);
    });
  };

  return React__default.createElement(ContainerDiv$6, Object.assign({
    onClick: writeToClipboard
  }, rest, {
    ref: forwardedRef
  }), children);
});
/**
 * @deprecated use {@link CopyWrapperView} instead
 */

var CopyWrapper = CopyWrapperView;

var _templateObject$U;
var CardContainer = /*#__PURE__*/styled.div(_templateObject$U || (_templateObject$U = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  border: 1px solid var(--sq-border);\n  border-radius: 10px;\n  padding: var(--sq-spacing-large);\n"])));

var _templateObject$V, _templateObject2$I, _templateObject3$J, _templateObject4$v, _templateObject5$r, _templateObject6$l, _templateObject7$h, _templateObject8$a, _templateObject9$4, _templateObject10$4, _templateObject11$2, _templateObject12$1, _templateObject13$1, _templateObject14$1, _templateObject15$2, _templateObject16$2;
var CardDiv = /*#__PURE__*/css(_templateObject$V || (_templateObject$V = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  width: 277px;\n  height: 215px;\n  background: var(--sq-surface);\n  border: 2px solid var(--sq-border);\n  box-sizing: border-box;\n  border-radius: 4px;\n  color: var(--sq-text);\n  padding: var(--sq-spacing-x-small);\n"])));
var CardHeaderDiv = /*#__PURE__*/css(_templateObject2$I || (_templateObject2$I = /*#__PURE__*/_taggedTemplateLiteralLoose(["\ndisplay: flex;\nheight: 40px;\nvertical-align: middle\nflex-direction: column;\nalign-items: center;\npadding: var(--sq-spacing-x-small);"])));
var CardHeaderIconDiv = /*#__PURE__*/css(_templateObject3$J || (_templateObject3$J = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  float: left;\n  margin-right: 16px;\n"])));
var CardHeaderTextDiv = /*#__PURE__*/css(_templateObject4$v || (_templateObject4$v = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  font-family: \"Helvetica Neue\", Helvetica, sans-serif;\n  font-weight: var(--sq-font-weight-bold);\n  font-size: var(--sq-font-size-header-three);\n  line-height: var(--sq-line-height-header-three);\n  float: left;\n"])));
var CardTextDiv = /*#__PURE__*/css(_templateObject5$r || (_templateObject5$r = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  height: 94px;\n  font-family: var(--sq-font-family-sans);\n  font-weight: var(--sq-font-weight-regular);\n  font-size: var(--sq-font-size-regular);\n  line-height: var(--sq-line-height-regular);\n  padding: var(--sq-spacing-x-small);\n"])));
var CardFooterDiv = /*#__PURE__*/css(_templateObject6$l || (_templateObject6$l = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  position: relative;\n  bottom: 0px;\n"])));
var CardLongDiv = /*#__PURE__*/css(_templateObject7$h || (_templateObject7$h = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  width: 450px;\n  height: 211px;\n  background: var(--sq-surface);\n  border: 2px solid var(--sq-border);\n  box-sizing: border-box;\n  border-radius: 4px;\n  color: var(--sq-text);\n  font-family: var(--sq-font-family-sans);\n  font-weight: var(--sq-font-weight-regular);\n  font-size: var(--sq-font-size-regular);\n  line-height: var(--sq-line-height-regular);\n"])));
var CardLongHeaderDiv = /*#__PURE__*/css(_templateObject8$a || (_templateObject8$a = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  flex-direction: column;\n  align-items: center;\n  vertical-align: middle\n  font-family: 'Helvetica Neue', Helvetica, sans-serif;\n  font-weight: var(--sq-font-weight-bold);\n  font-size: var(--sq-font-size-header-three);\n  line-height: var(--sq-line-height-header-three);\n  padding: var(--sq-spacing-large);\n  padding-bottom: 0;\n"])));
var CardLongTextDiv = /*#__PURE__*/css(_templateObject9$4 || (_templateObject9$4 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  height: 61px;\n  font-size: var(--sq-font-size-regular);\n  padding: var(--sq-spacing-large);\n"])));
var CardLongFooterDiv = /*#__PURE__*/css(_templateObject10$4 || (_templateObject10$4 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  position: relative;\n  bottom: 0px;\n  background: var(--sq-background);\n  height: 26px;\n  padding: var(--sq-spacing-large);\n"])));
var CardEditDiv = /*#__PURE__*/css(_templateObject11$2 || (_templateObject11$2 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  width: 850px;\n  height: 74px;\n  background: var(--sq-surface);\n  border: 2px solid var(--sq-border);\n  box-sizing: border-box;\n  border-radius: 4px;\n  color: var(--sq-text);\n  padding: var(--sq-spacing-medium);\n"])));
var CardEditHeaderDiv = /*#__PURE__*/css(_templateObject12$1 || (_templateObject12$1 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  display: flex;\t\n  height: 40px;\n  vertical-align: middle\n  flex-direction: column;\n  align-items: center;\n"])));
var CardEditHeaderIconDiv = /*#__PURE__*/css(_templateObject13$1 || (_templateObject13$1 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  float: left;\n  margin-right: var(--sq-spacing-medium);\n"])));
var CardEditHeaderTextDiv = /*#__PURE__*/css(_templateObject14$1 || (_templateObject14$1 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  font-family: var(--sq-font-family-sans);\n  font-weight: var(--sq-font-weight-bold);\n  font-size: var(--sq-font-size-header-three);\n  line-height: var(--sq-line-height-header-three);\n  float: left;\n"])));
var CardEditTitleTextDiv = /*#__PURE__*/css(_templateObject15$2 || (_templateObject15$2 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  font-family: var(--sq-font-family-sans);\n  font-weight: var(--sq-font-weight-bold);\n  font-size: var(--sq-font-size-regular);\n  line-height: var(--sq-line-height-regular);\n"])));
var CardEditTextDescriptionDiv = /*#__PURE__*/css(_templateObject16$2 || (_templateObject16$2 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  color: var(--sq-text-subdued);\n  font-family: var(--sq-font-family-sans);\n  font-weight: var(--sq-font-weight-regular);\n  font-size: var(--sq-font-size-regular);\n  line-height: var(--sq-line-height-regular);\n"])));

var _excluded$r = ["title", "children", "customCSS"];

var _templateObject$W, _templateObject2$J, _templateObject3$K, _templateObject4$w, _templateObject5$s, _templateObject6$m;
var CardDiv$1 = /*#__PURE__*/styled.div(_templateObject$W || (_templateObject$W = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  ", "\n  ", "\n"])), CardDiv, function (props) {
  return props.customCSS;
});
var CardHeaderDiv$1 = /*#__PURE__*/styled.div(_templateObject2$J || (_templateObject2$J = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  ", "\n"])), CardHeaderDiv);
var CardHeaderIconDiv$1 = /*#__PURE__*/styled.div(_templateObject3$K || (_templateObject3$K = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  ", "\n"])), CardHeaderIconDiv);
var CardHeaderTextDiv$1 = /*#__PURE__*/styled.div(_templateObject4$w || (_templateObject4$w = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  ", "\n"])), CardHeaderTextDiv);
var CardTextDiv$1 = /*#__PURE__*/styled.div(_templateObject5$s || (_templateObject5$s = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  ", "\n"])), CardTextDiv);
var CardFooterDiv$1 = /*#__PURE__*/styled.div(_templateObject6$m || (_templateObject6$m = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  ", "\n"])), CardFooterDiv);
var CardView = /*#__PURE__*/forwardRef(function (props, forwardedRef) {
  var title = props.title,
      children = props.children,
      _props$customCSS = props.customCSS,
      customCSS = _props$customCSS === void 0 ? {} : _props$customCSS,
      rest = _objectWithoutPropertiesLoose(props, _excluded$r);

  return createElement(CardDiv$1, Object.assign({}, rest, {
    ref: forwardedRef,
    customCSS: customCSS
  }), createElement(CardHeaderDiv$1, null, createElement(CardHeaderIconDiv$1, null, createElement(IconView, {
    icon: "calendar",
    size: "large",
    customCSS: "",
    color: "var(--sq-text-subdued)"
  })), createElement(CardHeaderTextDiv$1, null, title)), createElement(CardTextDiv$1, null, " ", children), createElement(CardFooterDiv$1, null, createElement(Button, {
    buttonType: "secondary",
    size: "small",
    pill: true,
    customCSS: "width: 124px; margin-right: 8px;"
  }, "Learn More"), createElement(Button, {
    buttonType: "primary",
    size: "small",
    pill: true,
    customCSS: "width: 124px;"
  }, "Create")));
});
/**
 * @deprecated use {@link CardView} instead
 */

var Card = CardView;

var _excluded$s = ["title", "footer", "children", "customCSS"];

var _templateObject$X, _templateObject2$K, _templateObject3$L, _templateObject4$x;
var CardDiv$2 = /*#__PURE__*/styled.div(_templateObject$X || (_templateObject$X = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  ", "\n  ", "\n"])), CardLongDiv, function (props) {
  return props.customCSS;
});
var CardHeaderDiv$2 = /*#__PURE__*/styled.div(_templateObject2$K || (_templateObject2$K = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  ", "\n"])), CardLongHeaderDiv);
var CardTextDiv$2 = /*#__PURE__*/styled.div(_templateObject3$L || (_templateObject3$L = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  ", "\n"])), CardLongTextDiv);
var CardFooterDiv$2 = /*#__PURE__*/styled.div(_templateObject4$x || (_templateObject4$x = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  ", "\n"])), CardLongFooterDiv);
var CardLongView = /*#__PURE__*/forwardRef(function (props, forwardedRef) {
  var title = props.title,
      footer = props.footer,
      children = props.children,
      _props$customCSS = props.customCSS,
      customCSS = _props$customCSS === void 0 ? {} : _props$customCSS,
      rest = _objectWithoutPropertiesLoose(props, _excluded$s);

  return createElement(CardDiv$2, Object.assign({}, rest, {
    ref: forwardedRef,
    customCSS: customCSS
  }), createElement(CardHeaderDiv$2, null, title), createElement(CardTextDiv$2, null, children), createElement(CardFooterDiv$2, null, footer));
});
/**
 * @deprecated use {@link ButtonView} instead
 */

var CardLong = CardLongView;

var _excluded$t = ["title", "edit", "children", "customCSS"];

var _templateObject$Y, _templateObject2$L, _templateObject3$M, _templateObject4$y, _templateObject5$t, _templateObject6$n;
var CardDiv$3 = /*#__PURE__*/styled.div(_templateObject$Y || (_templateObject$Y = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  ", "\n  ", "\n"])), CardEditDiv, function (props) {
  return props.customCSS;
});
var CardHeaderDiv$3 = /*#__PURE__*/styled.div(_templateObject2$L || (_templateObject2$L = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  ", "\n"])), CardEditHeaderDiv);
var CardHeaderIconDiv$2 = /*#__PURE__*/styled.div(_templateObject3$M || (_templateObject3$M = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  ", "\n"])), CardEditHeaderIconDiv);
var CardHeaderTextDiv$2 = /*#__PURE__*/styled.div(_templateObject4$y || (_templateObject4$y = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  ", "\n"])), CardEditHeaderTextDiv);
var TitleTextDiv = /*#__PURE__*/styled.div(_templateObject5$t || (_templateObject5$t = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  ", "\n"])), CardEditTitleTextDiv);
var TextDescscriptionDiv = /*#__PURE__*/styled.div(_templateObject6$n || (_templateObject6$n = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  ", "\n"])), CardEditTextDescriptionDiv);
var CardEditView = /*#__PURE__*/forwardRef(function (props, forwardedRef) {
  var title = props.title,
      _props$edit = props.edit,
      edit = _props$edit === void 0 ? false : _props$edit,
      children = props.children,
      _props$customCSS = props.customCSS,
      customCSS = _props$customCSS === void 0 ? {} : _props$customCSS,
      rest = _objectWithoutPropertiesLoose(props, _excluded$t); // const [oldValue, setOldValue] = useState("");


  var _useState = useState(false),
      locked = _useState[0],
      setLocked = _useState[1];

  return createElement(CardDiv$3, Object.assign({}, rest, {
    ref: forwardedRef,
    customCSS: customCSS
  }), createElement(CardHeaderDiv$3, null, createElement(CardHeaderIconDiv$2, null, createElement(IconView, {
    icon: "calendar",
    size: "large",
    customCSS: "",
    color: "var(--sq-text-subdued)"
  })), edit && createElement(Fragment, null, createElement(InputView, {
    placeholder: "Edit Program Name",
    disabled: locked,
    buttons: locked == true ? createElement(IconButton, {
      icon: "edit",
      size: "mini",
      customCSS: "position: relative; left: -30px;",
      primary: true,
      icon_css: "margin: -10px; top: 9px;",
      onClick: function onClick() {
        setLocked(false);
      }
    }) : createElement(Fragment, null, createElement(IconButton, {
      icon: "checkmark",
      size: "mini",
      customCSS: "position: relative; left: -50px;",
      primary: true,
      icon_css: "margin: -10px; top: 9px;",
      onClick: function onClick() {
        setLocked(true);
      }
    }), createElement(IconButton, {
      icon: "close",
      size: "mini",
      customCSS: "position: relative; left: -47px;",
      icon_css: "margin: -10px; top: 8px;  color: #858585",
      onClick: function onClick() {
        setLocked(true);
      }
    }))
  })), !edit && createElement(Fragment, null, createElement(CardHeaderTextDiv$2, null, createElement(TitleTextDiv, null, title, createElement(IconView, {
    size: "25px",
    icon: "edit",
    customCSS: "margin: -5px; margin-left: 0; :hover{color: #0275FB\t;}"
  }), createElement(BadgeView, {
    status: "success",
    customCSS: "display: inline; margin-left: 16px; font-size: 12px; padding: 1px 15px; "
  }, "Live")), createElement(TextDescscriptionDiv, null, children))), createElement(Button, {
    buttonType: "secondary",
    pill: true,
    customCSS: "margin-left: auto; float: right;"
  }, "Edit")));
});
/**
 * @deprecated use {@link CardEditView} instead
 */

var CardEdit = CardEditView;

var _templateObject$Z, _templateObject2$M, _templateObject3$N;
var root = /*#__PURE__*/css(_templateObject$Z || (_templateObject$Z = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  box-sizing: border-box;\n  display: flex;\n  flex-direction: row;\n  justify-content: flex-start;\n  align-items: center;\n\n  color: var(--sq-text);\n  font-family: \"Helvetica Neue\", Helvetica, sans-serif;\n  font-weight: var(--sq-font-weight-regular);\n  font-size: var(--sq-font-size-regular);\n  line-height: var(--sq-line-height-regular);\n"])));
var Tab = /*#__PURE__*/css(_templateObject2$M || (_templateObject2$M = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  cursor: pointer;\n"])));
var defaultTabStyle = /*#__PURE__*/css(_templateObject3$N || (_templateObject3$N = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  border-bottom: 2px solid transparent;\n\n  padding: 12px 32px;\n\n  &.active {\n    font-weight: bold;\n    border-bottom: 2px solid #575757;\n  }\n\n  &.disabled {\n    color: var(--sq-text-subdued);\n    cursor: default;\n  }\n"])));

var _templateObject$_;
var TabsContext = /*#__PURE__*/createContext([undefined, undefined]);

var TabView = function TabView(_ref) {
  var id = _ref.id,
      disabled = _ref.disabled,
      children = _ref.children;

  var _useTabs = useTabs(),
      selected = _useTabs[0],
      setId = _useTabs[1];

  return createElement("div", {
    className: "tab" + (selected == id ? " active" : "") + " " + (disabled ? "disabled" : ""),
    onClick: function onClick() {
      return !disabled && setId(id);
    }
  }, children);
};

function useTabs() {
  var cxt = useContext(TabsContext);
  if (!cxt) throw new Error("Tab must be within Tabs component");
  return cxt;
}

var StyledTabsContainerDiv = /*#__PURE__*/styled.div(_templateObject$_ || (_templateObject$_ = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  ", "\n  & > .tab {\n    ", "\n    ", "\n  }\n"])), root, Tab, function (_ref2) {
  var customStyle = _ref2.customStyle;
  return customStyle ? customStyle : defaultTabStyle;
});

var TabsView = function TabsView(_ref3) {
  var selected = _ref3.selected,
      onTabClick = _ref3.onTabClick,
      customTabStyle = _ref3.customTabStyle,
      children = _ref3.children;
  return createElement(TabsContext.Provider, {
    value: [selected, onTabClick]
  }, createElement(StyledTabsContainerDiv, {
    customStyle: customTabStyle
  }, children));
};

var TabsNamespace = /*#__PURE__*/Object.assign(TabsView, {
  TabView: TabView
});
var TabsNamespaceDeprecated = /*#__PURE__*/Object.assign(TabsView, {
  Tab: TabView
});

var _templateObject$$, _templateObject2$N, _templateObject3$O, _templateObject4$z, _templateObject5$u, _templateObject6$o, _templateObject7$i, _templateObject8$b, _templateObject9$5, _templateObject10$5;
var ModalBackdropStyle = /*#__PURE__*/css(_templateObject$$ || (_templateObject$$ = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  position: absolute;\n  display: flex;\n  flex-direction: column;\n  background-color: rgba(0, 0, 0, 0.7);\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n"])));
var ModalDivStyle = /*#__PURE__*/css(_templateObject2$N || (_templateObject2$N = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  position: relative;\n  white-space: pre-wrap;\n  min-width: 558px;\n  background-color: var(--sq-surface);\n  border-radius: 8px;\n  overflow: hidden;\n  margin: auto;\n  padding: 0;\n"])));
var ModalHeaderStyle = /*#__PURE__*/css(_templateObject3$O || (_templateObject3$O = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  user-select: none;\n  padding: var(--sq-spacing-large);\n  background: var(--sq-nav-surface-primary);\n  box-sizing: border-box;\n  // border-radius: 8px 8px 0 0;\n  font-family: var(--sq-font-family-sans);\n  font-weight: var(--sq-font-weight-bold);\n  font-size: var(--sq-font-size-header-one);\n  line-height: var(--sq-line-height-header-one);\n  color: var(--sq-surface);\n"])));
var ModalActionDivStyle = /*#__PURE__*/css(_templateObject4$z || (_templateObject4$z = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  margin-top: 10px;\n  box-sizing: border-box;\n  border-radius: 0 0 8px 8px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n"])));
var ModalContentDivStyle = /*#__PURE__*/css(_templateObject5$u || (_templateObject5$u = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  max-height: 650px;\n  overflow: hidden;\n  overflow-y: overlay;\n\n  ::-webkit-scrollbar {\n    width: 6px;\n  }\n\n  ::-webkit-scrollbar-track {\n  }\n\n  ::-webkit-scrollbar-thumb {\n    background: var(--sq-border);\n    border-radius: 50px;\n  }\n\n  ::-webkit-scrollbar-thumb:hover {\n  }\n  padding: var(--sq-spacing-large);\n"])));
var ModalContentTextDivStyle = /*#__PURE__*/css(_templateObject6$o || (_templateObject6$o = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  max-width: fit-content;\n  margin-top: 10px;\n  margin-bottom: 10px;\n  color: var(--sq-text);\n  font-family: var(--sq-font-family-sans);\n  font-size: var(--sq-font-size-regular);\n  font-weight: var(--sq-font-weight-regular);\n  line-height: var(--sq-line-height-regular);\n"])));
var CodeDivStyle = /*#__PURE__*/css(_templateObject7$i || (_templateObject7$i = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  display: flex;\n  align-items: center;\n  padding: var(--sq-spacing-large);\n  color: var(--sq-text);\n  background: var(--sq-background);\n  border: 1px solid var(--sq-border);\n  box-sizing: border-box;\n  border-radius: 4px;\n  font-family: monospace;\n  font-size: var(--sq-font-size-regular);\n  font-weight: var(--sq-font-weight-regular);\n  line-height: var(--sq-line-height-regular);\n"])));
var DividerDivStyle = /*#__PURE__*/css(_templateObject8$b || (_templateObject8$b = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  height: 1px;\n  width: calc(100% + 40px);\n  background: var(--sq-border);\n  margin: var(--sq-spacing-large) calc(-1 * var(--sq-spacing-large));\n  padding-right: 40px;\n"])));
var ModalBannerDivStyle = /*#__PURE__*/css(_templateObject9$5 || (_templateObject9$5 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  user-select: none;\n  display: flex;\n  padding: var(--sq-spacing-large);\n  margin: calc(-1 * var(--sq-spacing-large));\n  margin-bottom: var(--sq-spacing-large);\n  align-items: center;\n  text-indent: var(--sq-spacing-large);\n  background: var(--sq-surface-modal-banner);\n  color: var(--sq-surface);\n  font-family: var(--sq-font-family-sans);\n  font-weight: var(--sq-font-weight-bold);\n  font-size: var(--sq-font-size-header-three);\n  line-height: var(--sq-line-height-regular);\n"])));
var ModalBackDivStyle = /*#__PURE__*/css(_templateObject10$5 || (_templateObject10$5 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  user-select: none;\n  display: flex;\n  height: 20px;\n  align-items: center;\n  background: var(--sq-surface-modal-banner);\n  text-indent: 15px;\n  font-family: Helvetica;\n  font-style: normal;\n  font-weight: normal;\n  font-size: var(--sq-font-size-header-three);\n  line-height: var(--sq-line-height-header-three);\n  color: var(--sq-text-subdued);\n  background: var(--sq-surface);\n  border-bottom: 1px solid var(--sq-border);\n  padding: var(--sq-spacing-large);\n  margin: calc(-1 * var(--sq-spacing-large));\n  margin-bottom: var(--sq-spacing-large);\n"])));

var _excluded$u = ["primaryAction", "secondaryAction", "children", "customCSS"],
    _excluded2$1 = ["children", "customCSS"],
    _excluded3$1 = ["children", "customCSS"],
    _excluded4 = ["children", "customCSS"],
    _excluded5 = ["children", "customCSS"],
    _excluded6 = ["banner", "children", "customCSS"],
    _excluded7 = ["action", "children", "customCSS"];

var _templateObject$10, _templateObject2$O, _templateObject3$P, _templateObject4$A, _templateObject5$v, _templateObject6$p, _templateObject7$j;
var ModalActionDiv = /*#__PURE__*/styled.div(_templateObject$10 || (_templateObject$10 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  ", "\n  ", "\n"])), ModalActionDivStyle, function (props) {
  return props.customCSS;
});
var ModalContentActionView = /*#__PURE__*/forwardRef(function (props, forwardedRef) {
  var primaryAction = props.primaryAction,
      secondaryAction = props.secondaryAction,
      _props$customCSS = props.customCSS,
      customCSS = _props$customCSS === void 0 ? {} : _props$customCSS,
      rest = _objectWithoutPropertiesLoose(props, _excluded$u);

  return createElement(ModalActionDiv, Object.assign({}, rest, {
    ref: forwardedRef,
    customCSS: customCSS
  }), secondaryAction && createElement(Button, {
    buttonType: "secondary",
    pill: true,
    onClick: secondaryAction.onAction,
    style: {
      marginRight: 25
    }
  }, secondaryAction.text), primaryAction && createElement(Button, {
    buttonType: "primary",
    pill: true,
    onClick: primaryAction.onAction,
    critical: primaryAction.danger
  }, primaryAction.text));
});
var ModalContentDiv = /*#__PURE__*/styled.div(_templateObject2$O || (_templateObject2$O = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  ", "\n  ", "\n"])), ModalContentDivStyle, function (props) {
  return props.customCSS;
});
var ModalContentView = /*#__PURE__*/forwardRef(function (props, forwardedRef) {
  var children = props.children,
      _props$customCSS2 = props.customCSS,
      customCSS = _props$customCSS2 === void 0 ? {} : _props$customCSS2,
      rest = _objectWithoutPropertiesLoose(props, _excluded2$1);

  return createElement(ModalContentDiv, Object.assign({}, rest, {
    ref: forwardedRef,
    customCSS: customCSS
  }), children);
});
var ModalContentTextDiv = /*#__PURE__*/styled.div(_templateObject3$P || (_templateObject3$P = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  ", "\n  ", "\n"])), ModalContentTextDivStyle, function (props) {
  return props.customCSS;
});
var ModalContentTextView = /*#__PURE__*/forwardRef(function (props, forwardedRef) {
  var children = props.children,
      _props$customCSS3 = props.customCSS,
      customCSS = _props$customCSS3 === void 0 ? {} : _props$customCSS3,
      rest = _objectWithoutPropertiesLoose(props, _excluded3$1);

  return createElement(ModalContentTextDiv, Object.assign({}, rest, {
    ref: forwardedRef,
    customCSS: customCSS
  }), children);
});
var CodeDiv = /*#__PURE__*/styled.div(_templateObject4$A || (_templateObject4$A = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  ", "\n  ", "\n"])), CodeDivStyle, function (props) {
  return props.customCSS;
});
var ModalContentCodeView = /*#__PURE__*/forwardRef(function (props, forwardedRef) {
  var children = props.children,
      _props$customCSS4 = props.customCSS,
      customCSS = _props$customCSS4 === void 0 ? {} : _props$customCSS4,
      rest = _objectWithoutPropertiesLoose(props, _excluded4);

  return createElement(CodeDiv, Object.assign({}, rest, {
    ref: forwardedRef,
    customCSS: customCSS
  }), children);
});
var DividerDiv = /*#__PURE__*/styled.div(_templateObject5$v || (_templateObject5$v = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  ", "\n  ", "\n"])), DividerDivStyle, function (props) {
  return props.customCSS;
});
var ModalContentDividerView = /*#__PURE__*/forwardRef(function (props, forwardedRef) {
  var _props$customCSS5 = props.customCSS,
      customCSS = _props$customCSS5 === void 0 ? {} : _props$customCSS5,
      rest = _objectWithoutPropertiesLoose(props, _excluded5);

  return createElement(DividerDiv, Object.assign({}, rest, {
    ref: forwardedRef,
    customCSS: customCSS
  }));
});
var ModalBannerDiv = /*#__PURE__*/styled.div(_templateObject6$p || (_templateObject6$p = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  ", "\n"])), ModalBannerDivStyle);
var ModalContentBannerView = /*#__PURE__*/forwardRef(function (props, forwardedRef) {
  var banner = props.banner,
      _props$customCSS6 = props.customCSS,
      customCSS = _props$customCSS6 === void 0 ? {} : _props$customCSS6,
      rest = _objectWithoutPropertiesLoose(props, _excluded6);

  return createElement(ModalBannerDiv, Object.assign({}, rest, {
    ref: forwardedRef,
    customCSS: customCSS
  }), banner ? banner.icon : "", banner ? banner.text : "");
});
var ModalBackDiv = /*#__PURE__*/styled.div(_templateObject7$j || (_templateObject7$j = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  ", "\n"])), ModalBackDivStyle);
var ModalContentTopActionView = /*#__PURE__*/forwardRef(function (props, forwardedRef) {
  var action = props.action,
      _props$customCSS7 = props.customCSS,
      customCSS = _props$customCSS7 === void 0 ? {} : _props$customCSS7,
      rest = _objectWithoutPropertiesLoose(props, _excluded7);

  return createElement(ModalBackDiv, Object.assign({
    onClick: action
  }, rest, {
    ref: forwardedRef,
    customCSS: customCSS
  }), action ? action.icon : "", action ? action.text : "");
});

var _excluded$v = ["title", "open", "onClose", "zIndex", "primaryAction", "secondaryAction", "children", "customCSS", "customTitleCSS"];

var _templateObject$11, _templateObject2$P, _templateObject3$Q;
var ModalBackdrop = /*#__PURE__*/styled.div(_templateObject$11 || (_templateObject$11 = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  ", "\n  ", "\n"])), ModalBackdropStyle, function (props) {
  return props.zIndex ? "z-index: " + props.zIndex + ";" : "z-index: 1;";
});
var ModalDiv = /*#__PURE__*/styled.div(_templateObject2$P || (_templateObject2$P = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  ", "\n  ", "\n"])), ModalDivStyle, function (props) {
  return props.customCSS;
});
var ModalHeader = /*#__PURE__*/styled.div(_templateObject3$Q || (_templateObject3$Q = /*#__PURE__*/_taggedTemplateLiteralLoose(["\n  ", "\n  ", "\n"])), ModalHeaderStyle, function (props) {
  return props.customTitleCSS;
});
var ModalView = /*#__PURE__*/forwardRef(function (props, forwardedRef) {
  var title = props.title,
      _props$open = props.open,
      open = _props$open === void 0 ? false : _props$open,
      onClose = props.onClose,
      zIndex = props.zIndex,
      children = props.children,
      _props$customCSS = props.customCSS,
      customCSS = _props$customCSS === void 0 ? {} : _props$customCSS,
      _props$customTitleCSS = props.customTitleCSS,
      customTitleCSS = _props$customTitleCSS === void 0 ? {} : _props$customTitleCSS,
      rest = _objectWithoutPropertiesLoose(props, _excluded$v);

  return createElement("div", null, open && createElement(ModalBackdrop, {
    zIndex: zIndex
  }, createElement(ModalDiv, Object.assign({}, rest, {
    ref: forwardedRef,
    customCSS: customCSS
  }), createElement(ModalHeader, {
    customTitleCSS: customTitleCSS
  }, title, createElement(IconView, {
    icon: "close",
    color: "#fff",
    size: "24px",
    customCSS: "vertical-align: bottom; float: right; cursor: pointer; margin-left: 50px;",
    onClick: onClose
  })), children)));
});

var ModalNamespace = /*#__PURE__*/Object.assign(ModalView, {
  ModalContentView: ModalContentView,
  ModalContentDividerView: ModalContentDividerView,
  ModalContentActionView: ModalContentActionView,
  ModalContentTextView: ModalContentTextView,
  ModalContentBannerView: ModalContentBannerView,
  ModalContentTopActionView: ModalContentTopActionView,
  ModalContentCodeView: ModalContentCodeView
});

export { Accordion, AccordionView, Alert, AlertView, ArrayFieldTemplate, Avatar, AvatarView, Badge, BadgeView, Button, ButtonView, CSSVariables, Card, CardContainer, CardEdit, CardEditView, CardLong, CardLongView, CardView, Checkbox, CheckboxView, CopyWrapper, CopyWrapperView, DataGraphic, DataTableNamespaceDeprecated as DataTable, DataTableNamespace as DataTableView, DropdownNamespaceDeprecated as Dropdown, DropdownNamespace as DropdownView, ErrorListTemplate, FieldTemplate, GlobalStyle, HoverPopover, Icon, IconButton, IconButtonView, IconView, Input, InputView, ListNamespaceDeprecated as List, ListNamespace as ListView, LoadingSpinner, LoadingSpinnerLarge, ModalNamespace as ModalView, ObjectFieldTemplate, PopoverNamespaceDeprecated as Popover, PopoverNamespace as PopoverView, RJSFCancellableInput, RJSFCheckbox, RJSFClearableInput, RJSFInput, RJSFLockableInput, RJSFNumericalInput, RJSFPasswordInput, RJSFRadio, RJSFRadioActionWidget, RJSFRadioCardWidget, RJSFSelect, RJSFTextarea, Radio, RadioAction, RadioActionView, RadioCard, RadioCardView, RadioView, Select, SelectView, Switch, SwitchView, TabsNamespaceDeprecated as Tabs, TabsNamespace as TabsView, Tag, TagView, TextRules, Textarea, TextareaView, Tooltip, TooltipView };
//# sourceMappingURL=visual-dev.esm.js.map
