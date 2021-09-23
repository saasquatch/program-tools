import { css } from 'styled-components'


export const InputBoxStyle = css`
width: 300px;
height: 30px;

font: 400 14px Helvetica;
text-indent: 6px;

color: #575757;
background: #ffffff;

border: 2px solid #e2e2e2;
border-radius: 4px;

&::placeholder {
	color: #bdbdbd;
}

&:focus {
	outline: none;
	border-color: #448ee1;
}

&:disabled {
	user-select: none;
	cursor: not-allowed;
	pointer-events: none;
	color: #bdbdbd;
	background-color: #ebebeb;
}
`

export const R1LabelStyle = css`
user-select: none;
display: flex;
flex-direction: row;
align-items: flex-start;
cursor: pointer;
margin-right: 10px;

color: #575757;
font-family: Helvetica;
font-style: normal;
font-weight: normal;
font-size: 14px;
line-height: 20px;
`
export const R1InputStyle = css`
display: none;

&:checked + div {
  border-color: #f49c20;
}

&:checked + div::after {
  transform: scale(1);
}
`
export const R1ButtonStyle = css`

//   Outer Circle
margin-top: 2.5px;
width: 14px;
height: 14px;
border: 1.5px solid #575757;
border-radius: 50%;
margin-right: 20px;
box-sizing: border-box;
padding: 1.5px;
flex-shrink: 0;

//   Inner Circle
&::after {
  content: '';
  width: 8px;
  height: 8px;
  display: block;
  background: #f49c20;
  border-radius: 100%;
  transform: scale(0);
  transition: transform 0.15s;
}

`

export const R2LabelStyle = css`
user-select: none;
display: flex;
flex-direction: row;
align-items: flex-start;
cursor: pointer;
margin-right: 10px;

color: #575757;
font-family: Helvetica;
font-style: normal;
font-weight: normal;
font-size: 14px;
line-height: 20px;

padding: 20px;
`
export const R2InputStyle = css`
display: none;

&:checked + div {
  border-color: #f49c20;
}

&:checked + div::after {
  transform: scale(1);
}
`
export const R2ButtonStyle = css`

//   Outer Circle
margin-top: 2.5px;
width: 14px;
height: 14px;
border: 1.5px solid #575757;
border-radius: 50%;
margin-right: 20px;
box-sizing: border-box;
padding: 1.5px;
flex-shrink: 0;

//   Inner Circle
&::after {
  content: '';
  width: 8px;
  height: 8px;
  display: block;
  background: #f49c20;
  border-radius: 100%;
  transform: scale(0);
  transition: transform 0.15s;
}

`