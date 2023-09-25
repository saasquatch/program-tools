import { css } from "styled-components";

export const base = css`
  background-color: var(--sq-background);
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
  min-height: 60px;
  padding: var(--sq-spacing-xx-small) 20px;
  justify-content: space-between;
  align-items: center;
  font-family: var(--sq-font-family-sans);
  font-style: normal;
  font-size: var(--sq-font-size-regular);
  line-height: var(--sq-line-height-regular);
  color: var(--sq-text-dark);

  & .actions-container {
    // visibility: hidden;
    opacity: 0;
    position: absolute;
    right: 0;
    background: linear-gradient(270deg, white 0%, rgba(255, 255, 255, 0) 100%);
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    transition: opacity 0.4s;

    &:first-child {
      max-width: fit-content;
      right: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: auto 0; 
      margin-right: 10px;
    }
}
  }

  &:hover {
    cursor: pointer;
    .actions-container {
      // visibility: visible;
      opacity: 1;
    }
  }
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
    border-bottom: 1px solid var(--sq-border-subdued);
    border-top: 0px;
    box-sizing: border-box;
    position: relative;
  `,
  header: css`
    font-weight: var(--sq-font-weight-bold);
    background: var(--sq-surface);
    border-bottom: 1px solid var(--sq-border);
    box-sizing: border-box;
    min-height: 40px;
  `,
  extra: css`
    background: var(--sq-background);
    border: 1px solid var(--sq-border);
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
  // font-weight: var(--sq-font-weight-regular);
  font-size: var(--sq-font-size-regular);
  line-height: var(--sq-line-height-regular);
  /* identical to box height, or 143% */

  /* On Surface/Text Dark */

  color: var(--sq-text-dark);
`;

export const SkeletonDiv = css`
  float: left;
  margin-right: var(--sq-spacing-x-small);
  border-radius: var(--sq-border-radius-pill);
`;

export const ShimmerStyles = css`
  /* using https://stackoverflow.com/questions/68216941/make-css-shimmer-effect-work-an-already-loaded-image */
  mask: linear-gradient(-60deg, #000 30%, #0005, #000 70%) right / 300% 100%;
  background-repeat: no-repeat;
  animation: shimmer 2s infinite;
  @keyframes shimmer {
    100% {
      mask-position: left;
    }
  }
`;

export const PopoverDiv = css`
  background: var(--sq-surface);
  border: 1px solid var(--sq-border);
  box-sizing: border-box;
  box-shadow: 3px 3px 7px rgba(0, 0, 0, 0.08);
  // border-radius: 10px;
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
  padding: var(--sq-spacing-large) 0px;
  align-items: center;
  background: var(--sq-surface);
  // border: 1px solid var(--sq-border);
  border-top: 0px;
  box-sizing: border-box;
  min-height: 42px;
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
  gap: var(--sq-spacing-medium);
`;

export const PageNumberContainer = css`
  display: flex;
  align-items: center;
  margin-left: auto;
  gap: var(--sq-spacing-xxx-small);
`;
