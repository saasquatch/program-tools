import { css } from "styled-components";

export const ModalBackdropStyle = css`
  position: absolute;
  display: flex;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.7);
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  padding: var(--sq-spacing-x-large);
  box-sizing: border-box;
`;

export const ModalActionDivStyle = css`
  margin-top: 10px;
  box-sizing: border-box;
  border-radius: 0 0 8px 8px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const ModalActionFooterDivStyle = css`
  position: absolute;
  bottom: 0;
  width: calc(100%);
  box-sizing: border-box;
  background-color: white;
  padding: var(--sq-spacing-large) 0;
`;

export const ModalContentDivStyle = css`
  max-height: 650px;
  overflow: hidden;
  overflow-y: overlay;

  ::-webkit-scrollbar {
    width: 6px;
  }

  ::-webkit-scrollbar-track {
  }

  ::-webkit-scrollbar-thumb {
    background: var(--sq-border);
    border-radius: 50px;
  }

  ::-webkit-scrollbar-thumb:hover {
  }
  padding: var(--sq-spacing-large);
`;

export const ModalContentTextDivStyle = css`
  max-width: fit-content;
  margin-top: 10px;
  margin-bottom: 10px;
  color: var(--sq-text);
  font-family: var(--sq-font-family-sans);
  font-size: var(--sq-font-size-regular);
  font-weight: var(--sq-font-weight-regular);
  line-height: var(--sq-line-height-regular);
`;

export const CodeDivStyle = css`
  display: flex;
  align-items: center;
  padding: var(--sq-spacing-large);
  color: var(--sq-text);
  background: var(--sq-background);
  border: 1px solid var(--sq-border);
  box-sizing: border-box;
  border-radius: var(--sq-border-radius-normal);
  font-family: monospace;
  font-size: var(--sq-font-size-regular);
  font-weight: var(--sq-font-weight-regular);
  line-height: var(--sq-line-height-regular);
`;

export const DividerDivStyle = css``;

export const ModalBannerDivStyle = css`
  user-select: none;
  display: flex;
  padding: var(--sq-spacing-large);
  margin: calc(-1 * var(--sq-spacing-large));
  margin-bottom: var(--sq-spacing-large);
  align-items: center;
  text-indent: var(--sq-spacing-large);
  background: var(--sq-surface-modal-banner);
  color: var(--sq-surface);
  font-family: var(--sq-font-family-sans);
  font-weight: var(--sq-font-weight-bold);
  font-size: var(--sq-font-size-header-three);
  line-height: var(--sq-line-height-regular);
`;

export const ModalBackDivStyle = css`
  user-select: none;
  display: flex;
  height: 20px;
  align-items: center;
  background: var(--sq-surface-modal-banner);
  text-indent: 15px;
  font-family: Helvetica;
  font-style: normal;
  font-weight: normal;
  font-size: var(--sq-font-size-header-three);
  line-height: var(--sq-line-height-header-three);
  color: var(--sq-text-subdued);
  background: var(--sq-surface);
  border-bottom: 1px solid var(--sq-border);
  padding: var(--sq-spacing-large);
  margin: calc(-1 * var(--sq-spacing-large));
  margin-bottom: var(--sq-spacing-large);
`;
