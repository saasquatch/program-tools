import { css } from "styled-components";

export const icon_size = {
  mini: "5px",
  small: "16px",
  medium: "16px",
  large: "20px",
};

export const icon_only_size = {
  small: "var(--sq-icon-size-small)",
  medium: "var(--sq-icon-size-medium)",
  large: "var(--sq-icon-size-large)",
  mini: "var(--sq-icon-size-badge)",
};

export const checkmark_anim = {
  small: "12px",
  medium: "12px",
  large: "15px",
};

export const loading_anim = {
  small: "12px",
  medium: "12px",
  large: "15px",
};

export const anim_padding = {
  small: "6px",
  medium: "6px",
  large: "6px",
};

// BASE BUTTON STYLING

export const universal_base = css`
  cursor: pointer;
  border: none;
  border-radius: var(--sq-border-radius-normal);
  font-family: var(--sq-font-family-sans);
  font-weight: var(--sq-font-weight-regular);
  height: max-content;
`;
// PILL VARIANTS

export const pill = css`
  border-radius: var(--sq-border-radius-pill);
`;

// SIZE VARIANTS

export const small = css`
  padding: var(--sq-spacing-x-small) var(--sq-spacing-small);
  font-size: var(--sq-font-size-button-small);
  line-height: var(--sq-line-height-button-small);
`;

export const medium = css`
  padding: var(--sq-spacing-x-small) var(--sq-spacing-medium);
  font-size: var(--sq-font-size-button-medium);
  line-height: var(--sq-line-height-button-medium);
`;

export const large = css`
  padding: 5px var(--sq-spacing-large);
  font-size: var(--sq-font-size-button-large);
  line-height: var(--sq-line-height-button-large);
`;

// BUTTON PRIMARY VARIANTS

export const primary = {
  critical: css`
    background: var(--sq-surface-critical);
    &:hover {
      background: var(--sq-surface-critical-hovered);
    }
  `,
  success: css`
    background: var(--sq-surface-success);
    &:hover {
      background: var(--sq-surface-success-hovered);
    }
    &:disabled {
      cursor: not-allowed;
      background: var(--sq-surface-success);
      &:hover {
        background: var(--sq-surface-success);
      }
    }
  `,
  loading: css`
    cursor: wait;
    background: var(--sq-action-primary-disabled);
    color: var(--sq-text-on-primary-disabled);
    &:hover {
      background: var(--sq-action-primary-disabled);
    }
  `,
};

// BUTTON SECONDARY VARIANTS

export const secondary = {
  critical: css`
    color: var(--sq-surface-critical);
    &:hover {
      background: var(--sq-action-secondary-hovered);
    }
  `,
  success: css`
    color: var(--sq-surface-success);
    &:hover {
      background: var(--sq-action-secondary-hovered);
    }
    &:disabled {
      cursor: not-allowed;
      color: var(--sq-surface-success);
    }
  `,
  loading: css`
    cursor: wait;
    color: var(--sq-text-on-primary-disabled);
    &:hover {
      background: var(--sq-action-secondary);
    }
  `,
};

// BUTTON TEXT VARIANTS

export const text = {
  critical: css`
    color: var(--sq-surface-critical-hovered);
  `,
  success: css`
    color: var(--sq-surface-success-hovered);
  `,
};

// BUTTON ICON VARIANTS

export const icon = {
  base: css`
    padding: 0;
  `,

  mini: css`
    width: 20px;
    height: 20px;
  `,

  circle: css`
    border-radius: var(--sq-border-radius-pill);
  `,
  borderless: css`
    border: none;
    background: transparent;
    &:hover {
      color: var(--sq-action-secondary-border);
      background: var(--sq-action-secondary);
    }
    &:disabled:hover {
      background: transparent;
    }
  `,
};
