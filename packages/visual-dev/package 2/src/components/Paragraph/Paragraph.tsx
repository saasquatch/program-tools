import React from "react";
import styled from "styled-components";
import { Text } from "../Text";
import * as Styles from "./Styles";

type ParagraphSizeVariants = "1" | "2";
type ParagraphSizes = "4" | "5";
export type ParagraphProps = {
  size?: ParagraphSizeVariants;
  bold?: boolean;
};

const StyledParagraph = styled(Text)`
  ${Styles.base}
`;

export const Paragraph: React.FC<React.PropsWithChildren<ParagraphProps>> = (
  props
) => {
  const { size = "1", ...rest } = props;

  const textSize: Record<ParagraphSizeVariants, ParagraphSizes> = {
    "1": "4",
    "2": "5",
  };

  return <StyledParagraph as={"p"} size={textSize[size]} {...rest} />;
};
