import { css } from 'styled-components'

export const statusColors = {
    info: {
      background: "#E2E2E2",
      border: "#E2E2E2",
      color: "#575757",
    },
    success: {
      background: "#E4FCE3",
      border: "#E4FCE3",
      color: "#232323",
    },
    active: {
      background: "#57AC59",
      border: "#57AC59",
      color: "#fff",
    },
    critical: {
      background: "#FE6666",
      border: "#FE6666",
      color: "#fff",
    },
    warning: {
      background: "#F1C359",
      border: "#F1C359",
      color: "#232323",
    }
  };
  
export const base = css`
    border-radius: 50px;
    padding: 4px 20px;
    font-weight: 500;
    font-size: 14px;
    font-style: normal;
    font-family: "Helvetica Neue", Helvetica, sans-serif;
    line-height: 20px;
`

export const info = css`
    background-color: ${statusColors.info.background};
    border-color: ${statusColors.info.border};
    color: ${statusColors.info.color};
`

export const success = css`
    background-color: ${statusColors.success.background};
    border-color: ${statusColors.success.border};
    color: ${statusColors.success.color};
`
export const active = css`
    background-color: ${statusColors.active.background};
    border-color: ${statusColors.active.border};
    color: ${statusColors.active.color};
`
export const critical = css`
    background-color: ${statusColors.critical.background};
    border-color: ${statusColors.critical.border};
    color: ${statusColors.critical.color};
`
export const warning = css`
    background-color: ${statusColors.warning.background};
    border-color: ${statusColors.warning.border};
    color: ${statusColors.warning.color};
`