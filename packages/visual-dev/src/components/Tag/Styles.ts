import { css } from "styled-components";

export const base = css`
  display: flex;
  flex-direction: row;
  background: #f9f9f9;
  box-sizing: border-box;
  align-items: center;
  width: max-content;
  border: 1px solid #e2e2e2;
  border-radius: 2px;
`;

export const textSegment = css`
  box-sizing: border-box;
  border-left: 1px solid #e2e2e2;
  padding: 3px 7px;
  font-weight: 400;
  font-size: 14px;
  font-style: normal;
  line-height: 20px;
  font-family: "Helvetica Neue", Helvetica, sans-serif;
  color: #232323;
`;

export const iconSegment = css`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	box-sizing: border-box;
	padding: 3px 7px;
	width: 28px;
	height: 26px;
	fill: #858585;
	&:hover {
		background: #f4f4f4;
		fill: #232323;
		cursor: pointer;
	}
`;


export const asd = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  width: 28px;
  padding: 3px 7px;
  height: 26px;
  fill: #858585;
  &:hover {
    background: #f4f4f4;
    fill: #232323;
    cursor: pointer;
  }
`;