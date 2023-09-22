import { css } from "styled-components";

export const RadioLabelStyle = css`
  user-select: none;
  cursor: pointer;
`;

export const RadioGridStyle = css`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
`;

export const RadioInputStyle = css`
  display: none;

  &:checked + div::after {
    transform: scale(1);
  }
`;

