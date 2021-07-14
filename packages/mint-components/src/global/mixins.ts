import { css } from "emotion";

// Does not support grid layouts
export const gapEmotion = (
  type: "top" | "left" | "right" | "bottom",
  size: string
) => {
  const ignoreChild =
    type === "top" || type === "left" ? "first-child" : "last-child";

  return css`
    & > :not(:${ignoreChild}) {
      margin-${type}: ${size};
    }
  `;
};

export const text = (size?: string, color?: string) => {
  return css`
    color: ${color || "var(--sl-color-gray-800)"};
    font-size: ${size || "var(--sl-font-size-small)"};
  `;
};

export const column = () => css`
  display: flex;
  flex-direction: column;
`;

export const separateContent = () => css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

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

export const P= {
  "font-size": "var(--sl-font-size-small)",
  color: "var(--sl-color-gray-800)",
  "margin-top": "0px",

  "&.Subtitle": {
    color: "var(--sl-color-gray-500)",
    margin: "0px",
  },
};

export const Column= {
  display: "flex",
  "flex-direction": "column",
  "& > :not(:first-child)": {
    "margin-top": "var(--sl-spacing-medium)",
  },
};

export const SeparateContent= {
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

export const Wrapper= {
  "box-sizing": "border-box",
  width: "100%",
  "max-width": "var(--st-content-max-width)",
  height: "auto",
  padding: "var(--sl-spacing-large)",
  "background-color": "var(--st-content-background)",
  display: "flex",
};
