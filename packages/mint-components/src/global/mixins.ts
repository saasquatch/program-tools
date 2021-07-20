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
  color: "var(--sl-color-gray-800)",
  "margin-top": "0px",

  "&.Subtitle": {
    color: "var(--sl-color-gray-500)",
    margin: "0px",
  },
};

export const Column = {
  display: "flex",
  "flex-direction": "column",
  "& > :not(:first-child)": {
    "margin-top": "var(--sl-spacing-medium)",
  },
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
  "max-width": "var(--st-content-max-width)",
  height: "auto",
  "background-color": "var(--st-content-background)",
  display: "flex",
  padding: "var(--sl-spacing-xxx-large)",
  border: "1px solid #eaeaea",
  "border-radius": "8px",
};

export const AuthButtonsContainer = {
  "padding-top": "var(--sl-spacing-medium)",
  display: "flex",
  "flex-direction": "column",
  width: "100%",
  "align-items": "center",
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
