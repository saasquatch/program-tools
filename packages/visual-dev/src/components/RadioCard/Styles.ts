import { css } from "styled-components";

export const RadioLabelStyle = css`
  display: flex;
  flex-direction: row;
  min-height: 95px;
  box-sizing: border-box;
  border: 2px solid var(--sq-border);
  border-radius: var(--sq-border-radius-normal);
  align-items: center;
  user-select: none;
  cursor: pointer;
  color: var(--sq-text);
  font-family: var(--sq-font-family-sans);
  font-weight: var(--sq-font-weight-regular);
  font-size: var(--sq-font-size-regular);
  line-height: var(--sq-line-height-regular);
  background-color: var(--sq-surface);
  & * {
    border-color: var(--sq-border);
  }
`;

export const RadioGridStyle = css`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
`;

export const RadioInputStyle = css`
  display: none;

  &:checked + div::after {
    transform: scale(1);
  }
`;

export const RadioTextStyle = css`
  flex-direction: column;
  padding: var(--sq-spacing-large);
`;

export const RightSegmentStyle = css`
  width: auto;
  align-self: stretch;
  float: right;
`;

export const LeftSegmentStyle = css`
  float: left;
  min-width: 117px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-right-width: 1px;
  border-right-style: solid;
`;

export const TitleContainerStyle = css`
  display: flex;
  gap: var(--sq-spacing-xx-small);
  align-items: center;
  justify-content: flex-start;
  margin-bottom: var(--sq-spacing-xx-small);
`;

export const TitleStyle = css`
  font-weight: bold;
  margin: 0px;
  font-size: var(--sq-font-size-regular);
  color: inherit;
`;

export const IconSlotStyle = css`
  height: 40px;
  width: 40px;
`;
