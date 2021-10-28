import { css } from "styled-components"

export const ModalBackdropStyle = css`
  position: absolute;
  display: flex;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.05);
  z-index: 1;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`

export const ModalDivStyle = css`
  position: relative;
  white-space: pre-wrap;
  min-width: 558px;
  background-color: var(--sq-surface);
  box-shadow: 0 0 0 1px var(--sq-border);
  border-radius: 8px;
  margin: auto;
  padding: 0;
`

export const ModalHeaderStyle = css`
  user-select: none;
  padding: 20px;
  background: var(--sq-nav-surface-primary);
  box-sizing: border-box;
  border-radius: 8px 8px 0 0;
  font-family: "Helvetica Neue", Helvetica, sans-serif;
  font-weight: var(--sq-font-weight-bold);
  font-size: var(--sq-font-size-header-one);
  line-height: var(--sq-line-height-header-one);
  color: var(--sq-surface);
`

export const ModalActionDivStyle = css`
  margin-top: 10px;
  box-sizing: border-box;
  border-radius: 0 0 8px 8px;
  display: flex;
  align-items: center;
  justify-content: center;
`

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
  padding: 20px;
`

export const ModalContentTextDivStyle = css`
  max-width: fit-content;
  margin-top: 10px;
  margin-bottom: 10px;
  color: var(--sq-text);
  font-family: "Helvetica Neue", Helvetica, sans-serif;
  font-size: var(--sq-font-size-regular);
  font-weight: var(--sq-font-weight-regular);
  line-height: var(--sq-line-height-regular);
`

export const CodeDivStyle = css`
  display: flex;
  align-items: center;
  padding: 20px;
  color: var(--sq-text);
  background: var(--sq-background);
  border: 1px solid var(--sq-border);
  box-sizing: border-box;
  border-radius: 4px;
  font-family: monospace;
  font-size: var(--sq-font-size-regular);
  font-weight: var(--sq-font-weight-regular);
  line-height: var(--sq-line-height-regular);
`

export const DividerDivStyle = css`
  height: 1px;
  width: 100%;
  background: var(--sq-border);
  margin: 20px 0 20px -20px;
  padding-right: 40px;
`

export const ModalBannerDivStyle = css`
  user-select: none;
  display: flex;
  height: 36px;
  padding: 20px;
  margin: -20px;
  margin-bottom: 20px;
  align-items: center;
  text-indent: 20px;
  background: var(--sq-surface-modal-banner);
  color: var(--sq-surface);
  font-family: "Helvetica Neue", Helvetica, sans-serif;
  font-weight: var(--sq-font-weight-bold);
  font-size: var(--sq-font-size-header-three);
  line-height: var(--sq-line-height-regular);
`

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
  font-size: 18px;
  line-height: 20px;
  color: var(--sq-text-subdued);
  background: var(--sq-surface);
  border-bottom: 1px solid var(--sq-border);
  padding: 20px;
  margin: -20px;
  margin-bottom: 20px;
`
