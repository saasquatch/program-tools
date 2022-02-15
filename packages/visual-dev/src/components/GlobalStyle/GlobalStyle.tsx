import React from "react";
import { createGlobalStyle } from "styled-components";

export const CSSVariables = createGlobalStyle`
:root {
  /* font-size: 16px; */

  /* ~~~ Colors ~~~ */

  /* Surface */
  --sq-surface: #ffffff;
  --sq-surface-subdued: #f6f6f6;
  --sq-background: #f9f9f9;

  /* On Surface */
  --sq-text: #575757;
  --sq-text-dark: #232323;
  --sq-text-subdued: #858585;
  --sq-border: #e2e2e2;

  /* Top Nav Bar */
  --sq-nav-surface-primary: #003b45;
  --sq-nav-text-on-primary: #ffffff;
  --sq-nav-text-on-primary-subdued: #999999;
  --sq-nav-surface-secondary: #ffffff;
  --sq-nav-text-on-secondary: #003b45;
  --sq-nav-text-on-secondary-subdued: #7c7c7c;

  /* Primary */
  --sq-action-primary: #f49c20;
  --sq-action-primary-hovered: #dc8f32;
  --sq-text-on-primary: #ffffff;
  --sq-action-primary-disabled: #e2e2e2;

  /* Secondary */
  --sq-action-secondary: #ffffff;
  --sq-action-secondary-hovered: #a6b9bd;
  --sq-action-secondary-border: #a6b9bd;
  --sq-text-on-secondary: #575757;
  --sq-text-on-secondary-hovered: #ffffff;
  --sq-placeholder-text-on-secondary: #bdbdbd;

  /* Success */
  --sq-surface-success: #57ac59;
  --sq-surface-success-hovered: #479449;
  --sq-surface-success-subdued: #e4fce3;
  --sq-border-success: #57ac59;

  /* Warning */
  --sq-surface-warning: #f1c359;
  --sq-surface-warning-subdued: #fcf8e3;
  --sq-border-warning: #f1c359;

  /* Critical */
  --sq-surface-critical: #fe6666;
  --sq-surface-critical-hovered: #cb0000;
  --sq-surface-critical-subdued: #faf2ee;
  --sq-border-critical: #d14040;
  --sq-on-surface-critical: #c71d06;

  /* Interactive */
  --sq-text-interactive: #0088cc;
  --sq-focused: #458edf;
  --sq-icon-interactive: #0275fb;
  --sq-surface-hover: #eef6ff;

  /* Typography */
  --sq-font-family-sans: "Helvetica Neue", Helvetica, sans-serif;

  --sq-font-weight-regular: 400;
  --sq-font-weight-semibold: 600;
  --sq-font-weight-bold: 700;

  --sq-font-size-header-one: 26px;
  --sq-font-size-header-two: 22px;
  --sq-font-size-header-three: 18px;
  --sq-font-size-regular: 14px;
  --sq-font-size-small: 12px;
  --sq-font-size-caption: 16px;

  --sq-line-height-header-one: 28px;
  --sq-line-height-header-two: 28px;
  --sq-line-height-header-three: 20px;
  --sq-line-height-regular: 20px;
  --sq-line-height-caption: 16px;

  /* Button */
  --sq-font-size-button-small: 12px;
  --sq-font-size-button-medium: 14px;
  --sq-font-size-button-large: 18px;
  --sq-line-height-button-small: 16px;
  --sq-line-height-button-medium: 16px;
  --sq-line-height-button-large: 18px;

  /* Icon Sizes */
  --sq-icon-size-small: 12px;
  --sq-icon-size-medium: 20px;
  --sq-icon-size-large: 36px;
  --sq-icon-size-badge: 18px;

  /* Avatar Sizes */
  --sq-icon-size-avatar: 36px;
  --sq-icon-size-avatar-large: 50px;
  --sq-font-size-avatar: 24px;

  /* Modal */
  --sq-surface-modal-banner: #12c8d7;

  /* Input */
  --sq-surface-input-disabled: #ebebeb;
  --sq-text-input-disabled: #bdbdbd;

  /* Spacing */
  --sq-spacing-xxx-small: 2px;
  --sq-spacing-xx-small: 4px;
  --sq-spacing-x-small: 8px;
  --sq-spacing-small: 12px;
  --sq-spacing-medium: 16px;
  --sq-spacing-large: 20px;
  --sq-spacing-x-large: 24px;
  --sq-spacing-xx-large: 32px;
  --sq-spacing-xxx-large: 48px;
  --sq-spacing-xxxx-large: 64px;
}
`;

export const TextRules = createGlobalStyle`
h1{
  font-size: var(--sq-font-size-header-one);
  line-height: var(--sq-line-height-header-one);
  font-weight: var(--sq-font-weight-bold);
  font-family: var(--sq-font-family-sans);
  color: var(--sq-text);
}

h2{
  font-size: var(--sq-font-size-header-two);
  line-height: var(--sq-line-height-header-two);
  font-weight: var(--sq-font-weight-bold);
  font-family: var(--sq-font-family-sans);
  color: var(--sq-text);
}

h3{
  font-size: var(--sq-font-size-header-three);
  line-height: var(--sq-line-height-header-three);
  font-weight: var(--sq-font-weight-bold);
  font-family: var(--sq-font-family-sans);
  color: var(--sq-text);
}

p{
  font-size: var(--sq-font-size-regular);
  line-height: var(--sq-line-height-regular);
  font-weight: var(--sq-font-weight-regular);
  font-family: var(--sq-font-family-sans);
  color: var(--sq-text);
}
`;

export const ListRules = createGlobalStyle`
  ul, li {
    color: var(--sq-text);
    font-family: var(--sq-font-family-sans);
    font-weight: var(--sq-font-weight-regular);
    font-size: var(--sq-font-size-regular);
    line-height: var(--sq-line-height-regular);
  }
`

export const GlobalStyle = () => {
  return(
  <>
    <CSSVariables /> <TextRules /> <ListRules />
  </>
);
}
