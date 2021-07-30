/* :root {
  --primary-color: #ff8424;
  --primary-hover-color: #da6d17;
  --secondary-color: #009de6;
  --secondary-hover-color: #0076ad;
  --tertiary-color: #0b1a21;
  --tertiary-hover-color: #354f5b;
  --white-color: #fff;
  --white-hover-color: #e5ebee;
  --black-color: #000;
  --dark-gray-color: #222;
  --light-gray-color: #434244;
  --disabled-color: #e5ebee;
  --disabled-text-color: #9fadb4;
  --font-family: Sofia Pro;
  --font-size-h5: 25px;
  --font-size-h6: 20px;
  --font-size-small: 16px;
  --neutral-text-color: #637984;
  --normal-title-color: #0b1a21;
  --normal-description-color: #354f5b;
  --blue-3-title-color: #83d5fb;
  --blue-primary: #009de6;
  --blue-secondary: #0076ad;
  --blue-tertiary: #003954;
  --blue-fourth: #f5fcff;
  --blue-video: #00a9f7;
  --gray-dark: #222;
  --green: #4ab971;
  --secondary-green-background: #46c5ff;
  --white: #fff;
  --transparent: transparent;
  --input-selected-color: #009de6;
  --input-success-color: #fff;
  --input-failed-color: red;
  --input-selected-text-color: #0076ad;
  --pantheon-white-border: 1px solid #fff;
  --pantheon-blueprintBorder: 1px solid #0553ef;
  --pantheon-heading-letter-space: 0.02em;
  --pantheon-blueprint-blue: #0553ef;
  --pantheon-st-blue: #00a9f7;
  --pantheon-orange: #ff8b02;
  --pantheon-white: #fff;
  --pantheon-gray: #8f8f8f;
  --pantheon-black: #000;
  --pantheon-border: 1px solid #fff;
  --blue-1: #f5fcff;
  --blue-3: #83d5fb;
  --blue-5: #009de6;
  --blue-6: #0076ad;
  --blue-7: #003954;
  --green-5: #4ab971;
  --green-6: #267b44;
  --green-7: #043415;
  --navy-5: #4f73a3;
  --navy-6: #3d5a80;
  --navy-7: #072c57;
  --neutral-1: #f6f8fa;
  --neutral-2: #e5ebee;
  --neutral-4: #9fadb4;
  --neutral-5: #637984;
  --neutral-6: #354f5b;
  --neutral-7: #0b1a21;
  --orange-5: #ff8424;
  --orange-6: #da6d17;
  --orange-7: #ad4c00;
  --purple: #5f4fa3;
  --red: red;
  --teal-5: #12889d;
  --teal-6: #0b6270;
  --teal-7: #004551;
} */

