import { css } from "styled-components";

export const icon_size = {
  mini: "5px",
  small: "14px",
  medium: "16px",
  large: "22px",
};

export const icon_only_size = {
  small: "var(--sq-icon-size-small)",
  medium: "var(--sq-icon-size-medium)",
  large: "var(--sq-icon-size-large)",
  mini: "var(--sq-icon-size-badge)",
};

export const checkmark_anim = {
  small: "12px",
  medium: "13px",
  large: "18px",
};

export const loading_anim = {
  small: "12px",
  medium: "13px",
  large: "18px",
};

export const anim_padding = {
  small: 2,
  medium: 3,
  large: 4,
};

// BASE BUTTON STYLING

export const universal_base = css`
  cursor: pointer;

  border: none;
  border-radius: 4px;

  font-family: "Helvetica Neue", Helvetica, sans-serif;
  font-weight: var(--sq-font-weight-bold);
`;
// PILL VARIANTS

export const pill = css`
  border-radius: 100px;
`;

// SIZE VARIANTS

export const small = css`
  padding: 2.5px 10.5px;
  font-size: var(--sq-font-size-button-small);
  line-height: var(--sq-line-height-button-small);
`;

export const medium = css`
  padding: 5px 16px;
  font-size: var(--sq-font-size-button-medium);
  line-height: var(--sq-line-height-button-medium);
`;

export const large = css`
  padding: 7.5px 21px;
  font-size: var(--sq-font-size-button-large);
  line-height: var(--sq-line-height-button-large);
`;

// BUTTON PRIMARY VARIANTS

export const primary = {
  base: css`
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
  `,
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
  `,
  loading: css`
    cursor: wait;
    background: var(--sq-action-primary-disabled);
    &:hover {
      background: var(--sq-action-primary-disabled);
    }
  `,
};

// BUTTON SECONDARY VARIANTS

export const secondary = {
  base: css`
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
  `,
  critical: css`
    color: var(--sq-surface-critical-hovered);
    box-shadow: inset 0 0 0 1px var(--sq-surface-critical-hovered);
    &:hover {
      color: var(--sq-text-on-secondary-hovered);
      background: var(--sq-surface-critical-hovered);
    }
  `,
  success: css`
    color: var(--sq-surface-success-hovered);
    box-shadow: inset 0 0 0 1px var(--sq-surface-success-hovered);
    &:hover {
      color: var(--sq-text-on-secondary-hovered);
      background: var(--sq-surface-success-hovered);
    }
  `,
  loading: css`
    cursor: wait;
    color: var(--sq-action-primary-disabled);
    box-shadow: inset 0 0 0 1px var(--sq-action-primary-disabled);
    &:hover {
      color: var(--sq-action-primary-disabled);
      background: var(--sq-action-secondary);
    }
  `,
};

// BUTTON TEXT VARIANTS

export const text = {
  base: css`
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
  `,
  critical: css`
    color: var(--sq-surface-critical-hovered);
  `,
  success: css`
    color: var(--sq-surface-success-hovered);
  `,
};

// export const text_small = css`
//   font-size: var(--sq-font-size-button-small);
//   line-height: var(--sq-line-height-button-small);
// `;
// export const text_medium = css`
//   font-size: var(--sq-font-size-button-medium);
//   line-height: var(--sq-line-height-button-medium);
// `;
// export const text_large = css`
//   font-size: var(--sq-font-size-button-large);
//   line-height: var(--sq-line-height-button-large);
// `;

// BUTTON ICON VARIANTS

export const icon = {
  base: css`
    cursor: pointer;

    padding: 0;

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
  `,
  mini: css`
    width: 20px;
    height: 20px;
  `,
  small: css`
    width: 36px;
    height: 36px;
  `,
  medium: css`
    width: 44px;
    height: 44px;
  `,
  large: css`
    width: 76px;
    height: 76px;
  `,

  circle: css`
    border-radius: 100px;
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
