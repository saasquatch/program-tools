import { css } from 'styled-components'

export const base = css`
  border-radius: 50px;
  padding: 4px 20px;
  color: var(--sq-text);
  font-family: 'Helvetica Neue', Helvetica, sans-serif;
  font-weight: var(--sq-font-weight-regular);
  font-size: var(--sq-font-size-regular);
  line-height: var(--sq-line-height-regular);
  width: max-content;
`

export const info = css`
  background-color: var(--sq-border);
  border-color: var(--sq-border);
  color: var(--sq-text);
`

export const success = css`
  background-color: var(--sq-surface-success-subdued);
  border-color: var(--sq-surface-success-subdued);
  color: var(--sq-text-dark);
`

export const active = css`
  background-color: var(--sq-border-success);
  border-color: var(--sq-border-success);
  color: var(--sq-surface);
`

export const critical = css`
  background-color: var(--sq-surface-critical);
  border-color: var(--sq-surface-critical);
  color: var(--sq-surface);
`

export const warning = css`
  background-color: var(--sq-border-warning);
  border-color: var(--sq-border-warning);
  color: var(--sq-text-dark);
`
