import React from "react";
import { createGlobalStyle } from "styled-components";

export const CSSVariables = createGlobalStyle`
:root {
  /* font-size: 16px; */

  /* ~~~ Colors ~~~ */

  /* Impact colors */
  --iui-coal-black: #2D3E50;
  --iui-strata-blue: #14B1F7;
  --iui-serenity-gray: #CACFD3;
  --iui-darker-than-black: #23313F;
  --iui-pale-gray: #F2F3F4;
  --iui-storm-gray: #6C7784;
  --iui-bleakest-gray: #969EA7;
  --iui-error-red: #C00800;
  --iui-rose-pink: #EFC1BF;
  --iui-leaf-green: #008917;

  /* Surface */
  --sq-surface: #ffffff;
  --sq-surface-subdued: #f6f6f6;
  --sq-background: #f9f9f9;
  --sq-surface-overlay: rgba(0, 0, 0, 0.7);
  --sq-surface-dark: #232323;

  /* On Surface */
  --sq-text: var(--iui-coal-black);
  --sq-text-dark: var(--iui-darker-than-black);
  --sq-text-subdued: var(--iui-storm-gray);
  --sq-border: var(--iui-serenity-gray);

  /* Loading */
  --sq-loading: var(--iui-strata-blue);


  /* Top Nav Bar */
  --sq-nav-surface-primary: var(--iui-coal-black);
  --sq-nav-text-on-primary: #ffffff;
  --sq-nav-text-on-primary-subdued: var(--iui-bleakest-gray);
  --sq-nav-surface-secondary: #ffffff;
  --sq-nav-text-on-secondary: var(--iui-coal-black);
  --sq-nav-text-on-secondary-subdued: var(--iui-bleakest-gray);

  /* Primary */
  --sq-action-primary: var(--iui-strata-blue);
  --sq-action-primary-hovered: var(--iui-strata-blue);
  --sq-action-primary-disabled: var(--iui-pale-gray);
  --sq-text-on-primary: #ffffff;
  --sq-text-on-primary-disabled: var(--iui-bleakest-gray);

  /* Secondary */
  --sq-action-secondary: var(--iui-pale-gray);
  --sq-action-secondary-hovered: var(--iui-pale-gray);
  --sq-action-secondary-border: #a6b9bd;
  --sq-text-on-secondary: var(--iui-coal-black);
  --sq-text-on-secondary-hovered: var(--iui-bleakest-gray);
  --sq-placeholder-text-on-secondary: var(--iui-bleakest-gray);

  /* Success */
  --sq-surface-success: var(--iui-leaf-green);
  --sq-surface-success-hovered: var(--iui-leaf-green);
  --sq-surface-success-subdued: #e4fce3;
  --sq-border-success: var(--iui-leaf-green);
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
  --sq-surface-critical: var(--iui-error-red);
  --sq-surface-critical-hovered: var(--iui-error-red);
  --sq-surface-critical-subdued: var(--iui-rose-pink);
  --sq-border-critical: var(--iui-error-red);
  --sq-badge-text-critical: #C12F2F;
  /* Deprecated */
  --sq-on-surface-critical: #D14040;

  /* Interactive */
  --sq-text-interactive: var(--iui-strata-blue);
  --sq-text-interactive-hovered: var(--iui-strata-blue);
  --sq-text-interactive-visited: #681DA8;
  --sq-focused: var(--iui-strata-blue);
  --sq-icon-interactive: #0088cc;
  --sq-surface-hover: var(--iui-pale-gray);

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
  --sq-font-family-sans: "Muli", var(--sq-font-family-sans);
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
  --sq-border-radius-normal: 8px;
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
      <TypographyRules />
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
