import { css } from 'styled-components'

export const input = css`
	letter-spacing: normal;
	word-spacing: normal;
	text-transform: none;
	text-indent: 0px;
	text-shadow: none;
	display: inline-block;
	text-align: start;
	background-color: white;
	cursor: text;
	color: rgb(87, 87, 87);
	width: 270px;
	height: 30px;
	box-sizing: border-box;
	margin: 0em;
	font: 500 14px "Helvetica Neue", Arial, sans-serif;
	padding: 0px 10px;
	border-radius: 5px;
	border-width: 2px;
	border-style: solid;
	border-color: rgb(226, 226, 226);
	border-image: initial;
	margin-bottom: 5px;
	box-shadow: none !important;
	&:focus {
		outline: none;
		border-color: #448ee1;
	}
	&:active {
		outline: none;
		border-color: #448ee1;
	}
	&.invalid {
		border-color: #ce3a3a;
	}
	&:disabled{
		user-select: none;
		cursor: not-allowed;
		pointer-events: none;
		color: #BDBDBD;
		background-color: #EBEBEB;
	}
`

export const checkbox = css`
position: absolute;
  opacity: 0;
  & + label {
    position: relative;
    cursor: pointer;
    padding: 0;
    color: #6d8290;
    font-family: "Helvetica Neue", Helvetica, sans-serif;
    font-size: 13px;
    font-weight: 500;
  }
  /* // Custom Box */
  & + label:before {
    content: "";
    margin-right: 6px;
    display: inline-block;
    vertical-align: text-top;
    width: 15px;
    height: 15px;
    background: linear-gradient(180deg, #fff, #f9fafb);
    border-radius: 2px;
    background-color: #c4cdd5;
    border: 1px solid #e2e2e2;
    box-shadow: 0 0 0 1px transparent, 0 1px 0 0 rgba(22, 29, 37, 0.05);
  }
  /* // Box hover */
  &:hover + label:before {
    border-radius: 2px;
    border: 1px solid #6d8290 !important;
    box-shadow: 0 0 0 1px transparent, 0 1px 0 0 rgba(22, 29, 37, 0.05);
  }
  /* // Box focus */
  &:focus + label:before {
    box-shadow: 0 0 0 1px #6d8290;
  }
  /* // Box checked */
  &:checked + label:before {
    background: white;
    border: 1px solid #6d8290 !important;
  }
  /* // Disabled state label. */
  &:disabled + label {
    color: #b8b8b8;
    cursor: auto;
  }
  /* // Disabled box. */
  &:disabled + label:before {
    box-shadow: none;
    background: #eee;
  }
  /* // Checkmark. Could be replaced with an image */
  &:checked + label:after {
    content: "";
    position: absolute;
    left: 4px;
    top: 9px;
    background: #6d8290;
    width: 2px;
    height: 2px;
    box-shadow: 2px 0 0 #6d8290, 4px 0 0 #6d8290, 4px -2px 0 #6d8290,
      4px -4px 0 #6d8290, 4px -6px 0 #6d8290, 4px -8px 0 #6d8290;
    transform: rotate(45deg);
  }
`