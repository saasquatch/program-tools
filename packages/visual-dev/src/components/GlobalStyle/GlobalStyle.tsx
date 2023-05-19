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
  --sq-surface-overlay: rgba(0, 0, 0, 0.7);
  --sq-surface-dark: #232323;

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
  --sq-nav-text-on-secondary-subdued: #999999;

  /* Primary */
  --sq-action-primary: #14b1f7;
  --sq-action-primary-hovered: #14b1f7;
  --sq-text-on-primary: #ffffff;
  --sq-action-primary-disabled: #e2e2e2;

  /* Secondary */
  --sq-action-secondary: #ffffff;
  --sq-action-secondary-hovered: #a6b9bd;
  --sq-action-secondary-border: #a6b9bd;
  --sq-text-on-secondary: #575757;
  --sq-text-on-secondary-hovered: #ffffff;
  --sq-placeholder-text-on-secondary: #aaaaaa;

  /* Success */
  --sq-surface-success: #57ac59;
  --sq-surface-success-hovered: #479449;
  --sq-surface-success-subdued: #e4fce3;
  --sq-border-success: #57ac59;
  --sq-badge-surface-success: #e6faf4;
  --sq-badge-text-success: #146352;

  /* Warning */
  --sq-surface-warning: #f1c359;
  --sq-surface-warning-subdued: #fcf8e3;
  --sq-border-warning: #f1c359;
  --sq-badge-surface-warning: #ffe3a1;
  --sq-badge-text-warning: #92400E;

  /* Info */
  --sq-surface-info: #E0ECFF;
  --sq-border-info: #6DA6FF;
  --sq-badge-surface-info: #E0ECFF;
  --sq-badge-text-info: #1260D9;

  /* Critical */
  --sq-surface-critical: #D14040;
  --sq-surface-critical-hovered: #C12F2F;
  --sq-surface-critical-subdued: #faf2ee;
  --sq-border-critical: #d14040;
  --sq-badge-text-critical: #C12F2F;
  /* Deprecated */
  --sq-on-surface-critical: #D14040;

  /* Interactive */
  --sq-text-interactive: #0088CC;
  --sq-text-interactive-hovered: #016A9E;
  --sq-text-interactive-visited: #681DA8;
  --sq-focused: #458edf;
  --sq-icon-interactive: #0088cc;
  --sq-surface-hover: #eef6ff;

  /* Docs site */
  --sq-docs-interactive: #007A5B;
  --sq-docs-interactive-hovered: #00654C;
  --sq-docs-surface-hovered: #E7EDEE;
  --sq-docs-card-border-hovered: #B5CDC7;
  --sq-docs-badge-surface: #EBF9EA;

  /* Editor */
  --sq-editor-canvas-background: #eaeaea;
  --sq-editor-nav-button-disabled: #366168;
  --sq-editor-nav-button-selected: #2E5B65;
  --sq-editor-nav-border: #424c51;
  --sq-editor-interactive-selected: #439b76;
  --sq-editor-selector-intereactive-hovered: #A3CABA;
  --sq-editor-button-interactive-hovered: #388363;
  

  /* Modal */
  --sq-surface-modal-banner: #12c8d7;

  /* Input */
  --sq-surface-input-disabled: #ebebeb;
  --sq-text-input-disabled: #bdbdbd;

  /* Typography */
  --sq-font-family-sans: "Helvetica Neue", Helvetica, sans-serif;
  --sq-font-family-monospace: monospace;

  --sq-font-weight-regular: 400;
  --sq-font-weight-semibold: 600;
  --sq-font-weight-bold: 700;

  --sq-font-size-header-one: 26px;
  --sq-font-size-header-two: 22px;
  --sq-font-size-header-three: 20px;
  --sq-font-size-header-four: 18px;
  --sq-font-size-regular: 14px;
  --sq-font-size-small: 12px;
  --sq-font-size-caption: 16px;

  --sq-line-height-header-one: 32px;
  --sq-line-height-header-two: 28px;
  --sq-line-height-header-three: 24px;
  --sq-line-height-regular: 20px;
  --sq-line-height-caption: 16px;

  /* Button */
  --sq-font-size-button-small: 12px;
  --sq-font-size-button-medium: 14px;
  --sq-font-size-button-large: 16px;
  --sq-line-height-button-small: 16px;
  --sq-line-height-button-medium: 20px;
  --sq-line-height-button-large: 24px;

  /* Icon Sizes */
  --sq-icon-size-small: 12px;
  --sq-icon-size-medium: 20px;
  --sq-icon-size-large: 36px;
  --sq-icon-size-badge: 18px;

  /* Avatar Sizes */
  --sq-icon-size-avatar: 36px;
  --sq-icon-size-avatar-large: 50px;
  --sq-font-size-avatar: 24px;

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

  /* Border Radii */
  --sq-border-radius-small: 2px;
  --sq-border-radius-normal: 4px;
  --sq-border-radius-pill: 9999px;
} 
`;

export const LinkRules = createGlobalStyle`

a{
  color: var(--sq-text-interactive);
  text-decoration: none;
  
  &:visited{
    color: var(--sq-text-interactive-visited);
  }

  &:hover{
    color: var(--sq-text-interactive-hovered);
    text-decoration: underline;
  }
}`;

export const TypographyRules = createGlobalStyle`
*, *::before, *::after {
  box-sizing: border-box;
}

body{
  line-height: var(--sq-line-height-regular);
  font-family: var(--sq-font-family-sans);
  color: var(--sq-text);
  margin: 0;
}

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

pre{
  font-size: var(--sq-font-size-regular);
  line-height: var(--sq-line-height-regular);
  font-weight: var(--sq-font-weight-regular);
  font-family: var(--sq-font-family-monospace);
  color: var(--sq-text);
}

a{
  
  font-size: var(--sq-font-size-regular);
  line-height: var(--sq-line-height-regular);
  font-weight: var(--sq-font-weight-regular);
  font-family: var(--sq-font-family-sans);
}

`;

export const TextRules = () => {
  return (
    <>
      <LinkRules />
      <TextRules />
    </>
  );
};

export const LayoutRules = createGlobalStyle`
  hr{
    border: none;
    border-top: 1px solid var(--sq-border);
    margin: var(--sq-spacing-xx-large) 0;
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
`;

export const TableRules = createGlobalStyle`
  table {
    color: var(--sq-text);
    font-family: var(--sq-font-family-sans);
    font-weight: var(--sq-font-weight-regular);
    font-size: var(--sq-font-size-regular);
    line-height: var(--sq-line-height-regular);
  }
`;

export const GlobalStyle = () => {
  return (
    <>
      <CSSVariables />
      <TextRules />
      <ListRules />
      <LayoutRules />
      <TableRules />
    </>
  );
};
