import { css } from "emotion";

// Does not support grid layouts
export const gap = (
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
  `;;
};

export const column = () => css`
  display: flex;
  flex-direction: column;
`;

export const separateContent = () => css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
