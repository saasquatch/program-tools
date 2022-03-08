import { css } from "styled-components";

export const base = css`
  background-color: var(--sq-background);
  border-radius: 50%;
  width: 34px;
  height: 34px;
  text-align: center;
  border: 1px solid var(--sq-border);
  box-sizing: border-box;
  border-radius: 50px;
`;
export const circle = css`
  position: relative;
  top: 6px;
  font-family: var(--sq-font-family-sans);
  font-weight: var(--sq-font-weight-regular);
  font-size: var(--sq-font-size-regular);
  line-height: var(--sq-line-height-regular);
`;

export const RowBase = css`
  display: flex;
  padding: 20px;
  justify-content: space-between;
  align-items: center;
  font-family: var(--sq-font-family-sans);
  font-style: normal;
  font-size: var(--sq-font-size-regular);
  line-height: var(--sq-line-height-regular);
  color: var(--sq-text-dark);
`;

export const DataTableDiv = css`
  & > :first-child {
    border-radius: 6px 6px 0px 0px;
  }
  & > :last-child {
    border-radius: 0px 0px 6px 6px;
  }
`;

export const Row = {
  row: css`
    background: var(--sq-surface);
    border: 2px solid var(--sq-border);
    border-top: 0px;
    box-sizing: border-box;
  `,
  header: css`
    font-weight: var(--sq-font-weight-bold);
    background: var(--sq-background);
    border: 2px solid var(--sq-border);
    box-sizing: border-box;
  `,
  extra: css`
    background: var(--sq-background);
    border: 2px solid var(--sq-border);
    box-sizing: border-box;
  `,
};

export const BannerDiv = css`
  display: flex;
  align-items: center;
  padding: 0 var(--sq-spacing-large);
  height: 74px;
  color: var(--sq-surface);
  background: var(--sq-nav-surface-primary);
  box-sizing: border-box;
`;

export const DataDiv = css`
  width: 100%;
  text-align: center;
`;

export const ContentDiv = css`
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  /* Body/Body Regular (14) */

  font-family: var(--sq-font-family-sans);
  font-weight: var(--sq-font-weight-regular);
  font-size: var(--sq-font-size-regular);
  line-height: var(--sq-line-height-regular);
  /* identical to box height, or 143% */

  /* On Surface/Text Dark */

  color: var(--sq-text-dark);
`;

export const SkeletonDiv = css`
  float: left;
  margin-right: var(--sq-spacing-x-small);
  border-radius: 50px;
`;

export const PopoverDiv = css`
  background: var(--sq-surface);
  border: 1px solid var(--sq-border);
  box-sizing: border-box;
  box-shadow: 3px 3px 7px rgba(0, 0, 0, 0.08);
  border-radius: 10px;
  div + div.action {
    margin-top: var(--sq-spacing-small);
  }
`;

export const PopoverActionDiv = css`
  white-space: inherit;
  overflow: inherit;
  text-overflow: inherit;
  font-family: var(--sq-font-family-sans);
  font-style: normal;
  font-weight: var(--sq-font-weight-regular);
  font-size: var(--sq-font-size-regular);
  line-height: var(--sq-line-height-regular);
  color: var(--sq-text);
`;

export const PopoverDividerDiv = css`
  height: 1px;
  margin: var(--sq-spacing-medium) -36px;
  background: var(--sq-border);
`;

export const PaginationDiv = css`
  display: flex;
  padding: var(--sq-spacing-large);
  align-items: center;
  background: var(--sq-background);
  border: 2px solid var(--sq-border);
  border-top: 0px;
  box-sizing: border-box;
  font-family: var(--sq-font-family-sans);
  font-weight: var(--sq-font-weight-regular);
  font-size: var(--sq-font-size-regular);
  line-height: var(--sq-line-height-regular);
`;

export const PaginationText = css`
  padding: 6px;
  color: var(--sq-text-interactive);
  cursor: pointer;
  font-family: var(--sq-font-family-sans);
  font-size: var(--sq-font-size-regular);
  line-height: var(--sq-line-height-regular);
`;

export const PaginationContainer = css`
  display: flex;
  align-items: center;
  margin-left: auto;
`;
