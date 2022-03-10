import { css } from "styled-components";

export const AvatarCircleStyle = css`
  background-color: var(--sq-background);
  border-radius: 50%;
  width: var(--sq-icon-size-avatar);
  height: var(--sq-icon-size-avatar);
  text-align: center;
  border: 1px solid var(--sq-border);
  box-sizing: border-box;
  border-radius: 50px;
`;

export const AvatarCircleStyleLarge = css`
  background-color: var(--sq-background);
  border-radius: 50%;
  width: var(--sq-icon-size-avatar-large);
  height: var(--sq-icon-size-avatar-large);
  text-align: center;
  border-radius: 50px;
`;

export const AvatarTextStyle = css`
  position: relative;
  top: 7px;
  color: var(--sq-text);
  font-family: "Helvetica Neue", Helvetica, sans-serif;
  font-weight: var(--sq-font-weight-bold);
  font-size: var(--sq-font-size-regular);
  line-height: var(--sq-line-height-regular);
`;

export const AvatarTextStyleLarge = css`
  position: relative;
  top: 15px;
  color: var(--sq-surface);
  font-family: "Helvetica Neue", Helvetica, sans-serif;
  font-weight: var(--sq-font-weight-regular);
  font-size: var(--sq-font-size-avatar);
  line-height: var(--sq-line-height-regular);
`;

export const AvatarContainer = css`
  display: inline-block;
`;
