import { css } from 'styled-components'

export const ModalBackdropStyle = css`
  position: absolute;
  display: flex;
  flex-direction: column;
  z-index: 1;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.05);
`

export const ModalDivStyle = css`
  position: relative;
  background-color: #fefefe;
  margin: auto;
  padding: 0;
  min-width: 558px;
  box-shadow: 0 0 0 1px #e2e2e2;
  border-radius: 8px;
  white-space: pre-wrap;
`

export const ModalHeaderStyle = css`
  padding: 20px;
  user-select: none;

  box-sizing: border-box;
  border-radius: 8px 8px 0 0;

  font-family: Helvetica;
  font-style: normal;
  font-weight: bold;
  font-size: 26px;
  line-height: 28px;

  color: #ffffff;
  background: #003b45;
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
    background: #e2e2e2;
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
  color: #575757;
  font-family: Helvetica;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
`

export const CodeDivStyle = css`
  display: flex;
  align-items: center;
  padding: 20px;
  color: #575757;
  background: #f9f9f9;
  border: 1px solid #e2e2e2;
  box-sizing: border-box;
  border-radius: 4px;

  font-family: monospace;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
`

export const DividerDivStyle = css`
  height: 1px;
  width: 100%;
  background: #e2e2e2;
  margin: 20px 0 20px -20px;
  padding-right: 40px;
`

export const ModalBannerDivStyle = css`
  height: 36px;
  background: #12c8d7;
  display: flex;
  align-items: center;

  padding: 20px;
  margin: -20px;
  margin-bottom: 20px;

  color: #fff;
  text-indent: 20px;
  user-select: none;

  font-family: Helvetica;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 20px;
`

export const ModalBackDivStyle = css`
  height: 20px;
  background: #12c8d7;
  display: flex;
  align-items: center;

  padding: 20px;
  margin: -20px;
  margin-bottom: 20px;

  text-indent: 15px;
  user-select: none;

  font-family: Helvetica;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 20px;

  color: #858585;
  background: #fff;
  border-bottom: 1px solid #e2e2e2;
`
