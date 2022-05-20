import styled from "styled-components";
import * as Styles from "./Styles";

const DEFAULT_TAG = "span";

type TextSizeVariants = keyof typeof Styles.sizeVariants;

export type TextProps = {
  /**
   * Text size given by a value of 1 (largest) to 5 (smallest)
   */
  size?: TextSizeVariants;
  /**
   * Set the text to boldface
   */
  bold?: boolean;
  /**
   * Set the text color, must be a valid CSS color
   */
  color?: string;
  /**
   * Text to display
   */
  children: string;
};

type StyledTextProps = Pick<TextProps, "size" | "bold" | "color">;

export const Text = styled[DEFAULT_TAG]<StyledTextProps>`
  ${Styles.base}
  ${(props) => Styles.sizeVariants[props.size || "4"]}
  ${(props) => (props.bold ? "font-weight: 600;" : "")}
  ${(props) => (props.color ? `color: ${props.color};` : "")}
`;
