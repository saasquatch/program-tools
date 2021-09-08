import { css } from 'styled-components'

export const base = css`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 16px;
    font-family: Helvatica Neue, Arial;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 20px;
    color: #575757;
    box-sizing: border-box;
    border: 1px solid;
    border-radius: 5px;
`

export const critical = css`
    background-color: #FAF2EE;
    border-color: #D14040;
`

export const warning = css`
    background-color: #FCF8E3;
    border-color: #F1C359;
`

export const success = css`
    background-color: #E4FCE3;
    border-color: #57AC59;
`

export const info = css`
    background-color: #F9F9F9;
    border-color: #E2E2E2;
`