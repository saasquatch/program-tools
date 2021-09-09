import { css } from "styled-components";

export const base = css`
  display: flex;
  flex-direction: row;
  padding: 3px 7px;
  height: 28px;
  background: #f9f9f9;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
`;

export const textSegment = css`
  width: max-content;
  border: 1px solid #e2e2e2;
  border-radius: 0px 2px 2px 0px;
  font-weight: 400;
  font-size: 14px;
  font-style: normal;
  line-height: 20px;
  font-family: "Helvetica Neue", Helvetica, sans-serif;
  color: #232323;
`;

export const iconSegment = css`
  width: 28px;
  border: 1px solid #e2e2e2;
  border-right: 0;
  border-radius: 2px 0px 0px 2px;
  float: left;
`;
