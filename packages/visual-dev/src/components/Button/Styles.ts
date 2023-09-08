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
  base: css`
    color: var(--sq-surface);
    background: var(--sq-action-primary);
    box-shadow: none;
    border: none;

    &:hover {
      box-shadow: 0px 1px 4px var(--iui-serenity-gray);
      background: var(--sq-action-primary-hovered);
    }

    &:disabled {
      cursor: not-allowed;
      color: var(--sq-text-on-primary-disabled);
      background: var(--sq-action-primary-disabled);
      &:hover {
        box-shadow: none;
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
  base: css`
    color: var(--sq-text-on-secondary);
    background: var(--iui-pale-gray);

    &:hover {
      box-shadow: 0px 1px 4px var(--iui-serenity-gray);
      background: var(--sq-action-secondary-hovered);
    }

    &:disabled {
      color: var(--sq-text-on-primary-disabled);
      cursor: not-allowed;
    }
  `,
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
  base: css`
    color: var(--sq-text);
    border: none;
    background: none;

    &:hover {
      background-color: var(--iui-pale-gray);
    }

    &:disabled {
      cursor: not-allowed;
      color: var(--sq-text-on-primary-disabled);
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
    border-radius: var(--sq-border-radius-normal);
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
