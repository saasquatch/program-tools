import { css } from "styled-components";

export const Main = css`
  border: 1px solid var(--sq-border);
  border-radius: 10px;
  padding: var(--sq-spacing-large);
  margin-top: var(--sq-spacing-xx-large);
`;

export const Head = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Container = css``;

export const Title = css`
  font-size: var(--sq-font-size-caption);
  margin: 0;
`;

export const Description = css`
  color: var(--sq-text-subdued);
  margin: var(--sq-spacing-xx-small) 0 0;
`;

export const CollapseContainer = css`
  overflow: hidden;
  max-height: 0;
  transition: max-height 0.5s cubic-bezier(0, 1, 0, 1);
`;
