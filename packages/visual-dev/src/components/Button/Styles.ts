import { css } from "styled-components"

export const icon_size = {
  small: "14px",
  medium: "16px",
  large: "22px",
}

export const checkmark_anim = {
  small: "12px",
  medium: "13px",
  large: "18px",
}

export const loading_anim = {
  small: "12px",
  medium: "13px",
  large: "18px",
}

export const anim_padding = {
  small: 2,
  medium: 3,
  large: 4,
}

// BASE BUTTON STYLING

export const base = css`
  cursor: pointer;

  border: none;
  border-radius: 4px;

  font-family: "Helvetica Neue", Helvetica, sans-serif;
  font-weight: var(--sq-font-weight-bold);
`

// BUTTON VARIANTS
export const primary = css`
  color: var(--sq-surface);
  background: var(--sq-action-primary);

  &:hover {
    background: var(--sq-action-primary-hovered);
  }

  &:disabled {
    cursor: not-allowed;
    background: var(--sq-surface-button-disabled);
    &:hover {
      background: var(--sq-surface-button-disabled);
    }
  }
`

// PILL VARIANTS

export const pill = css`
  border-radius: 100px;
`

// SIZE VARIANTS

export const small = css`
  padding: 2.5px 10.5px;
  font-size: var(--sq-font-size-button-small);
  line-height: var(--sq-line-height-button-small);
`

export const medium = css`
  padding: 5px 16px;
  font-size: var(--sq-font-size-button-medium);
  line-height: var(--sq-line-height-button-medium);
`

export const large = css`
  padding: 7.5px 21px;
  font-size: var(--sq-font-size-button-large);
  line-height: var(--sq-line-height-button-large);
`

// STATUS VARIANTS

export const critical = css`
  background: var(--sq-surface-critical);
  &:hover {
    background: var(--sq-surface-critical-hovered);
  }
`
export const success = css`
  background: var(--sq-surface-success);
  &:hover {
    background: var(--sq-surface-success-hovered);
  }
`
export const loading = css`
  background: var(--sq-surface-button-disabled);
  &:hover {
    background: var(--sq-surface-button-disabled);
  }
`

// export const base = css`
//   cursor: pointer;
//   font: 700 14px Helvetica;
//   line-height: 16px;
//   box-sizing: border-box;
//   border-radius: 4px;
// `

// export const primary = css`
//   border: 1px solid transparent;
//   background: #f49c20;
//   color: #ffffff;
//   &:hover {
//     background: #dc8f32;
//   }
// `
// export const primary_small = css`
//   font-size: 12px;
//   padding: 2.5px 10.5px;
// `
// export const primary_medium = css`
//   font-size: 14px;
//   padding: 5px 16px;
// `
// export const primary_large = css`
//   font-size: 16px;
//   padding: 7.5px 21px;
// `

// export const secondary = css`
//   border: 1px solid #a6b9bd;
//   background: #ffffff;
//   color: #575757;
//   &:hover {
//     color: #ffffff;
//     background: #a6b9bd;
//   }
// `
// export const secondary_small = css`
//   font-size: 12px;
//   padding: 2.5px 10.5px;
// `
// export const secondary_medium = css`
//   font-size: 14px;
//   padding: 5px 16px;
// `
// export const secondary_large = css`
//   font-size: 16px;
//   padding: 7.5px 21px;
// `

// export const text = css`
//   border-radius: 0px;
//   margin: 0px 14px;
//   padding: 5px 0px;
//   border: none;
//   background: none;
//   border-bottom: 2px solid transparent;

//   color: #575757;
//   &:hover {
//     border-bottom: 2px solid #575757;
//   }
// `

// export const text_small = css`
//   font-size: 12px;
// `
// export const text_medium = css`
//   font-size: 14px;
// `
// export const text_large = css`
//   font-size: 18px;
// `

// export const circle = css`
//   border: 1px solid #a6b9bd;
//   background: #ffffff;
//   color: #575757;
//   padding: 0px;
//   width: 40px;
//   height: 40px;
//   border-radius: 100%;
//   &:hover {
//     color: #ffffff;
//     background: #a6b9bd;
//   }
// `

// export const circle_small = css`
//   width: 36px;
//   height: 36px;
// `

// export const circle_medium = css`
//   width: 44px;
//   height: 44px;
// `

// export const circle_large = css`
//   width: 60px;
//   height: 60px;
// `

// export const pill = css`
//   padding: 5px 16px;
//   border-radius: 100px;
// `
// export const disable_primary = css`
//   user-select: none;
//   cursor: not-allowed;
//   pointer-events: none;
//   background-color: #ebebeb;
// `

// export const loading_primary = css`
//   background-color: #ebebeb;
//   &:hover {
//     background: #ebebeb;
//   }
// `

// export const loading_secondary = css`
//   color: #ebebeb;
//   border-color: #ebebeb;
//   user-select: none;
//   pointer-events: none;
// `

// export const disable_secondary = css`
//   color: #ebebeb;
//   border-color: #ebebeb;
//   user-select: none;
//   pointer-events: none;
// `

// export const critical = css`
//   background-color: #fe6666;
//   &:hover {
//     background: #cb0000;
//   }
// `
// export const success = css`
//   background-color: #57ac59;
//   &:hover {
//     background: #479449;
//   }
// `
