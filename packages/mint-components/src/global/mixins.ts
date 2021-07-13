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