const style = `
/* vietnamese */
@font-face {
  font-family: 'Nunito Sans';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/nunitosans/v6/pe0qMImSLYBIv1o4X1M8cceyI9tScg.woff2) format('woff2');
  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;
}
/* latin-ext */
@font-face {
  font-family: 'Nunito Sans';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/nunitosans/v6/pe0qMImSLYBIv1o4X1M8ccezI9tScg.woff2) format('woff2');
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Nunito Sans';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/nunitosans/v6/pe0qMImSLYBIv1o4X1M8cce9I9s.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* vietnamese */
@font-face {
  font-family: 'Nunito Sans';
  font-style: normal;
  font-weight: 600;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/nunitosans/v6/pe03MImSLYBIv1o4X1M8cc9iB85iU1EQVg.woff2) format('woff2');
  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;
}
/* latin-ext */
@font-face {
  font-family: 'Nunito Sans';
  font-style: normal;
  font-weight: 600;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/nunitosans/v6/pe03MImSLYBIv1o4X1M8cc9iB85jU1EQVg.woff2) format('woff2');
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Nunito Sans';
  font-style: normal;
  font-weight: 600;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/nunitosans/v6/pe03MImSLYBIv1o4X1M8cc9iB85tU1E.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* vietnamese */
@font-face {
  font-family: 'Nunito Sans';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/nunitosans/v6/pe03MImSLYBIv1o4X1M8cc8GBs5iU1EQVg.woff2) format('woff2');
  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;
}
/* latin-ext */
@font-face {
  font-family: 'Nunito Sans';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/nunitosans/v6/pe03MImSLYBIv1o4X1M8cc8GBs5jU1EQVg.woff2) format('woff2');
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Nunito Sans';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/nunitosans/v6/pe03MImSLYBIv1o4X1M8cc8GBs5tU1E.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
:root {
  --sl-color-black: #141414;
  --sl-color-white: #fff;
  /** Anvil uses a different scale (from 0-400), but has 10 increments.
    Just ported the 10 incrementals colors over for a slightly-less-dark palette than Shoelace **/
  --sl-color-gray-50: #f7f7f7;
  --sl-color-gray-100: #f5f5f5;
  --sl-color-gray-200: #eeeeee;
  --sl-color-gray-300: #dfe0e1;
  --sl-color-gray-400: #bcbcbd;
  --sl-color-gray-500: #9e9ea0;
  --sl-color-gray-600: #737475;
  --sl-color-gray-700: #606162;
  --sl-color-gray-800: #444445;
  --sl-color-gray-900: #2d2e31;
  --sl-color-gray-950: #141414;
  /** Primary Colors from: https://anvil.servicetitan.com/foundations/color/ **/
  --sl-color-primary-50: #f0f9ff;
  --sl-color-primary-100: #ecf4fd;
  --sl-color-primary-200: #a9d1ff;
  --sl-color-primary-300: #3684f5;
  --sl-color-primary-400: #2270ee;
  --sl-color-primary-500: #1360d9;
  --sl-color-primary-600: #004cc3;
  /** ServiceTitan Anvil doesn't have colors over 600 **/
  --sl-color-primary-700: var(--sl-color-primary-600);
  --sl-color-primary-800: var(--sl-color-primary-600);
  --sl-color-primary-900: var(--sl-color-primary-600);
  --sl-color-primary-950: var(--sl-color-primary-600);

  --sl-color-primary-text: var(--sl-color-white);

  /** Syuccess Colors from: https://anvil.servicetitan.com/foundations/color/ **/
  --sl-color-success-50: #f0fdf4;
  --sl-color-success-100: #e1fdef;
  --sl-color-success-200: #90efc0;
  --sl-color-success-300: #60dfa6;
  --sl-color-success-400: #1fbc70;
  --sl-color-success-500: #18a761;
  --sl-color-success-600: #10864b;
  /** ServiceTitan Anvil doesn't have colors over 600 **/
  --sl-color-success-700: var(--sl-color-success-600);
  --sl-color-success-800: var(--sl-color-success-600);
  --sl-color-success-900: var(--sl-color-success-600);
  --sl-color-success-950: var(--sl-color-success-600);

  --sl-color-success-text: var(--sl-color-white);

  /** Delegating to Anvil Grey colors from above **/
  --sl-color-info-50: var(--sl-color-gray-50);
  --sl-color-info-100: var(--sl-color-gray-100);
  --sl-color-info-200: var(--sl-color-gray-200);
  --sl-color-info-300: var(--sl-color-gray-300);
  --sl-color-info-400: var(--sl-color-gray-400);
  --sl-color-info-500: var(--sl-color-gray-500);
  --sl-color-info-600: var(--sl-color-gray-600);
  --sl-color-info-700: var(--sl-color-gray-700);
  --sl-color-info-800: var(--sl-color-gray-800);
  --sl-color-info-900: var(--sl-color-gray-900);
  --sl-color-info-950: var(--sl-color-gray-950);
  /** Colors from Anvil **/
  --sl-color-info-text: var(--sl-color-white);
  --sl-color-warning-50: #fffbeb;
  --sl-color-warning-100: #fff2dc;
  --sl-color-warning-200: #ffcc80;
  --sl-color-warning-300: #ffa23a;
  --sl-color-warning-400: #ff9116;
  --sl-color-warning-500: #ee8400;
  --sl-color-warning-600: #df7600;
  /** LV: Note - Anvil doesn't list color weights over 600 **/
  --sl-color-warning-700: var(--sl-color-warning-600);
  --sl-color-warning-800: var(--sl-color-warning-600);
  --sl-color-warning-900: var(--sl-color-warning-600);
  --sl-color-warning-950: var(--sl-color-warning-600);
  /** Colors from Anvil **/
  --sl-color-warning-text: var(--sl-color-white);
  --sl-color-danger-10: #fff9f8;
  --sl-color-danger-50: #fef2f2;
  --sl-color-danger-100: #ffece9;
  --sl-color-danger-200: #ffb2a0;
  --sl-color-danger-300: #ff745f;
  --sl-color-danger-400: #f94d32;
  --sl-color-danger-500: #e63717;
  --sl-color-danger-600: #bf2a00;
  /** LV: Note - ServiceTitan Anvil doesn't list color weights over 600 **/
  --sl-color-danger-700: var(--sl-color-danger-600);
  --sl-color-danger-800: var(--sl-color-danger-600);
  --sl-color-danger-900: var(--sl-color-danger-600);
  --sl-color-danger-950: var(--sl-color-danger-600);
  --sl-color-danger-text: var(--sl-color-white);
  --sl-border-radius-small: 0.125rem;
  --sl-border-radius-medium: 0.25rem;
  --sl-border-radius-large: 0.5rem;
  --sl-border-radius-x-large: 1rem;
  --sl-border-radius-circle: 50%;
  --sl-border-radius-pill: 9999px;
  --sl-shadow-x-small: 0 1px 0 #0d131e0d;
  --sl-shadow-small: 0 1px 2px #0d131e1a;
  --sl-shadow-medium: 0 2px 4px #0d131e1a;
  --sl-shadow-large: 0 2px 8px #0d131e1a;
  --sl-shadow-x-large: 0 4px 16px #0d131e1a;
  /** LV: Could use the Anvil spacing rules, but probably not necessary **/
  --sl-spacing-xxx-small: 0.125rem;
  --sl-spacing-xx-small: 0.25rem;
  --sl-spacing-x-small: 0.5rem;
  --sl-spacing-small: 0.75rem;
  --sl-spacing-medium: 1rem;
  --sl-spacing-large: 1.25rem;
  --sl-spacing-x-large: 1.75rem;
  --sl-spacing-xx-large: 2.25rem;
  --sl-spacing-xxx-large: 3rem;
  --sl-spacing-xxxx-large: 4.5rem;
  --sl-transition-x-slow: 1000ms;
  --sl-transition-slow: 500ms;
  --sl-transition-medium: 250ms;
  --sl-transition-fast: 150ms;
  --sl-transition-x-fast: 50ms;
  --sl-font-mono: SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace;
  --sl-font-sans: "Nunito Sans", sans;
  --sl-font-serif: Georgia, "Times New Roman", serif;
  --sl-font-size-xx-small: 0.625rem;
  --sl-font-size-x-small: 0.75rem;
  --sl-font-size-small: 0.875rem;
  --sl-font-size-medium: 1rem;
  --sl-font-size-large: 1.25rem;
  --sl-font-size-x-large: 1.5rem;
  --sl-font-size-xx-large: 2.25rem;
  --sl-font-size-xxx-large: 3rem;
  --sl-font-size-xxxx-large: 4.5rem;
  --sl-font-weight-light: 300;
  --sl-font-weight-normal: 400;
  --sl-font-weight-semibold: 600;
  --sl-font-weight-bold: 700;
  --sl-letter-spacing-dense: -0.015em;
  --sl-letter-spacing-normal: normal;
  --sl-letter-spacing-loose: 0.075em;
  --sl-line-height-dense: 1.4;
  --sl-line-height-normal: 1.8;
  --sl-line-height-loose: 2.2;
  --sl-focus-ring-color-primary: #0ea5e954;
  --sl-focus-ring-color-success: #22c55e54;
  --sl-focus-ring-color-info: #6b728054;
  --sl-focus-ring-color-warning: #f59e0b54;
  --sl-focus-ring-color-danger: #ef444454;
  --sl-focus-ring-width: 3px;
  --sl-button-font-size-small: var(--sl-font-size-x-small);
  --sl-button-font-size-medium: var(--sl-font-size-small);
  --sl-button-font-size-large: var(--sl-font-size-medium);
  --sl-input-height-small: 1.875rem;
  --sl-input-height-medium: 2.5rem;
  --sl-input-height-large: 3.125rem;
  --sl-input-background-color: var(--sl-color-white);
  --sl-input-background-color-hover: var(--sl-color-white);
  --sl-input-background-color-focus: var(--sl-color-white);
  --sl-input-background-color-disabled: var(--sl-color-gray-100);
  --sl-input-border-color: var(--sl-color-gray-300);
  --sl-input-border-color-hover: var(--sl-color-gray-400);
  --sl-input-border-color-focus: var(--sl-color-primary-500);
  --sl-input-border-color-disabled: var(--sl-color-gray-300);
  --sl-input-border-width: 1px;
  --sl-input-border-radius-small: var(--sl-border-radius-medium);
  --sl-input-border-radius-medium: var(--sl-border-radius-medium);
  --sl-input-border-radius-large: var(--sl-border-radius-medium);
  --sl-input-font-family: var(--sl-font-sans);
  --sl-input-font-weight: var(--sl-font-weight-normal);
  --sl-input-font-size-small: var(--sl-font-size-small);
  --sl-input-font-size-medium: var(--sl-font-size-medium);
  --sl-input-font-size-large: var(--sl-font-size-large);
  --sl-input-letter-spacing: var(--sl-letter-spacing-normal);
  --sl-input-color: var(--sl-color-gray-700);
  --sl-input-color-hover: var(--sl-color-gray-700);
  --sl-input-color-focus: var(--sl-color-gray-700);
  --sl-input-color-disabled: var(--sl-color-gray-900);
  --sl-input-icon-color: var(--sl-color-gray-400);
  --sl-input-icon-color-hover: var(--sl-color-gray-600);
  --sl-input-icon-color-focus: var(--sl-color-gray-600);
  --sl-input-placeholder-color: var(--sl-color-gray-400);
  --sl-input-placeholder-color-disabled: var(--sl-color-gray-600);
  --sl-input-spacing-small: var(--sl-spacing-small);
  --sl-input-spacing-medium: var(--sl-spacing-medium);
  --sl-input-spacing-large: var(--sl-spacing-large);
  --sl-input-label-font-size-small: var(--sl-font-size-small);
  --sl-input-label-font-size-medium: var(--sl-font-size-medium);
  --sl-input-label-font-size-large: var(--sl-font-size-large);
  --sl-input-label-color: inherit;
  --sl-input-help-text-font-size-small: var(--sl-font-size-x-small);
  --sl-input-help-text-font-size-medium: var(--sl-font-size-small);
  --sl-input-help-text-font-size-large: var(--sl-font-size-medium);
  --sl-input-help-text-color: var(--sl-color-gray-400);
  --sl-toggle-size: 1rem;
  --sl-overlay-background-color: #37415180;
  --sl-panel-background-color: var(--sl-color-white);
  --sl-panel-border-color: var(--sl-color-gray-200);
  --sl-tooltip-border-radius: var(--sl-border-radius-medium);
  --sl-tooltip-background-color: var(--sl-color-gray-900);
  --sl-tooltip-color: var(--sl-color-white);
  --sl-tooltip-font-family: var(--sl-font-sans);
  --sl-tooltip-font-weight: var(--sl-font-weight-normal);
  --sl-tooltip-font-size: var(--sl-font-size-small);
  --sl-tooltip-line-height: var(--sl-line-height-dense);
  --sl-tooltip-padding: var(--sl-spacing-xxx-small) var(--sl-spacing-x-small);
  --sl-tooltip-arrow-size: 5px;
  --sl-tooltip-arrow-start-end-offset: 8px;
  --sl-z-index-drawer: 700;
  --sl-z-index-dialog: 800;
  --sl-z-index-dropdown: 900;
  --sl-z-index-toast: 950;
  --sl-z-index-tooltip: 1000;
}
:root {
  --sqm-header-background: var(--sl-color-white);
  --sqm-footer-background: var(--sl-color-white);
  --st-color-text-error: #e63717;
  --st-content-max-width: 700px;
  --st-content-background: var(--sl-color-white);
  --st-portal-background: var(--sl-color-gray-50);
  --widget-background-color: var(--sl-color-white);
  --sqm-portal-main-width: 900px;
}
body {
  font-family: var(--sl-font-sans);
  font-size: var(--sl-font-size-medium);
  font-weight: var(--sl-font-weight-normal);
  letter-spacing: var(--sl-letter-spacing-small);
  color: var(--sl-color-gray-800);
  line-height: var(--sl-line-height-normal);
  margin: 0;
  background-color: var(--st-portal-background);
}
a,
a:visited {
  text-decoration: none;
  color: var(--sl-color-primary-500);
}
a:hover {
  color: var(--sl-color-primary-600);
}
h2, .Title {
  font-size: var(--sl-font-size-large);
  font-weight: var(--sl-font-weight-semibold);
  margin: 0;
}
.H4 {
  font-size: var(--sl-font-size-medium);
  font-weight: var(--sl-font-weight-semibold);
  margin: 0;
}
.P {
  font-size: var(--sl-font-size-small);
  color: var(--sl-color-gray-800);
  margin-top: 0px;
}

.Title {
  text-align: center;
}

.Subtitle {
  text-align: center;
  margin-bottom: 0px;
  color: var(--sl-color-gray-500);
}
.SupportText{
  margin-top: var(--sl-spacing-small);
  text-align: center;
}
stn-wrapper-column {
  max-width: var(--st-content-max-width);
  margin: var(--sl-spacing-x-large) auto;
  background-color: var(--st-content-background);
}

stn-wrapper-column > :not(:first-child), stn-wrapper-item > :not(:first-child) {
  margin-top: var(--sl-spacing-medium);
}

stn-wrapper-item, stn-wrapper-column{
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 100%;
  height: auto;
}
stn-wrapper-item {
  padding: var(--sl-spacing-large);
  background-color: var(--st-content-background);
}

stn-row {
  display: flex;
}

stn-row[gap="medium"] > :not(:first-child) {
  margin-left: var(--sl-spacing-medium);
}

sl-button::part(base){
  width: 100%;
}

sqm-share-button{
  flex: 1;
}

stn-row[space="even"] > * {
  flex: 1 1 0;
}

stn-row[topmargin="x-large"] {
  margin-top: var(--sl-spacing-x-large);
}

sl-details::part(base){
  background-color: var(--sl-color-white);
  border-color: var(--sl-color-gray-300)
}
sl-details::part(summary) {
  font-size: var(--sl-font-size-medium);
  font-weight: var(--sl-font-weight-semibold);
  margin: 0px;
}
*::part(defaultbutton-base){
  background-color: rgba(0,0,0,0);
  color: var(--sl-color-gray-800);
  border-color: var(--sl-color-gray-800);
}
*::part(defaultbutton-base):hover{
  background-color: rgba(20,20,20,.08);
}
*::part(defaultbutton-base):active{
  background-color: rgba(20,20,20,.16);
}
*::part(defaultbutton-base):focus{
  box-shadow: none;
}
*::part(primarybutton-base){
  background-color: var(--sl-color-primary-400);
  color: var(--sl-color-white);
  border-color: var(--sl-color-primary-400);
}
*::part(primarybutton-base):hover{
  background-color: var(--sl-color-primary-300);
  border-color: var(--sl-color-primary-300);
}
*::part(primarybutton-base):active{
  background-color: var(--sl-color-primary-500);
  border-color: var(--sl-color-primary-500);
}

*::part(primarybutton-base):focus{
  box-shadow: none;
}

*::part(input-label), *::part(select-label), *::part(textarea-label){
  font-size: var(--sl-input-font-size-small);
  font-weight: var(--sl-font-weight-semibold);
}

sl-input::part(label){
  font-size: var(--sl-input-label-font-size-small);
  font-weight: var(--sl-font-weight-semibold);
}

*::part(menuitem-base):hover{
  background-color: var(--sl-color-gray-200);
  color: var(--sl-color-gray-700);
}

.poweredBy {
  color: var(--sl-color-gray-400);
  font-size: var(--sl-font-size-xx-small);
}

.poweredBy:hover {
  color: var(--sl-color-gray-900);
}

// *::part(erroralert-icon), *::part(successalert-icon){
//   align-items: flex-start;
//   padding-top: var(--sl-spacing-large);
// }

// *::part(erroralert-text){
//   color: var(--sl-color-danger-500);
// }

// *::part(successalert-text) {
//   color: var(--sl-color-success-600);
// }

// *::part(successalert-text),
// *::part(erroralert-text) {
//   font-size: var(--sl-font-size-medium);
//   font-weight: var(--sl-font-weight-semibold);
//   width: 100%;
// }
// *::part(successalert-subtext){
//   font-size: var(--sl-font-size-medium);
//   font-weight: var(--sl-font-weight-normal);
//   color: var(--sl-color-gray-800);
//   width: 100%;
// }

.FooterEmail{
  text-decoration: none;
  font-size: var(--sl-font-size-medium);
  color: var(--sl-color-gray-800);
  margin: 0px;
  cursor:pointer;
}



`;

export default style;
