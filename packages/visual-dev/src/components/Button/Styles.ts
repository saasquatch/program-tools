import { css } from "styled-components"

export const icon_size = {
  mini: "5px",
  small: "14px",
  medium: "16px",
  large: "22px",
}

export const icon_only_size = {
  mini: "18px",
  small: "14px",
  medium: "22px",
  large: "36px",
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

// BUTTON PRIMARY VARIANTS

export const primary = css`
  color: var(--sq-surface);
  background: var(--sq-action-primary);
  box-shadow: none;
  border: none;

  &:hover {
    background: var(--sq-action-primary-hovered);
  }

  &:disabled {
    cursor: not-allowed;
    background: var(--sq-action-primary-disabled);
    &:hover {
      background: var(--sq-action-primary-disabled);
    }
  }
`
export const primary_critical = css`
  background: var(--sq-surface-critical);
  &:hover {
    background: var(--sq-surface-critical-hovered);
  }
`
export const primary_success = css`
  background: var(--sq-surface-success);
  &:hover {
    background: var(--sq-surface-success-hovered);
  }
`
export const primary_loading = css`
  cursor: wait;
  background: var(--sq-action-primary-disabled);
  &:hover {
    background: var(--sq-action-primary-disabled);
  }
`

// BUTTON SECONDARY VARIANTS

export const secondary = css`
  box-shadow: inset 0 0 0 1px var(--sq-action-secondary-border);

  color: var(--sq-text-on-secondary);
  background: var(--sq-action-secondary);

  &:hover {
    color: var(--sq-text-on-secondary-hovered);
    background: var(--sq-action-secondary-hovered);
  }

  &:disabled {
    cursor: not-allowed;
    color: var(--sq-action-primary-disabled);
    box-shadow: inset 0 0 0 1px var(--sq-action-primary-disabled);
    &:hover {
      color: var(--sq-action-primary-disabled);
      background: var(--sq-action-secondary);
    }
  }
`
export const secondary_critical = css`
  color: var(--sq-surface-critical-hovered);
  box-shadow: inset 0 0 0 1px var(--sq-surface-critical-hovered);
  &:hover {
    color: var(--sq-text-on-secondary-hovered);
    background: var(--sq-surface-critical-hovered);
  }
`
export const secondary_success = css`
  color: var(--sq-surface-success-hovered);
  box-shadow: inset 0 0 0 1px var(--sq-surface-success-hovered);
  &:hover {
    color: var(--sq-text-on-secondary-hovered);
    background: var(--sq-surface-success-hovered);
  }
`
export const secondary_loading = css`
  cursor: wait;
  color: var(--sq-action-primary-disabled);
  box-shadow: inset 0 0 0 1px var(--sq-action-primary-disabled);
  &:hover {
    color: var(--sq-action-primary-disabled);
    background: var(--sq-action-secondary);
  }
`

// BUTTON TEXT VARIANTS

export const text = css`
  border: none;
  color: var(--sq-text);
  background: none;

  &:hover {
    text-decoration: underline;
  }

  &:disabled {
    cursor: not-allowed;
    color: var(--sq-action-primary-disabled);
    border-color: var(--sq-action-primary-disabled);
    &:hover {
      text-decoration: none;
    }
  }
`
export const text_critical = css`
  color: var(--sq-surface-critical-hovered);
`
export const text_success = css`
  color: var(--sq-surface-success-hovered);
`
export const text_small = css`
  font-size: var(--sq-font-size-button-small);
  line-height: var(--sq-line-height-button-small);
`
export const text_medium = css`
  font-size: var(--sq-font-size-button-medium);
  line-height: var(--sq-line-height-button-medium);
`
export const text_large = css`
  font-size: var(--sq-font-size-button-large);
  line-height: var(--sq-line-height-button-large);
`

// BUTTON ICON VARIANTS

export const icon = css`
  cursor: pointer;

  border: none;
  border-radius: 4px;
  border: 1px solid var(--sq-action-secondary-border);

  color: var(--sq-text-on-secondary);
  background: var(--sq-action-secondary);

  &:hover {
    color: var(--sq-text-on-secondary-hovered);
    background: var(--sq-action-secondary-hovered);
  }

  &:disabled {
    cursor: not-allowed;
    color: var(--sq-action-primary-disabled);
    border-color: var(--sq-action-primary-disabled);
    &:hover {
      color: var(--sq-action-primary-disabled);
      background: var(--sq-action-secondary);
    }
  }
`
export const icon_mini = css`
  width: 20px;
  height: 20px;
`
export const icon_small = css`
  width: 36px;
  height: 36px;
`
export const icon_medium = css`
  width: 44px;
  height: 44px;
`
export const icon_large = css`
  width: 76px;
  height: 76px;
`

export const circle = css`
  border-radius: 100px;
`
export const borderless = css`
  border: none;
  &:hover {
    color: var(--sq-action-secondary-border);
    background: var(--sq-action-secondary);
  }
`
