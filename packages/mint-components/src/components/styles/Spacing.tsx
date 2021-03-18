import { css } from "emotion";
import { gap } from "../../global/mixins";

export const Column = css`
  display: flex;
  flex-direction: column;
  ${gap("top", "var(--sl-spacing-medium)")}
`;

export const Row = css`
  display: flex;
  ${gap("left", "var(--sl-spacing-large)")}

  & > * {
    flex: 1;
  }
`;
