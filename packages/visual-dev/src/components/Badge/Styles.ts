import { css } from "styled-components";

export const defaultIcon = "icon-sqh-gift";

export const base = css`
  border-radius: 50px;
  padding: 4px 20px;
  font-weight: 500;
  font-size: 14px;
  font-style: normal;
  font-family: "Helvetica Neue", Helvetica, sans-serif;
  line-height: 20px;
  width: max-content;
`;

export const info = css`
  background-color: #e2e2e2;
  border-color: #e2e2e2;
  color: #575757;
`;

export const success = css`
  background-color: #e4fce3;
  border-color: #e4fce3;
  color: #232323;
`;

export const active = css`
  background-color: #57ac59;
  border-color: #57ac59;
  color: #fff;
`;

export const critical = css`
  background-color: #fe6666;
  border-color: #fe6666;
  color: #fff;
`;

export const warning = css`
  background-color: #f1c359;
  border-color: #f1c359;
  color: #232323;
`;
