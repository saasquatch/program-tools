import { css } from 'styled-components'

export const base = css`
  font-weight: 400;
  line-height: 1;
  margin: 0px;
  font-family: "Helvetica Neue", Helvetica, sans-serif;
`

export const sizeVariants = {
  "1": css`font-size: var(--sq-font-size-header-one)`,
  "2": css`font-size: var(--sq-font-size-header-two)`,
  "3": css`font-size: var(--sq-font-size-header-three)`,
  "4": css`font-size: var(--sq-font-size-regular)`,
  "5": css`font-size: var(--sq-font-size-small)`,
}
