interface GapProps {
  direction: "row" | "column";
  size: string;
}

export const gap = (props: GapProps) => {
  if (props.direction === "row") {
    return {
      "& > :not(:last-child)": {
        "margin-right": props.size,
      },
    };
  } else {
    return {
      "& > :not(:last-child)": {
        "margin-bottom": props.size,
      },
    };
  }
};

export const HostBlock = {
  ":host": {
    display: "block",
  },
  ":host([hidden])": {
    display: "none",
  },
};

export const P = {
  "font-size": "var(--sl-font-size-small)",
  color: "var(--sqm-text)",
  "margin-top": "0px",

  "&.Subtitle": {
    color: "var(--sqm-text-subdued)",
    margin: "0px",
  },
};

export const Column = {
  display: "flex",
  "flex-direction": "column",
};

export const SeparateContent = {
  display: "flex",
  "justify-content": "space-between",
  "align-items": "center",
};

export const ErrorStyles = {
  "&::part(base)": {
    background: "var(--sl-color-danger-10)",
    borderColor: "var(--sl-color-danger-500)",
    outline: "var(--sl-color-danger-500)",
  },

  "&:host": {
    "--something-random": "red",
    "--focus-ring": "0 0 0 var(--sl-focus-ring-width) red !important",
  },

  "&::part(input)": {
    color: "var(--sl-color-danger-500) !important",
    "&:-webkit-autofill, &:-webkit-autofill:hover, &:-webkit-autofill:focus, &:-webkit-autofill:active":
      {
        boxShadow:
          "0 0 0 var(--sl-input-height-large) var(--sl-input-background-color-hover) inset !important",
        "-webkit-text-fill-color": "var(--sl-color-danger-500)",
      },
  },

  "&::part(help-text)": {
    color: "var(--sl-color-danger-500)",
  },
};

export const Wrapper = {
  "box-sizing": "border-box",
  width: "100%",
  "max-width": "var(--sqm-content-max-width)",
  height: "auto",
  "background-color": "var(--sqm-content-background)",
  display: "flex",
  padding: "var(--sl-spacing-xxx-large)",
  border: "1px solid #eaeaea",
  "border-radius": "8px",
};

export const AuthWrapper = {
  margin: "auto",
  ...Wrapper,
  "max-width": "500px",
  ...Column,
  ...gap({ direction: "column", size: "var(--sl-spacing-x-large)" }),
};

export const AuthColumn = {
  ...Column,
  "& > *:not(style, div, slot)": { display: "block" },
  ...gap({ direction: "column", size: "var(--sl-spacing-large)" }),
};

export const AuthButtonsContainer = {
  "padding-top": "var(--sl-spacing-medium)",
  display: "flex",
  "flex-direction": "column",
  width: "100%",
  "&>*": {
    width: "100%",
  },
  ...gap({ direction: "column", size: "var(--sl-spacing-x-large)" }),
  "& > div": {
    "text-align": "center",
  },
};

export type FontSize =
  | "xx-small"
  | "x-small"
  | "small"
  | "medium"
  | "large"
  | "x-large"
  | "xx-large"
  | "xxx-large"
  | "xxxx-large";

export type FontWeight = "light" | "normal" | "semibold" | "bold";

export type LetterSpacing = "dense" | "normal" | "loose";

export type LineHeight = "dense" | "normal" | "loose";

export type Spacing =
  | "none"
  | "xxx-small"
  | "xx-small"
  | "x-small"
  | "small"
  | "medium"
  | "large"
  | "x-large"
  | "xx-large"
  | "xxx-large"
  | "xxxx-large";
