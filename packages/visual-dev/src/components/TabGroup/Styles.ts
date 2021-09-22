import { css } from 'styled-components'

export const tabgroup = css`
display: flex;
`

export const tab = css`
font: 700 18px Helvetica;
font-weight: normal;
padding: 15px 15px;
margin: 4px 18px;
cursor: pointer;
border-bottom: 2px solid transparent;
&:hover {
  color: inherit;
}
`

export const primary_bg = css`
background: #003B45;
`
export const secondary_bg = css`
background: #ffffff;
`
export const primary_text = css`
color: #ffffff;
`
export const secondary_text = css`
color: #003B45;
`
export const primary_grey = css`
color: #999999;
`
export const secondary_grey = css`
color: #7C7C7C;
`
export const selected = css`
color: inherit;
border-color: inherit;
`