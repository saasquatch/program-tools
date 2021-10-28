import { css } from "styled-components";

export const card = css`
  width: 277px;
  height: 215px;
  background: var(--sq-surface);
  border: 2px solid var(--sq-border);
  box-sizing: border-box;
  border-radius: 4px;
  color: var(--sq-text);
  padding: 8px;
`;
export const cardHeader = css`
display: flex;
height: 40px;
vertical-align: middle
flex-direction: column;
align-items: center;
padding: 8px;`;
export const cardHeaderIcon = css`
  float: left;
  margin-right: 16px;
`;
export const cardHeaderText = css`
  font-family: "Helvetica Neue", Helvetica, sans-serif;
  font-weight: var(--sq-font-weight-bold);
  font-size: var(--sq-font-size-header-three);
  line-height: var(--sq-line-height-header-three);
  float: left;
`;
export const cardText = css`
  height: 94px;
  font-family: "Helvetica Neue", Helvetica, sans-serif;
  font-weight: var(--sq-font-weight-regular);
  font-size: var(--sq-font-size-regular);
  line-height: var(--sq-line-height-regular);
  padding: 8px;
`;
export const cardFooter = css`
  position: relative;
  bottom: 0px;
`;
export const cardLong = css`
  width: 450px;
  height: 211px;
  background: var(--sq-surface);
  border: 2px solid var(--sq-border);
  box-sizing: border-box;
  border-radius: 4px;
  color: var(--sq-text);
  font-family: "Helvetica Neue", Helvetica, sans-serif;
  font-weight: var(--sq-font-weight-regular);
  font-size: var(--sq-font-size-regular);
  line-height: var(--sq-line-height-regular);
`;
export const cardLongHeader = css`
  flex-direction: column;
  align-items: center;
  vertical-align: middle
  font-family: 'Helvetica Neue', Helvetica, sans-serif;
  font-weight: var(--sq-font-weight-bold);
  font-size: var(--sq-font-size-header-three);
  line-height: var(--sq-line-height-header-three);
  padding: 20px;
  padding-bottom: 0;
`;
export const cardLongText = css`
  height: 61px;
  font-size: 14px;
  padding: 20px;
`;
export const cardLongFooter = css`
  position: relative;
  bottom: 0px;
  background: var(--sq-background);
  height: 26px;
  padding: 20px;
`;
export const cardEdit = css`
  width: 850px;
  height: 74px;
  background: var(--sq-surface);
  border: 2px solid var(--sq-border);
  box-sizing: border-box;
  border-radius: 4px;
  color: var(--sq-text);
  padding: 16px;
`;
export const cardEditHeader = css`
  display: flex;	
  height: 40px;
  vertical-align: middle
  flex-direction: column;
  align-items: center;
`;
export const cardEditHeaderIcon = css`
  float: left;
  margin-right: 16px;
`;
export const cardEditHeaderText = css`
  font-family: "Helvetica Neue", Helvetica, sans-serif;
  font-weight: var(--sq-font-weight-bold);
  font-size: var(--sq-font-size-header-three);
  line-height: var(--sq-line-height-header-three);
  float: left;
`;
export const cardEditTextTitle = css`
  font-family: "Helvetica Neue", Helvetica, sans-serif;
  font-weight: var(--sq-font-weight-bold);
  font-size: var(--sq-font-size-regular);
  line-height: var(--sq-line-height-regular);
`;
export const cardEditTextDesc = css`
  color: var(--sq-text-subdued);
  font-family: "Helvetica Neue", Helvetica, sans-serif;
  font-weight: var(--sq-font-weight-regular);
  font-size: var(--sq-font-size-regular);
  line-height: var(--sq-line-height-regular);
`;
