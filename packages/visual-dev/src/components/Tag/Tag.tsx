import * as React from "react";
import styled from "styled-components";
import * as Styles from "./Styles";

interface TagProps {
  children?: any[] | string;
  onClick?: (e: React.SyntheticEvent) => Promise<void>;
}

const XIcon = (
  <svg
    width="8"
    height="10"
    viewBox="0 0 8 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.28571 3.15385L4.57143 5L6.28571 6.84615L5.71429 7.46154L4 5.61538L2.28571 7.46154L1.71429 6.84615L3.42857 5L1.71429 3.15385L2.28571 2.53846L4 4.38462L5.71429 2.53846L6.28571 3.15385Z"
      fill="#858585"
    />
  </svg>
);

export const TextSegmentStyled = styled.div`
  ${Styles.base}
  ${Styles.textSegment}
`;

export const IconSegmentStyled = styled.div`
  ${Styles.base}
  ${Styles.iconSegment}
`;

export const Tag: React.FC<TagProps> = ({ children, onClick }) => {
  return (
    <span>
      <IconSegmentStyled onClick={onClick}>{XIcon}</IconSegmentStyled>
      <TextSegmentStyled>{children}</TextSegmentStyled>
    </span>
  );
};
