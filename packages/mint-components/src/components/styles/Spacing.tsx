import { css } from "emotion";
import { gapEmotion } from "../../global/mixins";

export const Column = css`
  display: flex;
  flex-direction: column;
  ${gapEmotion("top", "var(--sl-spacing-medium)")}
`;

export const Row = css`
  display: flex;
  ${gapEmotion("left", "var(--sl-spacing-large)")}

  & > * {
    flex: 1;
  }
`;
