import { css } from "styled-components";

export const CardDiv = css`
  width: 277px;
  background: var(--sq-surface);
  border: 1px solid var(--sq-border);
  box-sizing: border-box;
  border-radius: var(--sq-border-radius-normal);
  color: var(--sq-text);
  padding: var(--sq-spacing-medium) var(--sq-spacing-x-small);
`;
export const CardHeaderDiv = css`
display: flex;
height: 40px;
vertical-align: middle
flex-direction: column;
align-items: center;
padding: var(--sq-spacing-x-small);`;

export const CardHeaderIconDiv = css`
  float: left;
  margin-right: 16px;
`;
export const CardHeaderTextDiv = css`
  font-family: var(--sq-font-family-sans);
  font-weight: var(--sq-font-weight-bold);
  font-size: var(--sq-font-size-header-three);
  line-height: var(--sq-line-height-header-three);
  float: left;
`;
export const CardTextDiv = css`
  height: 94px;
  font-family: var(--sq-font-family-sans);
  font-weight: var(--sq-font-weight-regular);
  font-size: var(--sq-font-size-regular);
  line-height: var(--sq-line-height-regular);
  padding: var(--sq-spacing-x-small);
`;
export const CardFooterDiv = css`
  position: relative;
  bottom: 0px;
`;
export const CardLongDiv = css`
  width: 450px;
  height: 211px;
  display: flex;
  flex-direction: column;

  background: var(--sq-surface);
  border: 1px solid var(--sq-border);
  box-sizing: border-box;
  border-radius: var(--sq-border-radius-normal);
  color: var(--sq-text);
  font-family: var(--sq-font-family-sans);
  font-weight: var(--sq-font-weight-regular);
  font-size: var(--sq-font-size-regular);
  line-height: var(--sq-line-height-regular);
`;
export const CardLongHeaderDiv = css`
  flex-direction: column;
  align-items: center;
  vertical-align: middle
  font-family: 'Helvetica Neue', Helvetica, sans-serif;
  font-weight: var(--sq-font-weight-bold);
  font-size: var(--sq-font-size-header-three);
  line-height: var(--sq-line-height-header-three);
  padding: var(--sq-spacing-large);
  padding-bottom: 0;
`;
export const CardLongTextDiv = css`
  height: 61px;
  font-size: var(--sq-font-size-regular);
  padding: var(--sq-spacing-large);
`;
export const CardLongFooterDiv = css`
  position: relative;
  bottom: 0px;
  background: var(--sq-background);
  padding: var(--sq-spacing-large);
  margin-top: auto;
`;
export const CardEditDiv = css`
  width: 850px;
  height: 74px;
  background: var(--sq-surface);
  border: 1px solid var(--sq-border);
  box-sizing: border-box;
  border-radius: var(--sq-border-radius-normal);
  color: var(--sq-text);
  padding: var(--sq-spacing-medium);
`;
export const CardEditHeaderDiv = css`
  display: flex;	
  height: 40px;
  vertical-align: middle
  flex-direction: column;
  align-items: center;
`;
export const CardEditHeaderIconDiv = css`
  float: left;
  margin-right: var(--sq-spacing-medium);
`;
export const CardEditHeaderTextDiv = css`
  font-family: var(--sq-font-family-sans);
  font-weight: var(--sq-font-weight-bold);
  font-size: var(--sq-font-size-header-three);
  line-height: var(--sq-line-height-header-three);
  float: left;
`;
export const CardEditTitleTextDiv = css`
  font-family: var(--sq-font-family-sans);
  font-weight: var(--sq-font-weight-bold);
  font-size: var(--sq-font-size-regular);
  line-height: var(--sq-line-height-regular);
`;
export const CardEditTextDescriptionDiv = css`
  color: var(--sq-text-subdued);
  font-family: var(--sq-font-family-sans);
  font-weight: var(--sq-font-weight-regular);
  font-size: var(--sq-font-size-regular);
  line-height: var(--sq-line-height-regular);
`;
