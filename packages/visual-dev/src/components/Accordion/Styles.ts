import { css } from "styled-components";

export const MainDiv = css`
  margin-top: var(--sq-spacing-xx-large);
`;

export const HeadDiv = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

export const AccordionDiv = css``;

export const TitleH2 = css`
  font-size: var(--sq-font-size-caption);
  flex: 1;
  margin: 0;
`;

export const DescriptionP = css`
  color: var(--sq-text-subdued);
  margin: var(--sq-spacing-xx-small) 0 0;
`;

export const CollapsibleDiv = css`
  overflow: hidden;
  max-height: 0;
  transition: max-height 0.5s cubic-bezier(0, 1, 0, 1);
`;

export const IconDiv = css`
  & svg {
    cursor: pointer;
  }
`;
